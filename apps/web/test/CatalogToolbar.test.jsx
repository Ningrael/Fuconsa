import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CatalogToolbar } from '../src/components/CatalogToolbar.jsx';

describe('CatalogToolbar Component', () => {
  it('renders language switch buttons with active state', () => {
    const setLang = vi.fn();
    render(
      <CatalogToolbar
        lang="es"
        onChangeLang={setLang}
        search=""
        onChangeSearch={() => {}}
        onlyWithPhoto={false}
        onTogglePhoto={() => {}}
      />
    );
    const esBtn = screen.getByRole('button', { name: 'ES' });
    const caBtn = screen.getByRole('button', { name: 'CA' });
    expect(esBtn).toHaveClass('active');
    fireEvent.click(caBtn);
    expect(setLang).toHaveBeenCalledWith('ca');
  });

  it('updates search query on typing and allows clearing search', () => {
    const setSearch = vi.fn();
    render(
      <CatalogToolbar
        lang="es"
        onChangeLang={() => {}}
        search="Bacalao"
        onChangeSearch={setSearch}
        onlyWithPhoto={false}
        onTogglePhoto={() => {}}
      />
    );
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Merluza' } });
    expect(setSearch).toHaveBeenCalledWith('Merluza');

    const clearBtn = screen.getByRole('button', { name: /limpiar búsqueda/i });
    fireEvent.click(clearBtn);
    expect(setSearch).toHaveBeenCalledWith('');
  });

  it('toggles onlyWithPhoto checkbox', () => {
    const togglePhoto = vi.fn();
    render(
      <CatalogToolbar
        lang="es"
        onChangeLang={() => {}}
        search=""
        onChangeSearch={() => {}}
        onlyWithPhoto={false}
        onTogglePhoto={togglePhoto}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(togglePhoto).toHaveBeenCalledWith(true);
  });

  it('changes section filter on select dropdown change', () => {
    const setSection = vi.fn();
    render(
      <CatalogToolbar
        lang="es"
        onChangeLang={() => {}}
        search=""
        onChangeSearch={() => {}}
        section=""
        onChangeSection={setSection}
        sections={['Congelados', 'Lácteos']}
      />
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Congelados' } });
    expect(setSection).toHaveBeenCalledWith('Congelados');
  });

  it('triggers onPrintSection action', () => {
    const printSection = vi.fn();
    render(
      <CatalogToolbar
        lang="es"
        onChangeLang={() => {}}
        search=""
        onChangeSearch={() => {}}
        onPrintSection={printSection}
      />
    );
    const printBtn = screen.getByRole('button', { name: /crear pdf/i });
    fireEvent.click(printBtn);
    expect(printSection).toHaveBeenCalled();
  });
});
