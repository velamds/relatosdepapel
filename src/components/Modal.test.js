import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  test('no renderiza el modal cuando show es false', () => {
    render(<Modal show={false} onClose={mockOnClose}><div>Contenido del Modal</div></Modal>);
    expect(screen.queryByText('Contenido del Modal')).not.toBeInTheDocument();
  });

  test('renderiza el modal cuando show es true', () => {
    render(<Modal show={true} onClose={mockOnClose}><div>Contenido del Modal</div></Modal>);
    expect(screen.getByText('Contenido del Modal')).toBeInTheDocument();
    expect(screen.getByText('Cerrar')).toBeInTheDocument();
  });

  test('llama a onClose cuando se hace clic en el botón de cerrar', () => {
    render(<Modal show={true} onClose={mockOnClose}><div>Contenido del Modal</div></Modal>);
    fireEvent.click(screen.getByText('Cerrar'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('renderiza el contenido children correctamente', () => {
    const modalContent = 'Este es el contenido del modal';
    render(<Modal show={true} onClose={mockOnClose}><div>{modalContent}</div></Modal>);
    expect(screen.getByText(modalContent)).toBeInTheDocument();
  });
});
