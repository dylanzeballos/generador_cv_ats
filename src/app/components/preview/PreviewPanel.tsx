import { Suspense, useMemo } from 'react';
import { useResumeStore } from '@/app/store/resumeStore';
import { loadTemplateComponent, templateExists } from '@/templates/TemplateRegistry';
import { Card } from '@/app/components/ui/Card';
import { usePDFExport } from '@/app/hooks/usePDFExport';
import { Button } from '@/app/components/ui/Button';
import { Download, Printer, AlertCircle } from 'lucide-react';

/**
 * Panel de vista previa del currículum
 *
 * Componente principal que:
 * - Muestra el CV renderizado con la plantilla seleccionada
 * - Carga lazy de plantillas para optimizar rendimiento
 * - Proporciona controles de exportación
 * - Maneja errores de carga
 */

function LoadingTemplate() {
  return (
    <div className="flex items-center justify-center h-[800px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando plantilla...</p>
      </div>
    </div>
  );
}

function ErrorTemplate({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-[800px]">
      <div className="text-center max-w-md">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar la plantilla</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export function PreviewPanel() {
  const { data, selectedTemplate } = useResumeStore();
  const { exportRef, isExporting, error, exportPDF, print, clearError } = usePDFExport();

  // Cargar componente de plantilla dinámicamente
  const TemplateComponent = useMemo(() => {
    if (!templateExists(selectedTemplate)) {
      return null;
    }
    return loadTemplateComponent(selectedTemplate);
  }, [selectedTemplate]);

  const handleExportPDF = () => {
    const filename = `CV-${data.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`;
    exportPDF(filename);
  };

  if (!TemplateComponent) {
    return <ErrorTemplate message={`La plantilla "${selectedTemplate}" no está disponible.`} />;
  }

  return (
    <div className="space-y-4">
      {/* Toolbar de acciones */}
      <Card noPadding className="p-4 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Vista Previa</h2>
            <p className="text-sm text-gray-500">Plantilla: {selectedTemplate}</p>
          </div>
          <div className="flex items-center gap-2">
            {error && (
              <div className="text-sm text-red-600 flex items-center gap-1 mr-4">
                <AlertCircle className="h-4 w-4" />
                {error}
                <button onClick={clearError} className="underline ml-1">
                  Cerrar
                </button>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={print} disabled={isExporting}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="primary" size="sm" onClick={handleExportPDF} isLoading={isExporting}>
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* Contenedor del CV */}
      <div className="bg-gray-200 p-8 rounded-lg shadow-inner">
        <div
          ref={exportRef}
          className="bg-white shadow-lg mx-auto"
          style={{
            maxWidth: '210mm',
            minHeight: '297mm',
          }}
        >
          <Suspense fallback={<LoadingTemplate />}>
            <TemplateComponent data={data} />
          </Suspense>
        </div>
      </div>

      {/* Instrucciones para impresión */}
      <div className="text-center text-sm text-gray-500 no-print">
        <p>
          Para mejor calidad de impresión, usa el botón "Descargar PDF" o configura tu navegador
          para eliminar márgenes e imprimir fondos.
        </p>
      </div>
    </div>
  );
}
