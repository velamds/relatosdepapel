import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'; // Necesario si Cart usa Link
import CartPage from './CartPage';

// Mockear el componente Cart
jest.mock('../components/Cart', () => {
  // eslint-disable-next-line react/display-name
  return () => (
    <div data-testid="cart-mock">
      <h2>Carrito de Compras Mock</h2>
      <p>Aquí se mostrarían los ítems del carrito.</p>
    </div>
  );
});

describe('CartPage Component', () => {
  test('renderiza el componente Cart mockeado', () => {
    render(
      <BrowserRouter> {/* BrowserRouter es necesario si el Cart mockeado o el real usan Links */}
        <CartPage />
      </BrowserRouter>
    );

    // Verificar que el contenido del componente Cart (mockeado) esté presente
    expect(screen.getByTestId('cart-mock')).toBeInTheDocument();
    expect(screen.getByText('Carrito de Compras Mock')).toBeInTheDocument();
    expect(screen.getByText('Aquí se mostrarían los ítems del carrito.')).toBeInTheDocument();
  });
});
