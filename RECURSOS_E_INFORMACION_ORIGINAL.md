# Resumen de Información y Notas Teóricas Originales

## Contenido de Diapositivas Previas (Reveal.js)

Arquitecturas SISD y SIMD
Arquitecturas SISD y SIMD
Paralelismo de Datos en el Procesador x86
MMX · SSE · AVX · AVX-512 · FMA · Amdahl
Fundamentos
Taxonomía de Flynn
Clasificación de arquitecturas según flujos de Instrucciones y Datos.
SISD
Un flujo de instrucción, un flujo de datos.
Instr
→
CPU
←
Dato
SIMD
Un flujo de instrucción, múltiples flujos de datos.
Instr
→
ALU
ALU
←
Dato 1
Dato 2
MISD (Teórico)
Múltiples instrucciones, un flujo de datos.
MIMD
Múltiples instrucciones, múltiples datos (Multinúcleo).
Inst 1
Inst 2
→
C1
C2
←
Dato 1
Dato 2
Parte 2 — Paralelismo de Datos
SISD vs SIMD en Acción
Demostración visual — datos → ALU → resultado, ciclo por ciclo.
SISD — Uno por vez
+
ALU (Procesa 1×1)
⏎ Presioná Ejecutar
▶ Ejecutar
SIMD — Todos simultáneos
+
Vector ALU (Procesa en Paralelo)
⏎ Presioná Ejecutar
↺ Reset
▶ Ejecutar
—
Ejecutá cada columna y observá la diferencia en ciclos
Parte 3 — Registros Vectoriales
Evolución de los Registros SIMD
Cada generación duplicó o cuadruplicó el ancho del registro.
MMX
64 bits
SSE
128 bits
AVX
256 bits
AVX-512
512 bits
MMX:
Introdujo registros de 64 bits (aliasing de la FPU). Procesa 2 enteros de 32 bits simultáneamente.
64 bits
2 valores de 32 bits por instrucción
Parte 3 — Evolución SIMD en x86
De MMX a AVX-512: 25 años
1997
MMX
64 bits
8 registros MM0–MM7 (alias de FPU). Enteros empaquetados 8/16/32 bits. Sin punto flotante.
1999
SSE
128 bits
8→16 registros XMM0–XMM15. Punto flotante precisión simple. SSE2 (2000) agrega doble precisión.
2011
AVX / AVX2
256 bits
16 registros YMM. Formato VEX de 3 operandos. AVX2 (2013): enteros 256 bits + FMA.
2016
AVX-512
512 bits
32 registros ZMM. Operandos de máscara K0–K7 para predicación. FMA 512 bits.
MMX
2×
SSE
4×
AVX
8×
AVX-512
16×
Speedup teórico máximo vs escalar (float32)
Parte 4 — Instrucciones Avanzadas
FMA: Fused Multiply-Add
(A × B) + C en una sola operación vectorial.
Matemática Tradicional (2 Instr)
A
B
↓
MULPS (×)
↓
Temp
↓
+
C
↓
ADDPS (+)
↓
Res
Ejecutar (Más lento, menos preciso)
Instrucción FMA (1 Instr)
A
B
C
↓
VFMADD231PS
(A × B) + C
↓
Res
Ejecutar FMA (1 Ciclo, 1 Redondeo)
Parte 5
Ley de Amdahl
El límite teórico del speedup: la porción secuencial siempre restringe el paralelismo.
Porción Secuencial (10%)
Porción Paralelizable (90%)
10%
90%
1× (Escalar)
2× Lanes
4× Lanes
16× (AVX-512)
Speedup Teórico
1.00×
Tiempo Restante
100%
Parte 6 — Estudio Práctico
SIMD en el Mundo Real: SISD vs SIMD
Seleccioná un caso de uso y compará el procesamiento escalar vs vectorial. Speedup teórico:
8×
con AVX (256 bits).
🖼️ Imágenes
🎬 Video
🧠 ML
🎮 Gráficos
🔬 HPC
📡 Telecom
🖼️ Procesamiento de Imágenes
Filtros convolucionales, transformaciones de color, encode/decode de formatos, redimensionado masivo.
Filtros convolucionales (blur, sharpen)
Transformaciones de color (RGB→YUV)
JPEG/PNG encode/decode
Redimensionado bilineal masivo
SISD (escalar)
64 ops
1 operación por ciclo
SIMD (vectorial)
8 ops
8 operaciones por ciclo
Speedup
8.0×
vs SISD (AVX)
▶ SISD 1×1
▶ SIMD 8×
↺ Reset
Parte 7 — Aplicaciones Reales
SIMD en el Mundo Real
Aplicaciones donde el paralelismo masivo de datos es crucial hoy.
🖼️
Procesamiento de Imágenes
Filtros convolucionales (blur, sharpen)
Transformaciones de color (RGB→YUV)
JPEG/PNG encode/decode
Redimensionado bilineal masivo
🎬
Video & Multimedia
Codecs H.264 / H.265 / AV1
Motion estimation (HEVC)
Mezcla de audio multicanal
Renderizado de subtítulos
🧠
Machine Learning
W₀
W₁
×
X₀
X₁
=
Y₀
Y₁
Multiplicación de matrices (GEMM)
Activaciones ReLU/Sigmoid en batch
Convoluciones de redes neuronales
Inferencia en CPU (ONNX Runtime)
🎮
Gráficos & Juegos
Transformación Vectorial
X
Y
Z
W
Transformaciones de vértices 3D
Iluminación por píxel (Phong)
Colisión física en batch
Mezcla de texturas (bilinear filter)
🔬
HPC & Ciencia
Simulaciones de fluidos (CFD)
Álgebra lineal (BLAS/LAPACK)
FFT sobre señales largas
Criptografía (AES-NI, SHA-NI)
📡
Telecomunicaciones
DSP: filtros FIR/IIR vectorizados
Modulación/demodulación QAM
Decodificación LDPC/Turbo
Procesamiento de radar/sonar

