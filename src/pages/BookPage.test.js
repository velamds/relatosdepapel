import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookPage from './BookPage';
import { BrowserRouter } from 'react-router-dom';

describe('BookPage Component', () => {
  test('renderiza el texto "BookPage"', () => {
    render(
      <BrowserRouter>
        <BookPage />
      </BrowserRouter>
    );
    expect(screen.getByText('BookPage')).toBeInTheDocument();
  });
});
