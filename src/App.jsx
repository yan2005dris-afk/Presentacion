import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Zap, Layers, Clock, Play, RotateCcw, ChevronLeft, ChevronRight,
  CheckCircle2, Activity, Code2, AlertTriangle, ShieldAlert, Sparkles,
  Server, HardDrive, Database, Eye, Film, Gamepad2, Brain, BarChart3,
  Tv, UserCheck, HelpCircle, ArrowRight, ArrowDown, ListOrdered, GraduationCap, Users
} from 'lucide-react';

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
      id: '1.3',
      section: 1,
      title: 'SISD: El Ciclo Fetch-Decode-Execute',
      subtitle: 'Slide 1.3 · Arquitectura y Funcionamiento Von Neumann',
      speaker: "SISD es el modelo clásico de Von Neumann: una ALU, un bus, un stream de instrucciones. Cada instrucción pasa por Fetch, Decode, Execute y Writeback. Para N datos, el ciclo se repite N veces — esa es la limitación estructural.",
      component: <Slide1_2 />
    },
    {
      id: '1.1',
      section: 1,
      title: 'Arquitectura Von Neumann — Componentes SISD',
      subtitle: 'Slide 1.1 · Diagrama Interactivo · Hacé click en cada componente',
      speaker: "Esta es la arquitectura Von Neumann que subyace al modelo SISD. Hay un solo bus, una sola ALU, un solo flujo. Hacé click en cualquier componente para ver su rol específico en el cuello de botella secuencial.",
      component: <Slide1_1 />
    },
    {
      id: '1.4',
      section: 1,
      title: 'MIMD — Referencia para la Comparación Final',
      subtitle: 'Slide 1.4 · El Generalista: SMP y sus Limitaciones',
      speaker: "MIMD es el otro extremo: múltiples CPUs independientes con instrucciones y datos distintos. SMP (Symmetric Multiprocessing) comparte RAM entre todos los núcleos. Sufre bus congestion y spinlocks. Entender MIMD es clave para apreciar por qué SIMD existe.",
      component: <Slide1_4 />
    },

    // === PARTE 2: RIVERA Yandris ===
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
            className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center"
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
// === PORTADA E ÍNDICE ===
// ==========================================

