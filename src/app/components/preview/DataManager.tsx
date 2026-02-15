import { useState } from 'react';
import { useResumeStore } from '@/app/store/resumeStore';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Download, Upload, FileJson, RotateCcw } from 'lucide-react';

/**
 * Componente para exportar/importar datos del currículum
 *
 * Permite:
 * - Exportar datos a JSON (backup/portabilidad)
 * - Importar datos desde JSON
 * - Resetear a valores por defecto
 *
 * Útil para:
 * - Hacer backup del progreso
 * - Compartir configuraciones entre dispositivos
 * - Migrar datos
 */

export function DataManager() {
  const { data, loadData, resetData } = useResumeStore();
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExportJSON = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${data.personalInfo.fullName.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);

        // Validación básica de estructura
        if (!parsedData.personalInfo || !parsedData.experience || !parsedData.education) {
          throw new Error('El archivo no tiene la estructura correcta de un currículum');
        }

        loadData(parsedData);
        setImportSuccess(true);
        setImportError(null);

        setTimeout(() => setImportSuccess(false), 3000);
      } catch (error) {
        setImportError(error instanceof Error ? error.message : 'Error al importar el archivo');
        setImportSuccess(false);
      }
    };

    reader.onerror = () => {
      setImportError('Error al leer el archivo');
    };

    reader.readAsText(file);

    // Limpiar input para permitir reimportar el mismo archivo
    event.target.value = '';
  };

  const handleReset = () => {
    if (
      confirm(
        '¿Estás seguro de que quieres resetear todos los datos? Esta acción no se puede deshacer.'
      )
    ) {
      resetData();
    }
  };

  return (
    <Card title="Gestión de Datos" subtitle="Exporta, importa o resetea tu información">
      <div className="space-y-4">
        {/* Exportar JSON */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Download className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Exportar a JSON</p>
              <p className="text-sm text-gray-500">Descarga tu currículum como archivo JSON</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleExportJSON}>
            <FileJson className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        {/* Importar JSON */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Upload className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Importar desde JSON</p>
              <p className="text-sm text-gray-500">Carga un currículum previamente exportado</p>
            </div>
          </div>
          <label className="cursor-pointer inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            <FileJson className="mr-2 h-4 w-4" />
            Importar
          </label>
        </div>

        {/* Mensajes de estado */}
        {importError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {importError}
          </div>
        )}
        {importSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            ✅ Datos importados correctamente
          </div>
        )}

        {/* Resetear datos */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <RotateCcw className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Resetear datos</p>
              <p className="text-sm text-gray-500">Vuelve a los valores por defecto</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Resetear
          </Button>
        </div>
      </div>
    </Card>
  );
}
