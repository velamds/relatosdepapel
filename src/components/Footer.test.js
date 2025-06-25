import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renderiza el logo', () => {
    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();
    // Ahora esperamos el valor del mock en lugar del nombre del archivo real
    expect(logoImg).toHaveAttribute('src', 'test-file-stub');
  });

  test('renderiza el texto de copyright', () => {
    expect(screen.getByText('Todos los derechos reservados - Ramen X - Unir 2025')).toBeInTheDocument();
  });

  test('renderiza los enlaces de redes sociales con los atributos correctos', () => {
    const facebookLink = screen.getByAltText('Facebook').closest('a');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/relatosdepapelramenx/');
    expect(facebookLink).toHaveAttribute('target', '_blank');

    const instagramLink = screen.getByAltText('Instagram').closest('a');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/relatosdepapelramenx/');
    expect(instagramLink).toHaveAttribute('target', '_blank');

    const twitterLink = screen.getByAltText('Twitter').closest('a');
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/relatosdepapelramenx');
    expect(twitterLink).toHaveAttribute('target', '_blank');
  });

  test('las imágenes de redes sociales tienen el alt text correcto', () => {
    expect(screen.getByAltText('Facebook')).toBeInTheDocument();
    expect(screen.getByAltText('Instagram')).toBeInTheDocument();
    expect(screen.getByAltText('Twitter')).toBeInTheDocument();
  });
});
