import { forwardRef, ReactNode } from 'react';

/**
 * Componente IconButton atómico
 *
 * Props:
 * - icon: componente de icono (de lucide-react)
 * - label: texto accesible (aria-label)
 * - variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * - size: 'sm' | 'md' | 'lg'
 *
 * Accesibilidad:
 * - Siempre requiere label para screen readers
 * - Estados focus visibles
 * - Tamaño mínimo táctil (44x44px)
 */

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  danger: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
};

const sizeStyles = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      label,
      variant = 'ghost',
      size = 'md',
      onClick,
      disabled,
      className = '',
      type = 'button',
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={`
          inline-flex items-center justify-center rounded-lg
          transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          min-w-[44px] min-h-[44px]
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
      >
        <span className={iconSizes[size]}>{icon}</span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