function SlidePortada() {
  const members = [
    { name: 'Reyes Ricardo', part: 'Parte 1', topic: 'Problema & Flynn' },
    { name: 'Rivera Yandris', part: 'Parte 2', topic: 'Principio Vectorial' },
    { name: 'Alejandro Andy', part: 'Parte 3', topic: 'Extensiones SIMD' },
    { name: 'Bermudez Gino', part: 'Parte 4', topic: 'Rendimiento & Apps' },
  ];

  return (
    <div className="text-center space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-slate-900 to-purple-500/10 border-2 border-cyan-500/30 backdrop-blur-md shadow-2xl shadow-cyan-500/10"
      >
        <div className="flex justify-center gap-4 mb-4 text-cyan-400">
          <Cpu size={56} className="animate-pulse" />
          <Zap size={56} className="text-purple-400 animate-bounce" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
          SIMD y Arquitecturas Paralelas
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto font-medium">
          Exposición Oficial · Arquitectura y Organización de Computadoras
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {members.map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1"
          >
            <Users size={20} className="mx-auto text-cyan-400" />
            <div className="text-xs font-bold text-slate-100">{m.name}</div>
            <div className="text-[10px] text-cyan-400 font-mono font-bold">{m.part}</div>
            <div className="text-[10px] text-slate-500">{m.topic}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideIndice({ onSelectSection }) {
  const agenda = [
    { id: 1, title: 'Parte 1: El Problema Secuencial y Taxonomía de Flynn', desc: 'Límite secuencial, ciclo Von Neumann, matriz 2x2 y SMP vs SIMD.', member: 'Expositor: Reyes Ricardo', color: 'border-cyan-500/40 text-cyan-300' },
    { id: 2, title: 'Parte 2: Arquitectura SIMD y Principio Vectorial', desc: 'El Comandante y 8 soldados, registros vectoriales, Array vs Vector Processor.', member: 'Expositor: Rivera Yandris', color: 'border-purple-500/40 text-purple-300' },
    { id: 3, title: 'Parte 3: Extensiones SIMD Modernas (MMX/SSE/AVX)', desc: 'Evolución 1996-2017, Subword Parallelism, FMA y AMD Zen vs Excavator.', member: 'Expositor: Alejandro Andy', color: 'border-amber-500/40 text-amber-300' },
    { id: 4, title: 'Parte 4: Rendimiento, Aplicaciones y Conclusiones', desc: 'Desglose 304 vs 7 instrs, Throughput, Ley de Amdahl, IA y SoCs Híbridos.', member: 'Expositor: Bermudez Gino', color: 'border-emerald-500/40 text-emerald-300' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <ListOrdered size={22} className="text-cyan-400" /> Agenda Temática de la Exposición
        </h3>
        <p className="text-xs text-slate-400">Haz clic en cualquier parte para navegar directamente</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agenda.map((a) => (
          <motion.div
            key={a.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelectSection(a.id)}
            className={`p-4 rounded-2xl bg-slate-900 border-2 ${a.color} cursor-pointer space-y-2 transition-all shadow-md`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-200">{a.member}</span>
              <ArrowRight size={16} className="text-slate-400" />
            </div>
            <h4 className="font-bold text-sm text-slate-100">{a.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// === CARÁTULAS DE SECCIÓN CON NOMBRES REALES ===
// ==========================================

function SlideIntroParte1() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/10 border-2 border-cyan-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-cyan-500/20 text-cyan-300 font-extrabold text-xs rounded-full border border-cyan-400/30 uppercase tracking-widest">
        Expositor: Reyes Ricardo · Parte 1
      </span>
      <h2 className="text-3xl font-extrabold text-slate-100">El Problema Secuencial y la Taxonomía de Flynn</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-xs pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.1: El Problema de la Caja Registradora</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.2: El Ciclo Fetch-Decode-Execute</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.3: Flynn's Taxonomy (1966)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.4: SMP vs SIMD (Generalista vs Especialista)</div>
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
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.3: Vocabulario Ensamblador y FMA</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.4: AMD Zen vs AMD Excavator</div>
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
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.1: Desglose Dinámico: 304 vs 7 Instrucciones</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.2: Throughput y Ley de Amdahl</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.3: SIMD en el Mundo Real (IA, NumPy, AES)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.4: SoC Híbrido y Conclusiones Finales</div>
      </div>
    </div>
  );
}

// ==========================================
// === SLIDE COMPONENTS (INTEGRANTE 1) ===
// ==========================================

function Slide1_1() {
  const [active, setActive] = useState(null);

  const INFO = {
    cu:     { title: 'Control Unit (CU)', text: 'Decodifica 1 instrucción por ciclo. Orquesta el ciclo Fetch → Decode → Execute de forma estrictamente secuencial. Sin CU no hay SISD.' },
    alu:    { title: 'ALU — Arithmetic Logic Unit', text: 'Ejecuta 1 operación aritmética o lógica por ciclo de reloj. Es el cuello de botella del SISD: no puede operar sobre dos datos al mismo tiempo.' },
    reg:    { title: 'Registers', text: 'Almacenamiento de ultra-velocidad (1 ciclo). Contiene el Program Counter (PC), Instruction Register (IR) y operandos activos de la ALU.' },
    ram:    { title: 'Main Memory (RAM)', text: 'Almacena instrucciones y datos activos. El CPU los fetcha de a 1 palabra por ciclo de bus. Latencia ~100 ciclos vs 1 del registro.' },
    disk:   { title: 'Secondary Memory', text: 'SSD / HDD para persistencia. Hasta 100.000× más lento que RAM. El CPU bloquea (I/O wait) hasta recibir el dato — pura serialización.' },
    bus:    { title: 'System Bus', text: 'Canal compartido entre CPU, memoria y periféricos. En SISD solo ocurre 1 transferencia por vez. La autopista de un único carril del procesamiento secuencial.' },
    input:  { title: 'Input Devices', text: 'Teclado, mouse. Generan interrupciones que el CPU atiende suspendiendo el thread actual, procesando la entrada, y luego retomando — siempre en serie.' },
    output: { title: 'Output Devices', text: 'Display, impresora. Reciben resultados del CPU solo tras completar toda la cadena secuencial Fetch → Decode → Execute → Writeback.' },
  };

  const toggle = (id) => setActive(prev => prev === id ? null : id);

  const Node = ({ id, label, sub, lg = false }) => {
    const on = active === id;
    return (
      <div onClick={() => toggle(id)} className={`cursor-pointer rounded-lg border-2 transition-all duration-150 select-none text-center px-2 py-1.5 ${lg ? 'py-3' : ''} ${
        on ? 'border-cyan-400/70 bg-cyan-500/10' : 'border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800/60'
      }`}>
        <p className={`font-mono font-bold text-xs ${on ? 'text-cyan-300' : 'text-slate-300'}`}>{label}</p>
        {sub && <p className="text-[9px] text-slate-600 mt-0.5 font-mono">{sub}</p>}
      </div>
    );
  };

  const Connector = ({ dir = 'h', label }) => (
    <div className={`flex ${dir === 'h' ? 'items-center' : 'flex-col items-center'} gap-0.5 shrink-0`}>
      {label && <span className="text-[8px] text-slate-700 font-mono">{label}</span>}
      {dir === 'h'
        ? <div className="flex items-center gap-0"><span className="text-slate-600 text-xs">◄</span><div className="w-5 h-px bg-slate-700" /><span className="text-slate-600 text-xs">►</span></div>
        : <div className="flex flex-col items-center gap-0"><span className="text-slate-600 text-xs leading-none">▲</span><div className="w-px h-5 bg-slate-700" /><span className="text-slate-600 text-xs leading-none">▼</span></div>
      }
    </div>
  );

  const ArrowOut = ({ dir = 'right' }) => (
    <div className="flex items-center shrink-0">
      {dir === 'right'
        ? <><div className="w-5 h-px bg-slate-700" /><span className="text-slate-600 text-xs">►</span></>
        : <><span className="text-slate-600 text-xs">◄</span><div className="w-5 h-px bg-slate-700" /></>
      }
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col gap-2 max-w-5xl mx-auto select-none">

      {/* Info panel */}
      <div className={`shrink-0 rounded-xl border px-4 py-2.5 min-h-[54px] flex items-center transition-all duration-200 ${
        active ? 'border-cyan-500/40 bg-slate-900' : 'border-slate-800 bg-slate-900/40'
      }`}>
        {active
          ? <div><p className="text-xs font-bold text-cyan-300 mb-0.5">{INFO[active]?.title}</p><p className="text-[11px] text-slate-400 leading-relaxed">{INFO[active]?.text}</p></div>
          : <p className="text-[11px] text-slate-700 font-mono w-full text-center">Hacé click en cualquier componente para ver su rol en SISD →</p>
        }
      </div>

      {/* Diagram */}
      <div className="flex-1 flex items-stretch gap-2 min-h-0">

        {/* ── CPU block ── */}
        <div className={`flex flex-col gap-1.5 rounded-xl border-2 p-2.5 w-32 shrink-0 transition-colors duration-200 ${
          ['cu','alu','reg'].includes(active) ? 'border-cyan-500/40 bg-slate-900' : 'border-slate-700 bg-slate-900/60'
        }`}>
          <p className="text-[9px] text-slate-500 font-mono text-center tracking-widest">CPU</p>
          <Node id="cu" label="Control Unit" sub="CU" />
          <div className="flex justify-center"><div className="w-px h-2.5 bg-slate-700" /></div>
          <Node id="alu" label="ALU" sub="Arithmetic Logic" />
          <div className="flex justify-center"><div className="w-px h-2.5 bg-slate-700" /></div>
          <Node id="reg" label="Registers" sub="PC · IR · ACC" />
          <p className="text-[8px] text-slate-600 font-mono text-center mt-auto pt-1">Central Processing Unit</p>
        </div>

        {/* CPU ↔ Bus (top rail connection) */}
        <Connector dir="h" />

        {/* ── Memory block ── */}
        <div className="flex flex-col gap-3 justify-center flex-1 min-w-0">
          <Node id="ram" label="Main Memory" sub="RAM · instrucciones + datos activos" lg />
          <Node id="disk" label="Secondary Memory" sub="SSD / HDD · Storage" lg />
        </div>

        {/* Memory ↔ Bus */}
        <div className="flex flex-col justify-center gap-8 shrink-0">
          <Connector dir="h" />
          <Connector dir="h" />
        </div>

        {/* ── BUS vertical bar ── */}
        <div
          onClick={() => toggle('bus')}
          className={`cursor-pointer w-9 shrink-0 rounded-xl border-2 flex items-center justify-center transition-all duration-150 ${
            active === 'bus' ? 'border-amber-400/60 bg-amber-500/10' : 'border-slate-600 bg-slate-800 hover:border-slate-500'
          }`}
        >
          <p className={`text-[9px] font-bold font-mono [writing-mode:vertical-rl] tracking-widest ${active === 'bus' ? 'text-amber-300' : 'text-slate-500'}`}>SYSTEM BUS</p>
        </div>

        {/* Bus → I/O connectors (4 rows: 2 in, 2 out) */}
        <div className="flex flex-col justify-around shrink-0 py-2">
          <ArrowOut dir="left" />
          <ArrowOut dir="left" />
          <ArrowOut dir="right" />
          <ArrowOut dir="right" />
        </div>

        {/* ── I/O block ── */}
        <div className="flex flex-col justify-between w-32 shrink-0">
          <div className="flex flex-col gap-1.5">
            <p className="text-[9px] text-slate-500 font-mono text-center tracking-widest">INPUT</p>
            <Node id="input" label="Keyboard" />
            <Node id="input" label="Mouse" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Node id="output" label="Display" />
            <Node id="output" label="Printer" />
            <p className="text-[9px] text-slate-500 font-mono text-center tracking-widest">OUTPUT</p>
          </div>
        </div>

      </div>
    </div>
  );
}

function Slide1_1Anim() {
  const TOTAL = 16;
  const SIMD_W = 4;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = React.useRef(null);

  const sisdDone  = Math.min(tick, TOTAL);
  const simdDone  = Math.min(tick * SIMD_W, TOTAL);
  const sisdFinished = sisdDone >= TOTAL;
  const simdFinished = simdDone >= TOTAL;
  const simdFinishTick = TOTAL / SIMD_W;

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTick(prev => {
        if (prev >= TOTAL) { clearInterval(timerRef.current); setRunning(false); return prev; }
        return prev + 1;
      });
    }, 500);
    return () => clearInterval(timerRef.current);
  }, [running]);

  const reset = () => { clearInterval(timerRef.current); setTick(0); setRunning(false); };

  // SISD: item at index sisdDone is at cajero; items after are queued
  const sisdAtCajero = sisdDone < TOTAL ? sisdDone : null;
  const sisdQueue    = Array.from({ length: Math.max(0, TOTAL - sisdDone - 1) }, (_, i) => sisdDone + 1 + i);

  // SIMD: current batch at cajeros; items after batch are queued
  const simdBatchIdxs = !simdFinished
    ? Array.from({ length: Math.min(SIMD_W, TOTAL - simdDone) }, (_, i) => simdDone + i)
    : [];
  const simdQueueStart = simdDone + simdBatchIdxs.length;
  const simdQueue      = Array.from({ length: Math.max(0, TOTAL - simdQueueStart) }, (_, i) => simdQueueStart + i);

  const ItemChip = ({ idx, size = 'sm', ring = false, accent = 'bg-slate-700 border border-slate-600' }) => {
    const cls = size === 'lg'
      ? 'w-11 h-11 text-sm rounded-xl'
      : 'w-6 h-6 text-[9px] rounded';
    return (
      <div className={`${cls} ${accent} flex items-center justify-center font-bold font-mono text-slate-200 shrink-0 ${ring ? 'ring-2 ring-white/40 ring-offset-1 ring-offset-slate-950' : ''}`}>
        {idx + 1}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-5xl mx-auto select-none">
      {/* Controls */}
      <div className="flex items-center justify-center gap-3 shrink-0">
        <button onClick={() => setRunning(r => !r)} disabled={sisdFinished && simdFinished}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-sm font-bold hover:bg-cyan-500/30 disabled:opacity-40 transition-all">
          <Play size={14} /> {running ? 'Corriendo...' : 'Iniciar Simulación'}
        </button>
        <button onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-sm hover:text-slate-200 transition-all">
          <RotateCcw size={14} /> Reset
        </button>
        <span className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Ciclo: <span className="text-slate-300 font-bold">{tick}</span> / {TOTAL}
        </span>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">

        {/* ── SISD panel ── */}
        <div className={`flex flex-col p-4 rounded-2xl border bg-slate-900 transition-colors duration-300 ${sisdFinished ? 'border-emerald-500/50' : 'border-red-500/30'}`}>
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <span className="text-sm font-bold text-red-400 font-mono">SISD — 1 Cajero</span>
              <p className="text-[10px] text-slate-500">1 dato · {TOTAL} ciclos</p>
            </div>
            {sisdFinished
              ? <motion.span initial={{scale:0}} animate={{scale:1}}
                  className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2 py-1 rounded-lg">✓ Ciclo {TOTAL}</motion.span>
              : tick > 0 ? <span className="text-xs font-mono text-red-400">{sisdDone}/{TOTAL}</span>
              : null}
          </div>

          <div className="flex-1 flex items-start gap-3 min-h-0 overflow-hidden">
            {/* Queue — anchored top-left */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <span className="text-[9px] text-slate-600 font-mono mb-0.5">COLA</span>
              <div className="flex flex-col gap-1">
                <AnimatePresence initial={false}>
                  {sisdQueue.map(i => (
                    <motion.div key={i}
                      initial={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 36, transition: { duration: 0.22 } }}
                      layout="position">
                      <ItemChip idx={i} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Flex spacer with arrow centered */}
            <div className="flex-1 flex items-center justify-center pt-8">
              <ArrowRight size={16} className="text-red-500/50" />
            </div>

            {/* Cajero + done counter — anchored top-right */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <span className="text-[9px] text-slate-600 font-mono">CAJERO</span>
              <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-colors duration-200 ${
                sisdAtCajero !== null ? 'border-red-400 bg-slate-800' : sisdFinished ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-slate-700 bg-slate-800'
              }`}>
                <AnimatePresence mode="wait">
                  {sisdAtCajero !== null
                    ? <motion.div key={sisdAtCajero} initial={{scale:0.4,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.4,opacity:0}} transition={{duration:0.2}}>
                        <ItemChip idx={sisdAtCajero} size="lg" ring accent="bg-red-500 border-0" />
                      </motion.div>
                    : <motion.span key="ok" initial={{scale:0}} animate={{scale:1}} className="text-emerald-400 text-xl">✓</motion.span>
                  }
                </AnimatePresence>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold font-mono text-slate-300">{sisdDone}</span>
                <span className="text-[9px] text-slate-600 font-mono">procesados</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SIMD panel ── */}
        <div className={`flex flex-col p-4 rounded-2xl border bg-slate-900 transition-colors duration-300 ${simdFinished ? 'border-emerald-500/50' : 'border-cyan-500/40'}`}>
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <span className="text-sm font-bold text-cyan-400 font-mono">SIMD — {SIMD_W} Cajeros</span>
              <p className="text-[10px] text-slate-500">{SIMD_W} datos · {simdFinishTick} ciclos</p>
            </div>
            {simdFinished
              ? <motion.span initial={{scale:0}} animate={{scale:1}}
                  className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2 py-1 rounded-lg">✓ Ciclo {simdFinishTick} · {TOTAL/simdFinishTick}× más rápido</motion.span>
              : tick > 0 ? <span className="text-xs font-mono text-cyan-400">{simdDone}/{TOTAL}</span>
              : null}
          </div>

          <div className="flex-1 flex items-start gap-3 min-h-0 overflow-hidden">
            {/* Queue — anchored top-left */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <span className="text-[9px] text-slate-600 font-mono mb-0.5">COLA</span>
              <div className="flex flex-col gap-1">
                <AnimatePresence initial={false}>
                  {simdQueue.map(i => (
                    <motion.div key={i}
                      initial={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 36, transition: { duration: 0.22 } }}
                      layout="position">
                      <ItemChip idx={i} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Flex spacer with arrow centered */}
            <div className="flex-1 flex items-center justify-center pt-8">
              <ArrowRight size={16} className="text-cyan-500/50" />
            </div>

            {/* 4 cajeros — anchored top-right */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <span className="text-[9px] text-slate-600 font-mono text-center">CAJEROS</span>
              {Array.from({ length: SIMD_W }, (_, lane) => {
                const itemIdx = simdBatchIdxs[lane] ?? null;
                return (
                  <div key={lane} className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-colors duration-200 ${
                      itemIdx !== null ? 'border-cyan-400 bg-slate-800' : simdFinished ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-slate-700 bg-slate-800'
                    }`}>
                      <AnimatePresence mode="wait">
                        {itemIdx !== null
                          ? <motion.div key={`${tick}-${lane}`} initial={{scale:0.4,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.4,opacity:0}} transition={{duration:0.2}}>
                              <ItemChip idx={itemIdx} ring accent="bg-cyan-500 border-0" />
                            </motion.div>
                          : <motion.span key="ok" initial={{scale:0}} animate={{scale:1}} className="text-emerald-400 text-sm">✓</motion.span>
                        }
                      </AnimatePresence>
                    </div>
                    <span className="text-[9px] text-slate-600 font-mono">C{lane + 1}</span>
                  </div>
                );
              })}
              <div className="flex flex-col items-center mt-1">
                <span className="text-lg font-bold font-mono text-slate-300">{simdDone}</span>
                <span className="text-[9px] text-slate-600 font-mono">procesados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className={`shrink-0 p-3 rounded-xl border text-center text-xs font-mono transition-all duration-300 ${
        tick === 0
          ? 'border-slate-800 bg-slate-900/50 text-slate-700'
          : simdFinished && !sisdFinished
            ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-300'
            : sisdFinished && simdFinished
              ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-300'
              : 'bg-slate-900 border-slate-800 text-slate-400'
      }`}>
        {tick === 0
          ? 'Presioná "Iniciar Simulación" para ver la diferencia en tiempo real'
          : simdFinished && !sisdFinished
            ? `⚡ SIMD terminó (ciclo ${simdFinishTick}) — SISD va en ${Math.round((sisdDone / TOTAL) * 100)}% · ${TOTAL - sisdDone} datos pendientes`
            : sisdFinished && simdFinished
              ? `Speedup = ${TOTAL} ciclos / ${simdFinishTick} ciclos = ${TOTAL / simdFinishTick}× más rápido`
              : `SIMD procesó ${simdDone} · SISD procesó ${sisdDone} · ventaja: +${simdDone - sisdDone} datos`}
      </div>
    </div>
  );
}

function Slide1_2() {
  const steps = [
    { title: '1. FETCH', desc: 'El Program Counter (PC) apunta a la siguiente instrucción en RAM y la CPU la carga.', color: 'border-cyan-400 text-cyan-300' },
    { title: '2. DECODE', desc: 'La Unidad de Control interpreta el opcode (operación) e identifica operandos.', color: 'border-blue-400 text-blue-300' },
    { title: '3. EXECUTE', desc: 'La ALU realiza el cálculo matemático o lógico sobre el dato.', color: 'border-amber-400 text-amber-300' },
    { title: '4. WRITEBACK', desc: 'El resultado se escribe de vuelta en Registros o Memoria RAM.', color: 'border-purple-400 text-purple-300' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s, i) => (
          <motion.div key={i} whileHover={{ y: -3 }} className={`p-4 rounded-2xl bg-slate-900 border-2 ${s.color} space-y-2`}>
            <h4 className="font-bold font-mono text-sm">{s.title}</h4>
            <p className="text-[11px] leading-relaxed text-slate-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Componentes Clave SISD (Von Neumann)</h4>
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">1 ALU Única</div>
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">1 Bus de Memoria</div>
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">1 Stream Instrucciones</div>
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">1 Stream Datos</div>
        </div>
      </div>
    </div>
  );
}

function Slide1_3() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <p className="text-xs text-slate-400 text-center">Matriz 2×2 basada en Flujos de Instrucciones (I) vs Flujos de Datos (D)</p>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 opacity-60">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded">Single Instr - Single Data</span>
          <h3 className="text-lg font-bold text-slate-300 mt-1">SISD</h3>
          <p className="text-xs text-slate-400 mt-1">Von Neumann clásico. Procesadores uninúcleo tradicionales.</p>
        </div>

        <motion.div animate={{ boxShadow: ['0 0 15px rgba(6,182,212,0.1)', '0 0 25px rgba(6,182,212,0.3)', '0 0 15px rgba(6,182,212,0.1)'] }} transition={{ repeat: Infinity, duration: 2 }} className="p-5 rounded-2xl bg-slate-900 border-2 border-cyan-400">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-400/30">EL FOCO HOY ★</span>
          <h3 className="text-xl font-bold text-cyan-300 mt-1">SIMD</h3>
          <p className="text-xs text-slate-300 mt-1">Single Instruction, Multiple Data. El especialista en cómputo masivo.</p>
        </motion.div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 opacity-60">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded">Multiple Instr - Single Data</span>
          <h3 className="text-lg font-bold text-slate-300 mt-1">MISD</h3>
          <p className="text-xs text-slate-400 mt-1">Caso teórico / Systolic Arrays (Google TPU).</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-blue-500/40">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">Multiple Instr - Multiple Data</span>
          <h3 className="text-lg font-bold text-blue-300 mt-1">MIMD / SMP</h3>
          <p className="text-xs text-slate-300 mt-1">El Generalista. Multiprocesadores multinúcleo asíncronos.</p>
        </div>
      </div>
    </div>
  );
}

function Slide1_4() {
  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
              <th className="p-3">Dimensión</th>
              <th className="p-3 text-blue-400 font-bold">⚙️ SMP / MIMD (El Generalista)</th>
              <th className="p-3 text-cyan-400 font-bold">⚡ SIMD (El Especialista)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr>
              <td className="p-3 font-bold text-slate-300">Tarea típica</td>
              <td className="p-3 text-slate-400">Multitarea asíncrona (Sistemas Operativos, DBs)</td>
              <td className="p-3 text-cyan-300 font-semibold">Procesamiento masivo síncrono (Multimedia, IA)</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-300">Instrucciones</td>
              <td className="p-3 text-slate-400">Múltiples instrucciones distintas simultáneas</td>
              <td className="p-3 text-cyan-300 font-semibold">Una sola instrucción emitida para N datos</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-300">Problemas típicos</td>
              <td className="p-3 text-red-400 font-semibold">Bus congestion & Spinlocks en recursos compartidos</td>
              <td className="p-3 text-red-400 font-semibold">Divergencia condicional con enmascaramiento</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-300">Eficiencia Energética</td>
              <td className="p-3 text-slate-400">Moderada (overhead de control por núcleo)</td>
              <td className="p-3 text-amber-300 font-semibold">Ultra-alta (costo de decode dividido entre N)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// === SLIDE COMPONENTS (INTEGRANTE 2) ===
// ==========================================

function Slide2_1() {
  return (
    <div className="space-y-6 text-center max-w-4xl mx-auto">
      <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/40 inline-block px-8 shadow-lg shadow-cyan-500/10">
        <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest block">Unidad de Control Única</span>
        <h4 className="text-base font-bold text-slate-100 mt-1">Comando: SUMAR +10</h4>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 py-2">
        {[5, 12, 3, 8, 15, 7, 2, 9].map((val, i) => (
          <motion.div key={i} whileHover={{ y: -4 }} className="space-y-1.5">
            <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono text-slate-400">ALU{i}</div>
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 font-bold font-mono text-xs">{val}</div>
            <div className="text-cyan-400 text-[10px]">↓</div>
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold font-mono text-xs shadow-md">{val + 10}</div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-xl mx-auto">
        💡 <span className="text-cyan-400 font-bold">Impacto Energético:</span> Decodificar es trabajo. Al decodificar 1 sola vez para 8 ALUs, el costo de Fetch/Decode se divide entre 8.
      </p>
    </div>
  );
}

function Slide2_2() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-500 font-mono">Registro Escalar (32 Bits)</span>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 text-center font-mono text-slate-300 font-bold text-sm">[ 3.14159 ]</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/50 space-y-2">
          <span className="text-xs text-cyan-400 font-mono">Registro Vectorial XMM (128 Bits)</span>
          <div className="grid grid-cols-4 gap-1 p-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-center font-mono text-xs font-bold text-cyan-300">
            <div className="bg-cyan-500/20 p-1.5 rounded">3.14</div>
            <div className="bg-cyan-500/20 p-1.5 rounded">2.71</div>
            <div className="bg-cyan-500/20 p-1.5 rounded">1.41</div>
            <div className="bg-cyan-500/20 p-1.5 rounded">0.57</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-cyan-400 font-mono font-bold block">VLEN (Vector Length)</span> Longitud o cantidad de elementos activos en el registro.</div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-amber-400 font-mono font-bold block">VSTR (Vector Stride)</span> Distancia en memoria entre elementos consecutivos.</div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-purple-400 font-mono font-bold block">VMASK (Vector Mask)</span> Máscara de bits para activar/desactivar elementos en condicionales.</div>
      </div>
    </div>
  );
}

function Slide2_3() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3">
        <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2"><Layers size={16} /> Array Processor (Espacio)</h4>
        <p className="text-xs text-slate-300">Múltiples PEs (Processing Elements) físicos independientes operando exactamente en el mismo ciclo de reloj.</p>
        <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
          • 4 obreros trabajando al mismo tiempo<br />
          • Usado en GPUs y Connection Machine CM-2
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-3">
        <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2"><Activity size={16} /> Vector Processor (Tiempo)</h4>
        <p className="text-xs text-slate-300">Un pipeline segmentado que procesa elementos en pasos consecutivos de tiempo en la misma estructura.</p>
        <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-purple-300 border border-slate-800">
          • Línea de ensamblaje de fábrica<br />
          • Usado en CRAY-1 clásico
        </div>
      </div>
    </div>
  );
}

function Slide2_4() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-3">
        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2"><CheckCircle2 size={16} /> Ventajas Clave</h4>
        <ul className="text-xs text-slate-300 space-y-1.5">
          <li>✓ Throughput N veces mayor por ciclo</li>
          <li>✓ 1 sola decodificación de instrucción para N datos</li>
          <li>✓ Reducción masiva de instrucciones dinámicas (304 → 7)</li>
          <li>✓ Amortización de latencia en el pipeline vectorial</li>
        </ul>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-red-500/40 space-y-3">
        <h4 className="text-sm font-bold text-red-400 flex items-center gap-2"><ShieldAlert size={16} /> La Kryptonita: Divergencia Condicional</h4>
        <p className="text-xs text-slate-400">Si el código tiene <span className="font-mono text-red-300">if (A[i] &gt; 0)</span>, el hardware ejecuta AMBOS caminos enmascarando los elementos falsos.</p>
        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300">
          ⚠️ Además, accesos no alineados en memoria (stride &gt; 1) causan penalizaciones severas.
        </div>
      </div>
    </div>
  );
}

