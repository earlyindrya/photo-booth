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
  borderRadius = 16,
  strokeColor = 'rgba(0, 0, 0, 0.08)',
  strokeWidth = 2
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
    renderW = height * imgRatio;
    offsetX = (width - renderW) / 2;
  } else {
    renderH = width / imgRatio;
    offsetY = (height - renderH) / 2;
  }

  ctx.drawImage(img, x + offsetX, y + offsetY, renderW, renderH);

  // Inner border
  if (strokeColor && strokeWidth > 0) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }

  ctx.restore();
}

// Helper to draw striped awning background (Ref 3)
function drawAwningStripes(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const stripeW = 44;
  const color1 = '#D7E5F5';
  const color2 = '#FFFDF9';

  ctx.fillStyle = color2;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = color1;
  for (let x = 0; x < width; x += stripeW * 2) {
    ctx.fillRect(x, 0, stripeW, height);
  }
}

// Helper to draw ornate Baroque gilded border (Ref 3)
function drawBaroqueFrame(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Outer antique gold line
  ctx.strokeStyle = '#8F7135';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Inner gilded line
  ctx.strokeStyle = '#C5A059';
  ctx.lineWidth = 6;
  ctx.strokeRect(50, 50, width - 100, height - 100);

  // Corner decorative squares
  const corners = [
    [30, 30],
    [width - 58, 30],
    [30, height - 58],
    [width - 58, height - 58],
  ];
  ctx.fillStyle = '#8F7135';
  corners.forEach(([cx, cy]) => {
    ctx.fillRect(cx - 4, cy - 4, 36, 36);
  });
  ctx.fillStyle = '#C5A059';
  corners.forEach(([cx, cy]) => {
    ctx.fillRect(cx + 2, cy + 2, 24, 24);
  });

  ctx.restore();
}

