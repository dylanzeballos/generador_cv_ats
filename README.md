# Generador de Currículums ATS-Friendly

Aplicación web moderna para crear currículums optimizados para sistemas de seguimiento de candidatos (ATS). Desarrollada con React, TypeScript, Tailwind CSS v4 y Vite.

## Características

### Funcionalidades Principales

- **Editor en tiempo real**: Modifica tu CV y ve los cambios instantáneamente
- **Múltiples plantillas**: ATS-Friendly y Harvard Style
- **Exportación a PDF**: Client-side (rápido) y server-side (alta calidad)
- **Persistencia local**: Guarda automáticamente en localStorage
- **Import/Export JSON**: Portabilidad de datos entre dispositivos
- **Validación completa**: Formularios con validación en tiempo real
- **Diseño responsive**: Funciona en desktop, tablet y móvil

### Plantillas Disponibles

#### ATS-Friendly

- Diseño limpio y simple
- Optimizado para parsers ATS
- Sin elementos que confundan sistemas automatizados
- Ideal para grandes corporaciones y sector público

#### Harvard Style

- Tipografía elegante (serif)
- Enfoque en logros cuantificables
- Diseño profesional estilo MBA
- Ideal para consultoría y finanzas

## Tecnologías

- **Frontend**: React 18 + TypeScript 5
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS v4 (Vite-first, sin PostCSS)
- **State Management**: Zustand + persist middleware
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + React Testing Library
- **PDF Export**:
  - Client-side: html2canvas + jsPDF
  - Server-side: Playwright
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions

## Instalación

### Requisitos previos

- Node.js 20+
- npm o pnpm

### Pasos de instalación

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd generador-cv-ats

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno (opcional)
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo
npm run build           # Build para producción
npm run preview         # Previsualiza build de producción

# Calidad de código
npm run lint            # Ejecuta ESLint
npm run lint:fix        # Arregla problemas de ESLint
npm run format          # Formatea código con Prettier
npm run typecheck       # Verifica tipos con TypeScript

# Testing
npm run test            # Ejecuta tests en modo watch
npm run test:coverage   # Ejecuta tests con cobertura
npm run test:ui         # Ejecuta tests con UI de Vitest

# Exportación PDF
npm run export:pdf      # Exporta PDF con Playwright
```

## Uso

### Desarrollo local

1. Ejecuta `npm run dev`
2. Abre tu navegador en `http://localhost:5173`
3. Completa los formularios con tu información
4. Selecciona la plantilla que prefieras
5. Descarga tu CV en PDF

### Exportar PDF (Client-side)

- Haz clic en "Descargar PDF" en el panel de vista previa
- El PDF se genera instantáneamente en tu navegador

### Exportar PDF (Server-side - alta calidad)

```bash
# Build primero
npm run build

# Exportar PDF
npm run export:pdf ATS ./ruta/a/tus/datos.json ./salida.pdf

# Opciones adicionales
npm run export:pdf Harvard ./data.json ./cv.pdf --format=Letter --margin=15,15,15,15
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── form/          # Formularios (PersonalInfo, Experience, etc.)
│   │   ├── preview/       # Componentes de vista previa
│   │   └── ui/            # Componentes atómicos (Button, Input, etc.)
│   ├── hooks/             # Custom hooks (usePDFExport, etc.)
│   ├── store/             # Zustand store
│   └── types/             # TypeScript types
├── templates/             # Plantillas de CV
│   ├── ATS/              # Plantilla ATS-friendly
│   └── Harvard/          # Plantilla Harvard
├── utils/                 # Utilidades (validación, PDF, etc.)
├── styles/               # Estilos CSS globales
└── __tests__/            # Tests

scripts/                  # Scripts de Node.js
└── export-pdf.ts        # Script de exportación PDF

.github/workflows/        # CI/CD
└── ci.yml
```

## Arquitectura

### Componentes Atómicos

Los componentes UI siguen el patrón atómico:

