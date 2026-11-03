import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function buildA4PdfFile(containerEl, filename = 'Seleccion-Fuconsa-Matias-Sosa.pdf') {
  const sheets = containerEl ? Array.from(containerEl.querySelectorAll('.a4-sheet')) : [];
  if (sheets.length === 0) {
    throw new Error('No A4 sheets found in container');
  }

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  for (let i = 0; i < sheets.length; i++) {
    if (i > 0) pdf.addPage('a4', 'portrait');
    const canvas = await html2canvas(sheets[i], {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  }

  const blob = pdf.output('blob');
  const file = new File([blob], filename, { type: 'application/pdf' });
  return { pdf, file, blob };
}

export async function downloadA4Pdf(containerEl, filename = 'Seleccion-Fuconsa-Matias-Sosa.pdf') {
  const { pdf } = await buildA4PdfFile(containerEl, filename);
  pdf.save(filename);
  return true;
}

export async function shareOrDownloadA4Pdf(
  containerEl,
  filename = 'Seleccion-Fuconsa-Matias-Sosa.pdf',
  title = 'Catálogo Fuconsa - Matías Sosa'
) {
  const { pdf, file } = await buildA4PdfFile(containerEl, filename);
  const canShare = typeof navigator !== 'undefined'
    && typeof navigator.share === 'function'
    && typeof navigator.canShare === 'function'
    && navigator.canShare({ files: [file] });

  if (canShare) {
    try {
      await navigator.share({ title, text: title, files: [file] });
      return true;
    } catch (err) {
      if (err.name === 'AbortError') return false;
    }
  }
  pdf.save(filename);
  return true;
}
