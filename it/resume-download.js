function loadHtml2Pdf() {
  if (window.html2pdf) return Promise.resolve(window.html2pdf);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-html2pdf]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.html2pdf), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    script.dataset.html2pdf = 'true';
    script.onload = () => resolve(window.html2pdf);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function getCvElementForPdf() {
  const localPage = document.querySelector('.page');
  if (localPage) return { element: localPage, cleanup: () => {} };

  const iframe = document.createElement('iframe');
  iframe.src = 'cv.html?pdf=1';
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.cssText = 'position:fixed;left:-10000px;top:0;width:980px;height:1400px;border:0;opacity:0;pointer-events:none;';
  document.body.appendChild(iframe);

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('CV page load timed out')), 12000);
    iframe.onload = () => {
      clearTimeout(timer);
      resolve();
    };
    iframe.onerror = () => {
      clearTimeout(timer);
      reject(new Error('CV page could not be loaded'));
    };
  });

  const element = iframe.contentDocument?.querySelector('.page');
  if (!element) {
    iframe.remove();
    throw new Error('Formatted CV content not found');
  }

  return { element, cleanup: () => iframe.remove() };
}

async function downloadItalianResume(event) {
  if (event) event.preventDefault();

  try {
    const html2pdf = await loadHtml2Pdf();
    const { element, cleanup } = await getCvElementForPdf();

    const options = {
      margin: [6, 6, 6, 6],
      filename: 'Farid-Bagheri-Resume-it.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(options).from(element).save();
    cleanup();
  } catch (error) {
    console.error(error);
    window.location.href = 'cv.html';
  }
}

window.downloadItalianResume = downloadItalianResume;
