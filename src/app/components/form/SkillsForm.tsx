import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { Select } from '@/app/components/ui/Select';
import { Button } from '@/app/components/ui/Button';

import { skillSchema, SkillFormData } from '@/utils/validation';
import { useResumeStore } from '@/app/store/resumeStore';
import { Plus, Trash2 } from 'lucide-react';

/**
 * Formulario de Habilidades
 *
 * Gestiona las competencias técnicas y blandas:
 * - Nombre de la habilidad
 * - Nivel de competencia (principiante a experto)
 * - Categoría opcional
 *
 * Visualización en tags con badges de nivel
 */

const skillLevels = [
  { value: 'principiante', label: 'Principiante' },
  { value: 'intermedio', label: 'Intermedio' },
  { value: 'avanzado', label: 'Avanzado' },
  { value: 'experto', label: 'Experto' },
];

const skillLevelColors: Record<string, string> = {
  principiante: 'bg-gray-100 text-gray-700',
  intermedio: 'bg-blue-100 text-blue-700',
  avanzado: 'bg-purple-100 text-purple-700',
  experto: 'bg-green-100 text-green-700',
};

export function SkillsForm() {
  const { data, addSkill, removeSkill } = useResumeStore();
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    mode: 'onBlur',
  });

  const onSubmit = (formData: SkillFormData) => {
    addSkill({
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
    <Card title="Habilidades" subtitle="Tus competencias técnicas y profesionales">
      {/* Lista de habilidades */}
      {data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {data.skills.map((skill) => (
            <div
              key={skill.id}
              className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${skillLevelColors[skill.level]}
              `}
            >
              <span>{skill.name}</span>
              <span className="mx-2 opacity-50">·</span>
              <span className="capitalize text-xs">{skill.level}</span>
              <button
                onClick={() => removeSkill(skill.id)}
                className="ml-2 hover:opacity-70"
                aria-label={`Eliminar ${skill.name}`}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Formulario */}
      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register('name')}
              label="Habilidad"
              placeholder="Ej: React, Python, Gestión de equipos"
              error={errors.name?.message}
              required
            />
            <Select
              {...register('level')}
              label="Nivel"
              options={skillLevels}
              error={errors.level?.message}
              required
            />
          </div>

          <Input
            {...register('category')}
            label="Categoría (opcional)"
            placeholder="Ej: Frontend, Backend, Soft Skills"
            error={errors.category?.message}
          />

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Añadir habilidad
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="outline" onClick={() => setShowForm(true)} fullWidth>
          <Plus className="mr-2 h-4 w-4" />
          Añadir habilidad
        </Button>
      )}
    </Card>
  );
}
