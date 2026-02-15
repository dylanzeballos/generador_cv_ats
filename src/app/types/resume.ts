/**
 * Tipos TypeScript para el generador de currículums
 * Define la estructura de datos completa del currículum
 */

// Información personal
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary?: string;
}

// Experiencia laboral
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements?: string[];
}

// Educación
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  graduationDate?: string;
  gpa?: string;
}

// Habilidades
export interface Skill {
  id: string;
  name: string;
  level: 'principiante' | 'intermedio' | 'avanzado' | 'experto';
  category?: string;
}

// Idiomas
export interface Language {
  id: string;
  name: string;
  level: 'básico' | 'intermedio' | 'avanzado' | 'nativo';
}

// Enlaces adicionales
export interface Link {
  id: string;
  title: string;
  url: string;
}

// Sección personalizada
export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

// Datos completos del currículum
export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  links: Link[];
  customSections: CustomSection[];
}

// Estado del store
export interface ResumeState {
  data: ResumeData;
  selectedTemplate: 'ATS' | 'Harvard';
  isDirty: boolean;
}

// Plantilla disponible
export interface Template {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<{ data: ResumeData }>;
}
