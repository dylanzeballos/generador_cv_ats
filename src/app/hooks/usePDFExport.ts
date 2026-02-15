import { useState, useCallback, useRef } from 'react';
import { exportToPDFClient, printResume, type PDFExportResult } from '@/utils/pdf-client';

/**
 * Hook para manejar la exportación a PDF
 *
 * Proporciona:
 * - Estado de carga
 * - Funciones para exportar a PDF (descarga e impresión)
 * - Manejo de errores
 * - Referencia al elemento a exportar
 *
 * @example
 * ```tsx
 * const { exportRef, isExporting, exportPDF, print, error } = usePDFExport();
 *
 * return (
 *   <>
 *     <div ref={exportRef}>
 *       <Template data={data} />
 *     </div>
 *     <button onClick={exportPDF} disabled={isExporting}>
 *       {isExporting ? 'Generando...' : 'Descargar PDF'}
 *     </button>
 *   </>
 * );
 * ```
 */

interface UsePDFExportReturn {
  /** Ref que debe aplicarse al elemento a exportar */
  exportRef: React.RefObject<HTMLDivElement>;
  /** Estado de carga durante la exportación */
  isExporting: boolean;
  /** Error si ocurrió alguno */
  error: string | null;
  /** Exporta a PDF y descarga */
  exportPDF: (filename?: string) => Promise<void>;
  /** Abre el diálogo de impresión */
  print: () => void;
  /** Limpia el error */
  clearError: () => void;
}

export function usePDFExport(): UsePDFExportReturn {
  const exportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportPDF = useCallback(async (filename?: string) => {
    setError(null);

    if (!exportRef.current) {
      setError('No se encontró el elemento para exportar');
      return;
    }

    setIsExporting(true);

    try {
      const result: PDFExportResult = await exportToPDFClient({
        element: exportRef.current,
        filename: filename || 'curriculum.pdf',
        format: 'a4',
        quality: 2,
        scale: 2,
      });

      if (!result.success) {
        setError(result.error || 'Error al generar el PDF');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsExporting(false);
    }
  }, []);

  const print = useCallback(() => {
    printResume();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    exportRef,
    isExporting,
    error,
    exportPDF,
    print,
    clearError,
  };
}
