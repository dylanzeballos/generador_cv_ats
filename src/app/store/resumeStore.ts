import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, ResumeState } from '@/app/types/resume';

/**
 * Datos iniciales de ejemplo para el currículum
 * Se utilizan como valores por defecto y para demostración
 */
const initialData: ResumeData = {
  personalInfo: {
    fullName: 'María González López',
    email: 'maria.gonzalez@email.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    linkedin: 'https://linkedin.com/in/mariagonzalez',
    website: 'https://mariagonzalez.dev',
    summary:
      'Desarrolladora Full Stack con más de 5 años de experiencia en desarrollo web. Especializada en React, TypeScript y Node.js. Apasionada por crear experiencias de usuario excepcionales y código limpio. Líder técnica con experiencia en gestión de equipos ágiles.',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Madrid',
      position: 'Senior Frontend Developer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description:
        'Lidero un equipo de 5 desarrolladores frontend en proyectos de e-commerce. Implemento arquitecturas escalables con React y TypeScript. Reduje el tiempo de carga de la aplicación en un 40% mediante optimizaciones de rendimiento.',
      achievements: [
        'Migración exitosa de aplicación legacy a React 18',
        'Implementación de CI/CD que redujo deployment time en 60%',
        'Mentoring de 3 desarrolladores junior',
      ],
    },
    {
      id: '2',
      company: 'Startup Innovadora',
      position: 'Full Stack Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description:
        'Desarrollé aplicaciones web desde cero usando React, Node.js y PostgreSQL. Colaboré estrechamente con diseñadores UX para implementar interfaces intuitivas. Participé en todas las fases del desarrollo ágil.',
      achievements: [
        'Desarrollo de MVP que consiguió 100K usuarios en 6 meses',
        'Integración de pasarela de pagos con Stripe',
      ],
    },
    {
      id: '3',
      company: 'Agencia Digital Creativa',
      position: 'Junior Web Developer',
      startDate: '2019-06',
      endDate: '2020-02',
      current: false,
      description:
        'Desarrollo de sitios web responsivos para clientes diversos. Maquetación HTML/CSS semántica y accesible. Optimización SEO y performance.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Universidad Complutense de Madrid',
      degree: 'Grado en Ingeniería Informática',
      field: 'Computación',
      startDate: '2015-09',
      endDate: '2019-06',
      current: false,
      graduationDate: 'Junio 2019',
      gpa: '8.5/10',
    },
    {
      id: '2',
      institution: 'Ironhack Madrid',
      degree: 'Bootcamp Web Development',
      field: 'Desarrollo Web Full Stack',
      startDate: '2019-01',
      endDate: '2019-04',
      current: false,
      graduationDate: 'Abril 2019',
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 'experto', category: 'Frontend' },
    { id: '2', name: 'TypeScript', level: 'experto', category: 'Lenguajes' },
    { id: '3', name: 'Node.js', level: 'avanzado', category: 'Backend' },
    { id: '4', name: 'PostgreSQL', level: 'avanzado', category: 'Bases de Datos' },
    { id: '5', name: 'AWS', level: 'intermedio', category: 'Cloud' },
    { id: '6', name: 'Docker', level: 'intermedio', category: 'DevOps' },
    { id: '7', name: 'Git', level: 'avanzado', category: 'Herramientas' },
    { id: '8', name: 'Figma', level: 'intermedio', category: 'Diseño' },
  ],
  languages: [
    { id: '1', name: 'Español', level: 'nativo' },
    { id: '2', name: 'Inglés', level: 'avanzado' },
    { id: '3', name: 'Francés', level: 'intermedio' },
  ],
  links: [
    { id: '1', title: 'GitHub', url: 'https://github.com/mariagonzalez' },
    { id: '2', title: 'Portfolio', url: 'https://mariagonzalez.dev' },
  ],
  customSections: [],
};

/**
 * Store global de Zustand para gestionar el estado del currículum
 *
 * Características:
 * - Persistencia en localStorage
 * - Gestión de datos del currículum
 * - Selección de plantilla
 * - Import/Export de datos
 * - Historial de cambios (isDirty flag)
 */
interface ResumeStore extends ResumeState {
  // Actions para datos personales
  setPersonalInfo: (info: ResumeData['personalInfo']) => void;

  // Actions para experiencia
  addExperience: (exp: ResumeData['experience'][0]) => void;
  updateExperience: (id: string, exp: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;

  // Actions para educación
  addEducation: (edu: ResumeData['education'][0]) => void;
  updateEducation: (id: string, edu: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;

  // Actions para habilidades
  addSkill: (skill: ResumeData['skills'][0]) => void;
  removeSkill: (id: string) => void;

  // Actions para idiomas
  addLanguage: (lang: ResumeData['languages'][0]) => void;
  removeLanguage: (id: string) => void;

  // Actions para plantilla
  setTemplate: (template: ResumeState['selectedTemplate']) => void;

  // Actions globales
  resetData: () => void;
  loadData: (data: ResumeData) => void;
  exportData: () => string;
  setDirty: (dirty: boolean) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      data: initialData,
      selectedTemplate: 'ATS',
      isDirty: false,

      // Actualizar información personal
      setPersonalInfo: (info) =>
        set((state) => ({
          data: { ...state.data, personalInfo: info },
          isDirty: true,
        })),

      // Experiencia laboral
      addExperience: (exp) =>
        set((state) => ({
          data: { ...state.data, experience: [...state.data.experience, exp] },
          isDirty: true,
        })),

      updateExperience: (id, exp) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
          },
          isDirty: true,
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((e) => e.id !== id),
          },
          isDirty: true,
        })),

      reorderExperience: (fromIndex, toIndex) =>
        set((state) => {
          const exp = [...state.data.experience];
          const [removed] = exp.splice(fromIndex, 1);
          exp.splice(toIndex, 0, removed);
          return { data: { ...state.data, experience: exp }, isDirty: true };
        }),

      // Educación
      addEducation: (edu) =>
        set((state) => ({
          data: { ...state.data, education: [...state.data.education, edu] },
          isDirty: true,
        })),

      updateEducation: (id, edu) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
          },
          isDirty: true,
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((e) => e.id !== id),
          },
          isDirty: true,
        })),

      // Habilidades
      addSkill: (skill) =>
        set((state) => ({
          data: { ...state.data, skills: [...state.data.skills, skill] },
          isDirty: true,
        })),

      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((s) => s.id !== id),
          },
          isDirty: true,
        })),

      // Idiomas
      addLanguage: (lang) =>
        set((state) => ({
          data: { ...state.data, languages: [...state.data.languages, lang] },
          isDirty: true,
        })),

      removeLanguage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.filter((l) => l.id !== id),
          },
          isDirty: true,
        })),

      // Plantilla
      setTemplate: (template) => set({ selectedTemplate: template }),

      // Reset y carga de datos
      resetData: () => set({ data: initialData, isDirty: false }),

      loadData: (data) => set({ data, isDirty: false }),

      exportData: () => JSON.stringify(get().data, null, 2),

      setDirty: (dirty) => set({ isDirty: dirty }),
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({ data: state.data, selectedTemplate: state.selectedTemplate }),
    }
  )
);
