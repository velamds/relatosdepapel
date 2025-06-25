import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';

import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import HomePage from '../pages/HomePage'; // Para verificar la redirección
import LandingPage from '../pages/LandingPage'; // Página inicial

// Importar los componentes reales, no los mocks de nivel de página
jest.unmock('../components/Auth/LoginForm');
jest.unmock('../components/Auth/RegisterForm');
jest.unmock('../components/Home'); // Si HomePage renderiza Home y queremos testear la redirección a ella

// Mockear 'navigate' para espiar las llamadas
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mockear el componente Landing para evitar su lógica de redirección automática
jest.mock('../components/Landing', () => {
    // eslint-disable-next-line react/display-name
    return () => <div>Landing Component Mock</div>;
});


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/home" element={<HomePage />} />
  </Routes>
);

describe('Flujo de Autenticación', () => {
  beforeEach(() => {
    mockNavigate.mockClear(); // Limpiar el mock antes de cada test
  });

  describe('Flujo de Login', () => {
    test('muestra errores si los campos están vacíos y luego navega a /home con datos válidos', async () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Verificar que estamos en la página de login
      expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();

      // Intentar enviar el formulario vacío
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
      });
      expect(screen.getByText('Todos los campos son requeridos')).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();

      // Rellenar el formulario
      fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: 'password123' } });

      // Enviar el formulario con datos
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
      });

      // Verificar que el mensaje de error desaparece (o que ya no está presente)
      expect(screen.queryByText('Todos los campos son requeridos')).not.toBeInTheDocument();
      // Verificar navegación a /home
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  describe('Flujo de Registro', () => {
    test('muestra errores si los campos están vacíos y luego navega a /home con datos válidos', async () => {
      render(
        <MemoryRouter initialEntries={['/register']}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Verificar que estamos en la página de registro
      expect(screen.getByRole('heading', { name: /crear una cuenta/i })).toBeInTheDocument();

      // Intentar enviar el formulario vacío
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /crear una cuenta/i }));
      });
      expect(screen.getByText('Todos los campos son requeridos')).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();

      // Rellenar el formulario
      fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'newuser@example.com' } }); // Diferente al de login para evitar colisiones si hubiera estado global
      fireEvent.change(screen.getByPlaceholderText(/^Contraseña$/i), { target: { value: 'newpassword123' } });


      // Enviar el formulario con datos
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /crear una cuenta/i }));
      });

      expect(screen.queryByText('Todos los campos son requeridos')).not.toBeInTheDocument();
      // Verificar navegación a /home (según la lógica actual de RegisterForm)
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
});
