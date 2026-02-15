import { useResumeStore } from '@/app/store/resumeStore';
import { Card } from '@/app/components/ui/Card';
import { getAllTemplates } from '@/templates/TemplateRegistry';
import { Check, FileText, GraduationCap } from 'lucide-react';

/**
 * Selector de plantillas
 *
 * Muestra todas las plantillas disponibles con:
 * - Preview/descripción de cada una
 * - Casos de uso ideales
 * - Indicador de plantilla seleccionada
 * - Tags para filtrado
 */

export function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useResumeStore();
  const templates = getAllTemplates();

  return (
    <Card
      title="Seleccionar Plantilla"
      subtitle="Elige el diseño que mejor se adapte a tu objetivo profesional"
    >
      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setTemplate(template.id as 'ATS' | 'Harvard')}
            className={`
              relative border-2 rounded-xl p-4 cursor-pointer transition-all
              hover:shadow-md
              ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }
            `}
            role="radio"
            aria-checked={selectedTemplate === template.id}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setTemplate(template.id as 'ATS' | 'Harvard');
              }
            }}
          >
            {/* Indicador de selección */}
            {selectedTemplate === template.id && (
              <div className="absolute top-4 right-4">
                <div className="bg-blue-500 text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              </div>
            )}

            {/* Icono y nombre */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className={`
                p-2 rounded-lg
                ${selectedTemplate === template.id ? 'bg-blue-100' : 'bg-gray-100'}
              `}
              >
                {template.id === 'ATS' ? (
                  <FileText className="h-6 w-6 text-gray-600" />
                ) : (
                  <GraduationCap className="h-6 w-6 text-gray-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className={`
                    text-xs px-2 py-1 rounded-full capitalize
                    ${
                      selectedTemplate === template.id
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-100 text-gray-600'
                    }
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Casos de uso ideales */}
            <div className="text-sm">
              <p className="font-medium text-gray-700 mb-1">Ideal para:</p>
              <ul className="text-gray-600 space-y-0.5">
                {template.idealFor.slice(0, 2).map((use, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