// ==========================================
// === SLIDE COMPONENTS (INTEGRANTE 3) ===
// ==========================================

function Slide3_1() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs text-slate-300">
        <span className="font-bold text-cyan-400">Caso Real (Intel Atom 2009):</span> Sin extensiones SIMD, la CPU se saturaba al 100% procesando video HD. Con SSE habilitado, el mismo chip lo manejaba al 40%.
      </div>

      <div className="space-y-2 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-blue-400 font-bold">1996 · MMX (64 Bits)</span> <span>8x int8 (Reutilizaba registros FPU)</span></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-cyan-400 font-bold">1999 · SSE (128 Bits)</span> <span>4x Float32 (Nuevos registros XMM)</span></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-purple-400 font-bold">2010 · AVX (256 Bits)</span> <span>8x Float32 / 4x Double64 (Registros YMM)</span></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-amber-400 font-bold">2017 · AVX-512 (512 Bits)</span> <span>16x Float32 + Regs de Máscara k0-k7</span></div>
      </div>
    </div>
  );
}

function Slide3_2() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto text-center">
      <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40">
        <h4 className="text-sm font-bold text-amber-300">Subword Parallelism</h4>
        <p className="text-xs text-slate-300 mt-1">Un solo sumador físico de 256 bits se particiona ajustando la lógica de acarreo interna según la instrucción.</p>
      </div>

      <div className="space-y-2 text-xs font-mono text-left">
        <div className="text-cyan-400 font-bold">• Particionado como 8×32-bit (Floats en VADDPS)</div>
        <div className="grid grid-cols-8 gap-1 text-center font-bold">
          {[...Array(8)].map((_, i) => <div key={i} className="p-2 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300">+32</div>)}
        </div>
        <div className="text-purple-400 font-bold pt-2">• Particionado como 32×8-bit (Bytes para píxeles RGB en PADDB)</div>
        <div className="grid grid-cols-16 gap-0.5 text-center text-[9px] font-bold">
          {[...Array(16)].map((_, i) => <div key={i} className="p-1 rounded bg-purple-500/20 border border-purple-400 text-purple-300">+8</div>)}
        </div>
      </div>
    </div>
  );
}

