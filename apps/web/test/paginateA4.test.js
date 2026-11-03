import { describe, it, expect } from 'vitest';
import {
  detectDensity,
  paginateCatalog,
  paginateSelection,
  DENSITY_MODES
} from '../src/utils/paginateA4.js';

describe('A4 Pagination Utility', () => {
  it('detects showcase density for acai or small batches', () => {
    expect(detectDensity('acai', '', 10)).toBe(DENSITY_MODES.SHOWCASE);
    expect(detectDensity('horeca', 'Polpa Norte', 10)).toBe(DENSITY_MODES.SHOWCASE);
    expect(detectDensity('horeca', 'Pescados', 4)).toBe(DENSITY_MODES.SHOWCASE);
    expect(detectDensity('horeca', 'Pescados', 15)).toBe(DENSITY_MODES.HIGH);
  });

  it('paginates selection into single or multiple A4 sheets', () => {
    const items = Array.from({ length: 6 }, (_, i) => ({ id: `P-${i}`, hasPhoto: true }));
    const result = paginateSelection(items);
    expect(result.totalPages).toBe(1);
    expect(result.pages[0].density).toBe(DENSITY_MODES.SHOWCASE);
    expect(result.pages[0].items.length).toBe(6);
  });

  it('separates compact table items when requested', () => {
    const mixed = [
      { id: '1', hasPhoto: true },
      { id: '2', hasPhoto: false }
    ];
    const result = paginateCatalog(mixed, { includeCompactTable: true });
    expect(result.pages.length).toBe(2);
    expect(result.pages[0].type).toBe('grid');
    expect(result.pages[1].type).toBe('table');
  });
});
