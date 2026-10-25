import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, UserCheck, HelpCircle, ChevronLeft, ChevronRight, Sun, Moon, Monitor, Eye, EyeOff } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { SlideStepProvider, useSlideStep } from './context/SlideStepContext';

import {
  SlidePortada, SlideIndice,
  Slide1_LimiteSec, Slide1_1, Slide1_1Anim, Slide1_2, Slide1_4, Slide1_LimitacionesSISD,
  SlideIntroParte1,
  Slide2_1, Slide2_2, Slide2_3, Slide2_4, SlideIntroParte2,
  Slide3_1, Slide3_2, Slide3_3, Slide3_FDE_SIMD, Slide3_Chaining, Slide3_4, Slide3_OrganizacionDatos, Slide3_9, SlideIntroParte3,
  Slide4_1, Slide4_2, Slide4_3, Slide4_4, Slide4_5, Slide4_Divergencia, SlideIntroParte4,
  SlidePracticaAsm
} from './slides';

import { SECTIONS_STATS, getStatsSlides } from './deckStats';

// --- SECTIONS METADATA WITH REAL MEMBER NAMES (SIMD) ---
const SECTIONS_SIMD = [
  { id: 0, title: 'Inicio y Agenda', member: 'Presentación', color: 'from-blue-600 to-indigo-600' },
  { id: 1, title: 'Parte 1: El Problema y Taxonomía', member: 'Reyes Alisson', color: 'from-cyan-500 to-blue-500' },
  { id: 2, title: 'Parte 2: El Principio Vectorial', member: 'Rivera Yandris', color: 'from-purple-500 to-pink-500' },
  { id: 3, title: 'Parte 3: Extensiones MMX/SSE/AVX', member: 'Alejandro Andy', color: 'from-amber-500 to-orange-500' },
  { id: 4, title: 'Parte 4: Rendimiento y Aplicaciones', member: 'Bermudez Gino', color: 'from-emerald-500 to-teal-500' },
];

export default function App() {
  const [deckTheme, setDeckTheme] = useState('stats'); // 'simd' | 'stats'
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <SlideStepProvider currentSlide={currentSlide}>
      <DeckContainer 
        deckTheme={deckTheme} 
        setDeckTheme={setDeckTheme} 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
      />
    </SlideStepProvider>
  );
}

