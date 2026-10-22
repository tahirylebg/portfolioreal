import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDirectory = path.join(projectRoot, 'public');
const cacheDirectory = path.join(projectRoot, 'node_modules', '.cache', 'og-fonts');

const width = 1200;
const height = 627;
const outputFile = path.join(publicDirectory, 'og-image.jpg');

const siteUrl = 'https://tahiryramambazafy.tahiry-ramambazafy.workers.dev/';

const fontSources = [
  { family: 'Barlow Condensed', weights: [700], file: 'barlow-condensed' },
  { family: 'Space Mono', weights: [400, 700], file: 'space-mono' },
];

function oklchToRgb(L, C, H) {
  const hue = (H * Math.PI) / 180;
  const a = C * Math.cos(hue);
  const b = C * Math.sin(hue);

  const lPrime = L + 0.3963377774 * a + 0.2158037573 * b;
  const mPrime = L - 0.1055613458 * a - 0.0638541728 * b;
  const sPrime = L - 0.0894841775 * a - 1.291485548 * b;

  const l = lPrime ** 3;
  const m = mPrime ** 3;
  const s = sPrime ** 3;

  const rLinear = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLinear = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLinear = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const encode = (channel) => {
    const value = channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055;
    return Math.min(255, Math.max(0, Math.round(value * 255)));
  };

  return { r: encode(rLinear), g: encode(gLinear), b: encode(bLinear) };
}

const palette = {
  night: oklchToRgb(0.17, 0.012, 145),
  ink: oklchToRgb(0.96, 0.012, 115),
  muted: oklchToRgb(0.73, 0.018, 125),
  subtle: oklchToRgb(0.58, 0.016, 125),
  lime: oklchToRgb(0.88, 0.19, 124),
  line: oklchToRgb(0.38, 0.018, 140),
  glow: oklchToRgb(0.23, 0.025, 151),
};

