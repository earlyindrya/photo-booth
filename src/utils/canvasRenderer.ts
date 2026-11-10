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
  strokeColor = '#18181B',
  strokeWidth = 3
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

  // Border outline
  if (strokeColor && strokeWidth > 0) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }

  ctx.restore();
}

// Helper to draw a crisp vector polka dot
function drawPolkaDot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color = '#D92D20'
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
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

  // High-res canvas dimensions
  let width = 1200;
  let height = 3600;

  if (layout.id === 'zine-recap') {
    width = 1400;
    height = 3200;
  } else if (layout.id === 'polaroid-2x2') {
    width = 2000;
    height = 2400;
  } else if (layout.id === 'wide-hero') {
    width = 2200;
    height = 1500;
  }

  canvas.width = width;
  canvas.height = height;

  // 1. Draw Canvas Background
  if (Array.isArray(theme.canvasBg)) {
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

  // 2. Draw Ambient Red Polka Dots along the frame if enabled (Gen Z Trend from reference image)
  if (settings.showPolkaDots) {
    const dotCol = theme.dotColor || '#D92D20';
    // Border edge anchor dots
    drawPolkaDot(ctx, 70, 80, 24, dotCol);
    drawPolkaDot(ctx, width - 70, 90, 28, dotCol);
    drawPolkaDot(ctx, 50, height * 0.32, 22, dotCol);
    drawPolkaDot(ctx, width - 60, height * 0.48, 26, dotCol);
    drawPolkaDot(ctx, 65, height * 0.72, 24, dotCol);
    drawPolkaDot(ctx, width - 75, height * 0.85, 28, dotCol);
    drawPolkaDot(ctx, 120, height - 120, 22, dotCol);
    drawPolkaDot(ctx, width - 110, height - 100, 26, dotCol);
  }

  // Resolve font style
  const fontFam = {
    grotesk: '"Space Grotesk", sans-serif',
    serif: '"Playfair Display", Georgia, serif',
    script: '"Caveat", cursive',
    mono: '"Space Mono", monospace',
  }[settings.fontStyle || 'grotesk'];

  // 3. Layout Rendering
  if (layout.id === 'polkadot-4cut' || layout.id === 'classic-4cut') {
    const marginX = 100;
    const topMargin = 110;
    const bottomSpace = 400;
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
          '#18181B',
          4
        );
      } else {
        ctx.fillStyle = '#EBE7E0';
        ctx.roundRect(marginX, photoY, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
        ctx.fill();
      }

      // Corner Parenthetical Badge (1), (2), (3), (4)
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.roundRect(marginX + 20, photoY + 20, 64, 38, 10);
      ctx.fill();
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#18181B';
      ctx.font = 'bold 24px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`(${i + 1})`, marginX + 52, photoY + 47);
      ctx.restore();
    }

    // Bottom Wordmark & Metadata Area (Ref: Things i loved August!! (recap))
    const footerCenterY = height - bottomSpace / 2;
    ctx.save();
    ctx.fillStyle = theme.textColor;
    ctx.font = `bold 54px ${fontFam}`;
    ctx.textAlign = 'center';
    ctx.fillText(settings.title || 'Things i loved', width / 2, footerCenterY - 45);

    ctx.fillStyle = '#D92D20';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.fillText(settings.subtitle || 'August!! (recap)', width / 2, footerCenterY + 12);

    if (settings.showDateStamp) {
      ctx.font = 'bold 24px "Space Mono", monospace';
      ctx.fillStyle = theme.subtextColor;
      ctx.fillText(settings.editionText || 'edition 08.26 • vol.08', width / 2, footerCenterY + 70);
    }
    ctx.restore();

  } else if (layout.id === 'zine-recap') {
    // 3-Cut Asymmetric Zine Poster Style (Directly matching user's uploaded poster)
    const marginX = 130;
    const topMargin = 260;
    const bottomSpace = 440;
    const gap = 52;
    const photoWidth = width - marginX * 2;
    const photoHeight = (height - topMargin - bottomSpace - gap * 2) / 3;

    // Poster Header
    ctx.save();
    ctx.fillStyle = '#18181B';
    ctx.font = 'bold 64px "Space Grotesk", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Things', marginX, 140);

    ctx.font = 'bold 32px "Space Mono", monospace';
    ctx.fillStyle = '#71717A';
    ctx.fillText('(8)', marginX, 85);

    ctx.font = 'bold 64px "Space Grotesk", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#18181B';
    ctx.fillText('i', width - marginX, 140);

    ctx.font = 'bold 32px "Space Mono", monospace';
    ctx.fillStyle = '#71717A';
    ctx.fillText('(2)', width - marginX, 85);
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
          '#18181B',
          5
        );
      } else {
        ctx.fillStyle = '#EBE7E0';
        ctx.roundRect(marginX, photoY, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
        ctx.fill();
      }

      // Editorial number label
      ctx.save();
      ctx.fillStyle = '#D92D20';
      ctx.roundRect(marginX + 24, photoY + photoHeight - 56, 70, 40, 10);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`(${i + 1})`, marginX + 59, photoY + photoHeight - 28);
      ctx.restore();
    }

    // Poster Footer Area
    const footerY = height - bottomSpace / 2;
    ctx.save();
    ctx.fillStyle = '#18181B';
    ctx.font = 'bold 68px "Space Grotesk", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(settings.title || 'August!!', marginX, footerY - 20);

    ctx.font = 'bold 30px "Space Mono", monospace';
    ctx.fillStyle = '#71717A';
    ctx.fillText(settings.editionText || 'edition 08.26 • vol.08', marginX, footerY + 30);
    ctx.fillText('my picks • favorite finds', marginX, footerY + 68);

    ctx.font = 'bold 64px "Space Grotesk", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#D92D20';
    ctx.fillText('(recap)', width - marginX, footerY + 20);
    ctx.restore();

  } else if (layout.id === 'polaroid-2x2') {
    const margin = 120;
    const topMargin = 120;
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
        drawImageCover(ctx, img, x, y, photoWidth, photoHeight, settings.frameBorderRadius * 1.5, '#18181B', 4);
      } else {
        ctx.fillStyle = '#EBE7E0';
        ctx.roundRect(x, y, photoWidth, photoHeight, settings.frameBorderRadius * 1.5);
        ctx.fill();
      }

      // Corner badge
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.roundRect(x + 20, y + 20, 60, 36, 8);
      ctx.fill();
      ctx.fillStyle = '#18181B';
      ctx.font = 'bold 22px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`(${i + 1})`, x + 50, y + 46);
      ctx.restore();
    }

    const footerY = height - footerHeight / 2;
    ctx.save();
    ctx.fillStyle = theme.textColor;
    ctx.font = `bold 56px ${fontFam}`;
    ctx.textAlign = 'center';
    ctx.fillText(settings.title || 'Things i loved', width / 2, footerY - 30);

    ctx.fillStyle = '#D92D20';
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.fillText(settings.subtitle || 'August!! (recap)', width / 2, footerY + 25);

    if (settings.showDateStamp) {
      ctx.font = 'bold 26px "Space Mono", monospace';
      ctx.fillStyle = theme.subtextColor;
      ctx.fillText(settings.editionText || 'edition 08.26 • vol.08', width / 2, footerY + 75);
    }
    ctx.restore();

  } else {
    // Single Hero Cut
    const marginX = 160;
    const marginY = 140;
    const footerHeight = 240;
    const photoWidth = width - marginX * 2;
    const photoHeight = height - marginY - footerHeight;

    const img = loadedImages[0];
    if (img) {
      drawImageCover(ctx, img, marginX, marginY, photoWidth, photoHeight, settings.frameBorderRadius * 1.5, '#18181B', 5);
    }

    const footerY = height - footerHeight / 2;
    ctx.save();
    ctx.fillStyle = theme.textColor;
    ctx.font = `bold 54px ${fontFam}`;
    ctx.textAlign = 'left';
    ctx.fillText(settings.title || 'Things i loved.', marginX + 30, footerY);

    ctx.fillStyle = '#D92D20';
    ctx.font = 'bold 34px "Space Grotesk", sans-serif';
    ctx.fillText(settings.subtitle || 'August!! (recap)', marginX + 30, footerY + 50);

    ctx.font = 'bold 30px "Space Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = theme.subtextColor;
    ctx.fillText(settings.editionText || 'edition 08.26 • vol.08', width - marginX - 30, footerY + 30);
    ctx.restore();
  }

  // 4. Render Stickers with high-res anti-aliased drawing
  if (settings.stickers && settings.stickers.length > 0) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    settings.stickers.forEach((sticker) => {
      const posX = (sticker.x / 100) * width;
      const posY = (sticker.y / 100) * height;

      if (sticker.emoji === '🔴') {
        drawPolkaDot(ctx, posX, posY, sticker.size * 1.25, '#D92D20');
      } else if (sticker.emoji === '⚫') {
        drawPolkaDot(ctx, posX, posY, sticker.size * 1.25, '#18181B');
      } else if (sticker.emoji === '⚪') {
        drawPolkaDot(ctx, posX, posY, sticker.size * 1.25, '#FFFFFF');
      } else {
        const fontSize = sticker.size * 2.2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 12;
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