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

  it('updates search query on typing', () => {
    const setSearch = vi.fn();
    render(
      <CatalogToolbar
        lang="es"
        onChangeLang={() => {}}
        search=""
        onChangeSearch={setSearch}
        onlyWithPhoto={false}
        onTogglePhoto={() => {}}
      />
    );
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Bacalao' } });
    expect(setSearch).toHaveBeenCalledWith('Bacalao');
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

  it('triggers onPrintSection and viewMode changes', () => {
    const printSection = vi.fn();
    const setViewMode = vi.fn();
    render(
      <CatalogToolbar
        lang="es"
        onChangeLang={() => {}}
        search=""
        onChangeSearch={() => {}}
        onPrintSection={printSection}
        viewMode="split"
        onChangeViewMode={setViewMode}
      />
    );
    const printBtn = screen.getByRole('button', { name: /imprimir sección a4/i });
    fireEvent.click(printBtn);
    expect(printSection).toHaveBeenCalled();

    const allCardsBtn = screen.getByRole('button', { name: /vista tarjetas \(todos\)/i });
    fireEvent.click(allCardsBtn);
    expect(setViewMode).toHaveBeenCalledWith('allCards');
  });
});
