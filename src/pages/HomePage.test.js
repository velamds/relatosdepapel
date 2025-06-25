import React from 'react';
import { render, screen }
from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Necesario si Home usa Link
import '@testing-library/jest-dom';
import HomePage from './HomePage';

// Mockear el componente Home para aislar el test de HomePage
jest.mock('../components/Home', () => {
  // eslint-disable-next-line react/display-name
  return () => (
    <div>
      <h2>Contenido Principal de Home</h2>
      <p>Lista de libros aquí.</p>
    </div>
  );
});

describe('HomePage Component', () => {
  test('renderiza el componente Home con su contenido principal', () => {
    render(
      <BrowserRouter> {/* BrowserRouter es necesario si el Home mockeado o el real usan Links */}
        <HomePage />
      </BrowserRouter>
    );

    // Verificar que el contenido del componente Home (mockeado) esté presente
    expect(screen.getByText('Contenido Principal de Home')).toBeInTheDocument();
    expect(screen.getByText('Lista de libros aquí.')).toBeInTheDocument();
  });
});