function Slide3_3() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-2">
        <div className="text-cyan-400 font-bold">; Código Ensamblador AVX Típico:</div>
        <div className="text-slate-300">VMOVAPD ymm0, [X + i*8]    <span className="text-slate-500">; cargar 4 doubles de X</span></div>
        <div className="text-slate-300">VBROADCASTSD ymm1, [scalar] <span className="text-slate-500">; copiar escalar a 4 posiciones</span></div>
        <div className="text-purple-300 font-bold">VFMADDPD ymm2, ymm0, ymm1, ymm3 <span className="text-purple-400">; FMA: (ymm0 * ymm1) + ymm3 en 1 ciclo</span></div>
      </div>
      <p className="text-xs text-slate-400 text-center">FMA (Fused Multiply-Add) es la instrucción clave en Inteligencia Artificial y Deep Learning.</p>
    </div>
  );
}

function Slide3_4() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-3">
        <span className="text-xs text-purple-400 font-mono font-bold">AMD Excavator (Pre-2017)</span>
        <h4 className="text-base font-bold text-slate-200">2x 128-bit FMAC Coordinados</h4>
        <p className="text-xs text-slate-400">Coordinaba dos unidades de 128 bits para simular AVX-256, generando mayor latencia y complejidad de control.</p>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3">
        <span className="text-xs text-cyan-400 font-mono font-bold">AMD Zen (2017+)</span>
        <h4 className="text-base font-bold text-slate-200">Unidad Nativa de 256-bit</h4>
        <p className="text-xs text-slate-400">Un único planificador FP distribuye trabajo vía crossbar a una unidad FMAC-256 nativa con menor consumo.</p>
      </div>
    </div>
  );
}

