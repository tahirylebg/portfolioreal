import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDirectory = path.join(projectRoot, 'public');
const outputWidth = 1200;
const outputHeight = 675;
const documents = [
  { source: 'natty.pdf', output: 'natty-cover.webp' },
  { source: 'osint-nyv.pdf', output: 'osint-nyv-cover.webp' },
  { source: 'portail-cloud.pdf', output: 'portail-cloud-cover.webp' },
  { source: 'diagnostic-memoire-c.pdf', output: 'diagnostic-memoire-c-cover.webp' },
  { source: 'ansible-automation-rebuild.pdf', output: 'ansible-automation-rebuild-cover.webp' },
  { source: 'pymagotchi.pdf', output: 'pymagotchi-cover.webp' },
];

for (const document of documents) {
  const source = new Uint8Array(await fs.readFile(path.join(publicDirectory, document.source)));
  const pdf = await getDocument({ data: source }).promise;
  const page = await pdf.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = Math.max(outputWidth / baseViewport.width, outputHeight / baseViewport.height);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext('2d');

  context.fillStyle = '#101310';
  context.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: context, viewport }).promise;

  await sharp(canvas.toBuffer('image/png'))
    .resize(outputWidth, outputHeight, { fit: 'cover', position: 'attention' })
    .webp({ quality: 84 })
    .toFile(path.join(publicDirectory, document.output));

  console.log(`${document.source} -> ${document.output}`);
}
