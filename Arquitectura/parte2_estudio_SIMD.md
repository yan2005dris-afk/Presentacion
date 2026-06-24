# Parte 2 – Modelo SIMD y Procesamiento Vectorial
## Guía de Estudio Personal

---

## 1. Arquitectura SIMD — ¿Qué es?

**SIMD = Single Instruction, Multiple Data**
Una sola instrucción controla múltiples operaciones al mismo tiempo, cada una sobre un dato diferente.

Imaginalo así: en vez de sumar A+B, sumar A+B, sumar A+B (tres veces, secuencial), SIMD hace las tres sumas con **una sola instrucción** en paralelo.

```
SISD (secuencial):        SIMD (paralelo):
A0 + B0 → C0             [A0, A1, A2, A3]
A1 + B1 → C1       →     [B0, B1, B2, B3]
A2 + B2 → C2             ────────────────
A3 + B3 → C3             [C0, C1, C2, C3]  ← un solo ciclo
```

---

## 2. Principio de Funcionamiento

SIMD se basa en tres cosas:

### 2.1 Registros vectoriales (más anchos que los escalares)
- En vez de guardar UN número, el registro guarda VARIOS empaquetados.
- Ejemplo: registro de 128 bits → guarda 4 floats de 32 bits al mismo tiempo.
- Registros reales: **XMM** (128b), **YMM** (256b), **ZMM** (512b).

### 2.2 Una sola unidad de control
La CPU decodifica la instrucción UNA vez. Pero la distribuye a múltiples ALUs que operan en paralelo sobre cada "lane" (carril) del registro.

### 2.3 Múltiples ALUs (lanes)
Cada lane procesa su elemento. Todas terminan al mismo tiempo.

```
Instrucción: VADDPS YMM0, YMM1, YMM2
→ YMM1 tiene: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]
→ YMM2 tiene: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5]
→ Resultado:  [1.5, 3.5, 5.5, 7.5, 9.5,11.5,13.5,15.5]
   ↑ 8 sumas, 1 instrucción, 1 ciclo
```

---

## 3. Diferencias entre SISD y SIMD

| Aspecto              | SISD                          | SIMD                              |
|----------------------|-------------------------------|-----------------------------------|
| Flujo de instrucciones | 1                           | 1                                 |
| Flujo de datos       | 1 a la vez                   | N en paralelo                     |
| Registros            | Escalares (32/64 bits)        | Vectoriales (128/256/512 bits)    |
| ALUs por instrucción | 1                             | N (según ancho del registro)      |
| Throughput teórico   | 1 op/ciclo                   | N ops/ciclo                       |
| Modelo ideal para    | Código de control, secuencial | Arrays, imágenes, señales, audio  |
| Ejemplo hardware     | Core i7 (modo escalar)        | SSE, AVX, AVX-512                 |

**Clave:** En SISD el paralelismo se extrae dinámicamente (fuera de orden, pipeline). En SIMD el paralelismo es **explícito**: la instrucción en sí opera sobre múltiples datos.

---

## 4. Concepto de Procesamiento Vectorial

Un **vector** en este contexto = secuencia ordenada de elementos del mismo tipo.
- `[1.0, 2.0, 3.0, 4.0]` es un vector de 4 float32.
- Todos los elementos se procesan con la misma operación.

**Procesamiento vectorial** = aplicar operaciones a vectores completos en vez de elemento por elemento.

Tiene sus raíces en las supercomputadoras vectoriales (Cray-1, 1976), que tenían instrucciones especiales para operar sobre arrays enteros en una sola instrucción de máquina.

Hoy, en CPUs modernas se implementa mediante extensiones SIMD (SSE, AVX, AVX-512).

---

## 5. Vectores y Operaciones Vectoriales

### Tipos de operaciones:

**Binarias (dos vectores → un vector resultado):**
```
A = [a0, a1, a2, a3]
B = [b0, b1, b2, b3]
C = A + B → [a0+b0, a1+b1, a2+b2, a3+b3]
```
Instrucción real: `ADDPS` (SSE), `VADDPS` (AVX)

**Unarias (un vector → resultado):**
```
abs([−1, 2, −3, 4]) = [1, 2, 3, 4]
```

**Reducción (vector → escalar):**
```
sum([1, 2, 3, 4]) = 10
```

**Operaciones disponibles:** suma, resta, multiplicación, división, raíz cuadrada, mín/máx, comparación, AND/OR/XOR, FMA (Fused Multiply-Add: `a×b + c` en un ciclo).

### FMA — importante para ML y gráficos:
```
VFMADD231PS: resultado = A * B + C
→ 3 vectores de entrada, 1 instrucción, 1 redondeo
→ más preciso y más rápido que VMULPS + VADDPS separado
```

---

## 6. Paralelismo de Datos

**Paralelismo de datos** = la misma operación aplicada a múltiples datos independientes al mismo tiempo.

Es el tipo de paralelismo más fácil de explotar porque:
- No hay comunicación entre los datos.
- El compilador puede detectarlo y vectorizar automáticamente.
- Escala naturalmente: más datos = más paralelismo disponible.

### Cómo se explota:

