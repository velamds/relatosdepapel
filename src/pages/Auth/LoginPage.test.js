import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LoginPage from './LoginPage';

// Mockear el componente LoginForm
jest.mock('../../components/Auth/LoginForm', () => {
  // eslint-disable-next-line react/display-name
  return () => (
    <form data-testid="login-form">
      <input type="email" placeholder="Correo electrónico" />
      <input type="password" placeholder="Contraseña" />
      <button type="submit">Iniciar sesión</button>
      <div>
        <span>¿No tienes una cuenta? </span>
        <a href="/register">Registrate aquí</a>
      </div>
    </form>
  );
});

describe('LoginPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  });

  test('renderiza el título "Iniciar sesión"', () => {
    expect(screen.getByText('Iniciar sesión', { selector: 'h2.auth__title' })).toBeInTheDocument();
  });

  test('renderiza el componente LoginForm mockeado', () => {
    // Verificar la presencia de elementos clave del LoginForm mockeado
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument();
    expect(screen.getByText('¿No tienes una cuenta?')).toBeInTheDocument();
    expect(screen.getByText('Registrate aquí')).toBeInTheDocument();
    // También podemos verificar que el formulario (o un elemento contenedor del mock) esté presente
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
