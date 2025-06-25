import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

// Mockear el componente Contact
jest.mock('../components/Contact', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="contact-mock">Formulario de Contacto Mock</div>;
});

describe('ContactPage Component', () => {
  test('renderiza el componente Contact mockeado', () => {
    render(
      <BrowserRouter> {/* Por si ContactPage o Contact usan Links */}
        <ContactPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('contact-mock')).toBeInTheDocument();
    expect(screen.getByText('Formulario de Contacto Mock')).toBeInTheDocument();
  });
});
