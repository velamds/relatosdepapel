import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from './NotFoundPage';
import { BrowserRouter } from 'react-router-dom'; // Aunque no usa Links, es buena práctica por si se añade en el futuro

describe('NotFoundPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
  });

  test('renderiza el título de "404 - No encontrado"', () => {
    expect(screen.getByText('404 - No encontrado', { selector: 'h1.notfound__title' })).toBeInTheDocument();
  });

  test('renderiza el subtítulo indicando que la página no existe', () => {
    expect(screen.getByText('La página que busca no existe', { selector: 'p.notfound__subtitle' })).toBeInTheDocument();
  });
});
