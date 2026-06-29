/**
 * Exporta todas las slides de la presentación React a un archivo .pptx
 *
 * 1. Inicia el dev server de Vite
 * 2. Usa Playwright para capturar cada slide como screenshot
 * 3. Arma un .pptx con pptxgenjs
 */

import { chromium } from 'playwright';
import PptxGenJS from 'pptxgenjs';
import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT = resolve(ROOT, 'dist', 'presentacion.pptx');
const SCREENSHOT_DIR = resolve(ROOT, 'dist', 'slides-export');

// ── Slide metadata extracted from App.jsx ──
const SLIDES = [
  { id: '0.0', title: 'SIMD y Arquitecturas Paralelas', section: 0 },
  { id: '0.1', title: 'Índice General de la Exposición', section: 0 },
  { id: '1.intro', title: 'Parte 1: El Problema Secuencial y la Taxonomía de Flynn', section: 1 },
  { id: '1.0', title: '¿Por qué existe el paralelismo? El límite secuencial', section: 1 },
  { id: '1.1b', title: 'Simulación: Cajero vs Paralelo', section: 1 },
  { id: '1.1', title: 'El Ciclo Fetch-Decode-Execute', section: 1 },
  { id: '1.2', title: 'Taxonomía de Flynn — Diagrama Interactivo', section: 1 },
  { id: '1.3', title: 'SMP vs SIMD: El Generalista vs El Especialista', section: 1 },
  { id: '2.intro', title: 'Parte 2: Arquitectura SIMD y el Principio Vectorial', section: 2 },
  { id: '2.1', title: 'SIMD: Una Orden, Ocho Soldados', section: 2 },
  { id: '2.2', title: 'Los Registros: De Escalar a Vector', section: 2 },
  { id: '2.3', title: 'Dos Maneras de Ser SIMD (Space-Time Duality)', section: 2 },
  { id: '2.4', title: 'El Poder y El Límite del SIMD', section: 2 },
  { id: '3.intro', title: 'Parte 3: Extensiones SIMD Modernas (MMX, SSE, AVX)', section: 3 },
  { id: '3.1', title: '1996 → 2017: El Registro que No Para de Crecer', section: 3 },
  { id: '3.2', title: 'El Truco del Silicio: Subword Parallelism', section: 3 },
  { id: '3.3', title: 'El Vocabulario SIMD: Instrucciones Clave y FMA', section: 3 },
  { id: '3.fde', title: 'Fetch-Decode-Execute en SIMD', section: 3 },
  { id: '3.4', title: 'El ISA es el Mismo. El Hardware No.', section: 3 },
  { id: '4.intro', title: 'Parte 4: Rendimiento, Aplicaciones y Conclusiones', section: 4 },
  { id: 'asm.practice', title: 'Práctica: Suma de Arreglos en Assembler', section: 4 },
  { id: '4.1', title: 'El Argumento Definitivo: Desglose de Instrucciones', section: 4 },
  { id: '4.2', title: 'Throughput y Ley de Amdahl', section: 4 },
  { id: '4.3', title: 'SIMD en el Mundo Real', section: 4 },
  { id: '4.4', title: 'El Paradigma Híbrido: SoC Moderno', section: 4 },
  { id: '4.5', title: 'Conclusiones y Cierre', section: 4 },
];

// ── Helper: wait ms ──
const wait = ms => new Promise(r => setTimeout(r, ms));

// ── Helper: start vite dev server ──
function startVite() {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn('npx', ['vite', '--port', '45678', '--host', '127.0.0.1'], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    let started = false;
    const timeout = setTimeout(() => {
      if (!started) {
        proc.kill();
        reject(new Error('Vite dev server did not start in time'));
      }
    }, 30000);

    proc.stdout.on('data', data => {
      const text = data.toString();
      console.log('[vite]', text.trim());
      // Vite prints "http://localhost:..." when ready
      if (!started && text.includes('http')) {
        started = true;
        clearTimeout(timeout);
        // Give it a moment to be fully ready
        setTimeout(() => resolvePromise(proc), 1500);
      }
    });

    proc.stderr.on('data', data => {
      const text = data.toString();
      // Vite may print info on stderr too
      if (!started && text.includes('http')) {
        started = true;
        clearTimeout(timeout);
        setTimeout(() => resolvePromise(proc), 1500);
      }
    });

    proc.on('error', reject);
  });
}

// ── Main ──
async function main() {
  console.log('🚀 Iniciando Vite dev server...');
  const viteProc = await startVite();

  try {
    await fs.promises.mkdir(SCREENSHOT_DIR, { recursive: true });

    console.log('🌐 Abriendo navegador...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      // 16:9 exacto para que coincida con el aspect ratio del PPTX
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 2, // retina quality
    });
    const page = await context.newPage();

    await page.goto('http://127.0.0.1:45678/', { waitUntil: 'networkidle' });
    await wait(1500); // let animations settle

    // ── Capture each slide ──
    for (let i = 0; i < SLIDES.length; i++) {
      const slide = SLIDES[i];

      if (i === 0) {
        // Already on slide 0 after page load
      } else {
        // Navigate forward via keyboard
        await page.keyboard.press('ArrowRight');
        await wait(800); // wait for animation
      }

      // Wait for the slide to render
      await page.waitForTimeout(200);

      // Verify we're on the right slide by checking section P button or banner text
      // Take screenshot of the main content area
      const mainEl = await page.$('main');
      if (!mainEl) {
        console.warn(`  ⚠️  No <main> element found for slide ${i}, taking full page`);
      }

      // Capturar la slide completa tal como se ve en el browser
      // (header con título + main content + footer con botones de sección)
      const filename = `${String(i).padStart(2, '0')}_${slide.id}.png`;
      const filepath = resolve(SCREENSHOT_DIR, filename);

      await page.screenshot({ path: filepath, fullPage: false });

      console.log(`  [${i + 1}/${SLIDES.length}] ${slide.id} — ${slide.title}`);
    }

    await browser.close();

    // ── Build PPTX ──
    console.log('\n📊 Armando PPTX...');
    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'WIDE', width: 13.333, height: 7.5 });
    pptx.layout = 'WIDE';

    const images = await fs.promises.readdir(SCREENSHOT_DIR);
    images.sort();

    for (const imgFile of images) {
      if (!imgFile.endsWith('.png')) continue;
      const idx = parseInt(imgFile.slice(0, 2));
      const slideMeta = SLIDES[idx] || { title: imgFile };

      const slideObj = pptx.addSlide();

      // Agregar screenshot ocupando toda la slide (mismo aspect ratio 16:9)
      slideObj.addImage({
        path: resolve(SCREENSHOT_DIR, imgFile),
        x: 0, y: 0,
        w: 13.333, h: 7.5,
        sizing: { type: 'contain', w: 13.333, h: 7.5 },
      });

      // Add a thin label at bottom with slide number
      slideObj.addText(`${idx + 1} / ${SLIDES.length}  ·  ${slideMeta.title}`, {
        x: 0.3, y: 7.0, w: 12.7, h: 0.4,
        fontSize: 9,
        color: '888888',
        align: 'right',
      });
    }

    await pptx.writeFile({ fileName: OUTPUT });
    console.log(`\n✅ PPTX generado: ${OUTPUT}`);
    console.log(`   ${images.length} slides exportadas`);

  } finally {
    viteProc.kill();
    console.log('🛑 Vite detenido');
  }
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
