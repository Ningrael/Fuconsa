import { describe, it, expect } from 'vitest';
import { withBase } from '../src/utils/assetUrl.js';

describe('withBase utility', () => {
  it('returns empty string if falsy path provided', () => {
    expect(withBase('')).toBe('');
    expect(withBase(null)).toBe('');
  });

  it('preserves external absolute URLs', () => {
    expect(withBase('https://example.com/logo.png')).toBe('https://example.com/logo.png');
    expect(withBase('http://example.com/api')).toBe('http://example.com/api');
    expect(withBase('data:image/svg+xml;base64,...')).toBe('data:image/svg+xml;base64,...');
  });

  it('prepends base prefix appropriately', () => {
    const res = withBase('/assets/brand/logo.png');
    expect(res).toContain('/assets/brand/logo.png');
  });
});
