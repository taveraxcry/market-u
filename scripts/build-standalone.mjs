// Turns the Vite build (dist/dev.html + assets) into ONE self-contained
// index.html at the project root, so the app works by opening the file
// directly in the browser (file://), without a server.
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const read = (rel) => readFileSync(join(dist, rel.replace(/^\.\//, '')), 'utf8');

let html = read('dev.html');

// Inline the stylesheet(s).
html = html.replace(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g, (tag, href) => {
  if (/^https?:/.test(href)) return tag; // keep Google Fonts
  return `<style>\n${read(href)}\n</style>`;
});

// Inline the JavaScript bundle. External module scripts are blocked on file://,
// inline ones are not. Escape sequences that would end the <script> tag early.
html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, (_, src) => {
  const code = read(src).replace(/<\/script/gi, '<\/script').replace(/<!--/g, '<\!--');
  return `<script type="module">\n${code}\n</script>`;
});

// Inline the favicon.
const favicon = join(root, 'public', 'favicon.svg');
if (existsSync(favicon)) {
  const data = Buffer.from(readFileSync(favicon)).toString('base64');
  html = html.replace(/href="[^"]*favicon\.svg"/, `href="data:image/svg+xml;base64,${data}"`);
}

if (/src="\.?\/assets\//.test(html) || /href="\.?\/assets\//.test(html)) {
  throw new Error('Some assets were not inlined.');
}

const banner = '<!-- Archivo generado automáticamente con "npm run build". Para editar la app, modifica src/ y vuelve a compilar. -->\n';
writeFileSync(join(root, 'index.html'), banner + html);
rmSync(dist, { recursive: true, force: true });
console.log(`index.html listo (${Math.round(Buffer.byteLength(html) / 1024)} KB). Ábrelo con doble clic.`);
