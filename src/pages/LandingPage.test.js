import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LandingPage from './LandingPage';

// Mockear el componente Landing para aislar el test de LandingPage
// y evitar la lógica del contador y la redirección automática en este test.
// Nos enfocamos en que LandingPage renderice el componente Landing.
jest.mock('../components/Landing', () => {
  // eslint-disable-next-line react/display-name
  return () => (
    <div>
      <h1>Bienvenido a Relatos de papel</h1>
      <p>Tienda de libros</p>
      <p>Redirigiendo al login en <span>5</span> segundos...</p>
    </div>
  );
});

describe('LandingPage Component', () => {
  test('renderiza el componente Landing con su contenido principal', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    // Verificar que el título del componente Landing (mockeado) esté presente
    expect(screen.getByText('Bienvenido a Relatos de papel')).toBeInTheDocument();
    // Verificar que el subtítulo también esté
    expect(screen.getByText('Tienda de libros')).toBeInTheDocument();
    // Verificar parte del texto del contador
    expect(screen.getByText(/Redirigiendo al login en/)).toBeInTheDocument();
  });
});
