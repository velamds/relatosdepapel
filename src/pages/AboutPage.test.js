import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AboutPage from './AboutPage'; // El componente se exporta como 'About' pero el archivo es AboutPage

describe('AboutPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter> {/* Por si se añaden Links en el futuro */}
        <AboutPage />
      </BrowserRouter>
    );
  });

  test('renderiza el encabezado "Elaborado por:"', () => {
    expect(screen.getByText('Elaborado por:')).toBeInTheDocument();
  });

  test('renderiza los nombres de los miembros del equipo', () => {
    expect(screen.getByText('Marly Johana Yepes Calderon')).toBeInTheDocument();
    expect(screen.getByText('Sergio David Muñoz Vela')).toBeInTheDocument();
    expect(screen.getByText('Nicolás Valencia Valencia')).toBeInTheDocument();
  });

  test('el contenedor principal tiene la clase "about"', () => {
    // El componente usa 'class' en lugar de 'className'.
    // Testing Library busca por el atributo renderizado en el DOM.
    const mainDiv = screen.getByText('Elaborado por:').closest('div');
    expect(mainDiv).toHaveClass('about');
  });
});
