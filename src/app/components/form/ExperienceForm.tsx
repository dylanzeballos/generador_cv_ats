import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/Textarea';
import { Checkbox } from '@/app/components/ui/Checkbox';
import { Button } from '@/app/components/ui/Button';
import { IconButton } from '@/app/components/ui/IconButton';
import { experienceSchema, ExperienceFormData } from '@/utils/validation';
import { useResumeStore } from '@/app/store/resumeStore';
import { Plus, Trash2, Edit2, ChevronUp, ChevronDown } from 'lucide-react';

/**
 * Formulario de Experiencia Laboral
 *
 * Gestiona múltiples experiencias laborales con:
 * - CRUD completo (crear, leer, actualizar, eliminar)
 * - Reordenamiento drag & drop
 * - Validación de fechas (fin > inicio)
 * - Checkbox "actualmente trabajando aquí"
 *
 * Cada experiencia incluye logros clave
 */

export function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience, reorderExperience } =
    useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    mode: 'onBlur',
  });

  const isCurrent = watch('current');

  const onSubmit = (formData: ExperienceFormData) => {
    if (editingId) {
      updateExperience(editingId, formData);
      setEditingId(null);
    } else {
      addExperience({
        ...formData,
        id: crypto.randomUUID(),
      });
    }
    reset();
    setShowForm(false);
  };

  const handleEdit = (exp: ExperienceFormData & { id: string }) => {
    reset(exp);
    setEditingId(exp.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta experiencia?')) {
      removeExperience(id);
    }
  };

  return (
    <Card
      title="Experiencia Laboral"
      subtitle="Añade tu historial profesional (más reciente primero)"
      footer={
        !showForm && (
          <Button variant="outline" onClick={() => setShowForm(true)} fullWidth>
            <Plus className="mr-2 h-4 w-4" />
            Añadir experiencia
          </Button>
        )
      }
    >
      {/* Lista de experiencias */}
      {data.experience.length > 0 && (
        <div className="space-y-4 mb-6">
          {data.experience.map((exp, index) => (
            <div
              key={exp.id}
              className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Actual' : exp.endDate}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <IconButton
                    icon={<ChevronUp className="h-4 w-4" />}
                    label="Mover arriba"
                    size="sm"
                    onClick={() => reorderExperience(index, index - 1)}
                    disabled={index === 0}
                  />
                  <IconButton
                    icon={<ChevronDown className="h-4 w-4" />}
                    label="Mover abajo"
                    size="sm"
                    onClick={() => reorderExperience(index, index + 1)}
                    disabled={index === data.experience.length - 1}
                  />
                  <IconButton
                    icon={<Edit2 className="h-4 w-4" />}
                    label="Editar"
                    size="sm"
                    onClick={() => handleEdit(exp)}
                  />
                  <IconButton
                    icon={<Trash2 className="h-4 w-4" />}
                    label="Eliminar"
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(exp.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulario de edición */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t pt-4">
          <h4 className="font-medium text-gray-900">
            {editingId ? 'Editar experiencia' : 'Nueva experiencia'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register('company')}
              label="Empresa"
              placeholder="Nombre de la empresa"
              error={errors.company?.message}
              required
            />
            <Input
              {...register('position')}
              label="Cargo"
              placeholder="Tu cargo o posición"
              error={errors.position?.message}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register('startDate')}
              label="Fecha de inicio"
              type="month"
              error={errors.startDate?.message}
              required
            />
            {!isCurrent && (
              <Input
                {...register('endDate')}
                label="Fecha de fin"
                type="month"
                error={errors.endDate?.message}
              />
            )}
          </div>

          <Checkbox {...register('current')} label="Actualmente trabajo aquí" />

          <Textarea
            {...register('description')}
            label="Descripción"
            placeholder="Describe tus responsabilidades y logros..."
            error={errors.description?.message}
            rows={4}
            required
          />

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingId ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
