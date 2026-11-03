import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function isIOSOrSafari() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  return isIOS || isSafari;
}

function getBlobUrl(blob) {
  if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
    return URL.createObjectURL(blob);
  }
  return 'blob:mock-url';
}

export function openOrDownloadPdf(pdf, blob, filename, targetWindow = null) {
  const blobUrl = getBlobUrl(blob);

  if (targetWindow && !targetWindow.closed && blobUrl) {
    targetWindow.location.href = blobUrl;
    return true;
  }

  if (isIOSOrSafari() && blobUrl && typeof window !== 'undefined') {
    const newTab = window.open(blobUrl, '_blank');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      window.location.href = blobUrl;
    }
    return true;
  }

  try {
    pdf.save(filename);
    return true;
  } catch {
    if (blobUrl && typeof document !== 'undefined') {
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }
    return false;
  }
}

export async function buildA4PdfFile(containerEl, filename = 'Seleccion-Fuconsa-Matias-Sosa.pdf') {
  const sheets = containerEl ? Array.from(containerEl.querySelectorAll('.a4-sheet')) : [];
  if (sheets.length === 0) {
    throw new Error('No A4 sheets found in container');
  }

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const scale = isIOSOrSafari() ? 1.5 : 2;

  for (let i = 0; i < sheets.length; i++) {
    if (i > 0) pdf.addPage('a4', 'portrait');
    const canvas = await html2canvas(sheets[i], {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        const imgs = clonedDoc.querySelectorAll('img');
        imgs.forEach((img) => {
          img.setAttribute('crossorigin', 'anonymous');
        });
      }
    });

    let imgData;
    try {
      imgData = canvas.toDataURL('image/jpeg', 0.92);
    } catch {
      imgData = canvas.toDataURL('image/png');
    }
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  }

  const blob = pdf.output('blob');
  const file = typeof File !== 'undefined'
    ? new File([blob], filename, { type: 'application/pdf' })
    : blob;
  return { pdf, file, blob };
}

export async function downloadA4Pdf(
  containerEl,
  filename = 'Seleccion-Fuconsa-Matias-Sosa.pdf',
  targetWindow = null
) {
  const { pdf, blob } = await buildA4PdfFile(containerEl, filename);
  return openOrDownloadPdf(pdf, blob, filename, targetWindow);
}

export async function shareOrDownloadA4Pdf(
  containerEl,
  filename = 'Seleccion-Fuconsa-Matias-Sosa.pdf',
  title = 'Catálogo Fuconsa - Matías Sosa',
  targetWindow = null
) {
  const { pdf, file, blob } = await buildA4PdfFile(containerEl, filename);
  const canShare = typeof navigator !== 'undefined'
    && typeof navigator.share === 'function'
    && typeof navigator.canShare === 'function'
    && navigator.canShare({ files: [file] });

  if (canShare) {
    try {
      await navigator.share({ title, text: title, files: [file] });
      if (targetWindow && !targetWindow.closed) targetWindow.close();
      return true;
    } catch (err) {
      if (err.name === 'AbortError') {
        if (targetWindow && !targetWindow.closed) targetWindow.close();
        return false;
      }
    }
  }
  return openOrDownloadPdf(pdf, blob, filename, targetWindow);
}
