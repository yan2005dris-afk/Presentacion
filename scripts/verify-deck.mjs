#!/usr/bin/env node
/**
 * Verificación del deck de Estadística Inferencial.
 *
 * Uso:
 *   npm run build
 *   npx vite preview --port 4173 --strictPort   (en otra terminal)
 *   node scripts/verify-deck.mjs
 *
 * Comprueba: orden y cantidad de slides de la sección de Andy, errores de
 * consola, desborde vertical y presencia de las cifras clave verificadas.
 */
import { chromium } from 'playwright';

const URL = process.env.PREVIEW_URL || 'http://localhost:4173/';
const SECCION_ANDY = 'P5';
const VIEWPORT = { width: 1600, height: 900 };
const MAX_ALTO = 694; // viewport útil 758 px − padding vertical del main (64 px)

const TITULOS_ESPERADOS = [
  'Toda Decisión Tiene un Riesgo',
  'α: el Área que Decides Tolerar',
  'El P-Valor: ¿Qué Tan Raro Fue Eso si Nada Cambió?',
  'La Regla de Decisión: p ≤ α',
  'Lo que el P-Valor NO Es',
  'El Criterio Estadístico, Automatizado',
  'Lo que te Llevas',
];

const CIFRAS_ESPERADAS = [
  { re: /0\.0211/, etiqueta: 'p-valor e-commerce (bilateral)' },
  { re: /0\.0207/, etiqueta: 'p-valor monedas (15 de 20)' },
  { re: /0\.2587/, etiqueta: 'p-valor control de calidad' },
  { re: /66\.5\s*%|66\.5/, etiqueta: 'poder con n = 4.000' },
  { re: /5\.5\d\d|5\.519/, etiqueta: 'n para 80% de poder' },
  { re: /64\.15|64\.1/, etiqueta: '20 tests al 5% → falsos positivos' },
];

const fallos = [];
const ok = (cond, msg) => {
  console.log(`${cond ? '  OK  ' : ' FALLA'} ${msg}`);
  if (!cond) fallos.push(msg);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT });

const erroresConsola = [];
page.on('pageerror', (e) => erroresConsola.push('pageerror: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') erroresConsola.push('console: ' + m.text());
});

await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(700);

console.log('\n— Navegación a la sección de Andy —');
await page.locator('footer button', { hasText: SECCION_ANDY }).first().click();
await page.waitForTimeout(600);

console.log('\n— Slides de la sección —');
const titulos = [];
const alturas = [];
for (let i = 0; i < TITULOS_ESPERADOS.length; i++) {
  const t = await page.locator('header h1').innerText();
  const m = await page.evaluate(() => {
    const main = document.querySelector('main');
    const cont = main.querySelector('div');
    return {
      h: Math.round(cont.getBoundingClientRect().height),
      vp: main.clientHeight,
      over: main.scrollHeight - main.clientHeight,
    };
  });
  titulos.push(t);
  alturas.push(m);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(380);
}

ok(titulos.length === TITULOS_ESPERADOS.length, `la sección expone ${TITULOS_ESPERADOS.length} slides`);
TITULOS_ESPERADOS.forEach((esperado, i) => {
  ok(titulos[i] === esperado, `slide ${i}: "${titulos[i]}"`);
});

console.log('\n— Desborde vertical (viewport útil ' + alturas[0].vp + ' px) —');
alturas.forEach((m, i) => {
  ok(m.over === 0 && m.h <= MAX_ALTO, `slide ${i}: alto ${m.h}px, desborde ${m.over}px`);
});

console.log('\n— Cifras clave —');
// se recorren todas las slides del deck buscando las cifras
const textoDeck = [];
await page.locator('footer button', { hasText: 'P0' }).first().click();
await page.waitForTimeout(400);
for (let i = 0; i < 20; i++) {
  textoDeck.push(await page.locator('main').innerText());
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(220);
}
const todo = textoDeck.join('\n');
CIFRAS_ESPERADAS.forEach((c) => {
  ok(c.re.test(todo), `${c.etiqueta} → ${c.re}`);
});

console.log('\n— Errores de consola —');
ok(erroresConsola.length === 0, erroresConsola.length === 0 ? 'sin errores' : erroresConsola.join(' | '));

await browser.close();

console.log(`\n${fallos.length === 0 ? '✅ TODO OK' : `❌ ${fallos.length} fallo(s)`}`);
if (fallos.length) {
  fallos.forEach((f) => console.log('   - ' + f));
  process.exit(1);
}
