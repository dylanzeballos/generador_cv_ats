#!/usr/bin/env tsx
/**
 * Script de exportación de PDF - Server-side con Playwright
 *
 * Este script utiliza Playwright para generar PDFs de alta calidad desde el servidor.
 * Ofrece mejor calidad que la generación client-side ya que:
 * - Usa el motor de renderizado de Chrome completo
 * - Soporte completo de fuentes web
 * - Vector perfecto (no raster como html2canvas)
 * - Más opciones de configuración de página
 *
 * Uso:
 * ```bash
 * npm run export:pdf ATS ./data/resume.json ./output.pdf
 * ```
 *
 * Requisitos:
 * - Build de producción ejecutada previamente (`npm run build`)
 * - Archivo de datos JSON con la estructura del currículum
 */

import { chromium, Browser, Page } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_PATH = path.resolve(__dirname, '../dist');

interface PDFExportConfig {
  template: 'ATS' | 'Harvard';
  dataPath: string;
  outputPath: string;
  format?: 'A4' | 'Letter';
  margins?: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}

const DEFAULT_MARGINS = {
  top: '20mm',
  right: '20mm',
  bottom: '20mm',
  left: '20mm',
};

/**
 * Genera un PDF a partir de los datos del currículum
 */
async function exportPDF(config: PDFExportConfig): Promise<void> {
  let browser: Browser | null = null;

  try {
    // Validar que existe el build
    const indexPath = path.join(DIST_PATH, 'index.html');
    try {
      await fs.access(indexPath);
    } catch {
      throw new Error('No se encontró el build de producción. Ejecuta "npm run build" primero.');
    }

    // Leer datos del currículum
    let resumeData: unknown;
    try {
      const dataContent = await fs.readFile(config.dataPath, 'utf-8');
      resumeData = JSON.parse(dataContent);
    } catch (error) {
      throw new Error(
        `Error al leer los datos del currículum: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }

    // Lanzar navegador headless
    console.log('🚀 Iniciando navegador...');
    browser = await chromium.launch({
      headless: true,
    });

    const page: Page = await browser.newPage();

    // Cargar la aplicación construida
    console.log('📄 Cargando aplicación...');
    await page.goto(`file://${indexPath}`, {
      waitUntil: 'networkidle',
    });

    // Inyectar datos y seleccionar plantilla
    console.log('💉 Inyectando datos...');
    await page.evaluate(
      (data: { template: string; resumeData: unknown }) => {
        // Guardar en localStorage para que la app los cargue
        window.localStorage.setItem('resume-data', JSON.stringify(data.resumeData));
        window.localStorage.setItem('selected-template', data.template);

        // Dispatch event para notificar a la app
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'resume-data',
            newValue: JSON.stringify(data.resumeData),
          })
        );
      },
      { template: config.template, resumeData }
    );

    // Esperar a que renderice
    console.log('⏳ Esperando renderizado...');
    await page.waitForSelector('[role="document"]', {
      timeout: 10000,
      state: 'visible',
    });

    // Esperar un momento adicional para que se apliquen estilos
    await page.waitForTimeout(1000);

    // Generar PDF
    console.log('📄 Generando PDF...');
    await page.pdf({
      path: config.outputPath,
      format: config.format || 'A4',
      printBackground: true,
      margin: config.margins || DEFAULT_MARGINS,
      preferCSSPageSize: true,
    });

    console.log(`✅ PDF generado exitosamente: ${config.outputPath}`);

    // Mostrar estadísticas
    const stats = await fs.stat(config.outputPath);
    const sizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 Tamaño: ${sizeInKB} KB`);
  } catch (error) {
    console.error('❌ Error al generar PDF:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Navegador cerrado');
    }
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Generador de PDF para Currículums

Uso:
  npm run export:pdf <template> <data-path> [output-path] [options]

Argumentos:
  template      Plantilla a usar: ATS | Harvard
  data-path     Ruta al archivo JSON con los datos del currículum
  output-path   Ruta de salida del PDF (opcional, default: ./cv-{template}.pdf)

Opciones:
  --format      Formato de página: A4 | Letter (default: A4)
  --margin      Márgenes en mm: top,right,bottom,left (default: 20,20,20,20)

Ejemplos:
  npm run export:pdf ATS ./data/resume.json
  npm run export:pdf Harvard ./data/resume.json ./output.pdf
  npm run export:pdf ATS ./data.json ./cv.pdf --format=Letter
    `);
    process.exit(0);
  }

  const [template, dataPath, outputPath] = args;

  // Validar template
  if (template !== 'ATS' && template !== 'Harvard') {
    console.error('❌ Error: El template debe ser "ATS" o "Harvard"');
    process.exit(1);
  }

  // Validar archivo de datos
  try {
    await fs.access(dataPath);
  } catch {
    console.error(`❌ Error: No se encontró el archivo de datos: ${dataPath}`);
    process.exit(1);
  }

  // Determinar ruta de salida
  const finalOutputPath = outputPath || `./cv-${template.toLowerCase()}.pdf`;

  // Parsear opciones adicionales
  const formatArg = args.find((arg) => arg.startsWith('--format='));
  const format = formatArg ? (formatArg.split('=')[1] as 'A4' | 'Letter') : 'A4';

  const marginArg = args.find((arg) => arg.startsWith('--margin='));
  let margins = DEFAULT_MARGINS;
  if (marginArg) {
    const [top, right, bottom, left] = marginArg.split('=')[1].split(',');
    margins = { top, right, bottom, left };
  }

  // Ejecutar exportación
  await exportPDF({
    template,
    dataPath,
    outputPath: finalOutputPath,
    format,
    margins,
  });
}

main();
