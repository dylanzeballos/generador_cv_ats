import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';
import './styles/variables.css';
import './styles/print.css';

/**
 * Punto de entrada de la aplicación
 *
 * Configura:
 * - React 18 con StrictMode
 * - Importación de estilos globales
 * - Renderizado del componente principal
 */

const container = document.getElementById('root');

if (!container) {
  throw new Error('No se encontró el elemento root');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
