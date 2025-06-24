import React, { useState, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import logo from "../../assets/images/ihave-white-logo.png";
import pointsOverlay from "../../assets/images/ponits.png";

const BG_COLOR_DEFAULT = "#21c55d";

// Define Apple and Android sizes
const TEMPLATES = {
  apple: {
    name: "Apple Store (iPhone 6.7\")",
    width: 1290,
    height: 2796,
  },
  android: {
    name: "Android (Pixel 6 Pro)",
    width: 1440,
    height: 3120,
  },
};


function Builder() {
  const [bgColor, setBgColor] = useState(BG_COLOR_DEFAULT);
  const [screenshots, setScreenshots] = useState([]);
  const [logoImg, setLogoImg] = useState(null); // User-uploaded logo
  const [results, setResults] = useState([]);
  const [platform, setPlatform] = useState("apple");

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

  function drawRoundedImage(ctx, img, x, y, w, h, radius = 48) {
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

      const canvas = document.createElement("canvas");
      canvas.width = template.width;
      canvas.height = template.height;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, template.width, template.height);

      const overlayImg = await loadImage(pointsOverlay);
      ctx.drawImage(overlayImg, 0, 0, template.width, template.height);

      // Draw logo at top (centered, fixed size)
      if (logoImage) {
        const logoH = template.height * 0.13;           // adjust % as you wish
        const logoW = logoH;
        ctx.drawImage(
          logoImage,
          (template.width - logoW) / 2,
          60,
          logoW,
          logoH
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
      ctx.shadowColor = 'rgba(0,0,0,0.20)';   // Black shadow, 20% opacity
      ctx.shadowBlur = 32;                    // Blur radius
      ctx.shadowOffsetX = 0;                  // Horizontal offset
      ctx.shadowOffsetY = 12; // Vertical offset

      // Draw screenshot image with rounded corners
      drawRoundedImage(ctx, scrImg, x, y, targetW, targetH, Math.min(targetW, targetH) * 0.06);

      ctx.restore();
      const url = canvas.toDataURL("image/png");
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
      const base64 = img.url.split(",")[1];
      zip.file(`screenshot_${idx + 1}.png`, base64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `screenshots_${platform}.zip`);
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.src = src;
    });
  }

  return (
    <div>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">
          Store Screenshot Generator
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Crie imagens profissionais para App Store e Google Play em segundos.
        </p>
        <div className="mb-5">
          <label className="font-medium block mb-1">Plataforma</label>
          <select
            value={platform}
            onChange={e => setPlatform(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-green-400"
          >
            <option value="apple">{TEMPLATES.apple.name}</option>
            <option value="android">{TEMPLATES.android.name}</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="font-medium block mb-1">Cor de Fundo</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={bgColor}
              onChange={e => setBgColor(e.target.value)}
              className="w-10 h-10 border rounded"
            />
            <span className="text-gray-500">{bgColor}</span>
          </div>
        </div>
        <div className="mb-5">
          <label className="font-medium block mb-1">Screenshots</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleScreenshotChange}
            className="block w-full text-gray-700 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
          />
          <span className="text-xs text-gray-400 mt-1 block">Selecione 1 ou mais imagens</span>
        </div>
        <div className="mb-5">
          <label className="font-medium block mb-1">Logo (opcional, PNG transparente)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="block w-full text-gray-700 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold mb-4 transition"
          onClick={handleGenerate}
          disabled={!screenshots.length}
        >
          Gerar Imagens
        </button>
        {results.length > 1 && (
          <button
            onClick={handleDownloadZip}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold mb-4 transition"
          >
            Baixar tudo em ZIP
          </button>
        )}
        <div className="flex flex-wrap gap-6 justify-center mt-8">
          {results.map((img, idx) => (
            <div key={idx} className="flex flex-col items-center mb-8">
              <img
                src={img.url}
                alt={`Result ${idx + 1}`}
                className="rounded-lg mb-2 shadow-lg border"
                style={{ width: 215, height: 467, objectFit: "cover" }}
              />
              <a
                href={img.url}
                download={`screenshot_${idx + 1}.png`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold"
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