| Nivel       | Mecanismo                          | Ejemplo               |
|-------------|------------------------------------|-----------------------|
| Registro    | Instrucciones SIMD (SSE/AVX)       | VADDPS en 8 floats    |
| Núcleo      | Múltiples ALUs SIMD por núcleo     | 2 puertos AVX en Zen4 |
| Chip        | Múltiples núcleos + SIMD           | 16 núcleos × 8 lanes  |
| Sistema     | GPU (miles de cores SIMD)          | CUDA, ROCm            |

### Loop vectorizable — ejemplo clásico:
```c
// Escalar (SISD)
for (int i = 0; i < N; i++)
    C[i] = A[i] + B[i];  // una suma por iteración

// Vectorizado (SIMD, AVX con 8 floats)
for (int i = 0; i < N; i += 8)
    _mm256_store_ps(C+i, _mm256_add_ps(
        _mm256_load_ps(A+i),
        _mm256_load_ps(B+i)));  // 8 sumas por iteración → 8×
```

---

## 7. Ventajas del Procesamiento Vectorial

### 7.1 Mayor throughput
- SSE (128b, 4 floats): hasta **4× más operaciones/ciclo** vs escalar.
- AVX (256b, 8 floats): hasta **8× más**.
- AVX-512 (512b, 16 floats): hasta **16× más**.

### 7.2 Mejor eficiencia energética
- La decodificación de instrucción se amortiza sobre N datos.
- Menor tiempo de ejecución → menos energía total para la misma tarea.
- Clave en móviles, laptops, data centers.

### 7.3 Mejor uso del ancho de banda de memoria
- Carga vectorial = N elementos por acceso a memoria.
- Instrucciones no temporales (MOVNT*) evitan contaminar la caché con datos que no se van a reutilizar.

### 7.4 Código más conciso (con librerías vectoriales)
- NumPy, MATLAB, Eigen usan SIMD internamente.
- `C = A + B` en NumPy opera sobre todo el array a la vez.

---

## 8. Desventajas del Procesamiento Vectorial

### 8.1 No toda la lógica se puede vectorizar
- Branches condicionales por elemento son difíciles.
- Dependencias entre iteraciones de un loop bloquean la vectorización.
- Código de control (manejo de errores, I/O) es inherentemente escalar.

### 8.2 Ley de Amdahl — el límite real
```
Speedup_total = 1 / ((1 - P) + P/N)

P = fracción paralelizable, N = lanes SIMD
```
Si solo el 50% del código puede vectorizarse, el speedup máximo es 2×, sin importar cuántos lanes tenga el hardware.

### 8.3 Overhead de organización de datos
- Los datos deben estar **contiguos y alineados** en memoria.
- Datos dispersos (scatter/gather) tienen acceso costoso.
- Reorganizar datos consume tiempo y puede negar el beneficio.

### 8.4 Portabilidad
- SSE solo existe en x86. AVX-512 no está en todos los x86 modernos.
- ARM NEON ≠ Intel AVX → código diferente por plataforma.
- El compilador puede auto-vectorizar, pero no siempre llega al óptimo.

### 8.5 Complejidad de programación manual
- Las intrinsics (funciones de bajo nivel para SIMD) son difíciles de usar.
- Bugs sutiles por alineación, elementos extremos, o tipos incorrectos.

---

## 9. Aplicaciones Donde es Eficiente

La regla general: **datos homogéneos + misma operación sobre todos = candidato SIMD**.

| Dominio                  | Operaciones vectorizadas                          | Speedup típico |
|--------------------------|---------------------------------------------------|----------------|
| Procesamiento de imágenes | Filtros de convolución, corrección de color      | 4×–16×         |
| Video (codecs H.264/AV1) | DCT, estimación de movimiento, cuantización       | 4×–10×         |
| Audio                    | Mezcla de canales, EQ, efectos DSP               | 4×–8×          |
| Machine Learning (CPU)   | Multiplicación de matrices, convoluciones, ReLU  | 4×–16×         |
| Videojuegos              | Física, transformaciones 3D, pathfinding          | 2×–8×          |
| Simulación científica    | CFD, dinámica molecular, meteorología            | 4×–32×         |
| Criptografía             | AES-NI, SHA-NI (instrucciones específicas)       | 6×–40×         |
| Telecomunicaciones       | FFT, filtros FIR/IIR, modulación                 | 4×–16×         |

### Por qué imágenes es un ejemplo perfecto:
Una imagen de 1920×1080 = 2.073.600 píxeles. Aplicar brillo a cada uno secuencialmente = ~2M instrucciones. Con AVX-512 procesando 16 píxeles por instrucción = ~130K instrucciones. **16× menos instrucciones, mismo resultado**.

---

## 10. Resumen — Lo que tenés que tener claro

1. **SIMD ≠ múltiples núcleos.** Es paralelismo *dentro* de un mismo núcleo.
2. **Registro vectorial = contenedor** de N valores del mismo tipo. Todos se operan juntos.
3. **Paralelismo de datos** = la misma operación sobre datos independientes. SIMD lo explota a nivel de instrucción.
4. **Ventaja clave:** throughput. **Desventaja clave:** no todo es vectorizable (Amdahl).
5. La evolución: MMX (64b, 1997) → SSE (128b, 1999) → AVX (256b, 2011) → AVX-512 (512b, 2016).
6. Aplicaciones reales: imagen, video, audio, ML, física, simulación científica.