---

## Contenido de Diagramas Previos

Arquitectura Computacional: Diagramas Interactivos
Arquitecturas SISD y SIMD
Diagramas interactivos para acompañar la exposición teórica
1. Taxonomía de Flynn
Clasificación de arquitecturas computacionales según flujos de Instrucciones y Datos.
SISD
Un flujo de instrucción, un flujo de datos.
Instr
→
CPU
←
Dato
SIMD
Un flujo de instrucción, múltiples flujos de datos.
Instr
→
ALU
ALU
←
Dato 1
Dato 2
MISD (Teórico)
Múltiples flujos de instrucción, un flujo de datos.
Inst 1
Inst 2
→
CPU
←
Dato
MIMD
Múltiples instrucciones, múltiples datos (Multinúcleo).
Inst 1
Inst 2
→
C1
C2
←
Dato 1
Dato 2
2. Paralelismo de Datos (SISD vs SIMD)
Demostración visual del comportamiento interno de las instrucciones.
SISD (Secuencial)
Array A
Array B
ALU (Procesa 1x1)
Resultado
Ejecutar SISD
SIMD (Vectorial)
Vector A
Vector B
Vector ALU (Procesa Paralelo)
Resultado
Ejecutar SIMD
Reiniciar Arrays
3. Evolución de Registros Vectoriales
Desde MMX hasta AVX-512. Expansión del ancho de banda interno.
1 bloque = 32 bits
MMX
64 bits
SSE
128 bits
AVX
256 bits
AVX-512
512 bits
MMX:
Introdujo registros de 64 bits. Procesa 2 bloques de 32 bits simultáneamente.
4. Instrucciones Avanzadas: FMA
Fused Multiply-Add: (A × B) + C en una sola operación vectorial.
Matemática Tradicional (2 Instr)
A
B
↓
MULPS (×)
↓
Temp (Redondeo)
↓
+
C
ADDPS (+)
↓
Res
Ejecutar (Más lento, menos preciso)
Instrucción FMA (1 Instr)
A
B
C
↓
VFMADD231PS
(A × B) + C
↓
Res
Ejecutar FMA (1 Ciclo, 1 Redondeo)
5. Ley de Amdahl
El límite teórico del speedup: la porción secuencial (SISD) siempre restringe el beneficio del paralelismo (SIMD).
Porción Secuencial (10%)
Porción Paralelizable (90%)
10%
90%
1x (Escalar)
2x Lanes
4x Lanes
16x (AVX-512)
Casi Infinito
Speedup Teórico Máximo
1.00x
Tiempo Restante
100%
6. Estudio Práctico: Filtro de Imágenes
Demostración de aplicación de un filtro a una matriz de píxeles (SIMD AVX - 8x8 vs SISD).
Estado de Ejecución
ESPERANDO
Ciclos ALU:
0
Bucle Escalar (SISD)
Vectorizado (SIMD)
Limpiar Imagen
7. SIMD en el Mundo Real
Aplicaciones prácticas y dominios donde el paralelismo masivo de datos es crucial hoy en día.
🖼️
Procesamiento de Imágenes
• Filtros convolucionales (blur, sharpen)
• Transformaciones de color (RGB→YUV)
• JPEG/PNG encode/decode
• Redimensionado bilineal masivo
🎬
Video & Multimedia
• Codecs H.264 / H.265 / AV1
• Motion estimation (HEVC)
• Mezcla de audio multicanal
• Renderizado de subtítulos
🧠
Machine Learning
W0
W1
×
X0
X1
=
Y0
Y1
• Multiplicación de matrices (GEMM)
• Activaciones ReLU/Sigmoid en batch
• Convoluciones de redes neuronales
• Inferencia en CPU (ONNX Runtime)
🎮
Gráficos & Juegos
Transformación Vectorial
X
Y
Z
W
• Transformaciones de vértices 3D
• Iluminación por píxel (Phong)
• Colisión física en batch
• Mezcla de texturas (bilinear filter)
🔬
HPC & Ciencia
• Simulaciones de fluidos (CFD)
• Álgebra lineal (BLAS/LAPACK)
• FFT sobre señales largas
• Criptografía (AES-NI, SHA-NI)
📡
Telecomunicaciones
• DSP: filtros FIR/IIR vectorizados
• Modulación/demodulación QAM
• Decodificación LDPC/Turbo
• Procesamiento de radar/sonar