/**
 * Utilidades de formateo para el currículum
 */

/**
 * Formatea una fecha en formato legible
 * Ej: 2022-03 -> Marzo 2022
 */
export function formatDate(dateString: string, locale: string = 'es-ES'): string {
  if (!dateString) return '';

  const [year, month] = dateString.split('-');
  if (!year || !month) return dateString;

  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
  });
}

/**
 * Formatea un rango de fechas
 * Ej: 2022-03 -> 2023-06 = Marzo 2022 - Junio 2023
 */
export function formatDateRange(
  startDate: string,
  endDate: string | undefined,
  current: boolean,
  locale: string = 'es-ES'
): string {
  const start = formatDate(startDate, locale);
  const end = current ? 'Actual' : endDate ? formatDate(endDate, locale) : '';

  return `${start} - ${end}`;
}

/**
 * Trunca texto a una longitud máxima
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Capitaliza la primera letra de un string
 */
export function capitalizeFirst(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Formatea un número de teléfono (versión básica española)
 */
export function formatPhone(phone: string): string {
  // Eliminar todo excepto dígitos
  const digits = phone.replace(/\D/g, '');

  // Si empieza con 34 (España), formatear como +34 XXX XXX XXX
  if (digits.startsWith('34') && digits.length === 11) {
    return `+34 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }

  // Si tiene 9 dígitos (móvil español), formatear como XXX XXX XXX
  if (digits.length === 9) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  return phone;
}

/**
 * Genera un ID único simple
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
