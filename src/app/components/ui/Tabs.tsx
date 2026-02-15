import { Children, ReactElement, cloneElement } from 'react';

/**
 * Componente Tabs para navegación en móvil
 *
 * Props:
 * - value: valor del tab activo
 * - onChange: callback cuando cambia el tab
 * - children: Tab components
 */

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactElement<TabProps>[] | ReactElement<TabProps>;
}

interface TabProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export function Tabs({ value, onChange, children }: TabsProps) {
  return (
    <div className="flex border-b border-gray-200" role="tablist">
      {Children.map(children, (child) =>
        cloneElement(child, {
          isActive: child.props.value === value,
          onClick: () => !child.props.disabled && onChange(child.props.value),
        })
      )}
    </div>
  );
}

export function Tab({ children, disabled, isActive, onClick }: TabProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex-1 py-3 px-4 text-sm font-medium text-center transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
        ${
          isActive
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );
}
