import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import logo from '../../assets/images/ihave-white-logo.png';
import pointsOverlay from '../../assets/images/ponits.png';

const BG_COLOR_DEFAULT = '#21c55d';

// Define Apple and Android sizes
const TEMPLATES = {
  apple: {
    name: 'Apple Store (iPhone 6.7")',
    width: 1290,
    height: 2796,
  },
  ipad_ios: {
    name: 'Apple Store (iPad) 2064x2752',
    width: 2064,
    height: 2752,
  },
  android: {
    name: 'Android (Pixel 6 Pro) 1440x3120',
    width: 1440,
    height: 3120,
  },
  android_ipad: {
    name: 'Android (Tablet) 2064x2752',
    width: 2064,
    height: 2752,
  },
  android_ipad_alt: {
    name: 'Android (Tablet) 1600x2560',
    width: 1600,
    height: 2560,
  },
};

function Builder() {
  const [bgColor, setBgColor] = useState(BG_COLOR_DEFAULT);
  const [screenshots, setScreenshots] = useState([]);
  const [logoImg, setLogoImg] = useState(null); // User-uploaded logo
  const [results, setResults] = useState([]);
  const [platform, setPlatform] = useState('apple');

  // Handle screenshot file selection
  function handleScreenshotChange(e) {
    setScreenshots([...e.target.files]);
    setResults([]);
  }

  // Handle logo upload (optional)
  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogoImg(reader.result);
      reader.readAsDataURL(file);
    }
  }

  function drawRoundedImage(ctx, img, x, y, w, h, radius = 10) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
  }

  // Main generator
  async function handleGenerate() {
    setResults([]);
    const outputImages = [];
    const template = TEMPLATES[platform];

    for (let i = 0; i < screenshots.length; i++) {
      const file = screenshots[i];
      const screenshotUrl = URL.createObjectURL(file);
      const scrImg = await loadImage(screenshotUrl);
      let logoImage = null;
      if (logoImg) logoImage = await loadImage(logoImg);
      else logoImage = await loadImage(logo); // Uncomment to use default

      const canvas = document.createElement('canvas');
      canvas.width = template.width;
      canvas.height = template.height;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, template.width, template.height);

      const overlayImg = await loadImage(pointsOverlay);
      ctx.drawImage(overlayImg, 0, 0, template.width, template.height);

      // Draw logo at top (centered, fixed size)
      if (logoImage) {
        const logoH = template.height * 0.13; // adjust % as you wish
        const logoW = logoH;
        ctx.drawImage(
          logoImage,
          (template.width - logoW) / 2,
          60,
          logoW,
          logoH,
        );
      }

      // INCREASE size of screenshot (e.g., 78% of template width)
      const SPACING = 80;
      let targetW = template.width * 0.78;
      let targetH = targetW * (scrImg.height / scrImg.width);

      // If too tall, fit by height instead
      const maxH = template.height * 0.82;
      if (targetH > maxH) {
        targetH = maxH;
        targetW = targetH * (scrImg.width / scrImg.height);
      }

      // Place at the bottom with spacing
      const y = template.height - targetH - SPACING;
      const x = (template.width - targetW) / 2;

      // Add shadow effect
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.20)'; // Black shadow, 20% opacity
      ctx.shadowBlur = 32; // Blur radius
      ctx.shadowOffsetX = 0; // Horizontal offset
      ctx.shadowOffsetY = 12; // Vertical offset

      // Draw screenshot image with rounded corners
      drawRoundedImage(
        ctx,
        scrImg,
        x,
        y,
        targetW,
        targetH,
        Math.min(targetW, targetH) * 0.06,
      );

      ctx.restore();
      const url = canvas.toDataURL('image/png');
      outputImages.push({ url, idx: i });

      URL.revokeObjectURL(screenshotUrl);
    }
    setResults(outputImages);
  }
  // Download all as zip
  async function handleDownloadZip() {
    const zip = new JSZip();
    results.forEach((img, idx) => {
      // Remove data url prefix
      const base64 = img.url.split(',')[1];
      zip.file(`screenshot_${idx + 1}.png`, base64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `screenshots_${platform}.zip`);
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.src = src;
    });
  }

  // Calculate preview size proportional to template
  const PREVIEW_MAX_HEIGHT = 467;
  const PREVIEW_MAX_WIDTH = 215;
  const template = TEMPLATES[platform];
  let previewW = PREVIEW_MAX_WIDTH;
  let previewH = PREVIEW_MAX_HEIGHT;
  if (template) {
    const scaleW = PREVIEW_MAX_WIDTH / template.width;
    const scaleH = PREVIEW_MAX_HEIGHT / template.height;
    const scale = Math.min(scaleW, scaleH, 1);
    previewW = Math.round(template.width * scale);
    previewH = Math.round(template.height * scale);
  }

  return (
    <div>
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Store Screenshot Generator
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Crie imagens profissionais para App Store e Google Play em segundos.
        </p>
        <div className="mb-5">
          <label className="mb-1 block font-medium">Plataforma</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-green-400"
          >
            {Object.entries(TEMPLATES).map(([key, tpl]) => (
              <option key={key} value={key}>
                {tpl.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="mb-1 block font-medium">Cor de Fundo</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-10 rounded border"
            />
            <span className="text-gray-500">{bgColor}</span>
          </div>
        </div>
        <div className="mb-5">
          <label className="mb-1 block font-medium">Screenshots</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleScreenshotChange}
            className="block w-full cursor-pointer rounded border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none"
          />
          <span className="mt-1 block text-xs text-gray-400">
            Selecione 1 ou mais imagens
          </span>
        </div>
        <div className="mb-5">
          <label className="mb-1 block font-medium">
            Logo (opcional, PNG transparente)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="block w-full cursor-pointer rounded border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none"
          />
        </div>
        <button
          className="mb-4 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
          onClick={handleGenerate}
          disabled={!screenshots.length}
        >
          Gerar Imagens
        </button>
        {results.length > 1 && (
          <button
            onClick={handleDownloadZip}
            className="mb-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Baixar tudo em ZIP
          </button>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {results.map((img, idx) => (
            <div key={idx} className="mb-8 flex flex-col items-center">
              <img
                src={img.url}
                alt={`Result ${idx + 1}`}
                className="mb-2 rounded-lg shadow-lg"
                style={{
                  width: previewW,
                  height: previewH,
                  objectFit: 'cover',
                }}
              />
              <a
                href={img.url}
                download={`screenshot_${idx + 1}.png`}
                className="rounded bg-blue-500 px-3 py-1 font-semibold text-white hover:bg-blue-600"
              >
                Baixar
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Builder;
