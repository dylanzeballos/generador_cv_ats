import { z } from 'zod';

/**
 * Schemas de validación con Zod para el formulario de currículum
 * Proporcionan validación tipada y mensajes de error personalizados
 */

// Schema para información personal
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z
    .string()
    .email('Ingresa un correo electrónico válido')
    .min(1, 'El correo electrónico es requerido'),
  phone: z
    .string()
    .min(8, 'Ingresa un número de teléfono válido')
    .regex(/^[\d\s+\-()]+$/, 'Formato de teléfono inválido'),
  location: z.string().min(2, 'La ubicación es requerida'),
  linkedin: z.string().url('Ingresa una URL válida de LinkedIn').optional().or(z.literal('')),
  website: z.string().url('Ingresa una URL válida').optional().or(z.literal('')),
  summary: z.string().max(1000, 'El resumen no puede exceder 1000 caracteres').optional(),
});

// Schema para experiencia laboral
export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'El nombre de la empresa es requerido'),
  position: z.string().min(1, 'El cargo es requerido'),
  startDate: z.string().min(1, 'La fecha de inicio es requerida'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres'),
  achievements: z.array(z.string()).optional(),
});

// Schema para educación
export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'La institución es requerida'),
  degree: z.string().min(1, 'El título es requerido'),
  field: z.string().optional(),
  startDate: z.string().min(1, 'La fecha de inicio es requerida'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  graduationDate: z.string().optional(),
  gpa: z.string().optional(),
});

// Schema para habilidades
export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'El nombre de la habilidad es requerido'),
  level: z.enum(['principiante', 'intermedio', 'avanzado', 'experto']),
  category: z.string().optional(),
});

// Schema para idiomas
export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'El nombre del idioma es requerido'),
  level: z.enum(['básico', 'intermedio', 'avanzado', 'nativo']),
});

// Schema para enlaces
export const linkSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'El título es requerido'),
  url: z.string().url('Ingresa una URL válida'),
});

// Schema para sección personalizada
export const customSectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'El título es requerido'),
  content: z.string().min(1, 'El contenido es requerido'),
});

// Schema completo del currículum
export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  languages: z.array(languageSchema),
  links: z.array(linkSchema),
  customSections: z.array(customSectionSchema),
});

// Tipos inferidos de los schemas
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type SkillFormData = z.infer<typeof skillSchema>;
export type LanguageFormData = z.infer<typeof languageSchema>;
export type LinkFormData = z.infer<typeof linkSchema>;
export type CustomSectionFormData = z.infer<typeof customSectionSchema>;
export type ResumeFormData = z.infer<typeof resumeDataSchema>;
