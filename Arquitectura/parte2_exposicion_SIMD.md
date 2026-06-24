# Parte 2 – Modelo SIMD y Procesamiento Vectorial
## Guía para Exponer

> Tiempo estimado: 12–15 minutos
> Orden: seguí los bloques en secuencia. El ícono 🗣️ es lo que decís. El ícono 💡 es lo que mostrás o señalás.

---

## [BLOQUE 1] Apertura — El problema que SIMD resuelve (1–2 min)

🗣️ _"Antes de hablar de SIMD necesito plantear por qué existe. Imaginen que tienen que sumar dos arrays de un millón de números. En un procesador normal, hacés eso un millón de veces: suma 1, suma 2, suma 3… Eso es SISD, lo que ya vieron en la Parte 1."_

🗣️ _"SIMD responde a esa limitación. La pregunta que lo origina es: ¿y si pudiéramos hacer 8 o 16 sumas al mismo tiempo, con una sola instrucción? Eso es exactamente lo que hace Single Instruction, Multiple Data."_

💡 **Escribí o señalá en la pizarra / diapositiva:**
```
SISD: suma → suma → suma → suma  (4 ciclos)
SIMD: [suma, suma, suma, suma]   (1 ciclo)
```

---

## [BLOQUE 2] ¿Qué es SIMD? Definición y taxonomía (1–2 min)

🗣️ _"SIMD es una de las cuatro categorías de la Taxonomía de Flynn del '66. Un solo flujo de instrucciones, pero múltiples flujos de datos simultáneos."_

🗣️ _"La CPU emite una instrucción. Esa instrucción se aplica en paralelo a N datos a la vez. Cada uno de esos 'carriles' de datos se llama lane."_

💡 **Puntos clave a mostrar:**
- SIMD ≠ múltiples núcleos. Es paralelismo **dentro** de un núcleo.
- El hardware replica ALUs internamente, una por lane.
- La unidad de control es una sola — decodifica la instrucción una vez.

---

## [BLOQUE 3] Principio de funcionamiento — Registros vectoriales (2–3 min)

🗣️ _"El secreto está en los registros. En un procesador escalar, un registro guarda un solo número. En SIMD, el registro es más ancho y guarda varios empaquetados."_

💡 **Mostrá esta tabla:**
| Extensión  | Registro | Ancho  | Floats de 32b que caben |
|------------|----------|--------|--------------------------|
| SSE (1999) | XMM      | 128 b  | 4                        |
| AVX (2011) | YMM      | 256 b  | 8                        |
| AVX-512    | ZMM      | 512 b  | 16                       |

🗣️ _"Cuando ejecuto `VADDPS YMM0, YMM1, YMM2`, no estoy sumando un número. Estoy sumando los 8 pares de floats de YMM1 y YMM2 al mismo tiempo y guardando los 8 resultados en YMM0. Una instrucción, 8 resultados."_

🗣️ _"Hay retrocompatibilidad total: los 128 bits bajos de YMM son XMM. Los 256 bits bajos de ZMM son YMM. Podés mezclar SSE y AVX en el mismo programa."_

---

## [BLOQUE 4] Diferencias SISD vs SIMD (1–2 min)

🗣️ _"¿Cuál es la diferencia estructural?"_

💡 **Comparación directa:**
| | SISD | SIMD |
|---|---|---|
| Flujo instrucciones | 1 | 1 |
| Flujo de datos simultáneos | 1 | N |
| ALUs activas por instrucción | 1 | N |
| Throughput teórico | 1 op/ciclo | N ops/ciclo |
| Ideal para | Control, código secuencial | Arrays, señales, imágenes |

🗣️ _"En SISD el paralelismo lo extrae el hardware en tiempo de ejecución, con técnicas como ejecución fuera de orden o predicción de saltos. En SIMD el paralelismo es explícito: la instrucción misma opera sobre múltiples datos. El programador o el compilador tiene que estructurar los datos para aprovecharlo."_

---

## [BLOQUE 5] Procesamiento vectorial y operaciones (2 min)

🗣️ _"El procesamiento vectorial es la idea detrás de SIMD. Un vector es una secuencia de N elementos del mismo tipo. Las operaciones vectoriales trabajan sobre el vector completo."_

💡 **Tipos de operaciones que existen:**
- **Binarias** (dos vectores → resultado): suma, resta, multiplicación, división
- **Unarias** (un vector → resultado): valor absoluto, negación, raíz cuadrada
- **Reducción** (vector → escalar): suma total, máximo, mínimo
- **FMA** (Fused Multiply-Add): `resultado = A × B + C` en una instrucción → más rápido y más preciso

🗣️ _"FMA es especialmente importante en Machine Learning. Un `matmul` (multiplicación de matrices) se reduce a miles de `a×b+c`. FMA los hace todos en una instrucción por elemento, con un solo redondeo."_

---

## [BLOQUE 6] Paralelismo de datos (1–2 min)

🗣️ _"El paralelismo de datos ocurre cuando tenés que aplicar la misma operación a muchos datos que son independientes entre sí. SIMD lo explota a nivel de registro."_

🗣️ _"Es el más fácil de explotar porque no hay comunicación entre los datos. No hay locks, no hay sincronización, no hay condiciones de carrera. Cada lane hace su trabajo solo."_

