# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Soporte para colores hexadecimales en exportación PDF
- Conversión automática de OKLCH a hex para compatibilidad con jsPDF

### Fixed

- Error "Attempting to parse an unsupported color function 'oklch'" al exportar PDF

## [1.0.0] - 2025-02-14

### Added

- Lanzamiento inicial del Generador de CV ATS-Friendly
- Dos plantillas: ATS-Friendly y Harvard Style
- Formularios completos: información personal, experiencia, educación, habilidades, idiomas
- Exportación PDF dual: client-side (html2canvas + jsPDF) y server-side (Playwright)
- Validación con Zod para formularios
- Persistencia en localStorage
- Import/Export JSON de datos
- Tests unitarios con Vitest (13 tests)
- CI/CD con GitHub Actions
- TypeScript en modo estricto
- Tailwind CSS v4 con integración Vite-first
- Accesibilidad WCAG 2.1 compliant

### Features

- Vista previa en vivo del currículum
- Cambio dinámico de plantillas
- Editor de experiencia laboral con CRUD completo
- Editor de educación con CRUD completo
- Gestor de habilidades con niveles
- Gestor de idiomas con niveles
- Exportación a PDF desde navegador
- Impresión optimizada del CV

### Technical

- React 18 con TypeScript
- Vite 5 como build tool
- Zustand para state management
- React Hook Form para formularios
- ESLint + Prettier para calidad de código
- Conventional commits

[Unreleased]: https://github.com/tu-usuario/generador-cv-ats/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/tu-usuario/generador-cv-ats/releases/tag/v1.0.0