// ==========================================
// === SLIDE COMPONENTS (INTEGRANTE 4) ===
// ==========================================

function Slide4_1() {
  return (
    <div className="space-y-4 max-w-5xl mx-auto text-xs font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-red-500/30 space-y-2">
          <h4 className="font-bold text-red-400">Escalar (304 Instrucciones Dinámicas):</h4>
          <div className="space-y-1 text-slate-300">
            <div>• 4x MOVI (Inicializar contadores)</div>
            <div>• 100x LD (2 loads x 50 iteraciones)</div>
            <div>• 50x ADD + 50x SHFR + 50x ST</div>
            <div>• 50x DECBNZ (Branches)</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/40 space-y-2">
          <h4 className="font-bold text-cyan-400">Vectorial SIMD (7 Instrucciones Dinámicas):</h4>
          <div className="space-y-1 text-slate-300">
            <div>• 2x MOVI (VLEN=50, VSTR=1)</div>
            <div>• 2x VLD (V0, A y V1, B solapados)</div>
            <div>• 1x VADD + 1x VSHFR + 1x VST</div>
          </div>
        </div>
      </div>
      <div className="p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-center text-cyan-300 font-bold">
        Speedup Real = 2004 ciclos / 285 ciclos ≈ 7.0X
      </div>
    </div>
  );
}

