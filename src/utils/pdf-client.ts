import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Utilidades para exportación de PDF - Client-side
 *
 * Este módulo proporciona funciones para generar PDFs directamente desde el navegador
 * usando html2canvas + jsPDF. Es la opción más rápida para usuarios pero con algunas
 * limitaciones de calidad comparada con la generación server-side.
 *
 * Trade-offs:
 * - Pros: Inmediato, sin servidor, funciona offline
 * - Cons: Calidad raster, depende de fuentes del sistema, archivos más pesados
 *
 * @module pdf-client
 */

export interface PDFExportOptions {
  /** Elemento HTML a convertir a PDF */
  element: HTMLElement;
  /** Nombre del archivo de salida */
  filename?: string;
  /** Formato de página: A4 o Letter */
  format?: 'a4' | 'letter';
  /** Orientación: portrait o landscape */
  orientation?: 'portrait' | 'landscape';
  /** Calidad de la imagen (1-3) */
  quality?: number;
  /** Escala del canvas (mayor = mejor calidad pero más pesado) */
  scale?: number;
}

export interface PDFExportResult {
  success: boolean;
  error?: string;
  blob?: Blob;
}

/**
 * Convierte todos los colores OKLCH a hex en el elemento y sus hijos
 * Esto es necesario porque jsPDF/html2canvas no soportan OKLCH
 */
function convertOKLCHToHex(element: HTMLElement): void {
  // Crear un div temporal para procesar estilos
  const allElements = element.querySelectorAll('*');

  allElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlEl);

    // Verificar si hay colores OKLCH y convertirlos
    const bgColor = computedStyle.backgroundColor;
    const color = computedStyle.color;
    const borderColor = computedStyle.borderColor;

    // Si el color está en formato oklch, forzar a hex
    if (bgColor.includes('oklch')) {
      htmlEl.style.backgroundColor = '#ffffff';
    }
    if (color.includes('oklch')) {
      htmlEl.style.color = '#000000';
    }
    if (borderColor.includes('oklch')) {
      htmlEl.style.borderColor = '#000000';
    }
  });
}

/**
 * Genera un PDF a partir de un elemento HTML usando html2canvas + jsPDF
 *
 * @param options - Opciones de configuración para la exportación
 * @returns Promise con el resultado de la operación
 *
 * @example
 * ```typescript
 * const element = document.getElementById('resume-preview');
 * const result = await exportToPDFClient({
 *   element,
 *   filename: 'mi-cv.pdf',
 *   format: 'a4'
 * });
 *
 * if (result.success) {
 *   console.log('PDF generado exitosamente');
 * } else {
 *   console.error('Error:', result.error);
 * }
 * ```
 */
export async function exportToPDFClient({
  element,
  filename = 'curriculum.pdf',
  format = 'a4',
  orientation = 'portrait',
  quality = 2,
  scale = 2,
}: PDFExportOptions): Promise<PDFExportResult> {
  try {
    // Validaciones iniciales
    if (!element) {
      return {
        success: false,
        error: 'No se encontró el elemento para exportar',
      };
    }

    // Clonar el elemento para no modificar el original
    const clone = element.cloneNode(true) as HTMLElement;

    // Aplicar estilos inline para evitar problemas con OKLCH
    clone.style.backgroundColor = '#ffffff';
    clone.style.color = '#000000';

    // Agregar al DOM temporalmente (oculto)
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = element.offsetWidth + 'px';
    document.body.appendChild(clone);

    // Convertir colores OKLCH
    convertOKLCHToHex(clone);

    // Forzar estilos para PDF
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      * {
        background-color: #ffffff !important;
        color: #000000 !important;
        border-color: #000000 !important;
      }
    `;
    clone.appendChild(styleSheet);

    // Configurar html2canvas con opciones optimizadas
    const canvas = await html2canvas(clone, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        // Aplicar estilos de impresión al clon
        const clonedElement = clonedDoc.body.querySelector('[role="document"]');
        if (clonedElement) {
          (clonedElement as HTMLElement).style.transform = 'none';
          (clonedElement as HTMLElement).style.margin = '0';
        }
      },
    });

    // Limpiar el clon
    document.body.removeChild(clone);

    // Configurar jsPDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: format.toLowerCase(),
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Centrar el contenido en la página
    const marginX = (pdfWidth - scaledWidth) / 2;

    // Calcular páginas necesarias
    let heightLeft = scaledHeight;
    let position = 0;

    // Agregar primera página
    const imgData = canvas.toDataURL('image/png', quality);
    pdf.addImage(imgData, 'PNG', marginX, position, scaledWidth, scaledHeight);
    heightLeft -= pdfHeight;

    // Agregar páginas adicionales si el contenido es muy largo
    while (heightLeft >= 0) {
      position = heightLeft - scaledHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', marginX, position, scaledWidth, scaledHeight);
      heightLeft -= pdfHeight;
    }

    // Descargar el PDF
    pdf.save(filename);

    return { success: true };
  } catch (error) {
    console.error('Error al exportar PDF:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al generar PDF',
    };
  }
}

/**
 * Genera un Blob del PDF en lugar de descargarlo directamente
 * Útil para previsualizar o enviar por email
 */
export async function generatePDFBlob({
  element,
  format = 'a4',
  orientation = 'portrait',
  quality = 2,
  scale = 2,
}: Omit<PDFExportOptions, 'filename'>): Promise<Blob | null> {
  try {
    if (!element) return null;

    // Clonar y preparar el elemento
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.backgroundColor = '#ffffff';
    clone.style.color = '#000000';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    convertOKLCHToHex(clone);

    const canvas = await html2canvas(clone, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    document.body.removeChild(clone);

    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: format.toLowerCase(),
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    const marginX = (pdfWidth - scaledWidth) / 2;

    let heightLeft = scaledHeight;
    let position = 0;

    const imgData = canvas.toDataURL('image/png', quality);
    pdf.addImage(imgData, 'PNG', marginX, position, scaledWidth, scaledHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - scaledHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', marginX, position, scaledWidth, scaledHeight);
      heightLeft -= pdfHeight;
    }

    return pdf.output('blob');
  } catch (error) {
    console.error('Error al generar blob PDF:', error);
    return null;
  }
}

/**
 * Abre el diálogo de impresión del navegador optimizado para el CV
 */
export function printResume(): void {
  // Guardar el título original
  const originalTitle = document.title;

  // Cambiar temporalmente el título para la impresión
  document.title = 'CV - ' + originalTitle;

  // Abrir diálogo de impresión
  window.print();

  // Restaurar título
  setTimeout(() => {
    document.title = originalTitle;
  }, 100);
}
