import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  SlidePortada, SlideIndice,
  Slide1_LimiteSec, Slide1_1, Slide1_1Anim, Slide1_2, Slide1_3, Slide1_4,
  Slide2_1, Slide2_2, Slide2_3, Slide2_4,
  Slide3_1, Slide3_2, Slide3_3, Slide3_FDE_SIMD, Slide3_4,
  Slide4_1, Slide4_2, Slide4_3, Slide4_4, Slide4_5,
  SlidePracticaAsm
} from './slides';

// --- SECTIONS METADATA WITH REAL MEMBER NAMES ---
const SECTIONS = [
  { id: 0, title: 'Inicio y Agenda', member: 'Presentación', color: 'from-blue-600 to-indigo-600' },
  { id: 1, title: 'Parte 1: El Problema y Taxonomía', member: 'Reyes Ricardo', color: 'from-cyan-500 to-blue-500' },
  { id: 2, title: 'Parte 2: El Principio Vectorial', member: 'Rivera Yandris', color: 'from-purple-500 to-pink-500' },
  { id: 3, title: 'Parte 3: Extensiones MMX/SSE/AVX', member: 'Alejandro Andy', color: 'from-amber-500 to-orange-500' },
  { id: 4, title: 'Parte 4: Rendimiento y Aplicaciones', member: 'Bermudez Gino', color: 'from-emerald-500 to-teal-500' },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const slides = [
    // === PORTADA Y AGENDA ===
    {
      id: '0.0',
      section: 0,
      title: 'SIMD y Arquitecturas Paralelas',
      subtitle: 'Exposición Oficial · Arquitectura y Organización de Computadoras',
      speaker: "Bienvenidos a la presentación sobre SIMD y Arquitecturas Paralelas. Hoy analizaremos el límite del cómputo secuencial y cómo las instrucciones vectoriales revolucionaron el procesamiento de datos.",
      component: <SlidePortada />
    },
    {
      id: '0.1',
      section: 0,
      title: 'Índice General de la Exposición',
      subtitle: 'Agenda de Contenidos · 4 Partes',
      speaker: "Nuestra exposición se divide en 4 partes temáticas presentadas por Reyes Ricardo, Rivera Yandris, Alejandro Andy y Bermudez Gino.",
      component: <SlideIndice onSelectSection={(secId) => {
        const idx = slides.findIndex(s => s.id === `${secId}.intro`);
        if (idx !== -1) setCurrentSlide(idx);
      }} />
    },

    // === PARTE 1: REYES RICARDO ===
    {
      id: '1.intro',
      section: 1,
      title: 'Parte 1: El Problema Secuencial y la Taxonomía de Flynn',
      subtitle: 'Expositor: Reyes Ricardo · Parte 1',
      speaker: "Hola a todos, soy Reyes Ricardo. En esta primera parte abordaré el problema del modelo Von Neumann secuencial clásico y cómo Flynn clasificó las arquitecturas paralelas en 1966.",
      component: <SlideIntroParte1 />
    },
    {
      id: '1.0',
      section: 1,
      title: '¿Por qué existe el paralelismo? El límite secuencial',
      subtitle: 'Slide 1.0 · El cuello de botella estructural · SISD vs SIMD en números reales',
      speaker: "El problema no es qué tan rápido corre la CPU — es que solo puede hacer una cosa a la vez. Con el ejemplo de C[i]=(A[i]+B[i])/2 sobre 50 elementos, el modelo secuencial genera 304 instrucciones y 2004 ciclos. El modelo vectorial lo resuelve en 7 instrucciones y 285 ciclos. Ese es el argumento de existencia del paralelismo.",
      component: <Slide1_LimiteSec />
    },
    {
      id: '1.1b',
      section: 1,
      title: 'Simulación: Cajero vs Paralelo',
      subtitle: 'Slide 1.1b · Animación Interactiva · SISD vs SIMD en tiempo real',
      speaker: "Esta animación muestra 16 datos procesándose en tiempo real. El cajero SISD atiende uno por uno: tarda 16 ciclos. El procesador SIMD atiende 4 simultáneamente: termina en 4 ciclos. SIMD finaliza cuando SISD va apenas en el 25%.",
      component: <Slide1_1Anim />
    },
    {
      id: '1.2',
      section: 1,
      title: "Flynn's Taxonomy (1966)",
      subtitle: 'Slide 1.2 · Matriz 2×2 de Arquitecturas Paralelas',
      speaker: "Flynn clasificó en dos ejes: Flujos de Instrucciones (I) y Flujos de Datos (D). De ahí surgen SISD, SIMD (nuestro foco), MISD y MIMD. Es la matriz que clasifica prácticamente todo el hardware real.",
      component: <Slide1_3 />
    },
    {
      id: '1.1',
      section: 1,
      title: 'Taxonomía de Flynn — Diagrama Interactivo',
      subtitle: 'Slide 1.1 · SISD · SIMD · MISD · MIMD · Hacé click para explorar',
      speaker: "Flynn clasificó las arquitecturas en dos ejes: cuántos flujos de instrucciones y cuántos flujos de datos. SISD es Von Neumann clásico. SIMD es nuestro foco: 1 instrucción, N datos en paralelo. MIMD es el generalista multinúcleo. MISD es el caso teórico. Hacé click en cada componente para ver su rol en cada arquitectura.",
      component: <Slide1_1 />
    },

    // === PARTE 2: RIVERA YANDRIS ===
    {
      id: '2.intro',
      section: 2,
      title: 'Parte 2: Arquitectura SIMD y el Principio Vectorial',
      subtitle: 'Expositor: Rivera Yandris · Parte 2',
      speaker: "Saludos, soy Rivera Yandris. En esta segunda parte explicaré el funcionamiento interno de SIMD: registros vectoriales, la dualidad espacio-tiempo y la divergencia condicional.",
      component: <SlideIntroParte2 />
    },
    {
      id: '2.1',
      section: 2,
      title: 'SIMD: Una Orden, Ocho Soldados',
      subtitle: 'Slide 2.1 · El Comandante y el Escuadrón',
      speaker: "Un comandante da una sola orden '¡Saltar!' a 8 soldados. En silicio, una sola decodificación de instrucción emite el comando simultáneamente a N ALUs. Ahorro masivo de energía.",
      component: <Slide2_1 />
    },
    {
      id: '2.2',
      section: 2,
      title: 'Los Registros: De Escalar a Vector',
      subtitle: 'Slide 2.2 · Registros Vectoriales y Control',
      speaker: "Un registro vectorial almacena N valores del mismo tipo. Además del registro de datos, la arquitectura incluye VLEN (longitud activa), VSTR (stride de memoria) y VMASK (máscara de predicación).",
      component: <Slide2_2 />
    },
    {
      id: '2.3',
      section: 2,
      title: 'Dos Maneras de Ser SIMD (Space-Time Duality)',
      subtitle: 'Slide 2.3 · Array Processor vs Vector Processor',
      speaker: "Array Processor es paralelismo en espacio: N ALUs independientes en el mismo ciclo. Vector Processor es paralelismo en tiempo: un pipeline segmentado que procesa en cascada, como la CRAY-1.",
      component: <Slide2_3 />
    },
    {
      id: '2.4',
      section: 2,
      title: 'El Poder y El Límite del SIMD',
      subtitle: 'Slide 2.4 · Ventajas y La Kryptonita (Divergencia)',
      speaker: "SIMD brilla con datos regulares y alineados. Su kryptonita son las condiciones 'if/else' por elemento: el hardware debe ejecutar ambos caminos enmascarando los elementos falsos.",
      component: <Slide2_4 />
    },

    // === PARTE 3: ALEJANDRO ANDY ===
    {
      id: '3.intro',
      section: 3,
      title: 'Parte 3: Extensiones SIMD Modernas (MMX, SSE, AVX)',
      subtitle: 'Expositor: Alejandro Andy · Parte 3',
      speaker: "Buenas tardes, soy Alejandro Andy. Analizaremos cómo Intel y AMD evolucionaron los registros desde MMX hasta AVX-512, el truco del Subword Parallelism y las instrucciones FMA.",
      component: <SlideIntroParte3 />
    },
    {
      id: '3.1',
      section: 3,
      title: '1996 → 2017: El Registro que No Para de Crecer',
      subtitle: 'Slide 3.1 · Evolución de Extensiones x86',
      speaker: "Caso real Intel Atom (2009): sin SSE consumía 100% de CPU procesando video HD. Con SSE, el mismo chip lo manejaba al 40%. Las extensiones SIMD duplicaron el ancho de 64 bits (MMX) a 512 bits (AVX-512).",
      component: <Slide3_1 />
    },
    {
      id: '3.2',
      section: 3,
      title: 'El Truco del Silicio: Subword Parallelism',
      subtitle: 'Slide 3.2 · Particionamiento del Sumador',
      speaker: "El circuito sumador de 256 bits es uno solo. Según la instrucción, el hardware ajusta la lógica de carry para funcionar como 8 sumadores de 32 bits, 16 de 16 bits o 32 de 8 bits.",
      component: <Slide3_2 />
    },
    {
      id: '3.3',
      section: 3,
      title: 'El Vocabulario SIMD: Instrucciones Clave y FMA',
      subtitle: 'Slide 3.3 · Ensamblador Vectorial AVX',
      speaker: "Instrucciones como VMOVAPD y VBROADCASTSD preparan vectores. La estrella es VFMADDPD (Fused Multiply-Add), que calcula (A*B)+C en un solo ciclo con precisión extendida.",
      component: <Slide3_3 />
    },
    {
      id: '3.fde',
      section: 3,
      title: 'Fetch-Decode-Execute en SIMD',
      subtitle: 'Slide 3.5 · El Pipeline Vectorial paso a paso',
      speaker: "El pipeline interno para VADDPD: FETCH carga 1 instrucción, DECODE identifica que opera sobre 256 bits, EXECUTE activa 4 sumadores de 64 bits simultáneamente, y WRITEBACK escribe 256 bits de una vez. La diferencia clave con SISD: 1 decodificación para 4 operaciones efectivas.",
      component: <Slide3_FDE_SIMD />
    },
    {
      id: '3.4',
      section: 3,
      title: 'El ISA es el Mismo. El Hardware No.',
      subtitle: 'Slide 3.4 · AMD Excavator vs AMD Zen',
      speaker: "Excavator coordinaba dos unidades FMAC de 128 bits con mayor latencia. Zen implementó una unidad nativa de 256 bits con crossbar, demostrando cómo la microarquitectura cambia el rendimiento real.",
      component: <Slide3_4 />
    },

    // === PARTE 4: BERMUDEZ GINO ===
    {
      id: '4.intro',
      section: 4,
      title: 'Parte 4: Rendimiento, Aplicaciones y Conclusiones',
      subtitle: 'Expositor: Bermudez Gino · Parte 4',
      speaker: "Hola a todos, soy Bermudez Gino. En esta parte final revisaremos el desglose numérico de speedup, Throughput, Ley de Amdahl, aplicaciones reales en IA y SoCs híbridos.",
      component: <SlideIntroParte4 />
    },
    {
      id: 'asm.practice',
      section: 4,
      title: 'Práctica: Suma de Arreglos en Assembler',
      subtitle: 'Código Escalar (SISD) vs Vectorial (SSE) · Paso a paso',
      speaker: "En esta práctica vamos a comparar el código assembler escalar contra el vectorial. Del lado izquierdo, el bucle SISD carga suma y guarda un elemento por vez. Del lado derecho, con MOVAPS y ADDPS de SSE, procesamos 4 floats por instrucción. Observen cómo resalta la instrucción addps: una sola instrucción haciendo 4 sumas simultáneas.",
      component: <SlidePracticaAsm />
    },
    {
      id: '4.1',
      section: 4,
      title: 'El Argumento Definitivo: Desglose de Instrucciones',
      subtitle: 'Slide 4.1 · Desglose Dinámico: 304 vs 7 Instrucciones',
      speaker: "En la suma de 50 elementos, el bucle escalar ejecuta 100 Loads, 50 ADDS, 50 Shifts, 50 Stores y 50 Branches (304 instrs). En vectorial, 2 cargas, 1 VADD, 1 VSHFR y 1 VST lo hacen todo en 7 instrucciones y 285 ciclos.",
      component: <Slide4_1 />
    },
    {
      id: '4.2',
      section: 4,
      title: 'Throughput y Ley de Amdahl',
      subtitle: 'Slide 4.2 · Las Dos Métricas Fundamentales',
      speaker: "Throughput (GFLOPS) escala con el ancho del registro. Pero la Ley de Amdahl establece un techo: si el 20% del código es secuencial, el speedup máximo teórico jamás superará 5x.",
      component: <Slide4_2 />
    },
    {
      id: '4.3',
      section: 4,
      title: 'SIMD en el Mundo Real',
      subtitle: 'Slide 4.3 · Aplicaciones en la Computación Actual',
      speaker: "Al ejecutar np.dot en Python o procesar imágenes en Photoshop, estás usando SIMD. BLAS, redes neuronales (CNNs) y cifrado AES-NI dependen 100% de estas extensiones.",
      component: <Slide4_3 />
    },
    {
      id: '4.4',
      section: 4,
      title: 'El Paradigma Híbrido: SoC Moderno',
      subtitle: 'Slide 4.4 · CPU (MIMD) + GPU (SIMD) en el Mismo Silicio',
      speaker: "Los chips modernos de smartphones y laptops combinan núcleos CPU para control asíncrono y miles de cores SIMD en la GPU integrados por un bus de alta velocidad.",
      component: <Slide4_4 />
    },
    {
      id: '4.5',
      section: 4,
      title: 'Conclusiones y Cierre',
      subtitle: 'Slide 4.5 · La División del Trabajo Computacional',
      speaker: "SIMD no es una optimización opcional; es el mecanismo estructural por el cual la computación moderna superó el límite de frecuencia de reloj.",
      component: <Slide4_5 />
    }
  ];

  const nextSlide = () => setCurrentSlide(c => Math.min(c + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(c => Math.max(c - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = slides[currentSlide];
  const activeSection = SECTIONS.find(s => s.id === slide.section);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 font-sans select-none overflow-hidden border-4 border-slate-900 relative">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="flex justify-between items-center px-6 py-3 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${activeSection.color} text-black font-extrabold text-xs shadow-lg uppercase tracking-wider`}>
            {activeSection.member}
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 flex items-center gap-2">
              {slide.title}
            </h1>
            <p className="text-xs text-cyan-400 font-mono">{slide.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${showSpeakerNotes ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
          >
            <HelpCircle size={14} /> [HABLAR] Guión
          </button>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 relative p-6 md:p-8 overflow-hidden flex flex-col justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full max-w-7xl 2xl:max-w-[90vw] mx-auto h-full flex flex-col justify-center"
          >
            {slide.component}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Speaker Notes Overlay Drawer */}
      <AnimatePresence>
        {showSpeakerNotes && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-16 left-6 right-6 bg-slate-900/95 border-2 border-amber-500/40 p-4 rounded-2xl shadow-2xl z-30 backdrop-blur-lg flex items-start gap-3"
          >
            <UserCheck size={24} className="text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Guión del Orador (Resumen):</h4>
              <p className="text-sm text-slate-200 font-medium leading-relaxed font-serif italic">"{slide.speaker}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Navigation & Progress */}
      <footer className="px-6 py-3 border-t border-slate-800/80 bg-slate-950/95 flex flex-col gap-2 z-20">
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden flex">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`flex-1 h-full cursor-pointer transition-all border-r border-slate-950 ${idx === currentSlide ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-glow' : idx < currentSlide ? 'bg-slate-700' : 'bg-slate-900'}`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400">
          <div className="flex gap-2">
            {SECTIONS.map(sec => (
              <button
                key={sec.id}
                onClick={() => {
                  const firstIdx = slides.findIndex(s => s.section === sec.id);
                  if (firstIdx !== -1) setCurrentSlide(firstIdx);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${slide.section === sec.id ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40' : 'text-slate-500 hover:text-slate-300'}`}
              >
                P{sec.id}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// === CARÁTULAS DE SECCIÓN (inline, simples) ===
// ==========================================

function SlideIntroParte1() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/10 border-2 border-cyan-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-cyan-500/20 text-cyan-300 font-extrabold text-xs rounded-full border border-cyan-400/30 uppercase tracking-widest">
        Expositor: Reyes Ricardo · Parte 1
      </span>
      <h2 className="text-3xl font-extrabold text-slate-100">El Problema Secuencial y la Taxonomía de Flynn</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-xs pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.0: El Problema y el Límite Secuencial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.1: El Ciclo Fetch-Decode-Execute</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.2: Flynn's Taxonomy (1966)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.3: SMP vs SIMD (Generalista vs Especialista)</div>
      </div>
    </div>
  );
}

function SlideIntroParte2() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-slate-900 to-pink-500/10 border-2 border-purple-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-purple-500/20 text-purple-300 font-extrabold text-xs rounded-full border border-purple-400/30 uppercase tracking-widest">
        Expositor: Rivera Yandris · Parte 2
      </span>
      <h2 className="text-3xl font-extrabold text-slate-100">Arquitectura SIMD y el Principio Vectorial</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-xs pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.1: Una Orden, Ocho Soldados</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.2: Registros Vectoriales y Control</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.3: Array Processor vs Vector Processor</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.4: Ventajas y La Kryptonita (Divergencia)</div>
      </div>
    </div>
  );
}

function SlideIntroParte3() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-orange-500/10 border-2 border-amber-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-amber-500/20 text-amber-300 font-extrabold text-xs rounded-full border border-amber-400/30 uppercase tracking-widest">
        Expositor: Alejandro Andy · Parte 3
      </span>
      <h2 className="text-3xl font-extrabold text-slate-100">Extensiones SIMD Modernas (MMX, SSE, AVX)</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-xs pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.1: Evolución de Registros (1996-2017)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.2: Subword Parallelism en Hardware</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.3: Instrucciones SSE y AVX + FMA</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.4: Fetch-Decode-Execute Vectorial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.5: AMD Zen vs AMD Excavator</div>
      </div>
    </div>
  );
}

function SlideIntroParte4() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-slate-900 to-teal-500/10 border-2 border-emerald-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold text-xs rounded-full border border-emerald-400/30 uppercase tracking-widest">
        Expositor: Bermudez Gino · Parte 4
      </span>
      <h2 className="text-3xl font-extrabold text-slate-100">Rendimiento, Aplicaciones Reales y Conclusiones</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-xs pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Práctica: Assembler SISD vs SIMD (ADDPS)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.1: Desglose Dinámico: 304 vs 7 Instrucciones</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.2: Throughput y Ley de Amdahl</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.3: SIMD en el Mundo Real (6 dominios)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.4: SoC Híbrido + Conclusiones</div>
      </div>
    </div>
  );
}