function Slide4_2() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-xs">
      <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-3">
        <h4 className="text-sm font-bold text-cyan-400">Throughput (GFLOPS)</h4>
        <p className="text-slate-300">Volumen de datos por segundo. AVX-512 a 3GHz = 48 GFLOPS (hasta 96 GFLOPS con FMA).</p>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-3">
        <h4 className="text-sm font-bold text-purple-400">Ley de Amdahl & Techo Secuencial</h4>
        <p className="text-slate-300">Si el 20% del código es secuencial y no se puede vectorizar, el speedup máximo teórico jamás superará 5X, sin importar cuántas ALUs agregues.</p>
      </div>
    </div>
  );
}

function Slide4_3() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto text-xs">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <h4 className="font-bold text-cyan-400">Python NumPy</h4>
        <p className="text-slate-400 mt-1">Llama internamente a BLAS/LAPACK acelerado por AVX-512.</p>
      </div>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <h4 className="font-bold text-amber-400">Redes Neuronales</h4>
        <p className="text-slate-400 mt-1">Convoluciones CNN y multiplicaciones de matrices GEMM.</p>
      </div>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <h4 className="font-bold text-purple-400">Cifrado AES-NI</h4>
        <p className="text-slate-400 mt-1">Instrucciones vectoriales dedicadas para seguridad en red.</p>
      </div>
    </div>
  );
}

function Slide4_4() {
  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-4xl mx-auto space-y-4 text-center text-xs">
      <h4 className="text-sm font-bold text-slate-200">SoC Híbrido Moderno</h4>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <span className="font-bold text-blue-400">CPU (MIMD)</span> Orquesta el Sistema Operativo y código secuencial irregular.
        </div>
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
          <span className="font-bold text-cyan-400">GPU (SIMD)</span> Ejecuta cómputo masivamente paralelo (renderizado y AI).
        </div>
      </div>
    </div>
  );
}

function Slide4_5() {
  return (
    <div className="p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 max-w-3xl mx-auto text-center space-y-4">
      <Sparkles size={36} className="text-cyan-400 mx-auto animate-bounce" />
      <h3 className="text-xl font-bold text-slate-100">SIMD: La Base del Cómputo Moderno</h3>
      <p className="text-xs text-slate-300 italic">
        "Lo que comenzó como una extensión multimedia en 1996 es hoy la estructura sobre la cual se erige toda la Inteligencia Artificial."
      </p>
    </div>
  );
}
