import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompactTable } from '../src/components/CompactTable.jsx';

describe('CompactTable Component', () => {
  const tableItems = [
    {
      id: 'NO-PHOTO-1',
      brand: 'Test Brand',
      name: { es: 'Producto Sin Foto', ca: 'Producte Sense Foto', en: 'No Photo Product' },
      format: 'Bolsa 2kg',
      unitPrice: 4.5,
      boxPrice: 18.0,
      priceText: '4,50 €/kg',
      hasPhoto: false
    }
  ];

  it('renders rows for items without photos', () => {
    render(
      <CompactTable
        items={tableItems}
        lang="es"
        isSelected={() => false}
        onToggleSelect={() => {}}
      />
    );
    expect(screen.getByText('Producto Sin Foto')).toBeInTheDocument();
    expect(screen.getByText('NO-PHOTO-1')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
  });

  it('calls onToggleSelect when adding from compact table', () => {
    const handleToggle = vi.fn();
    render(
      <CompactTable
        items={tableItems}
        lang="es"
        isSelected={() => false}
        onToggleSelect={handleToggle}
      />
    );
    const addBtn = screen.getByRole('button', { name: /añadir a selección/i });
    fireEvent.click(addBtn);
    expect(handleToggle).toHaveBeenCalledWith(tableItems[0]);
  });
});
