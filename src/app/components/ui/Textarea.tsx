import { TextareaHTMLAttributes, forwardRef } from 'react';

/**
 * Componente Textarea atómico
 *
 * Props extendidas de TextareaHTMLAttributes
 * Adicionales:
 * - label: etiqueta del campo
 * - error: mensaje de error
 * - helperText: texto de ayuda
 * - rows: número de filas (default: 4)
 *
 * Accesibilidad:
 * - Label vinculada con htmlFor
 * - aria-describedby para ayuda y errores
 * - resize controlado para mejor UX
 */

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, rows = 4, className = '', id, ...props }, ref) => {
    const textareaId = id || props.name;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-label="requerido">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`
            block w-full rounded-lg border-gray-300 shadow-sm
            focus:border-blue-500 focus:ring-blue-500
            disabled:bg-gray-100 disabled:cursor-not-allowed
            resize-y min-h-[100px]
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId || helperId}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
