/**
 * Client-side high performance image compressor and WebP converter
 * Runs in the browser using HTML5 Canvas, zero external dependencies.
 */
export async function optimizeImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.82
): Promise<{ dataUrl: string; originalSize: number; optimizedSize: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional dimensions
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be created'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP format if supported, else JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Calculate size in bytes
        const head = 'data:image/webp;base64,';
        const optimizedSize = Math.round(((dataUrl.length - head.length) * 3) / 4);

        resolve({
          dataUrl,
          originalSize: file.size,
          optimizedSize,
        });
      };
      img.onerror = () => reject(new Error('Görsel dosyası okunamadı'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Dosya okuma hatası'));
    reader.readAsDataURL(file);
  });
}