const rgba = (color, alpha = 1) => `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;

async function fetchFontFiles() {
  await fs.mkdir(cacheDirectory, { recursive: true });
  const downloaded = [];

  for (const font of fontSources) {
    for (const weight of font.weights) {
      const target = path.join(cacheDirectory, `${font.file}-${weight}.ttf`);
      try {
        await fs.access(target);
      } catch {
        const url = `https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}:wght@${weight}&display=swap`;
        const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/4.0' } });
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        const css = await response.text();
        const source = css.match(/src:\s*url\(([^)]+)\)/);
        if (!source) throw new Error('no font source found');
        const fontResponse = await fetch(source[1]);
        if (!fontResponse.ok) throw new Error(`${fontResponse.status} ${fontResponse.statusText}`);
        const payload = Buffer.from(await fontResponse.arrayBuffer());
        const isTrueType = payload.readUInt32BE(0) === 0x00010000 || payload.subarray(0, 4).toString() === 'OTTO';
        if (!isTrueType) throw new Error(`unexpected font format for ${font.family} ${weight}`);
        await fs.writeFile(target, payload);
      }
      downloaded.push({ ...font, weight, path: target });
    }
  }

  return downloaded;
}

async function registerFonts() {
  const files = await fetchFontFiles();

  for (const file of files) {
    GlobalFonts.registerFromPath(file.path);
  }

  const families = new Set(GlobalFonts.families.map((entry) => entry.family));
  const display = families.has('Barlow Condensed') ? 'Barlow Condensed' : 'Arial Narrow';
  const mono = families.has('Space Mono') ? 'Space Mono' : 'Consolas';

  if (!families.has('Arial Narrow')) GlobalFonts.registerFromPath('C:/Windows/Fonts/ARIALN.TTF', 'Arial Narrow');
  if (!families.has('Consolas')) GlobalFonts.registerFromPath('C:/Windows/Fonts/consola.ttf', 'Consolas');

  return { display, mono };
}

function drawBackground(context) {
  context.fillStyle = rgba(palette.night);
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.78, height * 0.46, 0, width * 0.78, height * 0.46, width * 0.62);
  glow.addColorStop(0, rgba(palette.glow, 0.85));
  glow.addColorStop(0.55, rgba(palette.glow, 0.28));
  glow.addColorStop(1, rgba(palette.night, 0));
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  const topLight = context.createLinearGradient(0, 0, 0, height);
  topLight.addColorStop(0, rgba(palette.ink, 0.05));
  topLight.addColorStop(0.6, rgba(palette.night, 0));
  topLight.addColorStop(1, rgba(palette.night, 0.55));
  context.fillStyle = topLight;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = 'rgba(210, 226, 212, 0.055)';
  context.lineWidth = 1;
  for (let x = 0; x <= width; x += width / 12) {
    context.beginPath();
    context.moveTo(Math.round(x) + 0.5, 0);
    context.lineTo(Math.round(x) + 0.5, height);
    context.stroke();
  }
  for (let y = 0; y <= height; y += 88) {
    context.beginPath();
    context.moveTo(0, Math.round(y) + 0.5);
    context.lineTo(width, Math.round(y) + 0.5);
    context.stroke();
  }
}

function drawCorners(context) {
  const inset = 34;
  const arm = 26;
  context.strokeStyle = rgba(palette.lime, 0.42);
  context.lineWidth = 1.5;

  const corners = [
    [inset, inset, 1, 1],
    [width - inset, inset, -1, 1],
    [inset, height - inset, 1, -1],
    [width - inset, height - inset, -1, -1],
  ];

  for (const [x, y, dx, dy] of corners) {
    context.beginPath();
    context.moveTo(x + dx * arm, y);
    context.lineTo(x, y);
    context.lineTo(x, y + dy * arm);
    context.stroke();
  }
}

function drawNetwork(context) {
  const nodes = [
    [905, 205, 5],
    [1010, 175, 3],
    [1105, 240, 4],
    [860, 330, 3],
    [975, 300, 6],
    [1085, 355, 3],
    [905, 430, 4],
    [1030, 455, 3],
    [1115, 470, 2],
  ];

  context.lineWidth = 1;
  context.strokeStyle = rgba(palette.ink, 0.12);
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const [x1, y1] = nodes[i];
      const [x2, y2] = nodes[j];
      const distance = Math.hypot(x2 - x1, y2 - y1);
      if (distance > 190) continue;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    }
  }

  for (const [x, y, size] of nodes) {
    context.fillStyle = rgba(palette.muted, 0.4);
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
  }

  const core = nodes[4];
  const halo = context.createRadialGradient(core[0], core[1], 0, core[0], core[1], 130);
  halo.addColorStop(0, rgba(palette.lime, 0.28));
  halo.addColorStop(1, rgba(palette.lime, 0));
  context.fillStyle = halo;
  context.beginPath();
  context.arc(core[0], core[1], 130, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = rgba(palette.lime, 0.5);
  context.lineWidth = 1;
  for (const radius of [34, 58]) {
    context.beginPath();
    context.arc(core[0], core[1], radius, 0, Math.PI * 2);
    context.stroke();
  }

  context.fillStyle = rgba(palette.lime);
  context.beginPath();
  context.arc(core[0], core[1], 6, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = rgba(palette.subtle, 0.85);
  context.font = `400 11px 'Space Mono', Consolas, monospace`;
  context.textAlign = 'center';
  context.fillText('SURFACE D’ANALYSE', core[0], core[1] + 92);
  context.textAlign = 'left';
}

function drawBrand(context, fonts) {
  const left = 64;
  const top = 46;
  const size = 40;

  context.strokeStyle = rgba(palette.lime);
  context.lineWidth = 1.5;
  context.strokeRect(left + 0.75, top + 0.75, size, size);

  context.strokeStyle = rgba(palette.lime, 0.3);
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(left + size / 2, top + 7);
  context.lineTo(left + size / 2, top + size - 7);
  context.stroke();

  context.fillStyle = rgba(palette.ink);
  context.font = `700 24px '${fonts.display}'`;
  context.textBaseline = 'alphabetic';
  context.fillText('T', left + 8, top + 29);

  context.fillStyle = rgba(palette.lime);
  context.fillRect(left + size - 9, top + size - 9, 4, 4);

  context.fillStyle = rgba(palette.ink);
  context.font = `700 13px '${fonts.mono}'`;
  if ('letterSpacing' in context) context.letterSpacing = '1px';
  context.fillText('TAHIRY RAMAMBAZAFY', left + size + 16, top + 25);
  if ('letterSpacing' in context) context.letterSpacing = '0px';

  context.fillStyle = rgba(palette.subtle);
  context.font = `400 12px '${fonts.mono}'`;
  context.textAlign = 'right';
  if ('letterSpacing' in context) context.letterSpacing = '1px';
  context.fillText('PORTFOLIO / 2026', width - 64, top + 25);
  if ('letterSpacing' in context) context.letterSpacing = '0px';
  context.textAlign = 'left';

  context.strokeStyle = rgba(palette.line, 0.55);
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(64, top + size + 20.5);
  context.lineTo(width - 64, top + size + 20.5);
  context.stroke();
}

function drawOverline(context, fonts) {
  const left = 64;
  const baseline = 146;

  context.fillStyle = rgba(palette.lime);
  context.beginPath();
  context.arc(left + 4, baseline - 4, 4, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = rgba(palette.muted);
  context.font = `400 12.5px '${fonts.mono}'`;
  if ('letterSpacing' in context) context.letterSpacing = '1.4px';
  context.fillText('ÉTUDIANT EN CYBERSÉCURITÉ', left + 20, baseline);

  const labelWidth = context.measureText('ÉTUDIANT EN CYBERSÉCURITÉ').width;
  context.fillStyle = rgba(palette.subtle);
  context.fillText('·', left + 30 + labelWidth, baseline);
  context.fillText('SYSTÈMES, RÉSEAUX & SÉCURITÉ WEB', left + 48 + labelWidth, baseline);
  if ('letterSpacing' in context) context.letterSpacing = '0px';
}

function drawHeadline(context, fonts) {
  const left = 64;
  const maxWidth = 680;
  const lines = [
    { text: 'Comprendre', suffix: '.', style: 'fill' },
    { text: 'Sécuriser', suffix: '.', style: 'fill' },
    { text: 'Construire', suffix: '.', style: 'stroke' },
  ];

  let fontSize = 150;
  context.font = `700 ${fontSize}px '${fonts.display}'`;
  while (context.measureText('Comprendre.').width > maxWidth && fontSize > 88) {
    fontSize -= 2;
    context.font = `700 ${fontSize}px '${fonts.display}'`;
  }

  const lineHeight = fontSize * 0.84;
  const top = 186;
  context.textBaseline = 'alphabetic';

  lines.forEach((line, index) => {
    const baseline = top + fontSize * 0.74 + index * lineHeight;
    if (line.style === 'stroke') {
      context.strokeStyle = rgba(palette.ink, 0.92);
      context.lineWidth = 2.2;
      context.strokeText(line.text, left, baseline);
    } else {
      context.fillStyle = rgba(palette.ink);
      context.fillText(line.text, left, baseline);
    }
    context.fillStyle = rgba(palette.lime);
    context.fillText(line.suffix, left + context.measureText(line.text).width, baseline);
  });

  return top + fontSize * 0.74 + 2 * lineHeight;
}

function drawFooter(context, fonts) {
  const baseline = height - 34;

  context.fillStyle = rgba(palette.subtle);
  context.font = `400 12px '${fonts.mono}'`;
  if ('letterSpacing' in context) context.letterSpacing = '1px';
  context.fillText('SÉCURITÉ WEB · OSINT · LINUX · ANSIBLE', 64, baseline);
  context.textAlign = 'right';
  context.fillText('31° 36′ 48.0″ S / 43° 40′ 48.0″ E', width - 64, baseline);
  context.textAlign = 'left';
  if ('letterSpacing' in context) context.letterSpacing = '0px';
}

function buildNoise() {
  const buffer = Buffer.alloc(width * height * 4);
  for (let index = 0; index < buffer.length; index += 4) {
    const value = 118 + Math.floor(Math.random() * 46);
    buffer[index] = value;
    buffer[index + 1] = value;
    buffer[index + 2] = value;
    buffer[index + 3] = 30;
  }
  return sharp(buffer, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

const fonts = await registerFonts();
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

drawBackground(context);
drawCorners(context);
drawNetwork(context);
drawBrand(context, fonts);
drawOverline(context, fonts);
drawHeadline(context, fonts);
drawFooter(context, fonts);

const noise = await buildNoise();
const raw = canvas.toBuffer('image/png');
const output = await sharp(raw)
  .composite([{ input: noise, blend: 'overlay' }])
  .jpeg({ quality: 90, chromaSubsampling: '4:4:4', mozjpeg: true })
  .toFile(outputFile);

const stats = await fs.stat(outputFile);
console.log(`og-image.jpg -> ${output.width}x${output.height} · ${(stats.size / 1024).toFixed(1)} Ko`);
console.log(`public url: ${siteUrl}og-image.jpg`);
