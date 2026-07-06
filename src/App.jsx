import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, UserCheck, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  SlidePortada, SlideIndice,
  Slide1_LimiteSec, Slide1_1, Slide1_1Anim, Slide1_2, Slide1_4, Slide1_LimitacionesSISD,
  SlideIntroParte1,
  Slide2_1, Slide2_2, Slide2_3, Slide2_4, Slide2_5, SlideIntroParte2,
  Slide3_1, Slide3_2, Slide3_3, Slide3_FDE_SIMD, Slide3_Chaining, Slide3_4, Slide3_OrganizacionDatos, SlideIntroParte3,
  Slide4_1, Slide4_2, Slide4_3, Slide4_4, Slide4_5, Slide4_Divergencia, SlideIntroParte4,
  SlidePracticaAsm
} from './slides';

// --- SECTIONS METADATA WITH REAL MEMBER NAMES ---
const SECTIONS = [
  { id: 0, title: 'Inicio y Agenda', member: 'Presentación', color: 'from-blue-600 to-indigo-600' },
  { id: 1, title: 'Parte 1: El Problema y Taxonomía', member: 'Reyes Alisson', color: 'from-cyan-500 to-blue-500' },
  { id: 2, title: 'Parte 2: El Principio Vectorial', member: 'Rivera Yandris', color: 'from-purple-500 to-pink-500' },
  { id: 3, title: 'Parte 3: Extensiones MMX/SSE/AVX', member: 'Alejandro Andy', color: 'from-amber-500 to-orange-500' },
  { id: 4, title: 'Parte 4: Rendimiento y Aplicaciones', member: 'Bermudez Gino', color: 'from-emerald-500 to-teal-500' },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

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
      speaker: "Nuestra exposición se divide en 4 partes temáticas presentadas por Reyes Alisson, Rivera Yandris, Alejandro Andy y Bermudez Gino.",
      component: <SlideIndice onSelectSection={(secId) => {
        const idx = slides.findIndex(s => s.id === `${secId}.intro`);
        if (idx !== -1) setCurrentSlide(idx);
      }} />
    },

    // === PARTE 1: REYES Alisson ===
    {
      id: '1.intro',
      section: 1,
      title: 'Parte 1: El Problema Secuencial y la Taxonomía de Flynn',
      subtitle: 'Expositor: Reyes Alisson · Parte 1',
      speaker: "Hola a todos, soy Reyes Alisson. En esta primera parte abordaré el problema del modelo Von Neumann secuencial clásico y cómo Flynn clasificó las arquitecturas paralelas en 1966.",
      component: <SlideIntroParte1 />
    },
    {
      id: '1.0',
      section: 1,
      title: '¿Por qué existe el paralelismo? El límite secuencial',
      subtitle: 'Slide 1.0 · El cuello de botella estructural · SISD vs SIMD en números reales',
      speaker: "El problema no es qué tan rápido corre la CPU — es que solo puede hacer una cosa a la vez, como un chef con un sartén de 1 hamburguesa. Con el ejemplo de C[i]=(A[i]+B[i])/2 sobre 50 elementos, el modelo secuencial genera 304 instrucciones y 2004 ciclos. El modelo vectorial —la parrilla con espátula gigante— lo resuelve en 7 instrucciones y 285 ciclos. Ese es el argumento de existencia del paralelismo.",
      component: <Slide1_LimiteSec />
    },
    {
      id: '1.1b',
      section: 1,
      title: 'Simulación: Cajero vs Paralelo',
      subtitle: 'Slide 1.1b · Animación Interactiva · SISD vs SIMD en tiempo real',
      speaker: "Esta animación usa la analogía del chef. SISD es un sartén donde solo cabe 1 hamburguesa a la vez: el chef voltea una por una, 16 veces. SIMD es una parrilla con espacio para 4 hamburguesas y una espátula gigante: con un solo movimiento voltea las 4 a la vez, terminando 4 veces más rápido. La desventaja: si las hamburguesas necesitan cocciones distintas, la espátula gigante no sirve — eso es la divergencia.",
      component: <Slide1_1Anim />
    },
    {
      id: '1.1',
      section: 1,
      title: 'Taxonomía de Flynn — Diagrama Interactivo',
      subtitle: 'Slide 1.1 · SISD · SIMD · MISD · MIMD · Hacé click para explorar',
      speaker: "Flynn clasificó las arquitecturas en dos ejes: cuántos flujos de instrucciones y cuántos flujos de datos. SISD es Von Neumann clásico. SIMD es nuestro foco: 1 instrucción, N datos en paralelo. MIMD es el generalista multinúcleo. MISD es el caso teórico. Hacé click en cada componente para ver su rol en cada arquitectura.",
      component: <Slide1_1 />
    },
    {
      id: '1.2',
      section: 1,
      title: 'El Ciclo Fetch-Decode-Execute',
      subtitle: 'Slide 1.2 · Fetch · Decode · Execute · Writeback',
      speaker: "La CPU ejecuta instrucciones en 4 etapas: Fetch (trae de RAM), Decode (interpreta opcode), Execute (ALU opera), Writeback (guarda resultado). Es el latido del modelo Von Neumann y la base de todo procesamiento secuencial.",
      component: <Slide1_2 />
    },
    {
      id: '1.limitaciones',
      section: 1,
      title: 'Limitaciones del SISD',
      subtitle: 'Slide 1.4 · Von Neumann Bottleneck y Muro de Frecuencia · Sección 1.3',
      speaker: "Para cerrar la Parte 1, analizamos por qué SISD se agotó en frecuencia: el reloj se estancó en 2005 por calor y el bus único de Von Neumann limita el ancho de banda. Pero SISD no quedó obsoleto, sigue siendo indispensable donde el orden y la integridad del dato importan más que la velocidad, como transacciones bancarias o control secuencial crítico, mientras el paralelismo prioriza throughput a costa de esa garantía.",
      component: <Slide1_LimitacionesSISD />
    },

    // === PARTE 2: RIVERA YANDRIS ===
    {
      id: '2.intro',
      section: 2,
      title: 'Parte 2: Arquitectura SIMD y el Principio Vectorial',
      subtitle: 'Expositor: Rivera Yandris · Parte 2',
      speaker: "Saludos, soy Rivera Yandris. En esta segunda parte explicaré el funcionamiento interno de SIMD: registros vectoriales, la dualidad espacio-tiempo y los requisitos de regularidad de datos.",
      component: <SlideIntroParte2 />
    },
    {
      id: '2.1',
      section: 2,
      title: '¿Qué es SIMD? Una Orden, Ocho Soldados',
      subtitle: 'Slide 2.1 · Definición, Flynn, y Demostración Visual',
      speaker: "Empezamos definiendo qué es SIMD: Single Instruction, Multiple Data. Una sola instrucción decodificada una vez aplicada a N datos en N ALUs en paralelo. La clave es que el costo de fetch+decode se amortiza entre N — por eso es energéticamente eficiente. Uso la analogía del comandante y el escuadrón, y lo conecto con la taxonomía de Flynn que vimos en la Parte 1. Luego paso a la demostración visual: la unidad de control emite 'SUMAR +10' y las 8 ALUs lo ejecutan simultáneamente.",
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
      subtitle: 'Slide 2.3 · Array vs Vector Processors · Filtro interactivo con cálculos',
      speaker: "Vista consolidada estilo Hennessy & Patterson. Arriba selector de ciclo (C0-C7) que resalta la fila actual en ambos grids. A la izquierda: Array Processor con su CU, los 4 PEs y la grilla Espacio-Tiempo donde en cada ciclo los 4 PEs hacen la MISMA operación sobre datos distintos — paralelismo en espacio, latencia baja, costo alto. A la derecha: Vector Processor con su pipeline de 3 etapas y su grilla Espacio-Tiempo donde se ve la diagonal característica del pipelining — en cada ciclo, las 4 etapas hacen operaciones DISTINTAS sobre el mismo elemento — paralelismo en tiempo, hardware menor, latencia de arranque alta. Ejemplos clásicos: ILLIAC IV (Array) y CRAY-1 (Vector).",
      component: <Slide2_3 />
    },
    {
      id: '2.4',
      section: 2,
      title: 'Ventajas del Procesamiento Vectorial',
      subtitle: 'Slide 2.4 · Ventajas Principales y Requisitos de Regularidad (Sección 2.7)',
      speaker: "En la sección 2.7 analizamos las ventajas clave: multiplicamos el throughput por N y dividimos el costo de decodificación entre N datos. Para aprovechar esto, el problema requiere datos homogéneos, contiguos en memoria y sin dependencias.",
      component: <Slide2_4 />
    },
    {
      id: '2.5',
      section: 2,
      title: 'Código Secuencial vs Vectorial (SISD vs SIMD)',
      subtitle: 'Slide 2.5 · Loop escalar vs VADDPS · Scroll virtual + cálculos',
      speaker: "Comparamos el mismo problema — sumar dos arrays elemento a elemento — ejecutado como loop escalar SISD contra una instrucción vectorial VADDPS sobre XMM. El SISD hace 4 instrucciones ADD, una por iteración, totalizando 4 ciclos. La instrucción VADDPS ejecuta la suma sobre las 4 lanes del registro XMM en paralelo, totalizando 1 sola instrucción y 1 solo ciclo. Speedup real: 4× en este caso ideal con datos regulares. El scroll virtual arriba permite avanzar ciclo por ciclo para ver el progreso de cada procesador; el panel de cálculos al pie muestra la aritmética exacta en cada momento.",
      component: <Slide2_5 />
    },

    // === PARTE 3: ALEJANDRO ANDY ===
    {
      id: '3.intro',
      section: 3,
      title: 'Parte 3: Extensiones SIMD Modernas (MMX, SSE, AVX)',
      subtitle: 'Expositor: Alejandro Andy · Parte 3',
      speaker: "Buenas tardes, soy Alejandro Andy. Analizaremos cómo Intel y AMD evolucionaron los registros desde MMX hasta AVX-512, el truco del Subword Parallelism, la práctica en assembler y las instrucciones FMA.",
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
      id: '3.organizacion',
      section: 3,
      title: 'Organización de Datos Empaquetados en Registros',
      subtitle: 'Slide 3.4 · Formatos Float32, Double64, Int16 y Byte8 · Sección 3.4 de la Guía',
      speaker: "En la sección 3.4 de la guía analizamos cómo un registro vectorial YMM de 256 bits subdivide físicamente su espacio: puede albergar 8 floats de 32-bit, 4 doubles de 64-bit, 16 Shorts de 16-bit o 32 bytes de 8-bit para procesamiento masivo.",
      component: <Slide3_OrganizacionDatos />
    },
    {
      id: 'asm.practice',
      section: 3,
      title: 'Práctica: Suma de Arreglos en Assembler',
      subtitle: 'Slide 3.5 · Código Escalar (SISD) vs Vectorial (SSE) · Sección 3.6 de la Guía',
      speaker: "Para aplicar las instrucciones SSE vistas en la sección 3.6 de la guía, aquí comparamos el código assembler escalar contra el vectorial. Del lado izquierdo, el bucle SISD carga, suma y guarda un elemento por vez. Del lado derecho, con MOVAPS y ADDPS de SSE, procesamos 4 floats por instrucción. Observen la instrucción addps: una sola instrucción haciendo 4 sumas simultáneas.",
      component: <SlidePracticaAsm />
    },
    {
      id: '3.4',
      section: 3,
      title: 'Fetch-Decode-Execute en SIMD',
      subtitle: 'Slide 3.6 · El Pipeline Vectorial paso a paso',
      speaker: "El pipeline interno para VADDPD: FETCH carga 1 instrucción, DECODE identifica que opera sobre 256 bits, EXECUTE activa 4 sumadores de 64 bits simultáneamente, y WRITEBACK escribe 256 bits de una vez. La diferencia clave con SISD: 1 decodificación para 4 operaciones efectivas.",
      component: <Slide3_FDE_SIMD />
    },
    {
      id: '3.5',
      section: 3,
      title: 'Encadenamiento Vectorial (Vector Chaining)',
      subtitle: 'Slide 3.7 · Sección 3.8 · CRAY-1 (Seymour Cray, 1976)',
      speaker: "En la sección 3.8 de la guía analizamos el encadenamiento vectorial introducido por Seymour Cray en la CRAY-1. Permite que el resultado de la ALU multiplicadora pase directamente a la ALU sumadora sin esperar al vector completo. Es el antepasado directo de la instrucción FMA moderna.",
      component: <Slide3_Chaining />
    },
    {
      id: '3.6',
      section: 3,
      title: 'El ISA es el Mismo. El Hardware No.',
      subtitle: 'Slide 3.8 · AMD Excavator vs AMD Zen',
      speaker: "Excavator coordinaba dos unidades FMAC de 128 bits con mayor latencia. Zen implementó una unidad nativa de 256 bits con crossbar, demostrando cómo la microarquitectura cambia el rendimiento real.",
      component: <Slide3_4 />
    },

    // === PARTE 4: BERMUDEZ GINO ===
    {
      id: '4.intro',
      section: 4,
      title: 'Parte 4: Rendimiento, Aplicaciones y Conclusiones',
      subtitle: 'Expositor: Bermudez Gino · Parte 4',
      speaker: "Hola a todos, soy Bermudez Gino. En esta parte final revisaremos el desglose numérico de speedup real, Throughput, Ley de Amdahl, la divergencia condicional, aplicaciones reales en IA y SoCs híbridos.",
      component: <SlideIntroParte4 />
    },
    {
      id: '4.1',
      section: 4,
      title: 'El Argumento Definitivo: Desglose de Instrucciones',
      subtitle: 'Slide 4.1 · Desglose Dinámico: 304 vs 7 Instrucciones (Sección 4.2)',
      speaker: "Como vimos en la sección 4.2 de la guía, en la suma de 50 elementos el bucle escalar ejecuta 100 Loads, 50 ADDS, 50 Shifts, 50 Stores y 50 Branches (304 instrs). En vectorial, 2 cargas, 1 VADD, 1 VSHFR y 1 VST lo hacen todo en 7 instrucciones y 285 ciclos. Logramos un Speedup real de 7.0x.",
      component: <Slide4_1 />
    },
    {
      id: '4.2',
      section: 4,
      title: 'Throughput y Ley de Amdahl',
      subtitle: 'Slide 4.2 · Las Dos Métricas Fundamentales (Secciones 4.3 y 4.4)',
      speaker: "Throughput (GFLOPS) escala con el ancho del registro. Pero la Ley de Amdahl establece un techo: si el 20% del código es secuencial, el speedup máximo teórico jamás superará 5x.",
      component: <Slide4_2 />
    },
    {
      id: '4.kryptonita',
      section: 4,
      title: 'La Kryptonita del SIMD: Divergencia Condicional',
      subtitle: 'Slide 4.3 · Animación Interactiva de Enmascaramiento · Sección 4.5 de la Guía',
      speaker: "Llegamos a la sección 4.5 de nuestra guía: la kryptonita del SIMD. Cuando ejecutamos un 'if/else' donde algunos datos entran por el camino verdadero y otros por el falso, SIMD se ve obligado a ejecutar AMBOS caminos aplicando una máscara de bits (VMASK) para descartar los inactivos. Esto penaliza severamente el rendimiento.",
      component: <Slide4_Divergencia />
    },
    {
      id: '4.3',
      section: 4,
      title: 'SIMD en el Mundo Real',
      subtitle: 'Slide 4.4 · Aplicaciones en la Computación Actual',
      speaker: "Al ejecutar np.dot en Python o procesar imágenes en Photoshop, estás usando SIMD. BLAS, redes neuronales (CNNs) y cifrado AES-NI dependen 100% de estas extensiones.",
      component: <Slide4_3 />
    },
    {
      id: '4.4',
      section: 4,
      title: 'El Paradigma Híbrido: SoC Moderno',
      subtitle: 'Slide 4.5 · CPU (MIMD) + GPU (SIMD) en el Mismo Silicio',
      speaker: "Los chips modernos de smartphones y laptops combinan núcleos CPU para control asíncrono y miles de cores SIMD en la GPU integrados por un bus de alta velocidad.",
      component: <Slide4_4 />
    },
    {
      id: '4.smp_simd',
      section: 4,
      title: 'Tabla de Diagnóstico Final: SMP vs SIMD',
      subtitle: 'Slide 4.6 · Diagnóstico y Comparación Estructural (Sección 4.8)',
      speaker: "Como tabla de diagnóstico final según la sección 4.8 de la guía, comparamos SMP (MIMD) contra SIMD en cuatro ejes: tarea típica, instrucciones dinámicas, cuellos de botella (congestión de bus vs divergencia) y eficiencia energética.",
      component: <Slide1_4 />
    },
    {
      id: '4.5',
      section: 4,
      title: 'Conclusiones y Cierre',
      subtitle: 'Slide 4.7 · La División del Trabajo Computacional',
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
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
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
                title={`${sec.title} — ${sec.member}`}
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

