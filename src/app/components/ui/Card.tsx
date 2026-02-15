import { forwardRef, ReactNode, HTMLAttributes } from 'react';

/**
 * Componente Card atómico
 *
 * Props:
 * - children: contenido de la card
 * - title: título opcional
 * - subtitle: subtítulo opcional
 * - footer: contenido del footer
 * - noPadding: remueve padding interno
 *
 * Uso:
 * Contenedor visual para agrupar contenido relacionado
 */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  noPadding?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, title, subtitle, footer, noPadding = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-white rounded-xl shadow-sm border border-gray-200
          overflow-hidden
          ${className}
        `}
        {...props}
      >
        {(title || subtitle) && (
          <div className="px-6 py-4 border-b border-gray-200">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
        )}
        <div className={noPadding ? '' : 'px-6 py-4'}>{children}</div>
        {footer && <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';
