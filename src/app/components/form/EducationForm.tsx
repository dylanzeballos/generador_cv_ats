import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { Checkbox } from '@/app/components/ui/Checkbox';
import { Button } from '@/app/components/ui/Button';
import { IconButton } from '@/app/components/ui/IconButton';
import { educationSchema, EducationFormData } from '@/utils/validation';
import { useResumeStore } from '@/app/store/resumeStore';
import { Plus, Trash2, Edit2 } from 'lucide-react';

/**
 * Formulario de Educación
 *
 * Gestiona la formación académica:
 * - Institución y título
 * - Campo de estudio
 * - Fechas de inicio/fin
 * - GPA / Nota media
 *
 * Soporta múltiples registros educativos
 */

export function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    mode: 'onBlur',
  });

  const isCurrent = watch('current');

  const onSubmit = (formData: EducationFormData) => {
    if (editingId) {
      updateEducation(editingId, formData);
      setEditingId(null);
    } else {
      addEducation({
        ...formData,
        id: crypto.randomUUID(),
      });
    }
    reset();
    setShowForm(false);
  };

  const handleEdit = (edu: EducationFormData & { id: string }) => {
    reset(edu);
    setEditingId(edu.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta formación?')) {
      removeEducation(id);
    }
  };

  return (
    <Card
      title="Educación"
      subtitle="Tu formación académica y certificaciones"
      footer={
        !showForm && (
          <Button variant="outline" onClick={() => setShowForm(true)} fullWidth>
            <Plus className="mr-2 h-4 w-4" />
            Añadir formación
          </Button>
        )
      }
    >
      {/* Lista de educación */}
      {data.education.length > 0 && (
        <div className="space-y-4 mb-6">
          {data.education.map((edu) => (
            <div
              key={edu.id}
              className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.field && <p className="text-sm text-gray-500">{edu.field}</p>}
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.current ? 'Actual' : edu.endDate}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <IconButton
                    icon={<Edit2 className="h-4 w-4" />}
                    label="Editar"
                    size="sm"
                    onClick={() => handleEdit(edu)}
                  />
                  <IconButton
                    icon={<Trash2 className="h-4 w-4" />}
                    label="Eliminar"
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(edu.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulario */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t pt-4">
          <h4 className="font-medium text-gray-900">
            {editingId ? 'Editar formación' : 'Nueva formación'}
          </h4>

          <Input
            {...register('institution')}
            label="Institución"
            placeholder="Universidad, escuela, o plataforma"
            error={errors.institution?.message}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register('degree')}
              label="Título / Certificación"
              placeholder="Ej: Grado en Ingeniería"
              error={errors.degree?.message}
              required
            />
            <Input
              {...register('field')}
              label="Campo de estudio (opcional)"
              placeholder="Ej: Computación"
              error={errors.field?.message}
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

          <Checkbox {...register('current')} label="Actualmente estudiando" />

          <Input
            {...register('gpa')}
            label="GPA / Nota media (opcional)"
            placeholder="Ej: 8.5/10"
            error={errors.gpa?.message}
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
