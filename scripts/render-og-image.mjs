import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDirectory = path.join(projectRoot, 'public');
const cacheDirectory = path.join(projectRoot, 'node_modules', '.cache', 'og-fonts');

const width = 1200;
const height = 630;
const outputFile = path.join(publicDirectory, 'og-image.jpg');

const siteUrl = 'https://tahiryramambazafy.tahiry-ramambazafy.workers.dev/';

const fontSources = [
  { family: 'IBM Plex Sans', weights: [500, 700], file: 'ibm-plex-sans' },
  { family: 'JetBrains Mono', weights: [400, 700], file: 'jetbrains-mono' },
];

const hex = (value) => ({ r: parseInt(value.slice(1, 3), 16), g: parseInt(value.slice(3, 5), 16), b: parseInt(value.slice(5, 7), 16) });

// Same tokens as src/styles/global.css.
const palette = {
  night: hex('#111927'),
  panel: hex('#1a2332'),
  ink: hex('#e6ebf2'),
  muted: hex('#a9b5c7'),
  subtle: hex('#8593a8'),
  lime: hex('#9fef00'),
  onLime: hex('#111927'),
  line: hex('#2a374b'),
  glow: hex('#1d2a40'),
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
  const display = families.has('IBM Plex Sans') ? 'IBM Plex Sans' : 'Segoe UI';
  const mono = families.has('JetBrains Mono') ? 'JetBrains Mono' : 'Consolas';

  if (!families.has('Segoe UI')) GlobalFonts.registerFromPath('C:/Windows/Fonts/segoeuib.ttf', 'Segoe UI');
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

  context.strokeStyle = rgba(palette.line, 0.35);
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

}

function drawBrand(context, fonts) {
  const left = 64;
  const top = 46;
  const size = 40;

  context.fillStyle = rgba(palette.lime);
  context.beginPath();
  context.roundRect(left, top, size, size, 6);
  context.fill();

  context.fillStyle = rgba(palette.onLime);
  context.font = `700 22px '${fonts.mono}'`;
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.fillText('T', left + size / 2, top + 28);
  context.textAlign = 'left';

  context.fillStyle = rgba(palette.ink);
  context.font = `500 18px '${fonts.display}'`;
  context.fillText('Tahiry Ramambazafy', left + size + 16, top + 26);

  context.fillStyle = rgba(palette.subtle);
  context.font = `400 13px '${fonts.mono}'`;
  context.textAlign = 'right';
  context.fillText('portfolio', width - 64, top + 26);
  context.textAlign = 'left';

  context.strokeStyle = rgba(palette.line);
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(64, top + size + 20.5);
  context.lineTo(width - 64, top + size + 20.5);
  context.stroke();
}

function drawOverline(context, fonts) {
  const left = 64;
  const top = 160;
  const label = 'Recherche une alternance en cybersécurité';

  context.font = `400 15px '${fonts.mono}'`;
  const pillWidth = context.measureText(label).width + 52;
  context.fillStyle = rgba(palette.lime, 0.08);
  context.strokeStyle = rgba(palette.lime, 0.4);
  context.lineWidth = 1;
  context.beginPath();
  context.roundRect(left + 0.5, top + 0.5, pillWidth, 34, 17);
  context.fill();
  context.stroke();

  context.fillStyle = rgba(palette.lime);
  context.beginPath();
  context.arc(left + 20, top + 17.5, 4, 0, Math.PI * 2);
  context.fill();
  context.fillText(label, left + 34, top + 22.5);
}

function drawHeadline(context, fonts) {
  const left = 64;
  context.textBaseline = 'alphabetic';
  context.fillStyle = rgba(palette.ink);
  context.font = `700 92px '${fonts.display}'`;
  context.fillText('Tahiry', left, 300);
  context.fillText('Ramambazafy', left, 396);

  context.fillStyle = rgba(palette.muted);
  context.font = `500 30px '${fonts.display}'`;
  context.fillText('Étudiant en cybersécurité · Ynov', left, 456);
}

function drawFooter(context, fonts) {
  const baseline = height - 44;

  context.fillStyle = rgba(palette.subtle);
  context.font = `400 15px '${fonts.mono}'`;
  context.fillText('Sécurité web · OSINT · Linux · Ansible', 64, baseline);
  context.textAlign = 'right';
  context.fillText('Toulouse', width - 64, baseline);
  context.textAlign = 'left';
}

function buildNoise() {
  const buffer = Buffer.alloc(width * height * 4);
  for (let index = 0; index < buffer.length; index += 4) {
    const value = 118 + Math.floor(Math.random() * 46);
    buffer[index] = value;
    buffer[index + 1] = value;
    buffer[index + 2] = value;
    buffer[index + 3] = 12;
  }
  return sharp(buffer, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

const fonts = await registerFonts();
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

drawBackground(context);
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
