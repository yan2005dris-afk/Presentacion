import React from 'react';
import {
  SlidePortada, SlideIndice,
  Slide1_LimiteSec, Slide1_1, Slide1_1Anim, Slide1_2, Slide1_4, Slide1_LimitacionesSISD,
  SlideIntroParte1,
  Slide2_1, Slide2_2, Slide2_3, Slide2_4, SlideIntroParte2,
  Slide3_1, Slide3_2, Slide3_3, Slide3_FDE_SIMD, Slide3_Chaining, Slide3_4, Slide3_OrganizacionDatos, Slide3_9, SlideIntroParte3,
  Slide4_1, Slide4_2, Slide4_3, Slide4_4, Slide4_5, Slide4_Divergencia, SlideIntroParte4,
  SlidePracticaAsm
} from '../../slides';

export const SECTIONS_SIMD = [
  { id: 0, title: 'Inicio y Agenda', member: 'Presentación', color: 'from-blue-600 to-indigo-600' },
  { id: 1, title: 'Parte 1: El Problema y Taxonomía', member: 'Reyes Alisson', color: 'from-cyan-500 to-blue-500' },
  { id: 2, title: 'Parte 2: El Principio Vectorial', member: 'Rivera Yandris', color: 'from-purple-500 to-pink-500' },
  { id: 3, title: 'Parte 3: Extensiones MMX/SSE/AVX', member: 'Alejandro Andy', color: 'from-amber-500 to-orange-500' },
  { id: 4, title: 'Parte 4: Rendimiento y Aplicaciones', member: 'Bermudez Gino', color: 'from-emerald-500 to-teal-500' },
];

