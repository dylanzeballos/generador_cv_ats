# Contribuir al Generador de CV ATS-Friendly

¡Gracias por tu interés en contribuir a este proyecto!

## Cómo contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/generador-cv-ats.git
cd generador-cv-ats
```

### 2. Crear una rama

```bash
# Asegúrate de estar en develop
git checkout develop
git pull origin develop

# Crea una rama para tu feature
git checkout -b feature/nombre-de-tu-feature
```

### 3. Hacer cambios

- Escribe código limpio y bien documentado
- Asegúrate de que los tests pasen: `npm test`
- Verifica el linting: `npm run lint`
- Verifica los tipos: `npm run typecheck`

### 4. Commits (Conventional Commits)

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Tipos de commits:
# feat: nueva característica
# fix: corrección de bug
# docs: documentación
# style: cambios de formato (espacios, punto y coma, etc)
# refactor: refactorización de código
# test: agregar o modificar tests
# chore: tareas de mantenimiento

git commit -m "feat: agregar soporte para nuevas plantillas"
git commit -m "fix: corregir error en exportación PDF"
git commit -m "docs: actualizar README con nuevas instrucciones"
```

### 5. Pull Request

1. Push tu rama: `git push origin feature/nombre-de-tu-feature`
2. Crea un Pull Request a la rama `develop`
3. Asegúrate de que el CI pase (tests, linting, build)
4. Espera la revisión de código

## Estructura de commits

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Ejemplos:

```
feat(templates): agregar plantilla Europass

Se agrega una nueva plantilla compatible con el formato Europass
utilizado en la Unión Europea.

Closes #123
```

```
fix(pdf): corregir error de colores OKLCH

Los colores OKLCH de Tailwind CSS v4 no son soportados por jsPDF.
Se implementa conversión automática a hexadecimales.

Fixes #456
```

## Guías de estilo

### Código TypeScript/React

- Usar TypeScript en modo estricto
- Tipar todas las props y retornos de funciones
- Usar componentes funcionales con hooks
- Evitar `any` - usar `unknown` cuando sea necesario

### CSS/Tailwind

- Usar clases de Tailwind cuando sea posible
- Evitar CSS inline
- Mantener consistencia en naming

### Tests

- Escribir tests para nuevas características
- Mantener coverage mínimo del 80%
- Usar Testing Library para tests de UI

## Reportar bugs

Usa [GitHub Issues](https://github.com/tu-usuario/generador-cv-ats/issues) y proporciona:

- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica
- Información del entorno (navegador, SO)

## Sugerir features

Abre un issue con:

- Descripción detallada de la feature
- Casos de uso
- Posibles implementaciones

## Código de conducta

- Sé respetuoso y constructivo
- Acepta críticas constructivas
- Enfócate en lo que es mejor para la comunidad
- Muestra empatía hacia otros colaboradores

## Preguntas?

Si tienes dudas, abre un issue con la etiqueta `question` o contacta a los mantenedores.

¡Gracias por contribuir! 🎉