function DeckContainer({ deckTheme, setDeckTheme, currentSlide, setCurrentSlide }) {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false); // Modo Zen: oculta Header y Footer para 100% de pantalla útil
  const { theme, cycle } = useTheme();
  const { nextStep, prevStep } = useSlideStep();

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

  const slidesSIMD = [
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
        const idx = slidesSIMD.findIndex(s => s.id === `${secId}.intro`);
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
      title: 'Simulación: Secuencial vs Paralelo',
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
      title: 'Comparativa Global: SISD vs SIMD vs MISD vs MIMD',
      subtitle: 'Slide 1.2 · Matriz de Decisión y Cuándo Usar Cada Una',
      speaker: "Esta tabla resume la taxonomía con métricas reales. Miren la ganancia típica: SIMD ofrece entre 4x y 16x en datos regulares, mientras que MIMD escala con el número de núcleos pero sufre por sincronización. La clave para recordar: SIMD es paralelismo de datos (DLP), MIMD es paralelismo de hilos (TLP).",
      component: <Slide1_2 />
    },
    {
      id: '1.4',
      section: 1,
      title: 'La Barrera de la Ley de Amdahl y Gustafson',
      subtitle: 'Slide 1.4 · Calculadora Interactiva de Speedup Teórico',
      speaker: "Amdahl demostró que la porción secuencial f de un programa pone un techo duro al speedup: si f es 10%, el aceleramiento máximo teórico es 10x, aunque tengamos mil procesadores. Usen los sliders para ver cómo varía el speedup al cambiar f y N.",
      component: <Slide1_4 />
    },
    {
      id: '1.5',
      section: 1,
      title: 'Por qué fracasó escalar SISD: El Muro de Potencia',
      subtitle: 'Slide 1.5 · Frecuencia vs Consumo · El fin de la escala de Dennard (2004)',
      speaker: "Durante 30 años la industria aceleró SISD subiendo la frecuencia: de 5 MHz en 1981 a 3.8 GHz en el Pentium 4 Prescott en 2004. Ahí chocamos contra el Power Wall: la potencia escala con f al cubo. Prescott consumía 115 Watts en 90 nanómetros — disipaba tanto calor como una plancha eléctrica. Si seguíamos subiendo frecuencia, el chip se derretía. La única salida: no subir el reloj, sino procesar más datos por ciclo. Eso es exactamente SIMD.",
      component: <Slide1_LimitacionesSISD />
    },

    // === PARTE 2: RIVERA Yandris ===
    {
      id: '2.intro',
      section: 2,
      title: 'Parte 2: El Principio Vectorial y el Modelo de Ejecución',
      subtitle: 'Expositor: Rivera Yandris · Parte 2',
      speaker: "Hola a todos, soy Rivera Yandris. En esta segunda parte veremos el salto conceptual del procesamiento escalar al vectorial: los registros anchos de 128 a 512 bits, los tres estilos de procesador vectorial y cómo se alinean los datos en memoria.",
      component: <SlideIntroParte2 />
    },
    {
      id: '2.1',
      section: 2,
      title: 'El Principio Vectorial: De 1 a N Elementos en Paralelo',
      subtitle: 'Slide 2.1 · Registros de 128, 256 y 512 bits · Comparativa Visual',
      speaker: "El concepto fundamental de SIMD es tomar una palabra de registro muy ancha y subdividirla en carriles o lanes independientes. Un registro de 128 bits puede contener 16 enteros de 8 bits, 8 de 16, 4 de 32 o 2 flotantes de 64 bits. Con AVX-512 llegamos a 16 floats de 32 bits en una sola instrucción. Cambien los tipos de datos para ver la subdivisión.",
      component: <Slide2_1 />
    },
    {
      id: '2.2',
      section: 2,
      title: 'Los Tres Estilos de Procesador Vectorial',
      subtitle: 'Slide 2.2 · Memoria-Memoria vs Registro-Vector vs SIMD Moderno',
      speaker: "Históricamente hubo tres enfoques: Memoria-Memoria en los 70 (CDC STAR-100), Registro-Vector que inventó Seymour Cray con la Cray-1 en 1976 —el estándar de supercómputo—, y el SIMD moderno en CPUs convencionales que comenzó con MMX en 1996. Cada uno resolvió el ancho de banda de memoria de forma distinta.",
      component: <Slide2_2 />
    },
    {
      id: '2.3',
      section: 2,
      title: 'La Cray-1: La Máquina que Definió la Computación Vectorial',
      subtitle: 'Slide 2.3 · Anatomía, Ficha Técnica y el Concepto de Vector Chaining',
      speaker: "La Cray-1 de 1976 es una obra de arte de la ingeniería. Corría a 80 MHz con un tiempo de ciclo de 12.5 nanosegundos, logrando 160 MegaFLOPS con solo 8 MB de memoria. Seymour Cray introdujo el Chaining: conectar la salida de una unidad funcional vectorial directamente a la entrada de la siguiente sin esperar a que termine el vector completo.",
      component: <Slide2_3 />
    },
    {
      id: '2.4',
      section: 2,
      title: 'Alineación de Memoria: El Cuello de Botella Silencioso',
      subtitle: 'Slide 2.4 · Accesos Alineados vs No Alineados · Impacto en Rendimiento',
      speaker: "Un registro AVX de 256 bits necesita 32 bytes de memoria. Si esa dirección de memoria no es múltiplo de 32, el controlador tiene que hacer dos accesos al bus y luego fusionar los datos en el registro. Esa penalización puede degradar el rendimiento hasta un 40%.",
      component: <Slide2_4 />
    },

    // === PARTE 3: ALEJANDRO Andy ===
    {
      id: '3.intro',
      section: 3,
      title: 'Parte 3: La Evolución de las Extensiones SIMD en x86',
      subtitle: 'Expositor: Alejandro Andy · Parte 3',
      speaker: "Hola a todos, soy Alejandro Andy. En esta tercera parte analizaremos la cronología técnica de Intel y AMD: desde los 64 bits de MMX en 1996 hasta los 512 bits de AVX-512, y cómo el pipeline de ejecución se adapta a estas instrucciones.",
      component: <SlideIntroParte3 />
    },
    {
      id: '3.1',
      section: 3,
      title: 'Cronología de Extensiones SIMD en x86 (1996 - 2024)',
      subtitle: 'Slide 3.1 · Línea de Tiempo Interactiva · De 64 bits a 512 bits',
      speaker: "Esta línea de tiempo muestra 28 años de evolución continua. Cada salto duplicó el ancho del registro: MMX (64 bits, 1996), SSE (128 bits con floats, 1999), AVX (256 bits, 2011) y AVX-512 (512 bits, 2016). Hacé click en cada hito para ver los registros y el conjunto de instrucciones.",
      component: <Slide3_1 />
    },
    {
      id: '3.2',
      section: 3,
      title: 'MMX: El Inicio Humilde y el Error de Diseño de los Registros',
      subtitle: 'Slide 3.2 · Aliasing con los Registros FPU x87 y la Instrucción EMMS',
      speaker: "MMX introdujo 57 instrucciones en 1996, pero cometió un pecado original de arquitectura: para no modificar el sistema operativo, Intel reutilizó los 8 registros de la FPU x87. No se podían mezclar instrucciones MMX y flotantes en el mismo código sin ejecutar EMMS, que costaba hasta 50 ciclos.",
      component: <Slide3_2 />
    },
    {
      id: '3.3',
      section: 3,
      title: 'SSE y AVX: Registros Propios, FMA y 3 Operandos',
      subtitle: 'Slide 3.3 · SSE1 a SSE4.2 (XMM 128b) · AVX a AVX2 (YMM 256b) · FMA3',
      speaker: "SSE en 1999 corrigió el error de MMX creando 8 registros independientes XMM de 128 bits para flotantes de precisión simple. Con AVX en 2011, Intel duplicó los registros a 256 bits (YMM) e introdujo la codificación VEX de 3 operandos.",
      component: <Slide3_3 />
    },
    {
      id: '3.fde',
      section: 3,
      title: 'Pipeline de Ejecución: SISD vs SIMD en Ciclos Reales',
      subtitle: 'Slide 3.4 · Animación Interactiva Paso a Paso · Fetch, Decode, Execute, Writeback',
      speaker: "Miren la diferencia estructural en el pipeline de 4 etapas. Para procesar 4 sumas, SISD tiene que ejecutar el ciclo completo de Fetch, Decode, Execute y Writeback cuatro veces consecutivas: 4 fetches, 4 decodes, 4 ejecuciones. SIMD hace 1 solo Fetch y 1 solo Decode para los 4 datos.",
      component: <Slide3_FDE_SIMD />
    },
    {
      id: '3.chaining',
      section: 3,
      title: 'Vector Chaining en Profundidad: La Invención de Seymour Cray',
      subtitle: 'Slide 3.5 · Simulación Interactiva · Sin Chaining (Secuencial) vs Con Chaining (Pipelined)',
      speaker: "Esta animación muestra el invento más brillante de Cray en 1976. Supongan que calculamos C = A * B + D sobre un vector de 64 elementos. Sin Chaining, la suma no puede arrancar hasta que los 64 elementos de la multiplicación estén completamente escritos en el registro intermedio. Con Chaining, apenas el primer elemento sale del multiplicador, entra directamente al sumador en el siguiente ciclo.",
      component: <Slide3_Chaining />
    },
    {
      id: '3.org',
      section: 3,
      title: 'Organización de Datos en Memoria: AoS vs SoA',
      subtitle: 'Slide 3.6 · Array of Structures vs Structure of Arrays · El Impacto en SIMD',
      speaker: "Este es el problema más común en la práctica. Si organizamos los datos como Array of Structures —struct Punto { float x, y, z; } p[N]—, en memoria los bytes están intercalados: x0, y0, z0, x1, y1, z1. Para cargar 8 coordenadas X en un registro AVX, la CPU tiene que saltar de 12 en 12 bytes. Eso requiere instrucciones Gather, que son lentas. La solución es SoA: Struct of Arrays. Todas las X juntas, todas las Y juntas, todas las Z juntas.",
      component: <Slide3_OrganizacionDatos />
    },
    {
      id: '3.4',
      section: 3,
      title: 'Tabla Maestra: Todas las Extensiones SIMD Comparadas',
      subtitle: 'Slide 3.7 · MMX · SSE1-4.2 · AVX · AVX2 · AVX-512 · AVX10 · Ficha Técnica Completa',
      speaker: "Esta tabla es el resumen definitivo de la evolución técnica: registros, ancho, tipos soportados, número de instrucciones y aplicación principal. Noten la transición: de enteros multimedia de 8 bits en MMX a floats de precisión doble con FMA en AVX2, y finalmente precisión mixta para IA en AVX-512 y AVX10.",
      component: <Slide3_4 />
    },

    // === PARTE 4: BERMUDEZ Gino ===
    {
      id: '4.intro',
      section: 4,
      title: 'Parte 4: Rendimiento Real, Divergencia y Aplicaciones',
      subtitle: 'Expositor: Bermudez Gino · Parte 4',
      speaker: "Hola a todos, soy Bermudez Gino. En esta parte final veremos los números reales: el speedup medido en benchmarks de álgebra lineal, el problema de la divergencia de ramas, y las aplicaciones en procesamiento de imágenes, audio, motores de videojuegos y modelos de inteligencia artificial.",
      component: <SlideIntroParte4 />
    },
    {
      id: '4.1',
      section: 4,
      title: 'Speedup Real vs Teórico: ¿Por qué no obtenemos 8x?',
      subtitle: 'Slide 4.1 · Benchmarks Reales de Multiplicación de Matrices y Convolución',
      speaker: "Teóricamente, AVX con 8 floats por registro debería acelerar el código 8x. En la práctica real, los benchmarks muestran entre 3.8x y 5.5x. ¿Por qué se pierde el resto? La ley de Amdahl, los fallos de caché L1/L2, los accesos a memoria no alineados y el throttling térmico de la CPU cuando activa AVX-512.",
      component: <Slide4_1 />
    },
    {
      id: '4.divergencia',
      section: 4,
      title: 'El Problema de la Divergencia de Ramas en SIMD',
      subtitle: 'Slide 4.2 · Simulación Interactiva · Qué pasa cuando los datos toman caminos distintos',
      speaker: "Este es el talón de Aquiles de SIMD. ¿Qué pasa si dentro del bucle hay un if-else? Recuerden: hay una sola unidad de control. No puede ejecutar el 'if' para los carriles pares y el 'else' para los impares simultáneamente. La solución de hardware es la máscara de predicado: primero ejecuta la rama 'then' enmascarando los carriles donde la condición fue falsa; luego ejecuta la rama 'else' enmascarando los contrarios.",
      component: <Slide4_Divergencia />
    },
    {
      id: '4.2',
      section: 4,
      title: 'Aplicaciones Modernas: Dónde Vive SIMD Hoy',
      subtitle: 'Slide 4.3 · Gráficos, Audio, Videojuegos, Criptografía, Machine Learning',
      speaker: "SIMD está en todas partes aunque el usuario no lo sepa. En codecs de video como H.264 y AV1 para la estimación de movimiento; en procesamiento de audio para FFT en tiempo real; en motores de videojuegos como Unreal Engine para la física y animación de esqueletos; y en IA moderna para la inferencia de redes neuronales y multiplicación de matrices densas.",
      component: <Slide4_2 />
    },
    {
      id: '4.3',
      section: 4,
      title: 'Demostración Interactiva: Procesamiento de Imágenes con SIMD',
      subtitle: 'Slide 4.4 · Filtro de Brillo y Escala de Grises · Escalar vs AVX2 en Tiempo Real',
      speaker: "Esta demo procesa una imagen pixel a pixel. En el modelo secuencial, un bucle visita cada canal R, G, B de cada pixel de forma individual: para 1 millón de pixeles son 3 millones de iteraciones. Con AVX2, cargamos 32 bytes en un registro y aplicamos la suma de brillo a 32 canales a la vez en una sola instrucción.",
      component: <Slide4_3 />
    },
    {
      id: '4.4',
      section: 4,
      title: 'Cómo Programar SIMD: De Compiladores a Intrinsics y Ensamblador',
      subtitle: 'Slide 4.5 · Auto-vectorización (-O3) · OpenMP SIMD · Intrinsics de C/C++',
      speaker: "Hay tres formas de usar SIMD: la más fácil es dejar que el compilador lo haga con banderas como -O3 y -march=native. La intermedia son las directivas OpenMP pragmas. La profesional, usada en bibliotecas de alto rendimiento, son los Intrinsics: funciones de C como _mm256_add_ps que mapean directamente a una instrucción máquina específica sin lidiar con ensamblador puro.",
      component: <Slide4_4 />
    },
    {
      id: '4.asm',
      section: 4,
      title: 'Práctica: Ensamblador x86-64 con Intrinsics AVX2',
      subtitle: 'Slide 4.6 · Editor Interactivo · Suma Vectorial en C vs Ensamblador Generado',
      speaker: "Aquí vemos el código real en C con intrinsics AVX2 y su traducción directa a ensamblador x86-64. Observen cómo _mm256_load_ps compila a vmovaps, _mm256_add_ps compila a vaddps, y _mm256_store_ps a vmovaps. Con solo 3 instrucciones vectoriales sumamos 8 flotantes en paralelo.",
      component: <SlidePracticaAsm />
    },
    {
      id: '4.5',
      section: 4,
      title: 'Conclusiones y Cierre',
      subtitle: 'Slide 4.7 · La División del Trabajo Computacional',
      speaker: "SIMD no es una optimización opcional; es el mecanismo estructural por el cual la computación moderna superó el límite de frecuencia de reloj.",
      component: <Slide4_5 />
    },
    {
      id: '5.video',
      section: 4,
      title: 'Ver la Exposición Completa',
      subtitle: 'Slide Final · Enlaces de Video (YouTube y OneDrive)',
      speaker: "Si quieren ver la exposición completa grabada, está disponible en dos plataformas: YouTube para acceso público directo, y OneDrive/SharePoint UPSE para la versión institucional. Mismo contenido en ambas plataformas. Gracias por seguir toda la presentación.",
      component: <Slide3_9 />
    }
  ];

  const slidesStats = getStatsSlides((secId) => {
    const idx = slidesStats.findIndex(s => s.section === secId);
    if (idx !== -1) setCurrentSlide(idx);
  });

  const isStats = deckTheme === 'stats';
  const slides = isStats ? slidesStats : slidesSIMD;
  const SECTIONS = isStats ? SECTIONS_STATS : SECTIONS_SIMD;

  const nextSlide = () => {
    // Si la diapositiva tiene pasos internos sin revelar, avanza el paso primero
    const handledByStep = nextStep();
    if (!handledByStep) {
      setCurrentSlide(c => Math.min(c + 1, slides.length - 1));
    }
  };

  const prevSlide = () => {
    // Si la diapositiva tiene pasos internos activos, retrocede el paso primero
    const handledByStep = prevStep();
    if (!handledByStep) {
      setCurrentSlide(c => Math.max(c - 1, 0));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();

      // Atajo 'H' o 'Z' para alternar Modo Zen (ocultar navbar y footer)
      if ((e.key === 'h' || e.key === 'H' || e.key === 'z' || e.key === 'Z') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        const isEditable =
          tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || document.activeElement?.isContentEditable;
        if (!isEditable) {
          e.preventDefault();
          setIsZenMode(prev => !prev);
        }
      }

      // Theme cycle shortcut — skip when modifiers are held or user is typing.
      if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        const isEditable =
          tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || document.activeElement?.isContentEditable;
        if (!isEditable) {
          e.preventDefault();
          cycle();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycle, currentSlide, nextStep, prevStep]);

  const slide = slides[currentSlide];
  const activeSection = SECTIONS.find(s => s.id === slide.section);

  return (
    // El deck de Estadística Inferencial es dark-only por diseño (las slides
    // usan text-white sobre slate-900/80). El switcher de tema global es para
    // el deck SIMD, así que aquí se fuerza `dark` para no dejar texto blanco
    // sobre fondo blanco cuando el sistema está en modo claro.
    <div className={`flex flex-col h-screen w-screen ${isStats ? 'dark' : ''} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans select-none overflow-hidden border-4 border-slate-200 dark:border-slate-900 relative`}>
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-30 pointer-events-none" />

      {/* Top Header Bar - Se contrae con Modo Zen */}
      <AnimatePresence>
        {!isZenMode && (
          <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex justify-between items-center px-6 py-2.5 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md z-20 shrink-0"
          >
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${activeSection.color} text-black font-extrabold text-xs shadow-lg uppercase tracking-wider`}>
                {activeSection.member}
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  {slide.title}
                </h1>
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">{slide.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Switcher de Presentaciones */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
                <button
                  onClick={() => {
                    setDeckTheme('stats');
                    setCurrentSlide(0);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                    isStats
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Estadística Inferencial
                </button>
                <button
                  onClick={() => {
                    setDeckTheme('simd');
                    setCurrentSlide(0);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                    !isStats
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  SIMD / Arquitectura
                </button>
              </div>

              <button
                onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${showSpeakerNotes ? 'bg-amber-500/20 border-amber-500/50 text-amber-700 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
              >
                <HelpCircle size={14} /> [HABLAR] Guión
              </button>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-800">
                {currentSlide + 1} / {slides.length}
              </span>
              <button
                onClick={cycle}
                aria-label={`Tema: ${theme === 'system' ? 'Automático' : theme === 'dark' ? 'Oscuro' : 'Claro'} — click o tecla T para cambiar`}
                title={`Tema: ${theme} (T para cambiar)`}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all border ${
                  theme === 'system'
                    ? 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                    : theme === 'dark'
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700'
                      : 'bg-white text-slate-900 border-slate-300'
                }`}
              >
                {theme === 'light' && <Sun size={14} />}
                {theme === 'dark' && <Moon size={14} />}
                {theme === 'system' && <Monitor size={14} />}
                <span className="uppercase">{theme === 'system' ? 'Auto' : theme === 'dark' ? 'Dark' : 'Light'}</span>
              </button>
              <button
                onClick={() => setIsZenMode(true)}
                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all flex items-center gap-1 text-xs font-semibold"
                title="Modo Zen (Ocultar barras para 100% espacio - Tecla H)"
              >
                <EyeOff size={15} />
                <span className="hidden sm:inline">Zen (H)</span>
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-all"
                title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content Viewport */}
      <main className="flex-1 relative p-6 md:p-8 z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full max-w-7xl 2xl:max-w-[90vw] mx-auto"
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
            className="absolute bottom-16 left-6 right-6 bg-white/95 dark:bg-slate-900/95 border-2 border-amber-500/40 p-4 rounded-2xl shadow-2xl z-30 backdrop-blur-lg flex items-start gap-3"
          >
            <UserCheck size={24} className="text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Guión del Orador (Resumen):</h4>
              <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed font-serif italic">"{slide.speaker}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Navigation & Progress - Se contrae en Modo Zen y deja solo una barra fina de 3px */}
      <AnimatePresence>
        {!isZenMode ? (
          <motion.footer
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="px-6 py-2.5 border-t border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 flex flex-col gap-2 z-20 shrink-0"
          >
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden flex">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex-1 h-full cursor-pointer transition-all border-r border-white dark:border-slate-950 ${idx === currentSlide ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-glow' : idx < currentSlide ? 'bg-slate-500 dark:bg-slate-700' : 'bg-slate-200 dark:bg-slate-900'}`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
              <div className="flex gap-2">
                {SECTIONS.map(sec => (
                  <button
                    key={sec.id}
                    title={`${sec.title} — ${sec.member}`}
                    onClick={() => {
                      const firstIdx = slides.findIndex(s => s.section === sec.id);
                      if (firstIdx !== -1) setCurrentSlide(firstIdx);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${slide.section === sec.id ? 'bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  >
                    P{sec.id}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button onClick={prevSlide} disabled={currentSlide === 0} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.footer>
        ) : (
          /* En Modo Zen: Barra ultra delgada de 3px pegada al fondo + botón discreto para salir */
          <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center">
            {/* Botón flotante sutil al pasar el mouse cerca del fondo */}
            <button
              onClick={() => setIsZenMode(false)}
              className="mb-2 px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-700/60 backdrop-blur-md text-[11px] font-mono flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity shadow-lg cursor-pointer"
              title="Salir de Modo Zen (Tecla H)"
            >
              <Eye size={12} />
              <span>Mostrar Barras (H)</span>
            </button>

            {/* Micro barra de progreso de 3px */}
            <div className="w-full h-1 bg-slate-900/60 overflow-hidden flex">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  className={`flex-1 h-full transition-all ${
                    idx === currentSlide 
                      ? 'bg-purple-500 shadow-glow' 
                      : idx < currentSlide 
                        ? 'bg-slate-700' 
                        : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
