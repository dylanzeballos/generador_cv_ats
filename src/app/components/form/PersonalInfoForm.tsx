import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/Textarea';
import { Button } from '@/app/components/ui/Button';
import { personalInfoSchema, PersonalInfoFormData } from '@/utils/validation';
import { useResumeStore } from '@/app/store/resumeStore';

/**
 * Formulario de Información Personal
 *
 * Gestiona los datos básicos del candidato:
 * - Nombre completo
 * - Información de contacto (email, teléfono, ubicación)
 * - Perfiles profesionales (LinkedIn, website)
 * - Resumen profesional
 *
 * Características:
 * - Validación en tiempo real con Zod
 * - Autosave automático al store
 * - Mensajes de error accesibles
 */

export function PersonalInfoForm() {
  const { data, setPersonalInfo } = useResumeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data.personalInfo,
    mode: 'onBlur',
  });

  // Watch para mostrar contador de caracteres en el resumen
  const summaryValue = watch('summary') || '';
  const summaryLength = summaryValue.length;

  const onSubmit = (formData: PersonalInfoFormData) => {
    setPersonalInfo(formData);
  };

  return (
    <Card title="Información Personal" subtitle="Datos básicos de contacto y perfil profesional">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre completo */}
        <Input
          {...register('fullName')}
          label="Nombre completo"
          placeholder="Ej: María González López"
          error={errors.fullName?.message}
          required
        />

        {/* Email y Teléfono */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register('email')}
            label="Correo electrónico"
            type="email"
            placeholder="maria@email.com"
            error={errors.email?.message}
            required
          />
          <Input
            {...register('phone')}
            label="Teléfono"
            type="tel"
            placeholder="+34 612 345 678"
            error={errors.phone?.message}
            required
          />
        </div>

        {/* Ubicación */}
        <Input
          {...register('location')}
          label="Ubicación"
          placeholder="Madrid, España"
          error={errors.location?.message}
          required
        />

        {/* LinkedIn y Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register('linkedin')}
            label="LinkedIn (opcional)"
            type="url"
            placeholder="https://linkedin.com/in/tuperfil"
            error={errors.linkedin?.message}
          />
          <Input
            {...register('website')}
            label="Sitio web / Portfolio (opcional)"
            type="url"
            placeholder="https://tuwebsite.com"
            error={errors.website?.message}
          />
        </div>

        {/* Resumen profesional */}
        <div>
          <Textarea
            {...register('summary')}
            label="Resumen profesional"
            placeholder="Escribe un breve resumen sobre tu experiencia y objetivos profesionales..."
            error={errors.summary?.message}
            helperText={`${summaryLength}/1000 caracteres. Recomendado: 150-300 caracteres.`}
            rows={5}
          />
        </div>

        {/* Botón guardar */}
        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Guardar cambios
          </Button>
        </div>
      </form>
    </Card>
  );
}