export const getSimdSlides = (onSelectSection) => {
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
      component: <SlideIndice onSelectSection={onSelectSection} />
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
      title: 'El Modelo de Ejecución: Registros Vectoriales y Control',
      subtitle: 'Slide 2.4 · Banco de Registros · VLEN · VSTR · VMASK',
      speaker: "Para que un procesador vectorial funcione necesita cuatro registros clave: el banco de registros vectoriales, VLEN que indica cuántos elementos procesar si el vector es menor al registro, VSTR para el paso entre elementos (stride), y VMASK para operaciones condicionales con máscaras de bits. Interactúen con los tres registros de control para ver su efecto.",
      component: <Slide2_4 />
    },

    // === PARTE 3: ALEJANDRO Andy ===
    {
      id: '3.intro',
      section: 3,
      title: 'Parte 3: Extensiones SIMD Modernas: MMX, SSE, AVX',
      subtitle: 'Expositor: Alejandro Andy · Parte 3',
      speaker: "Hola a todos, soy Alejandro Andy. En esta tercera parte veremos cómo la industria x86 incorporó SIMD en CPUs comerciales: desde MMX en 1996 hasta AVX-512, cómo funciona el circuito de suma empaquetada cortando el acarreo, y las diferencias de implementación entre arquitecturas como AMD Excavator y Zen.",
      component: <SlideIntroParte3 />
    },
    {
      id: '3.1',
      section: 3,
      title: 'Evolución de las Extensiones SIMD en x86 (1996 - 2017)',
      subtitle: 'Slide 3.1 · Línea de Tiempo Interactiva · MMX, SSE, SSE2, AVX, AVX2, AVX-512',
      speaker: "La evolución de SIMD en x86 tomó 21 años: MMX en 1996 con 64 bits para multimedia pero compartía registros con la FPU; SSE en 1999 con registros XMM independientes de 128 bits para float32; SSE2 en 2001 agregó float64 y enteros; AVX en 2011 duplicó a 256 bits (YMM) con codificación VEX de 3 operandos; AVX2 en 2013 trajo FMA y enteros de 256 bits; y AVX-512 en 2017 llegó a 512 bits con 32 registros ZMM y 8 máscaras opmask. Hagan click en cada extensión para ver sus detalles.",
      component: <Slide3_1 />
    },
    {
      id: '3.2',
      section: 3,
      title: 'Anatomía de una Instrucción SIMD: La Magia de Cortar el Acarreo',
      subtitle: 'Slide 3.2 · Circuito ALU · Packed Add vs Operación Escalar',
      speaker: "Miren este circuito: una ALU de 64 bits normal propaga el acarreo del bit 0 al bit 63. La magia de la suma empaquetada (Packed Add) es cortar la propagación del acarreo cada 8 bits. Con solo 7 compuertas lógicas adicionales, la misma ALU suma 8 pares de bytes independientes en paralelo sin costo adicional de silicio. Cambien el tamaño de dato para ver cómo se cortan los acarreos.",
      component: <Slide3_2 />
    },
    {
      id: '3.3',
      section: 3,
      title: 'Familias de Instrucciones SIMD: El Toolkit Completo',
      subtitle: 'Slide 3.3 · Aritmética, Shuffle, Permutación, Reducción, Blend y FMA',
      speaker: "SIMD no es solo sumar. Se necesitan cinco familias de instrucciones: Aritméticas como PADDB y FMA (Multiply-Add en 1 ciclo); Permutación y Shuffle para reordenar elementos dentro del registro; Reducción horizontal para sumar todos los elementos a un escalar; Blend para mezclar según máscara; y Carga/Almacenamiento alineado vs no alineado. Exploren cada familia con sus opcodes reales.",
      component: <Slide3_3 />
    },
    {
      id: '3.fde',
      section: 3,
      title: 'Pipeline FDE en SIMD: Amortizando Fetch y Decode',
      subtitle: 'Slide 3.4 · Animación Interactiva · 1 Fetch/Decode para N ALUs',
      speaker: "Este diagrama animado muestra el núcleo del beneficio energético de SIMD. En un procesador escalar, para 4 sumas se pagan 4 fetch, 4 decode y 4 ejecuciones. En SIMD, se paga 1 solo fetch y 1 solo decode; la señal decodificada se envía en broadcast a 4 unidades ALU simultáneamente. Ahorramos 75% de la energía de decodificación.",
      component: <Slide3_FDE_SIMD />
    },
    {
      id: '3.chaining',
      section: 3,
      title: 'Vector Chaining vs Ejecución Escalar: El Pipeline Solapado',
      subtitle: 'Slide 3.5 · Simulación Interactiva · Por qué el Chaining reduce ciclos a la mitad',
      speaker: "El Chaining vectorial inventado por Cray conecta la salida de la unidad de multiplicación directamente a la entrada de la suma. En ejecución escalar, la suma debe esperar a que toda la multiplicación termine (12 ciclos). Con Chaining, tan pronto como el primer elemento sale de multiplicar, entra a sumar. Vean la animación: terminamos en 8 ciclos en vez de 12.",
      component: <Slide3_Chaining />
    },
    {
      id: '3.4',
      section: 3,
      title: 'Estructura Interna del Procesador: Excavator vs Zen',
      subtitle: 'Slide 3.6 · ¿Cómo se implementa AVX-256 en hardware real?',
      speaker: "No todas las CPUs ejecutan AVX2 igual. AMD Excavator (2015) no tenía ALUs de 256 bits: tenía ALUs de 128 bits y dividía cada instrucción AVX en dos micro-ops (doble bombeo), tardando el doble. AMD Zen (2017) construyó ALUs nativas de 256 bits que ejecutan en 1 ciclo. Esto demuestra que la ISA dice 'qué hacer', pero la microarquitectura determina 'qué tan rápido corre'.",
      component: <Slide3_4 />
    },
    {
      id: '3.org',
      section: 3,
      title: 'Organización de Datos en Memoria: Array of Structures vs Structure of Arrays',
      subtitle: 'Slide 3.7 · Diagrama Interactivo · Por qué AoS destruye el rendimiento SIMD',
      speaker: "El rendimiento SIMD depende críticamente de cómo organizan los datos en RAM. En Array of Structures (AoS), los datos de un punto X, Y, Z están intercalados: para sumar todas las X necesitamos instrucciones gather lentas. En Structure of Arrays (SoA), todas las X están contiguas: una sola instrucción vmovaps carga 8 coordenadas X de golpe. SoA es entre 3x y 10x más rápido en SIMD.",
      component: <Slide3_OrganizacionDatos />
    },

    // === PARTE 4: BERMUDEZ Gino ===
    {
      id: '4.intro',
      section: 4,
      title: 'Parte 4: Rendimiento, Aplicaciones Modernas y Práctica',
      subtitle: 'Expositor: Bermudez Gino · Parte 4',
      speaker: "Hola a todos, soy Bermudez Gino. En esta cuarta y última parte veremos el impacto práctico de SIMD: las métricas de rendimiento reales, el problema de la divergencia de ramas, dónde vive SIMD en la industria actual, cómo se programa, y cerraremos con una práctica en ensamblador x86-64.",
      component: <SlideIntroParte4 />
    },
    {
      id: '4.1',
      section: 4,
      title: 'Métricas de Rendimiento: CPI, Throughput, Latencia y Speedup',
      subtitle: 'Slide 4.1 · Calculadora Interactiva de Ganancia SIMD',
      speaker: "El rendimiento SIMD se mide con cuatro métricas: CPI (ciclos por instrucción), Throughput (instrucciones por ciclo), Latencia de operación y Speedup real. Un bucle escalar de suma de 1024 floats toma ~3000 ciclos; con AVX2 (8 floats/ciclo) baja a ~384 ciclos: un speedup de 7.8x, casi el 8x teórico. Usen la calculadora para simular diferentes tamaños de datos.",
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
  return slides;
};

export const simdDeck = {
  id: 'simd',
  title: 'SIMD y Arquitecturas Paralelas',
  shortTitle: 'SIMD / Arquitectura',
  subject: 'Arquitectura y Organización de Computadoras',
  sections: SECTIONS_SIMD,
  getSlides: getSimdSlides,
  darkOnly: false,
};