// Helper to draw Mac OS Window Chrome at top (Ref 4)
function drawMacWindowChrome(ctx: CanvasRenderingContext2D, width: number, barHeight: number) {
  ctx.save();
  // Chrome bar gradient
  const grad = ctx.createLinearGradient(0, 0, 0, barHeight);
  grad.addColorStop(0, '#ECECEC');
  grad.addColorStop(1, '#D4D4D4');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, barHeight);

  // Bottom border line
  ctx.strokeStyle = '#B5B5B5';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, barHeight);
  ctx.lineTo(width, barHeight);
  ctx.stroke();

  // Traffic lights
  const dotY = barHeight / 2;
  const radius = 18;
  const dots = [
    { x: 50, color: '#FF5F56', stroke: '#E0443E' },
    { x: 96, color: '#FFBD2E', stroke: '#DEA123' },
    { x: 142, color: '#27C93F', stroke: '#1AAB29' },
  ];

  dots.forEach(({ x, color, stroke }) => {
    ctx.beginPath();
    ctx.arc(x, dotY, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Window title text
  ctx.fillStyle = '#333333';
  ctx.font = 'bold 32px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('capsule_atelier.raw', width / 2, dotY + 11);

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

  if (layout.id === 'zine-moodboard') {
    width = 1300;
    height = 3200;
  } else if (layout.id === 'grid-2x2') {
    width = 2000;
    height = 2400;
  } else if (layout.id === 'cinematic-wide' || layout.id === 'vintage-baroque') {
    width = 2200;
    height = 1600;
  }

  canvas.width = width;
  canvas.height = height;

  // 1. Draw Background
  if (theme.id === 'retro-stripes') {
    drawAwningStripes(ctx, width, height);
  } else if (Array.isArray(theme.canvasBg)) {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    theme.canvasBg.forEach((color, index) => {
      grad.addColorStop(index / (theme.canvasBg.length - 1), color);
    });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.fillStyle = theme.canvasBg;
    ctx.fillRect(0, 0, width, height);
  }

  // Draw Baroque Frame if theme is Baroque
  if (theme.id === 'baroque-gold' || layout.id === 'vintage-baroque') {
    drawBaroqueFrame(ctx, width, height);
  }

  // Draw Mac OS Chrome bar if theme or layout is Y2K (Ref 4)
  const isMacTheme = theme.id === 'y2k-mac' || layout.id === 'mac-window-strip';
  const macBarHeight = isMacTheme ? 100 : 0;
  if (isMacTheme) {
    drawMacWindowChrome(ctx, width, macBarHeight);
  }

  // Resolve font family string for canvas rendering
  const fontFam = {
    serif: '"Playfair Display", Georgia, serif',
    sans: '"Plus Jakarta Sans", sans-serif',
    script: '"Caveat", cursive',
    mono: '"Space Mono", monospace',
  }[settings.fontStyle || 'serif'];

  // 2. Layout-specific photo placements
  if (layout.id === 'classic-4cut' || layout.id === 'mac-window-strip') {
    const marginX = 90;
    const topMargin = macBarHeight + 90;
    const bottomSpace = 380;
    const availableHeight = height - topMargin - bottomSpace;
    const gap = 44;
    const photoWidth = width - marginX * 2;
    const photoHeight = (availableHeight - gap * 3) / 4;

    for (let i = 0; i < 4; i++) {
      const img = loadedImages[i];
      const photoY = topMargin + i * (photoHeight + gap);

      if (img) {
        drawImageCover(
          ctx, 
          img, 
          marginX, 
          photoY, 
          photoWidth, 
          photoHeight, 
          settings.frameBorderRadius * 1.5,
          theme.id === 'cream-paper' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.08)'
        );
      } else {
        ctx.fillStyle = '#EBE4D8';
        ctx.roundRect(marginX, photoY, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
        ctx.fill();
      }

      // Small photo number badge in corner (Ref 5)
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.roundRect(marginX + 20, photoY + 20, 60, 36, 10);
      ctx.fill();
      ctx.fillStyle = '#1A1A1A';
      ctx.font = 'bold 22px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`(${i + 1})`, marginX + 50, photoY + 45);
      ctx.restore();
    }

    // Bottom Typography Area (Ref 2, 5)
    const footerCenterY = height - bottomSpace / 2;
    ctx.save();
    ctx.fillStyle = theme.textColor;
    ctx.font = `bold 52px ${fontFam}`;
    ctx.textAlign = 'center';
    ctx.fillText(settings.title || 'capsule photobooth', width / 2, footerCenterY - 45);

    ctx.fillStyle = theme.subtextColor;
    ctx.font = '500 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(settings.subtitle || 'monthly recap • studio moments', width / 2, footerCenterY + 12);

    if (settings.showDateStamp) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }).toUpperCase();
      ctx.font = 'bold 24px "Space Mono", monospace';
      ctx.fillStyle = theme.textColor;
      ctx.fillText(`• ${dateStr} • VOL.08 (RECAP)`, width / 2, footerCenterY + 68);
    }

    // Handwritten cursive sign-off (Ref 2 "smm goza")
    if (settings.fontStyle === 'script') {
      ctx.font = 'italic 48px "Caveat", cursive';
      ctx.fillStyle = theme.textColor;
      ctx.fillText('smm goza • atelier', width / 2, footerCenterY + 130);
    }

    ctx.restore();

  } else if (layout.id === 'zine-moodboard') {
    // 3 Photos Asymmetric Zine Layout with Polka Dots (Ref 5)
    const marginX = 110;
    const topMargin = 220;
    const bottomSpace = 360;
    const gap = 52;
    const photoWidth = width - marginX * 2;
    const photoHeight = (height - topMargin - bottomSpace - gap * 2) / 3;

    // Zine Top Header (Ref 5: Things I loved this month)
    ctx.save();
    ctx.fillStyle = '#8B1E27';
    ctx.font = 'italic bold 56px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'left';
    ctx.fillText('Things i loved.', marginX, 120);

    ctx.fillStyle = '#706B65';
    ctx.font = 'bold 28px "Space Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('edition 08.26 / vol.08', width - marginX, 120);
    ctx.restore();

    for (let i = 0; i < 3; i++) {
      const img = loadedImages[i];
      const photoY = topMargin + i * (photoHeight + gap);

      if (img) {
        drawImageCover(
          ctx, 
          img, 
          marginX, 
          photoY, 
          photoWidth, 
          photoHeight, 
          settings.frameBorderRadius * 1.5,
          '#1A1A1A',
          4
        );
      } else {
        ctx.fillStyle = '#EAE4D9';
        ctx.roundRect(marginX, photoY, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
        ctx.fill();
      }

      // Editorial number label (Ref 5: (1), (2), (3))
      ctx.save();
      ctx.fillStyle = '#D92D20';
      ctx.beginPath();
      ctx.arc(marginX - 30, photoY + 50, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1A1A1A';
      ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`(${i + 1})`, marginX + 30, photoY + photoHeight - 30);
      ctx.restore();
    }

    // Zine Footer
    const footerY = height - bottomSpace / 2;
    ctx.save();
    ctx.fillStyle = '#1A1A1A';
    ctx.font = `bold 54px ${fontFam}`;
    ctx.textAlign = 'center';
    ctx.fillText(settings.title || 'August!! (recap)', width / 2, footerY - 20);

    ctx.font = 'italic 34px "Playfair Display", serif';
    ctx.fillStyle = '#8B1E27';
    ctx.fillText(settings.subtitle || 'favorite finds & moments', width / 2, footerY + 35);
    ctx.restore();

  } else if (layout.id === 'grid-2x2') {
    const margin = 120;
    const topMargin = macBarHeight + 120;
    const footerHeight = 360;
    const gap = 52;
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
        ctx.fillStyle = '#EAE4D9';
        ctx.roundRect(x, y, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
        ctx.fill();
      }

      // Small corner badge
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.roundRect(x + 18, y + 18, 54, 32, 8);
      ctx.fill();
      ctx.fillStyle = '#1F1E1D';
      ctx.font = 'bold 20px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`(${i + 1})`, x + 45, y + 41);
      ctx.restore();
    }

    // Footer
    const footerY = height - footerHeight / 2;
    ctx.save();
    ctx.fillStyle = theme.textColor;
    ctx.font = `bold 56px ${fontFam}`;
    ctx.textAlign = 'center';
    ctx.fillText(settings.title || 'capsule photobooth', width / 2, footerY - 30);

    ctx.fillStyle = theme.subtextColor;
    ctx.font = '500 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(settings.subtitle || 'MEMORIES IN 2x2', width / 2, footerY + 25);

    if (settings.showDateStamp) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }).toUpperCase();
      ctx.font = 'bold 26px "Space Mono", monospace';
      ctx.fillStyle = theme.textColor;
      ctx.fillText(`★ ${dateStr} ★`, width / 2, footerY + 75);
    }
    ctx.restore();

  } else {
    // Cinematic Wide or Vintage Baroque Portrait
    const marginX = 160;
    const marginY = macBarHeight + 140;
    const footerHeight = 240;
    const photoWidth = width - marginX * 2;
    const photoHeight = height - marginY - footerHeight;

    const img = loadedImages[0];
    if (img) {
      drawImageCover(
        ctx, 
        img, 
        marginX, 
        marginY, 
        photoWidth, 
        photoHeight, 
        settings.frameBorderRadius * 1.5,
        theme.id === 'baroque-gold' ? '#8F7135' : 'rgba(0, 0, 0, 0.1)',
        theme.id === 'baroque-gold' ? 6 : 2
      );
    }

    // Letterbox Footer
    const footerY = height - footerHeight / 2;
    ctx.save();
    ctx.fillStyle = theme.textColor;
    ctx.font = `bold 50px ${fontFam}`;
    ctx.textAlign = 'left';
    ctx.fillText(settings.title || 'Curious by Heart.', marginX + 30, footerY);

    ctx.fillStyle = theme.subtextColor;
    ctx.font = 'italic 32px "Playfair Display", serif';
    ctx.fillText(settings.subtitle || 'Capsule Atelier Exhibition 2026', marginX + 30, footerY + 50);

    // Cursive sign-off (Ref 2 "smm goza")
    ctx.font = 'italic 48px "Caveat", cursive';
    ctx.textAlign = 'right';
    ctx.fillStyle = theme.textColor;
    ctx.fillText('smm goza • atelier', width - marginX - 30, footerY + 30);
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

      if (sticker.emoji === '🔴') {
        // High-res vector red polka dot (Ref 5)
        ctx.fillStyle = '#D92D20';
        ctx.shadowColor = 'rgba(217, 45, 32, 0.35)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(posX, posY, sticker.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
      } else if (sticker.emoji === '⚪') {
        // High-res vector white circle dot (Ref 2)
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(posX, posY, sticker.size * 1.3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Emoji sticker
        const fontSize = sticker.size * 2.2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        ctx.shadowBlur = 14;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.fillText(sticker.emoji, posX, posY);
      }
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