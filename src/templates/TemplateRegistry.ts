/**
 * Registro de plantillas disponibles
 *
 * Sistema de registro que permite:
 * - Carga lazy de plantillas para optimizar bundle
 * - Registro dinámico de nuevas plantillas
 * - Metadatos de cada plantilla (nombre, descripción, preview)
 */

import { lazy, ComponentType } from 'react';
import type { ResumeData } from '@/app/types/resume';

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  component: () => Promise<{ default: ComponentType<{ data: ResumeData }> }>;
  tags: string[];
  idealFor: string[];
}

// Registro de plantillas disponibles
export const templateRegistry: Record<string, TemplateDefinition> = {
  ATS: {
    id: 'ATS',
    name: 'ATS-Friendly',
    description:
      'Diseño limpio y simple optimizado para sistemas de seguimiento de candidatos. Sin elementos que puedan confundir los parsers.',
    component: () => import('@/templates/ATS/ATS'),
    tags: ['ats', 'minimalista', 'corporativo', 'parser-friendly'],
    idealFor: [
      'Aplicaciones a grandes corporaciones',
      'Sector público',
      'Posiciones donde el ATS filtra primero',
      'Empresas con procesos de selección automatizados',
    ],
  },
  Harvard: {
    id: 'Harvard',
    name: 'Harvard Style',
    description:
      'Diseño elegante inspirado en el formato de Harvard Business School. Tipografía serif sofisticada y énfasis en logros.',
    component: () => import('@/templates/Harvard/Harvard'),
    tags: ['elegante', 'ejecutivo', 'consultoría', 'mba'],
    idealFor: [
      'Sector financiero y consultoría',
      'Posiciones ejecutivas',
      'Profesionales con MBA',
      'Mercado anglosajón',
    ],
  },
};

/**
 * Obtiene la definición de una plantilla por su ID
 */
export function getTemplateDefinition(templateId: string): TemplateDefinition | undefined {
  return templateRegistry[templateId];
}

/**
 * Carga lazy del componente de una plantilla
 */
export function loadTemplateComponent(templateId: string) {
  const template = templateRegistry[templateId];
  if (!template) {
    throw new Error(`Plantilla "${templateId}" no encontrada`);
  }
  return lazy(template.component);
}

/**
 * Obtiene todas las plantillas disponibles
 */
export function getAllTemplates(): TemplateDefinition[] {
  return Object.values(templateRegistry);
}

/**
 * Verifica si una plantilla existe
 */
export function templateExists(templateId: string): boolean {
  return templateId in templateRegistry;
}

/**
 * Registra una nueva plantilla dinámicamente
 * Útil para extender el sistema con plantillas personalizadas
 */
export function registerTemplate(template: TemplateDefinition): void {
  if (templateRegistry[template.id]) {
    console.warn(`La plantilla "${template.id}" ya existe y será sobrescrita`);
  }
  templateRegistry[template.id] = template;
}