- **Átomos**: Button, Input, Select (sin dependencias)
- **Moléculas**: Formularios compuestos (composición de átomos)
- **Organismos**: Secciones completas (PreviewPanel)

### Gestión de Estado

- **Zustand**: Store global ligero y eficiente
- **Persistencia**: localStorage para datos del usuario
- **Sincronización**: Estado compartido entre formularios y preview

### Validación

- **Zod**: Schemas tipados para validación
- **React Hook Form**: Manejo de formularios con validación
- **Modo onBlur**: Validación al perder el foco

### Exportación PDF

#### Client-side (html2canvas + jsPDF)

**Pros:**

- Inmediato, sin servidor
- Funciona offline
- Sin costo de infraestructura

**Contras:**

- Calidad raster (no vector)
- Fuentes del sistema únicamente
- Archivos más pesados

#### Server-side (Playwright)

**Pros:**

- Vector perfecto
- Fuentes web soportadas
- Archivos más ligeros

**Contras:**

- Requiere build previo
- Más lento (lanzar navegador)
- Mayor uso de recursos

## Tests

### Estructura de Tests

```bash
src/__tests__/
├── setup/              # Configuración de tests
│   └── setup.ts
├── fixtures/           # Datos de prueba
│   └── resume.json
├── form-validation.test.tsx
└── pdf-export.test.tsx
```

### Ejecutar Tests

```bash
# Modo watch (desarrollo)
npm run test

# Con cobertura
npm run test:coverage

# UI interactiva
npm run test:ui
```

### Tests Incluidos

- Validación de formularios (campos requeridos, formato de email/teléfono)
- Exportación PDF (estado del hook, manejo de errores)
- Accesibilidad básica (roles ARIA)

## Accesibilidad

- **WCAG 2.1**: Cumple con estándares de accesibilidad
- **Keyboard Navigation**: Navegación completa por teclado
- **ARIA Labels**: Roles y labels semánticos
- **Focus Management**: Estados de foco visibles
- **Color Contrast**: Contraste mínimo 4.5:1
- **Screen Readers**: Compatible con lectores de pantalla

## Checklist de Buenas Prácticas

### TypeScript

- Modo estricto habilitado
- Tipos explícitos en exports públicos
- No any implícito

### Testing

- Unit tests para lógica
- Integration tests para flujos
- Coverage mínimo 80%

### Performance

- Lazy loading de plantillas
- Code splitting automático
- Optimización de imágenes

### Seguridad

- Validación de inputs con Zod
- No exposición de secrets
- Sanitización de datos

### CI/CD

- Linting automático
- Type checking
- Tests en cada PR
- Build verification

## Añadir Nuevas Plantillas

1. Crear carpeta en `src/templates/NuevaPlantilla/`
2. Crear componente `NuevaPlantilla.tsx`
3. Crear estilos `styles.css`
4. Registrar en `src/templates/TemplateRegistry.ts`

Ejemplo:

```typescript
// TemplateRegistry.ts
export const templateRegistry = {
  NuevaPlantilla: {
    id: 'NuevaPlantilla',
    name: 'Nueva Plantilla',
    description: 'Descripción...',
    component: () => import('@/templates/NuevaPlantilla/NuevaPlantilla'),
    tags: ['tag1', 'tag2'],
    idealFor: ['Uso 1', 'Uso 2'],
  },
};
```

## Contribuir

1. Fork el repositorio
2. Crea una rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Añade nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código existentes
- Añade tests para nuevas funcionalidades
- Actualiza la documentación
- Asegura que los tests pasen

## Roadmap

- [ ] Más plantillas (Creative, Minimalista, Europass)
- [ ] Internacionalización (i18n)
- [ ] Analytics de uso
- [ ] Compartir CVs vía URL
- [ ] Importar desde LinkedIn
- [ ] Editor WYSIWYG avanzado
- [ ] Modo oscuro
- [ ] PWA offline

## Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## Contacto

- Issues: [GitHub Issues](https://github.com/tu-usuario/generador-cv-ats/issues)
- Email: tu-email@example.com

---

**Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS**
