import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    renderHeader();
  });

  test('renderiza el icono principal como un enlace a /home', () => {
    const homeLink = screen.getByRole('link', { name: '' }); // El link del icono no tiene texto accesible
    // Podríamos añadir un aria-label al Link en el componente Header para mejor accesibilidad y testeo
    // Por ahora, verificamos que exista un link con la clase esperada.
    expect(homeLink).toHaveClass('header__icon');
    // Y que el href sea /home (asumiendo que es el primer Link o el que tiene esa clase específica)
     expect(homeLink).toHaveAttribute('href', '/home');
  });

  test('renderiza el campo de búsqueda', () => {
    expect(screen.getByPlaceholderText('Buscar por Título, Autor, ISBN')).toBeInTheDocument();
  });

  test('renderiza el icono de búsqueda svg', () => {
    const svgElement = document.querySelector('.icon__svg');
    expect(svgElement).toBeInTheDocument();
  });

  test('renderiza el enlace al carrito con tooltip', () => {
    const cartLink = screen.getByRole('link', { name: /carrito de compras/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
    expect(screen.getByText('Carrito de Compras')).toBeInTheDocument(); // Verifica el tooltip
  });

  test('renderiza el enlace a favoritos con tooltip', () => {
    const favLink = screen.getByRole('link', { name: /favoritos/i });
    expect(favLink).toBeInTheDocument();
    expect(favLink).toHaveAttribute('href', '/favorites');
    expect(screen.getByText('Favoritos')).toBeInTheDocument(); // Verifica el tooltip
  });

  test('renderiza el enlace de usuario con tooltip', () => {
    const userLink = screen.getByRole('link', { name: /usuario/i });
    expect(userLink).toBeInTheDocument();
    expect(userLink).toHaveAttribute('href', '/user');
    expect(screen.getByText('Usuario')).toBeInTheDocument(); // Verifica el tooltip
  });

  test('renderiza el icono de cambio de idioma con tooltip', () => {
    // El SVG en sí no es un enlace, el div que lo contiene sí podría serlo o tener un onClick
    // Por ahora, verificamos la presencia del SVG y el tooltip
    const languageIconContainer = screen.getByText('Cambiar Idioma').closest('div');
    expect(languageIconContainer).toHaveClass('header__languageicon');
    expect(languageIconContainer.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('Cambiar Idioma')).toBeInTheDocument();
  });
});