💡 **Ejemplo mental para el auditorio:**
_"Imaginen una fábrica. SISD es una línea de ensamblaje con un solo operario. SIMD es la misma línea pero con 8 operarios en paralelo, todos haciendo exactamente lo mismo, cada uno en su pieza."_

💡 **Escalar en código:**
```
for i in range(N):
    C[i] = A[i] + B[i]   # SISD: 1 suma por vuelta
```
💡 **Vectorizado:**
```
C = A + B   # NumPy usa AVX internamente: 8 sumas por ciclo
```

---

## [BLOQUE 7] Ventajas (1 min)

🗣️ _"Las ventajas son directas:"_

1. **Throughput** — hasta 16× más operaciones por ciclo (AVX-512 con floats de 32b).
2. **Eficiencia energética** — el overhead de decodificación se amortiza sobre N datos.
3. **Mejor uso del ancho de banda de memoria** — una carga trae N elementos.
4. **Librerías de alto nivel** — NumPy, Eigen, OpenCV ya lo usan por vos.

---

## [BLOQUE 8] Desventajas y Ley de Amdahl (2 min)

🗣️ _"No todo es perfecto. Hay limitaciones reales."_

💡 **Las dos más importantes:**

**1. No todo el código es vectorizable:**
- Branches condicionales por elemento.
- Dependencias entre iteraciones.
- Código de control, I/O, sincronización.

**2. Ley de Amdahl — el techo real:**

🗣️ _"Aunque SIMD te dé 16×, si solo el 50% de tu código puede vectorizarse, el speedup total máximo es 2×. Esta es la Ley de Amdahl y es el límite más importante a entender."_

```
Speedup = 1 / ((1 - P) + P/N)
P = 90%, N = 8 → Speedup ≈ 4.7×   (no 8×)
P = 50%, N = 16 → Speedup ≈ 1.9×  (no 16×)
```

💡 **Otras limitaciones:**
- Datos dispersos en memoria son costosos (scatter/gather).
- Portabilidad: SSE es x86, NEON es ARM. Código diferente por plataforma.
- Programación manual con intrinsics es compleja y propensa a bugs.

---

## [BLOQUE 9] Aplicaciones reales (1–2 min)

🗣️ _"¿Dónde se usa en la vida real? En todo lo que procesa datos homogéneos en volumen."_

💡 **Los 6 dominios clave:**

| Dominio | Por qué funciona SIMD |
|---|---|
| Procesamiento de imágenes | Mismo filtro sobre cada píxel, independientes entre sí |
| Codecs de video (H.264, AV1) | DCT, estimación de movimiento sobre bloques |
| Machine Learning | Multiplicación de matrices = millones de FMA |
| Videojuegos | Física, transformaciones 3D, pathfinding masivo |
| Simulación científica | Grillas de CFD, dinámica molecular |
| DSP / Telecomunicaciones | FFT, filtros FIR/IIR sobre señales |

🗣️ _"Ejemplo concreto: una imagen 4K tiene 8.3 millones de píxeles. Aplicar un filtro de desenfoque sobre todos ellos uno por uno serían 8.3M instrucciones. Con AVX-512 procesando 16 píxeles por ciclo, son 520K instrucciones. El procesamiento de imágenes en su smartphone usa exactamente esto, en tiempo real, mientras tomás fotos."_

---

## [BLOQUE 10] Cierre (30 seg)

🗣️ _"Para cerrar: SIMD es el mecanismo que permite que un solo núcleo haga mucho más trabajo por ciclo, explotando el paralelismo de datos. No reemplaza al multiprocesamiento: lo complementa. Cada núcleo tiene su SIMD, y si tenés 16 núcleos con AVX-512, multiplicás: 16 núcleos × 16 lanes = 256 operaciones por ciclo, por frecuencia de reloj."_

🗣️ _"La conclusión es que SIMD no es un detalle de implementación. Es el motor que hace posible el video en 4K, la inferencia de IA en tiempo real, y los videojuegos modernos — todo corriendo en hardware accesible."_

---

## Preguntas que pueden hacerte — preparate

**"¿En qué se diferencia SIMD de los múltiples núcleos?"**
→ SIMD es paralelismo *dentro* de un núcleo. Multinúcleo es paralelismo *entre* núcleos. Son ortogonales: podés tener ambos al mismo tiempo.

**"¿Por qué no siempre se usa SIMD?"**
→ Porque no todo el código tiene paralelismo de datos. La Ley de Amdahl limita el beneficio. Y vectorizar manualmente es complejo — el compilador lo hace automáticamente cuando puede, pero no siempre llega al óptimo.

**"¿SIMD es lo mismo que una GPU?"**
→ Las GPUs son una extensión del paradigma SIMD a escala masiva (miles de lanes). Pero operan con mayor latencia y contextos de programación diferentes. CPUs + SIMD tienen menos latencia y mayor flexibilidad de control.

**"¿AVX-512 está en todos los procesadores modernos?"**
→ No. Intel lo tiene desde Skylake-X (2017), pero muchos chips de consumo no lo incluyen. AMD lo incorporó en Zen 4 (2022). ARM Neon es el equivalente en móviles.
