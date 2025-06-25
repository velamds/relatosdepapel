import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RegisterPage from './RegisterPage';

// Mockear el componente RegisterForm
jest.mock('../../components/Auth/RegisterForm', () => {
  // eslint-disable-next-line react/display-name
  return () => (
    <form data-testid="register-form">
      <input type="text" placeholder="Nombre" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Contraseña" />
      <button type="submit">Crear una cuenta</button>
      <div>
        <a href="/login">Volver al login</a>
      </div>
    </form>
  );
});

describe('RegisterPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
  });

  test('renderiza el título "Crear una cuenta"', () => {
    expect(screen.getByText('Crear una cuenta', { selector: 'h2.auth__title' })).toBeInTheDocument();
  });

  test('renderiza el componente RegisterForm mockeado', () => {
    // Verificar la presencia de elementos clave del RegisterForm mockeado
    expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Crear una cuenta' })).toBeInTheDocument();
    expect(screen.getByText('Volver al login')).toBeInTheDocument();
    // También podemos verificar que el formulario (o un elemento contenedor del mock) esté presente
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
  });
});
