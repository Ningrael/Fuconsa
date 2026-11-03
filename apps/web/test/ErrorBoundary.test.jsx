import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../src/components/ErrorBoundary.jsx';

function ProblemChild({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Test Explosion');
  }
  return <div>Operación normal</div>;
}

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary lang="es">
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Operación normal')).toBeInTheDocument();
  });

  it('catches render errors and displays fallback with contact and retry', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary lang="es">
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/error inesperado al cargar la vista/i)).toBeInTheDocument();
    expect(screen.getByText('Matías Sosa Marrazzo')).toBeInTheDocument();
    expect(screen.getByText(/613 018 609/)).toBeInTheDocument();

    const reloadBtn = screen.getByRole('button', { name: /reintentar \/ recargar/i });
    expect(reloadBtn).toBeInTheDocument();
    fireEvent.click(reloadBtn);

    errorSpy.mockRestore();
  });
});
