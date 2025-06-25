import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  test('renderiza los enlaces de navegación correctamente', () => {
    renderNavbar();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Acerca De')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  test('los enlaces tienen los atributos href correctos', () => {
    renderNavbar();
    expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/home');
    expect(screen.getByText('Categorias').closest('a')).toHaveAttribute('href', '/categorias');
    expect(screen.getByText('Acerca De').closest('a')).toHaveAttribute('href', '/about');
    expect(screen.getByText('Contacto').closest('a')).toHaveAttribute('href', '/contact');
  });

  // Para probar la clase activa, necesitaríamos una configuración más compleja
  // que simule la navegación o el estado activo, lo cual está fuera del alcance
  // de un test unitario simple para este componente. Por ahora, verificamos
  // la presencia y los hrefs.
});
