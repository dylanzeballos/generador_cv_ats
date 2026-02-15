import { expect, describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersonalInfoForm } from '@/app/components/form/PersonalInfoForm';

/**
 * Tests de validación de formularios
 *
 * Estos tests verifican:
 * - Validación de campos requeridos
 * - Validación de formato de email
 * - Validación de teléfono
 * - Mensajes de error accesibles
 * - Submit del formulario
 */

describe('PersonalInfoForm Validation', () => {
  it('muestra error cuando el nombre está vacío', async () => {
    render(<PersonalInfoForm />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    await userEvent.clear(nameInput);
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/al menos 2 caracteres/i);
    });
  });

  it('muestra error cuando el email es inválido', async () => {
    render(<PersonalInfoForm />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'email-invalido');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/correo electrónico válido/i);
    });
  });

  it('muestra error cuando el teléfono es muy corto', async () => {
    render(<PersonalInfoForm />);

    const phoneInput = screen.getByLabelText(/teléfono/i);
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, '123');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/teléfono válido/i);
    });
  });

  it('acepta un formulario válido', async () => {
    render(<PersonalInfoForm />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const phoneInput = screen.getByLabelText(/teléfono/i);
    const locationInput = screen.getByLabelText(/ubicación/i);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Juan Pérez');

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'juan@example.com');

    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, '+34 612 345 678');

    await userEvent.clear(locationInput);
    await userEvent.type(locationInput, 'Madrid, España');

    const submitButton = screen.getByRole('button', { name: /guardar cambios/i });
    await userEvent.click(submitButton);

    // Verificar que no hay mensajes de error
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  it('muestra indicador de campo requerido', () => {
    render(<PersonalInfoForm />);

    // Buscar el campo de nombre y verificar que tiene el atributo required
    const nameInput = screen.getByLabelText(/nombre completo/i);
    expect(nameInput).toHaveAttribute('required');
  });
});

describe('ExperienceForm CRUD', () => {
  it('placeholder para tests de experiencia', async () => {
    expect(true).toBe(true);
  });
});
