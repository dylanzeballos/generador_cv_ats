import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/app/components/ui/Card';
import { Select } from '@/app/components/ui/Select';
import { Button } from '@/app/components/ui/Button';
import { IconButton } from '@/app/components/ui/IconButton';
import { languageSchema, LanguageFormData } from '@/utils/validation';
import { useResumeStore } from '@/app/store/resumeStore';
import { Plus, Trash2, Globe } from 'lucide-react';

/**
 * Formulario de Idiomas
 *
 * Gestiona los idiomas que dominas:
 * - Nombre del idioma (desde lista predefinida)
 * - Nivel de competencia (básico a nativo)
 *
 * Visualización con indicadores visuales
 */

const languageLevels = [
  { value: 'básico', label: 'Básico' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'avanzado', label: 'Avanzado' },
  { value: 'nativo', label: 'Nativo' },
];

const commonLanguages = [
  { value: 'Español', label: 'Español' },
  { value: 'Inglés', label: 'Inglés' },
  { value: 'Francés', label: 'Francés' },
  { value: 'Alemán', label: 'Alemán' },
  { value: 'Italiano', label: 'Italiano' },
  { value: 'Portugués', label: 'Portugués' },
  { value: 'Chino', label: 'Chino' },
  { value: 'Japonés', label: 'Japonés' },
  { value: 'Árabe', label: 'Árabe' },
  { value: 'Ruso', label: 'Ruso' },
];

const levelIndicators: Record<string, string> = {
  básico: '●○○○',
  intermedio: '●●○○',
  avanzado: '●●●○',
  nativo: '●●●●',
};

export function LanguagesForm() {
  const { data, addLanguage, removeLanguage } = useResumeStore();
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LanguageFormData>({
    resolver: zodResolver(languageSchema),
    mode: 'onBlur',
  });

  const onSubmit = (formData: LanguageFormData) => {
    addLanguage({
      ...formData,
      id: crypto.randomUUID(),
    });
    reset();
    setShowForm(false);
  };

  const handleCancel = () => {
    reset();
    setShowForm(false);
  };

  return (
    <Card title="Idiomas" subtitle="Idiomas que dominas y tu nivel de competencia">
      {/* Lista de idiomas */}
      {data.languages.length > 0 && (
        <div className="space-y-2 mb-6">
          {data.languages.map((lang) => (
            <div
              key={lang.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-900">{lang.name}</span>
                <span className="text-gray-500 text-sm" aria-hidden="true">
                  {levelIndicators[lang.level]}
                </span>
                <span className="text-sm text-gray-600 capitalize">{lang.level}</span>
              </div>
              <IconButton
                icon={<Trash2 className="h-4 w-4" />}
                label={`Eliminar ${lang.name}`}
                variant="ghost"
                size="sm"
                onClick={() => removeLanguage(lang.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Formulario */}
      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              {...register('name')}
              label="Idioma"
              options={commonLanguages}
              error={errors.name?.message}
              required
            />
            <Select
              {...register('level')}
              label="Nivel"
              options={languageLevels}
              error={errors.level?.message}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Añadir idioma
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="outline" onClick={() => setShowForm(true)} fullWidth>
          <Plus className="mr-2 h-4 w-4" />
          Añadir idioma
        </Button>
      )}
    </Card>
  );
}
