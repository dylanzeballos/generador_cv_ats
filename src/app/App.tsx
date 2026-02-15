import { useState } from 'react';
import { PersonalInfoForm } from './components/form/PersonalInfoForm';
import { ExperienceForm } from './components/form/ExperienceForm';
import { EducationForm } from './components/form/EducationForm';
import { SkillsForm } from './components/form/SkillsForm';
import { LanguagesForm } from './components/form/LanguagesForm';
import { PreviewPanel } from './components/preview/PreviewPanel';
import { TemplateSelector } from './components/preview/TemplateSelector';
import { DataManager } from './components/preview/DataManager';
import { useResumeStore } from './store/resumeStore';
import { Tabs, Tab } from './components/ui/Tabs';

/**
 * Componente principal de la aplicación
 *
 * Estructura:
 * - Header con navegación
 * - Layout de dos columnas:
 *   - Izquierda: Formularios y configuración
 *   - Derecha: Vista previa en vivo
 * - Responsive: apilado en móviles
 */

export default function App() {
  const [activeTab, setActiveTab] = useState('edit');
  const { isDirty } = useResumeStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Generador de CV</h1>
                <p className="text-xs text-gray-500">ATS-Friendly</p>
              </div>
            </div>

            {isDirty && (
              <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                Cambios sin guardar
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Tabs para móvil */}
      <div className="lg:hidden bg-white border-b border-gray-200">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tab value="edit">Editar</Tab>
          <Tab value="preview">Vista Previa</Tab>
        </Tabs>
      </div>

      {/* Contenido principal */}
      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel izquierdo: Formularios */}
          <div className={`space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            {/* Selector de plantilla */}
            <TemplateSelector />

            {/* Información personal */}
            <PersonalInfoForm />

            {/* Experiencia laboral */}
            <ExperienceForm />

            {/* Educación */}
            <EducationForm />

            {/* Habilidades */}
            <SkillsForm />

            {/* Idiomas */}
            <LanguagesForm />

            {/* Gestión de datos */}
            <DataManager />
          </div>

          {/* Panel derecho: Vista previa */}
          <div className={`${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-24">
              <PreviewPanel />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Generador de Currículums ATS-Friendly • Creado con React + TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}
