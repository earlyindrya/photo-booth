import { LayoutConfig, FrameThemeConfig, CustomizationSettings, CapturedShot } from '../types/photobooth';

// Helper to load an image source into an HTMLImageElement
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

// Draw image with object-fit: cover inside target rectangle
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  borderRadius = 16
) {
  ctx.save();

  // Create rounded rectangle clip
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, borderRadius);
  ctx.clip();

  const imgRatio = img.width / img.height;
  const targetRatio = width / height;

  let renderW = width;
  let renderH = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imgRatio > targetRatio) {
    // Image is wider than target
    renderW = height * imgRatio;
    offsetX = (width - renderW) / 2;
  } else {
    // Image is taller than target
    renderH = width / imgRatio;
    offsetY = (height - renderH) / 2;
  }

  ctx.drawImage(img, x + offsetX, y + offsetY, renderW, renderH);

  // Subtle photo inner border for polished look
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

export async function renderPhotoStripCanvas(
  layout: LayoutConfig,
  shots: CapturedShot[],
  theme: FrameThemeConfig,
  settings: CustomizationSettings
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Load all shot images
  const loadedImages: (HTMLImageElement | null)[] = await Promise.all(
    shots.map(async (shot) => {
      try {
        return await loadImage(shot.dataUrl);
      } catch (err) {
        console.error('Failed to load shot image:', err);
        return null;
      }
    })
  );

  // Determine canvas dimensions based on layout
  let width = 1200;
  let height = 3600;

  if (layout.id === 'grid-2x2') {
    width = 2000;
    height = 2400;
  } else if (layout.id === 'cinematic-wide') {
    width = 2400;
    height = 1600;
  }

  canvas.width = width;
  canvas.height = height;

  // 1. Draw Background
  if (Array.isArray(theme.canvasBg)) {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    theme.canvasBg.forEach((color, index) => {
      grad.addColorStop(index / (theme.canvasBg.length - 1), color);
    });
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = theme.canvasBg;
  }
  ctx.fillRect(0, 0, width, height);

  // 2. Layout-specific photo placements
  if (layout.id === 'classic-4cut' || layout.id === 'event-edition') {
    const marginX = 80;
    const topMargin = layout.id === 'event-edition' ? 220 : 120;
    const bottomSpace = 340;
    const availableHeight = height - topMargin - bottomSpace;
    const gap = 44;
    const photoWidth = width - marginX * 2;
    const photoHeight = (availableHeight - gap * 3) / 4;

    // Header if event edition
    if (layout.id === 'event-edition') {
      ctx.save();
      ctx.fillStyle = theme.textColor;
      ctx.font = '900 48px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('⚡ CYBER FREQZ ⚡', width / 2, 100);

      ctx.font = '600 24px "Outfit", sans-serif';
      ctx.fillStyle = theme.subtextColor;
      ctx.letterSpacing = '3px';
      ctx.fillText('SPECIAL EDITION PHOTOBOOTH', width / 2, 150);
      ctx.restore();
    }

    // Render 4 photos
    for (let i = 0; i < 4; i++) {
      const img = loadedImages[i];
      const photoY = topMargin + i * (photoHeight + gap);

      if (img) {
        drawImageCover(ctx, img, marginX, photoY, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
      } else {
        // Placeholder box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.roundRect(marginX, photoY, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
        ctx.fill();
      }
    }

    // Bottom Branding Area
    const footerCenterY = height - bottomSpace / 2;
    ctx.save();
    ctx.fillStyle = theme.textColor;
    ctx.font = '800 44px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(settings.title || 'FREQZ PHOTOBOOTH', width / 2, footerCenterY - 40);

    ctx.fillStyle = theme.subtextColor;
    ctx.font = '500 28px "Outfit", sans-serif';
    ctx.fillText(settings.subtitle || 'CAPTURE THE MOMENT', width / 2, footerCenterY + 10);

    if (settings.showDateStamp) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }).toUpperCase();
      ctx.font = '600 22px "Space Grotesk", sans-serif';
      ctx.fillStyle = theme.textColor;
      ctx.fillText(`• ${dateStr} • #FREQZBOOTH`, width / 2, footerCenterY + 60);
    }
    ctx.restore();

  } else if (layout.id === 'grid-2x2') {
    const margin = 100;
    const topMargin = 120;
    const footerHeight = 320;
    const gap = 48;
    const photoWidth = (width - margin * 2 - gap) / 2;
    const photoHeight = (height - topMargin - footerHeight - gap) / 2;

    for (let i = 0; i < 4; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const x = margin + col * (photoWidth + gap);
      const y = topMargin + row * (photoHeight + gap);
      const img = loadedImages[i];

      if (img) {
        drawImageCover(ctx, img, x, y, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.roundRect(x, y, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
        ctx.fill();
      }
    }

    // Footer
    const footerY = height - footerHeight / 2;
    ctx.save();
    ctx.fillStyle = theme.textColor;
    ctx.font = '800 52px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(settings.title || 'FREQZ PHOTOBOOTH', width / 2, footerY - 30);

    ctx.fillStyle = theme.subtextColor;
    ctx.font = '500 30px "Outfit", sans-serif';
    ctx.fillText(settings.subtitle || 'MEMORIES IN 2x2', width / 2, footerY + 25);

    if (settings.showDateStamp) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }).toUpperCase();
      ctx.font = '600 24px "Space Grotesk", sans-serif';
      ctx.fillStyle = theme.textColor;
      ctx.fillText(`★ ${dateStr} ★`, width / 2, footerY + 75);
    }
    ctx.restore();

  } else if (layout.id === 'cinematic-wide') {
    const marginX = 140;
    const marginY = 120;
    const footerHeight = 220;
    const photoWidth = width - marginX * 2;
    const photoHeight = height - marginY - footerHeight;

    const img = loadedImages[0];
    if (img) {
      drawImageCover(ctx, img, marginX, marginY, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
    }

    // Cinematic footer letterbox style
    const footerY = height - footerHeight / 2;
    ctx.save();
    ctx.fillStyle = theme.textColor;
    ctx.font = '800 48px "Space Grotesk", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(settings.title || 'CINEMATIC MOMENTS', marginX + 20, footerY);

    ctx.fillStyle = theme.subtextColor;
    ctx.font = '500 28px "Outfit", sans-serif';
    ctx.fillText(settings.subtitle || 'DIRECTOR CUT 2026', marginX + 20, footerY + 45);

    if (settings.showDateStamp) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }).toUpperCase();
      ctx.textAlign = 'right';
      ctx.font = '600 28px "Space Grotesk", sans-serif';
      ctx.fillStyle = theme.textColor;
      ctx.fillText(`[ ${dateStr} ]`, width - marginX - 20, footerY + 20);
    }
    ctx.restore();
  }

  // 3. Render Stickers
  if (settings.stickers && settings.stickers.length > 0) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    settings.stickers.forEach((sticker) => {
      const posX = (sticker.x / 100) * width;
      const posY = (sticker.y / 100) * height;
      const fontSize = sticker.size * 2.2; // Scale for high-res canvas

      // Draw subtle drop shadow for emoji stickers
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;

      ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      ctx.fillText(sticker.emoji, posX, posY);
    });
    ctx.restore();
  }

  return canvas;
}

export async function exportPhotoStripDataUrl(
  layout: LayoutConfig,
  shots: CapturedShot[],
  theme: FrameThemeConfig,
  settings: CustomizationSettings
): Promise<string> {
  const canvas = await renderPhotoStripCanvas(layout, shots, theme, settings);
  return canvas.toDataURL('image/png');
}
