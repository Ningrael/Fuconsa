import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomSelectionDrawer } from '../src/components/CustomSelectionDrawer.jsx';

describe('CustomSelectionDrawer Component', () => {
  it('does not render when count is zero', () => {
    const { container } = render(
      <CustomSelectionDrawer count={0} lang="es" onClear={() => {}} onOpenPrint={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders count badge and triggers actions', () => {
    const handleClear = vi.fn();
    const handleOpenPrint = vi.fn();
    render(
      <CustomSelectionDrawer
        count={3}
        lang="es"
        onClear={handleClear}
        onOpenPrint={handleOpenPrint}
      />
    );
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Selección a Medida')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /vaciar/i }));
    expect(handleClear).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /imprimir a4/i }));
    expect(handleOpenPrint).toHaveBeenCalled();
  });
});
