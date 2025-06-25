import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BookDetailPage from './BookDetailPage';

// Mockear useParams de react-router-dom
const mockBookId = '123';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Importar y extender el módulo original
  useParams: () => ({
    id: mockBookId,
  }),
}));

// Mockear el componente BookDetail
jest.mock('../components/BookDetail', () => {
  // eslint-disable-next-line react/display-name, react/prop-types
  return ({ id }) => (
    <div data-testid="book-detail-mock">
      Detalle del Libro ID: {id}
    </div>
  );
});

describe('BookDetailPage Component', () => {
  test('obtiene el id de useParams y lo pasa al componente BookDetail', () => {
    render(
      <BrowserRouter> {/* Necesario aunque usemos mock de useParams, por si BookDetailPage usa otros componentes de react-router */}
        <BookDetailPage />
      </BrowserRouter>
    );

    // Verificar que el componente BookDetail (mockeado) se renderice
    const bookDetailMock = screen.getByTestId('book-detail-mock');
    expect(bookDetailMock).toBeInTheDocument();

    // Verificar que el id correcto se pasó al mock
    expect(screen.getByText(`Detalle del Libro ID: ${mockBookId}`)).toBeInTheDocument();
  });
});
