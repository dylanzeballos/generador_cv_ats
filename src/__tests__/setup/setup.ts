import '@testing-library/jest-dom';
import { vi } from 'vitest';

/**
 * Setup para tests
 *
 * Configura:
 * - Matchers de jest-dom
 * - Mocks globales si son necesarios
 * - Utilidades de testing
 */

// Mock para matchMedia (usado por algunos componentes UI)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock para localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock para crypto.randomUUID - usando tipo compatible
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-12345-12345-12345-12345',
  },
});
