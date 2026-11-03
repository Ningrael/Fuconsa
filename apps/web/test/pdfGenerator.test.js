import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildA4PdfFile, downloadA4Pdf, shareOrDownloadA4Pdf } from '../src/utils/pdfGenerator.js';

vi.mock('html2canvas', () => {
  return {
    default: vi.fn().mockResolvedValue({
      toDataURL: vi.fn().mockReturnValue('data:image/jpeg;base64,mock')
    })
  };
});

const mockPdfSave = vi.fn();
const mockPdfAddPage = vi.fn();
const mockPdfAddImage = vi.fn();
const mockPdfOutput = vi.fn().mockReturnValue(new Blob(['pdf content'], { type: 'application/pdf' }));

vi.mock('jspdf', () => {
  return {
    jsPDF: vi.fn().mockImplementation(() => ({
      addPage: mockPdfAddPage,
      addImage: mockPdfAddImage,
      output: mockPdfOutput,
      save: mockPdfSave
    }))
  };
});

describe('pdfGenerator utility', () => {
  let container;

  beforeEach(() => {
    vi.clearAllMocks();
    container = document.createElement('div');
    const sheet1 = document.createElement('section');
    sheet1.className = 'a4-sheet';
    const sheet2 = document.createElement('section');
    sheet2.className = 'a4-sheet';
    container.appendChild(sheet1);
    container.appendChild(sheet2);
  });

  it('throws error when container has no a4-sheet elements', async () => {
    const emptyContainer = document.createElement('div');
    await expect(buildA4PdfFile(emptyContainer)).rejects.toThrow('No A4 sheets found in container');
  });

  it('builds pdf file from container sheets and adds pages accordingly', async () => {
    const result = await buildA4PdfFile(container, 'test.pdf');
    expect(result).toHaveProperty('pdf');
    expect(result).toHaveProperty('file');
    expect(result).toHaveProperty('blob');
    expect(mockPdfAddPage).toHaveBeenCalledTimes(1);
    expect(mockPdfAddImage).toHaveBeenCalledTimes(2);
  });

  it('downloads pdf via save method', async () => {
    const ok = await downloadA4Pdf(container, 'fuconsa.pdf');
    expect(ok).toBe(true);
    expect(mockPdfSave).toHaveBeenCalledWith('fuconsa.pdf');
  });

  it('shares pdf when navigator.share is supported', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined);
    const canShareMock = vi.fn().mockReturnValue(true);
    vi.stubGlobal('navigator', {
      share: shareMock,
      canShare: canShareMock
    });

    const shared = await shareOrDownloadA4Pdf(container, 'share.pdf', 'Propuesta');
    expect(shared).toBe(true);
    expect(shareMock).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('falls back to save when navigator.share is not supported', async () => {
    vi.stubGlobal('navigator', {});
    const ok = await shareOrDownloadA4Pdf(container, 'fallback.pdf', 'Propuesta');
    expect(ok).toBe(true);
    expect(mockPdfSave).toHaveBeenCalledWith('fallback.pdf');
    vi.unstubAllGlobals();
  });
});
