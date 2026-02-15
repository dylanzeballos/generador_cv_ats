import { forwardRef, InputHTMLAttributes } from 'react';

/**
 * Componente Checkbox atómico
 *
 * Props:
 * - label: etiqueta del checkbox
 * - error: mensaje de error
 * - helperText: texto de ayuda
 *
 * Accesibilidad:
 * - Label clickeable asociada al input
 * - Estados focus visibles
 * - aria-describedby para contexto adicional
 */

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const checkboxId = id || props.name;
    const errorId = error ? `${checkboxId}-error` : undefined;
    const helperId = helperText ? `${checkboxId}-helper` : undefined;

    return (
      <div className="w-full">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={`
                h-4 w-4 rounded border-gray-300 text-blue-600
                focus:ring-blue-500
                ${error ? 'border-red-500' : ''}
                ${className}
              `}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={errorId || helperId}
              {...props}
            />
          </div>
          <div className="ml-3 text-sm">
            {label && (
              <label htmlFor={checkboxId} className="font-medium text-gray-700">
                {label}
              </label>
            )}
            {error && (
              <p id={errorId} className="text-red-600" role="alert">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p id={helperId} className="text-gray-500">
                {helperText}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
