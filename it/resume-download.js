async function downloadItalianResume(event) {
  if (event) event.preventDefault();
  const partFiles = [
    'resume-parts/part-00.txt',
    'resume-parts/part-01.txt',
    'resume-parts/part-02.txt',
    'resume-parts/part-03.txt',
    'resume-parts/part-04.txt'
  ];
  try {
    const parts = await Promise.all(partFiles.map(async (path) => {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) throw new Error('CV data unavailable');
      return (await response.text()).trim();
    }));
    const base64 = parts.join('');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Farid-Bagheri-Resume-it.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch (error) {
    alert('The CV could not be downloaded. Please refresh the page and try again.');
    console.error(error);
  }
}
window.downloadItalianResume = downloadItalianResume;
