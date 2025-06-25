import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';

// Importar las páginas y componentes necesarios
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import BookPage from '../pages/BookPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import MainLayout from '../layouts/MainLayout'; // Asumiendo que Navbar está en MainLayout

// --- Mocks y Unmocks ---
// Mantener los mocks de los sub-componentes de las páginas para simplificar,
// a menos que necesitemos interactuar con su contenido real.
// Si una página fue testeada mockeando su componente hijo principal, ese mock se aplicará aquí también
// a menos que lo des-mockeemos explícitamente.

// Para este flujo, necesitamos la Navbar real.
jest.unmock('../components/Navbar');

// Mockear componentes hijos de las páginas si es necesario para evitar complejidad
// (estos mocks ya existen de los tests de página y se aplicarán si no se desmockean)
// jest.mock('../components/Home', () => () => <div>Home Component Mock Content</div>);
// jest.mock('../components/Contact', () => () => <div>Contact Component Mock Content</div>);
// BookPage es simple, AboutPage es simple.

// Mockear el componente Landing para evitar su lógica de redirección automática
jest.mock('../components/Landing', () => {
    // eslint-disable-next-line react/display-name
    return () => <div>Landing Component Mock for Navigation Test</div>;
});


const AppNavigator = () => (
  <MainLayout> {/* MainLayout probablemente renderiza Header (con Navbar) y Outlet para las páginas */}
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/categorias" element={<BookPage />} /> {/* Asumiendo que 'Categorias' va a /book o similar */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      {/* Añadir otras rutas si son necesarias para la Navbar */}
    </Routes>
  </MainLayout>
);


describe('Flujo de Navegación Principal', () => {
  const setup = (initialRoute = '/home') => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppNavigator />
      </MemoryRouter>
    );
  };

  test('navega correctamente usando la Navbar', async () => {
    setup();

    // 1. Verificar que estamos en HomePage (o el contenido mockeado de Home)
    expect(screen.getByText('Contenido Principal de Home')).toBeInTheDocument(); // Del mock de Home.jsx

    // 2. Navegar a Categorias (BookPage)
    await act(async () => {
      fireEvent.click(screen.getByRole('link', { name: /categorias/i }));
    });
    expect(screen.getByText('BookPage')).toBeInTheDocument(); // Contenido real de BookPage

    // 3. Navegar a Acerca De (AboutPage)
    await act(async () => {
      fireEvent.click(screen.getByRole('link', { name: /acerca de/i }));
    });
    expect(screen.getByText('Elaborado por:')).toBeInTheDocument(); // Contenido real de AboutPage

    // 4. Navegar a Contacto (ContactPage)
    await act(async () => {
      fireEvent.click(screen.getByRole('link', { name: /contacto/i }));
    });
    expect(screen.getByText('Formulario de Contacto Mock')).toBeInTheDocument(); // Del mock de Contact.jsx

    // 5. Navegar de vuelta a Inicio (HomePage)
    await act(async () => {
      fireEvent.click(screen.getByRole('link', { name: /inicio/i }));
    });
    expect(screen.getByText('Contenido Principal de Home')).toBeInTheDocument();
  });

  test('enlace "Categorias" en Navbar funciona', async () => {
    setup('/home');
    await act(async () => {
      fireEvent.click(screen.getByRole('link', { name: /categorias/i }));
    });
    // Suponiendo que BookPage muestra "BookPage" como texto principal
    expect(screen.getByText('BookPage')).toBeInTheDocument();
  });
});
