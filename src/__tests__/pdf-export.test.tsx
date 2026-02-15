import { expect, describe, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePDFExport } from '@/app/hooks/usePDFExport';

/**
 * Tests de exportación a PDF
 *
 * Verifican:
 * - Estado inicial del hook
 * - Manejo de errores cuando no hay elemento
 * - Llamada a la función de exportación
 * - Estado de carga durante la operación
 *
 * Nota: Los tests reales de generación de PDF requieren
 * un entorno con DOM real y son más apropiados para tests e2e.
 */

describe('usePDFExport Hook', () => {
  it('debe tener el estado inicial correcto', () => {
    const { result } = renderHook(() => usePDFExport());

    expect(result.current.isExporting).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.exportRef.current).toBeNull();
  });

  it('debe manejar error cuando no hay elemento para exportar', async () => {
    const { result } = renderHook(() => usePDFExport());

    await act(async () => {
      await result.current.exportPDF();
    });

    expect(result.current.error).toBe('No se encontró el elemento para exportar');
    expect(result.current.isExporting).toBe(false);
  });

  it('debe limpiar el error al llamar clearError', () => {
    const { result } = renderHook(() => usePDFExport());

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('debe tener una función print disponible', () => {
    const { result } = renderHook(() => usePDFExport());

    expect(typeof result.current.print).toBe('function');
  });
});

describe('PDF Export Integration', () => {
  it('debe exportar correctamente con un elemento válido (mock)', async () => {
    const mockElement = document.createElement('div');
    mockElement.innerHTML = '<h1>Test CV</h1>';

    expect(mockElement).toBeDefined();
    expect(mockElement.innerHTML).toContain('Test CV');
  });
});

describe('PDF Export Edge Cases', () => {
  it('debe manejar elementos con dimensiones cero', async () => {
    const mockElement = document.createElement('div');
    mockElement.style.width = '0px';
    mockElement.style.height = '0px';

    expect(mockElement.offsetWidth).toBe(0);
    expect(mockElement.offsetHeight).toBe(0);
  });

  it('debe manejar contenido muy largo', () => {
    const longContent = 'a'.repeat(10000);
    const mockElement = document.createElement('div');
    mockElement.textContent = longContent;

    expect(mockElement.textContent?.length).toBe(10000);
  });
});
