#!/usr/bin/env node
/**
 * Verificación del deck de Estadística Inferencial.
 *
 * Uso:
 *   npm run build
 *   npx vite preview --port 4173 --strictPort   (en otra terminal)
 *   node scripts/verify-deck.mjs
 *
 * Comprueba: estructura del deck (apertura + 6 handoffs + 7 slides de T05),
 * orden y cantidad de slides, errores de consola, desborde vertical en TODAS
 * las slides y presencia de las cifras clave verificadas.
 */
import { chromium } from 'playwright';

const URL = process.env.PREVIEW_URL || 'http://localhost:4173/';
const SECCION_ANDY = 'P5';
const VIEWPORT = { width: 1600, height: 900 };
const MAX_ALTO = 694; // viewport útil 758 px − padding vertical del main (64 px)
const TOTAL_SLIDES = 33;

// La sección de Andy: handoff de apertura + sus 7 slides de trabajo.
const TITULOS_ESPERADOS = [
  'Andy · Nivel de Significancia (α) & P-Valor',
  'Toda Decisión Tiene un Riesgo',
  'α: el Área que Decides Tolerar',
  'El P-Valor: ¿Qué Tan Raro Fue Eso si Nada Cambió?',
  'La Regla de Decisión: p ≤ α',
  'Lo que el P-Valor NO Es',
  'El Criterio Estadístico, Automatizado',
  'Lo que te Llevas',
];

// Las 6 aperturas de sección (handoff) + la slide de apertura del deck.
const HANDOFFS_ESPERADOS = [
  'Said · Distribuciones de Probabilidad & Poisson',
  'Yandris · Distribución Normal & Gauss en Software',
  'Alisson · Teorema del Límite Central (TLC)',
  'Gino · Margen de Error & Intervalos de Confianza',
  'Andy · Nivel de Significancia (α) & P-Valor',
  'Equipo · Contraste, Aplicaciones & Cierre',
];

const APERTURA_ESPERADA = '¿Qué es la Estadística Inferencial?';

const CIFRAS_ESPERADAS = [
  { re: /0\.0211/, etiqueta: 'p-valor e-commerce (bilateral)' },
  { re: /0\.0207/, etiqueta: 'p-valor monedas (15 de 20)' },
  { re: /0\.2587/, etiqueta: 'p-valor control de calidad' },
  { re: /66\.5\s*%|66\.5/, etiqueta: 'poder con n = 4.000' },
  { re: /5\.5\d\d|5\.519/, etiqueta: 'n para 80% de poder' },
  { re: /64\.15|64\.1/, etiqueta: '20 tests al 5% → falsos positivos' },
  { re: /1\.96/, etiqueta: 'z crítico de α = 0.05' },
  { re: /2\.576|2\.58/, etiqueta: 'z crítico de α = 0.01' },
  { re: /3\.29/, etiqueta: 'z crítico de α = 0.001' },
];

const fallos = [];
const avisos = [];
const ok = (cond, msg) => {
  console.log(`${cond ? '  OK  ' : ' FALLA'} ${msg}`);
  if (!cond) fallos.push(msg);
};
// Aviso: lo que está bien pero conviene que el equipo sepa (no rompe nada).
const aviso = (cond, msg) => {
  if (cond) return;
  console.log(` AVISO ${msg}`);
  avisos.push(msg);
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
for (let i = 0; i < TITULOS_ESPERADOS.length; i++) {
  titulos.push(await page.locator('header h1').innerText());
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(380);
}

ok(titulos.length === TITULOS_ESPERADOS.length, `la sección expone ${TITULOS_ESPERADOS.length} slides`);
TITULOS_ESPERADOS.forEach((esperado, i) => {
  ok(titulos[i] === esperado, `slide ${i}: "${titulos[i]}"`);
});

console.log('\n— Recorrido completo del deck —');
await page.locator('footer button', { hasText: 'P0' }).first().click();
await page.waitForTimeout(500);

const todosLosTitulos = [];
const alturas = [];
const textoDeck = [];
for (let i = 0; i < TOTAL_SLIDES; i++) {
  todosLosTitulos.push(await page.locator('header h1').innerText());
  alturas.push(
    await page.evaluate(() => {
      const main = document.querySelector('main');
      const cont = main.querySelector('div');
      return {
        h: Math.round(cont.getBoundingClientRect().height),
        vp: main.clientHeight,
        over: main.scrollHeight - main.clientHeight,
      };
    })
  );
  textoDeck.push(await page.locator('main').innerText());
  // Algunas slides tienen pasos internos (animaciones con las flechas):
  // se pulsa hasta que cambie el título, con un tope por slide.
  const actual = todosLosTitulos[todosLosTitulos.length - 1];
  for (let p = 0; p < 12; p++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(520);
    if ((await page.locator('header h1').innerText()) !== actual) break;
  }
}

ok(
  todosLosTitulos.length === TOTAL_SLIDES,
  `el deck expone ${TOTAL_SLIDES} slides (leídas ${todosLosTitulos.length})`
);

console.log('\n— Desborde vertical (viewport útil ' + alturas[0].vp + ' px) —');
// El bloque de Andy y las piezas nuevas son responsabilidad de esta rama:
// si desbordan, es un fallo. Las slides de otros bloques se reportan como
// aviso, para que el equipo lo sepa sin que bloquee esta entrega.
const esDeEstaRama = (titulo) =>
  TITULOS_ESPERADOS.includes(titulo) ||
  HANDOFFS_ESPERADOS.includes(titulo) ||
  titulo === APERTURA_ESPERADA;

alturas.forEach((m, i) => {
  const cabe = m.over === 0 && m.h <= MAX_ALTO;
  const msg = `slide ${i}: alto ${m.h}px, desborde ${m.over}px — "${todosLosTitulos[i]}"`;
  if (esDeEstaRama(todosLosTitulos[i])) {
    ok(cabe, msg);
  } else {
    aviso(cabe, msg);
  }
});

console.log('\n— Aperturas de sección (handoff) —');
const texto = textoDeck.join('\n');
for (const h of HANDOFFS_ESPERADOS) {
  ok(todosLosTitulos.includes(h), `handoff "${h}"`);
}
ok(todosLosTitulos.includes(APERTURA_ESPERADA), `apertura "${APERTURA_ESPERADA}"`);
ok(
  texto.includes('Describir') && texto.includes('Afirmar') && texto.includes('Decidir') && texto.includes('Usar'),
  'la macro-estructura (describir → afirmar → decidir → usar) aparece en el deck'
);

console.log('\n— Cifras clave —');
CIFRAS_ESPERADAS.forEach((c) => {
  ok(c.re.test(texto), `${c.etiqueta} → ${c.re}`);
});

console.log('\n— Errores de consola —');
ok(erroresConsola.length === 0, erroresConsola.length === 0 ? 'sin errores' : erroresConsola.join(' | '));

await browser.close();

console.log(`\n${fallos.length === 0 ? '✅ TODO OK' : `❌ ${fallos.length} fallo(s)`}`);
if (avisos.length) {
  console.log(`\n⚠️  ${avisos.length} aviso(s) de slides de otros bloques (no bloquean esta entrega):`);
  avisos.forEach((a) => console.log('   - ' + a));
}
if (fallos.length) {
  fallos.forEach((f) => console.log('   - ' + f));
  process.exit(1);
}
