import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';

// Mockear los sub-componentes del Checkout
jest.mock('../components/Checkout/CheckoutIdentity', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="checkout-identity-mock">Identidad del Cliente</div>;
});

jest.mock('../components/Checkout/CheckoutAddress', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="checkout-address-mock">Dirección de Envío</div>;
});

jest.mock('../components/Checkout/CheckoutPayment', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="checkout-payment-mock">Método de Pago</div>;
});

jest.mock('../components/Checkout/CheckoutItems', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="checkout-items-mock">Resumen de Items</div>;
});

describe('CheckoutPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter> {/* Por si algún componente usa Link o navegación */}
        <CheckoutPage />
      </BrowserRouter>
    );
  });

  test('renderiza el título "Finalizar Compra"', () => {
    expect(screen.getByText('Finalizar Compra', { selector: 'h1.checkoutpage__title' })).toBeInTheDocument();
  });

  test('renderiza el componente CheckoutIdentity mockeado', () => {
    expect(screen.getByTestId('checkout-identity-mock')).toBeInTheDocument();
    expect(screen.getByText('Identidad del Cliente')).toBeInTheDocument();
  });

  test('renderiza el componente CheckoutAddress mockeado', () => {
    expect(screen.getByTestId('checkout-address-mock')).toBeInTheDocument();
    expect(screen.getByText('Dirección de Envío')).toBeInTheDocument();
  });

  test('renderiza el componente CheckoutPayment mockeado', () => {
    expect(screen.getByTestId('checkout-payment-mock')).toBeInTheDocument();
    expect(screen.getByText('Método de Pago')).toBeInTheDocument();
  });

  test('renderiza el componente CheckoutItems mockeado', () => {
    expect(screen.getByTestId('checkout-items-mock')).toBeInTheDocument();
    expect(screen.getByText('Resumen de Items')).toBeInTheDocument();
  });
});
