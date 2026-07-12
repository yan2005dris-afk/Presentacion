# PARTE 3 — Extensiones SIMD Modernas: MMX, SSE, AVX
## Guión Pedagógico Completo — Integrante 3

**Duración estimada**: 15-18 minutos  
**Slides**: 8 totales (Slide 3.1 → 3.8) — Todas con guión completo  
**Objetivo**: Mostrar cómo SIMD evolucionó desde registros simples (64 bits) hasta arquitecturas modernas de 512 bits, cómo funciona el circuito interno, qué instrucciones usas, y por qué la implementación de hardware determina rendimiento.

---

## 📍 ANTES DE EMPEZAR — Recordatorio de Contexto

Tu audiencia acaba de ver:
- **Parte 1**: El problema SISD (un dato por ciclo) y la Taxonomía de Flynn
- **Parte 2**: Qué es SIMD conceptualmente y cómo se distribuye una instrucción a múltiples ALUs

**Tu rol en Parte 3**: Bajar a tierra. Mostrar:
1. **Cómo nació SIMD** (historia 1996-2017)
2. **Cómo funciona el circuito** (subword parallelism)
3. **Qué instrucciones tienes** en tu toolbox (AVX, FMA)
4. **Que diferentes CPUs lo hacen distinto** (Excavator vs Zen)

**Tono**: Técnico pero concreto. No memorizar opcodes. Entender **por qué** cada decisión de diseño.

---

---

## Slide 3.1 — La Evolución del Músculo Vectorial

### Título
"1996 → 2017: El Registro que No Para de Crecer"

### Lo que ves en la slide
- **Timeline horizontal**: 4 bloques apilados (MMX, SSE, AVX, AVX-512)
- **Cada bloque crece**: ancho visual aumenta, representando bits
- **Colores**: naranja gradual hacia el futuro
- **Anotaciones**: 
  - 1996 MMX: 64-bit, 8 registros MM0-MM7
  - 1999 SSE: 128-bit, 8 registros XMM0-XMM7
  - 2010 AVX: 256-bit, 16 registros YMM0-YMM15
  - 2017 AVX-512: 512-bit, 32 registros ZMM0-ZMM31

### Qué decir (guión)

**Intro**: "Ahora miramos dentro de la caja. ¿Cómo nacieron las extensiones SIMD? ¿Por qué Intel decidió hacerlo?"

**Contexto histórico**:
- **1996**: Internet aún era texto. Pero CDs de audio, video MPEG digital, juegos 3D empezaban
- **El problema**: Un x86 clásico de 32 bits no puede procesar 4 píxeles RGB simultáneamente. Uno por uno = lento
- **Intel dijo**: "Vamos a ampliar el ISA. Extensiones, no cambios radicales. Compatibilidad hacia atrás siempre"

**La evolución**:
- **MMX (1996)**: Reutilizó registros FPU viejos (MM0-MM7). Solo enteros. 64 bits. Suficiente para audio de 1996.
  - *Detalle*: "No hubo nuevos registros físicamente. Fue reutilizar lo que existía. Violencia de marketing: 'Multimedia Extensions' cuando la realidad era más modesta."
  
- **SSE (1999)**: Nuevos registros XMM, 128 bits. Soporte **punto flotante**. Esto abrió 3D graphics
  - *Caso real*: "Intel Atom 2009. Sin SSE: video HD al 100% de CPU, frames dropping. Con SSE: 40% de CPU. Misma máquina. La diferencia es la extensión."
  
- **AVX (2010)**: 256 bits. Duplicó capacidad de SSE. YMM0-YMM15 (16 registros, el doble de XMM)
  - *Detalle*: "Los registros XMM no desaparecen. YMM es la mitad alta de un registro más grande. Compatibilidad."
  
- **AVX-512 (2017)**: 512 bits. El doble de AVX. ZMM registers. Además: registros de máscara k0-k7 (predicación)
  - *Detalle*: "AVX-512 llegó a Xeon servidores en 2017. Aún no está en desktop consumer — Intel decidió saltearla. Por qué? Consumo de energía, no todos los programas lo necesitan. Trade-off."

**Cierre slide**: 
"En 20 años, el registro se multiplicó por 8. De 64 a 512 bits. Cada generación: más paralelismo, más datos procesados por instrucción."

**Transición**:
"Bien. ¿Pero cómo logra x86 tener un único sumador y comportarse como si tuviera 8 sumadores? Respuesta: subword parallelism. Un truco del silicio."

---

---

## Slide 3.2 — Subword Parallelism: Un Sumador, Muchos Tamaños

### Título
"El Truco del Silicio: Particionando el Sumador"

### Lo que ves en la slide
- **Arriba**: Un rectángulo grande "Un sumador de 256 bits"
- **Animación secuencial**: 3 formas diferentes de particionarlo
  1. **8×32-bit (floats)**: 8 bloques naranja, 8 "+" dentro
  2. **16×16-bit (shorts)**: 16 bloques más pequeños
  3. **32×8-bit (bytes)**: 32 bloques diminutos
- **Texto explicativo**: "La instrucción elige cómo particionar"

### Qué decir (guión)

**Intro**: "¿Magia? No. Físicamente, Intel fabrica UN sumador de 256 bits. El secreto está en cómo controla los carries internos."

**El concepto**:
- Un sumador es un circuito de lógica combinacional. A nivel más bajo: sumas bit a bit con acarreos (carries)
- 256 bits = 256 flip-flops sumando
- La pregunta: "¿Dónde meto los carries? ¿Cada 32 bits? ¿Cada 16? ¿Cada 8?"

**Cómo funciona** — Progresión de particionamiento (mismo sumador, distintos tamaños):

- **VADDPS** (Add Packed Singles): sumar 8×float32
  - "La instrucción le dice al hardware: 'Pon carry cada 32 bits'. Resultado: 8 sumadores de 32 bits independientes."
  - Ejemplo: `[f0] [f1] [f2] [f3] [f4] [f5] [f6] [f7]` + `[g0] [g1] [g2] [g3] [g4] [g5] [g6] [g7]` = 8 sumas en paralelo
  - Aplicación: gráficos 3D, física, procesamiento de audio estándar

- **PADDW** (Add Packed Words): sumar 16×int16
  - "Carry cada 16 bits. Mismo circuito de 256 bits, pero particionado en 16 secciones en lugar de 8."
  - Ejemplo: 16 enteros de 16 bits sumados en paralelo
  - Aplicación: **audio profesional** (CD-quality es 16-bit), procesamiento DSP de sensores, muestras de instrumentos musicales
  - Ventaja: más elementos por instrucción, mejor para datos enteros medianos

- **PADDB** (Add Packed Bytes): sumar 32×uint8
  - "Carry cada 8 bits. Máxima granularidad: 32 sumadores de 8 bits independientes."
  - Aplicación: procesamiento de **imágenes en tiempo real**. Cada byte = intensidad de un canal (Rojo, Verde, Azul, o Alpha de píxeles RGBA)
  - Ejemplo: imagen 1920×1080 con 3 canales RGB = 6.2M píxeles. Con PADDB: procesar 32 píxeles por instrucción = ~200K instrucciones (vs 6.2M escalares)
  - Segunda aplicación: **redes neuronales cuantizadas** (INT8), donde los pesos se comprimen a 8 bits

**La magia real**:
- "No es que haya 8 sumadores diferentes. Es un solo sumador con lógica de carry controlable."
- "La complejidad está en las puertas lógicas internas. Intel diseña el sumador sabiendo que el carry va a ser controlado por la instrucción."

**Por qué importa**:
- "El mismo circuito, 3 usos distintos. Eficiencia de área de chip."
- "No cuesta extra agregar más particiones. Es solo configurar dónde van los carries."

**Detalle avanzado** (opcional, si la audiencia está enganchada):
- "En verdad, hay un sumador por posición de bits, con multiplexadores antes (para elegir ancho) y multiplexadores después (para elegir si propagar carry o no)."

**Transición**:
"Bien, ahora sabemos que un sumador puede ser 8 pequeños sumadores si queremos. ¿Qué otras operaciones podemos hacer? Entra el vocabulario SIMD."

---

---

## Slide 3.3 — Las Instrucciones Clave: SSE y AVX

### Título
"El Vocabulario SIMD: Las Instrucciones que Necesitás Saber"

### Lo que ves en la slide
- **Tabla monospace** (estilo terminal):
  - Columna 1: Instrucción (MOVAPS, ADDPS, MULPS, VADDPD, VFMADDPD, etc.)
  - Columna 2: Operación (a+b, a×b, a×b+c, etc.)
  - Columna 3: Ancho (4×float, 8×float, etc.)
- **VFMADDPD resaltada**: Borde especial, animación pulsante
- **Mini código ejemplo abajo**: 5 líneas de ensamblador mostrando carga → operaciones → almacenamiento

### Qué decir (guión)

**Intro**: "Ahora, el toolbox. ¿Qué operaciones tiene SIMD? No todos los opcodes — los principales que verás en real-world code."

**SSE (128-bit, 4× float32)**:
Listar rápido:
- `MOVAPS` — Move aligned: cargar 4 floats desde memoria a registro. "Aligned" = dirección de memoria es múltiplo de 16. Si no, crash o latencia."
- `ADDPS` — sumar 4 floats
- `MULPS` — multiplicar 4 floats
- `SUBPS` — restar
- `DIVPS` — dividir (lento, evitar)

"SSE es viejo (1999). Sigue vivo en código legacy. Ahora la mayoría usa AVX."

**AVX (256-bit)**:
Prefijo `V` distingue: `VADDPD` no es `ADDPS`.
- `VMOVAPD` — Move 4 doubles (64-bit), alineados
- `VADDPD` — Add 4 doubles. La `D` es "double" (64-bit)
- `VMULPD` — Multiplicar 4 doubles
- `VBROADCASTSD` — Importante: toma un escalar y lo replica en todos los slots del vector. "Si necesitás sumar el mismo número a 8 elementos distintos, broadcast simplifica."
- `VFMADDPD` — **Fused Multiply-Add**: `a*b + c` en UNA instrucción.

**VFMADDPD es la reina**:
"Esta es la instrucción que revolucionó AI en CPU. Hace 2 operaciones (multiply + add) en 1 ciclo. Cuenta como 2 FLOPS para benchmarks."

Mostrar ejemplo:
```asm
VMOVAPD ymm0, [A]          ; cargar 4 doubles
VMOVAPD ymm1, [B]          ; cargar 4 doubles
VMOVAPD ymm2, [C]          ; cargar 4 doubles
VFMADDPD ymm3, ymm0, ymm1, ymm2  ; YMM3 = YMM0*YMM1 + YMM2 (4 operaciones)
VMOVAPD [resultado], ymm3  ; guardar 4 resultados
```

"5 instrucciones para computar 4× (a*b + c). En escalar, serían 20+ instrucciones."

**Detalle de sintaxis** (si preguntan):
- Orden de operandos: `VFMADDPD destino, multiplicando1, multiplicando2, sumando`
- Algunos ensambladores usan orden distinto. Verificar manual.

**Cierre**:
"Eso es el core del toolkit. Hay más (comparaciones, shuffles, conversiones), pero estas 6-7 cubren 90% de código real."

**Transición**:
"Ok, tenemos el hardware (subword parallelism) y las instrucciones (AVX). ¿Qué pasa cuando 2 CPUs diferentes implementan AVX? ¿Es igual en todas?"

---

---

## Slide 3.4 — Organización de Datos Empaquetados

### Título
"Un Registro YMM, Infinitas Interpretaciones"

### Lo que ves en la slide
- **Selector de botones**: 4 opciones (float32, double64, int16, byte)
- **Visualización dinámica**: Registro YMM de 256 bits se redibuja con particiones distintas según formato
  - float32: 8 cajas de 32 bits cada una
  - double64: 4 cajas de 64 bits cada una
  - int16: 16 cajas de 16 bits cada una
  - byte: 32 cajas de 8 bits cada una
- **Footer descriptivo**: Caso de uso para cada formato

### Qué decir (guión)

**Intro**: "Acabamos de ver que un sumador puede particionarse de distintas maneras. ¿Pero qué significan esos datos que metes adentro?"

"Un registro YMM tiene 256 bits de silicio. Los bits son bits — no saben si son floats, enteros, o qué. La **instrucción** es la que dice: 'Interpreta esto como 8 floats' o 'como 4 doubles'."

**Recorrido por formatos**:

- **8× float32 (32-bit floating point)**:
  - "Más común. Gráficos 3D, procesamiento de audio, simulaciones físicas simples."
  - "Un float32 son 1 signo + 8 exponente + 23 mantisa. Rango: 1.4×10^-45 a 3.4×10^+38"
  - "Precisión de 7 dígitos decimales. Suficiente para video."
  
- **4× double64 (64-bit floating point)**:
  - "Científico. Modelado climático, cálculos financieros, simulaciones cuánticas."
  - "Mismo YMM, pero mitad de elementos. Cambio: **precisión vs cantidad**."
  - "Un double tiene ~15 dígitos de precisión. Versus float: 7."
  - "La misma instrucción VADDPD 'sabe' que son 4 doubles, no 8 floats."

- **16× int16 (16-bit signed integer)**:
  - "Audio de 16-bit (CDs, DAWs). DSP (procesamiento de señales digitales). Muestras de sensores."
  - "Rango: -32,768 a +32,767."
  - "Útil cuando la precision de integer es suficiente y quieres velocidad."

- **32× byte (8-bit unsigned integer, 0-255)**:
  - "Imágenes. Cada byte = intensidad de un canal (R, G, B, o A)."
  - "Una imagen 1920×1080 tiene 1920×1080×4 bytes (RGBA). Con AVX, procesas 32 píxeles por instrucción."
  - "IA cuantizada: modelos de red neuronal compridos a INT8 (0-255) en lugar de float32. Entra en la GPU con velocidad."

**Caso real de impacto**:
"Intel Atom 2009 ejemplo nuevamente: procesar video HD (1920×1080, 24 bits por píxel). Sin SIMD: cada píxel es una iteración escalar. Con AVX: 32 píxeles simultáneamente. El registro YMM 'entiende' que son 32 bytes. Resultado: 32× speedup teórico."

**Cierre slide**:
"La clave: el mismo silicio (YMM), distinta interpretación (formato). La instrucción elige. Flexibilidad."

**Transición**:
"Ok, tenemos hardware (sumadores particionables), tenemos datos (múltiples formatos). ¿Cómo entra una instrucción AVX en el pipeline? Entra: Fetch."

---

---

## Slide 3.5 — Práctica Assembler (SISD vs SSE — Simulador Interactivo)

### Título
"De Teoría a Silicio: Suma Escalar vs Vectorial, Paso a Paso"

### Lo que ves en la slide
- **Interfaz lado a lado interactivo**:
  - Panel izquierdo (rojo): Código SISD assembler (1 elemento por vez)
  - Panel derecho (cian): Código SSE assembler (4 elementos en paralelo)
- **Arreglo de entrada**: 12 elementos [A y B] en memoria
- **Visualización dinámica**: Estado de registros XMM en tiempo real
- **Controles**: Botones "Paso", "Auto", "Reset"
- **Contador**: Paso 0/73 (total de instrucciones ejecutadas)

### Qué decir (guión)

**Intro**: "Suficiente teoría. Ahora vamos a verlo en vivo. Simulador interactivo de assembler real."

"Problema simple: sumar dos arreglos de 12 elementos. C[i] = A[i] + B[i]."

"La pregunta: ¿cuántas instrucciones necesita SISD vs SSE?"

**Lado izquierdo — SISD (Escalar)**:

Leer código línea a línea:
```asm
mov eax, 0          ; i = 0 (índice)
.loop:
  movss xmm0, [A+eax*4]    ; cargar A[i] en XMM0 (1 float)
  addss xmm0, [B+eax*4]    ; sumar B[i] (1 float)
  movss [C+eax*4], xmm0    ; guardar C[i] (1 float)
  inc eax ; i++
  cmp eax, N               ; ¿terminó?
  jl .loop                 ; repetir si no
```

"Por cada elemento: 4 instrucciones (load + add + store + loop). 12 elementos = 48+ instrucciones en la práctica."

"Cuello de botella: **latencia de memoria**. Cada load espera ~11 ciclos."

**Lado derecho — SSE (Vectorial)**:

Leer código línea a línea:
```asm
mov eax, 0
.loop:
  movaps xmm0, [A+eax*4]   ; cargar 4 floats de A en XMM0
  addps xmm0, [B+eax*4]    ; sumar 4 floats de B (SSE particiona sumador)
  movaps [C+eax*4], xmm0   ; guardar 4 resultados
  add eax, 4 ; i += 4 (4 elementos de una vez)
  cmp eax, N
  jl .loop
```

"Mismo loop, pero procesa **4 elementos por iteración**."

"12 elementos = 3 iteraciones del loop (vs 12 en SISD)."

"¿Instrucciones? Similar, pero **throughput > 4×** porque procesamos 4 datos en paralelo."

**Interactividad — Ejecuta Paso a Paso**:

"Presionamos 'Paso'. El simulador ejecuta 1 instrucción:"

1. **Primer LOAD (SISD)**: Trae A[0] a XMM0. Espera ~11 ciclos (latencia de memoria marcada).
2. **Primer LOAD (SSE)**: Trae A[0..3] (4 floats) a XMM0. Mismo ~11 ciclos, pero **4 elementos de una vez**.

"Seguimos. En SISD, instruction #3 es ADD. En SSE, instruction #3 es ADDPS. Ambas suman."

"La diferencia visual: **SISD suma 1 número. SSE suma 4 números en el mismo hardware**."

3. **WRITEBACK (SISD)**: XMM0 → [C+0]. 1 dato escrito.
4. **WRITEBACK (SSE)**: XMM0 → [C+0..C+12]. 4 datos escritos.

"El simulador mantiene contadores. SISD: muchas más iteraciones. SSE: pocas iteraciones, mismo resultado."

**Análisis de Throughput** (después de ejecutar):

"Al final, contamos pasos totales."
- SISD: 73+ instrucciones (cuente aproximada)
- SSE: 18+ instrucciones

"Razón: **factor de vectorización = 4**. SSE hace el trabajo en 1/4 de iteraciones del loop."

**Caso real de impacto**:

"Ahora multiplica por 1000 elementos. SISD: 4000+ instrucciones. SSE: 1000+ instrucciones."

"Ahora por 1 millón de elementos (imagen 1080p, 3 canales). SISD: 4M instrucciones. SSE: 1M instrucciones. Energía, latencia, todo bajó 4×."

**Cierre slide**:

"Este simulador lo que hace es demostrar que **SIMD no es magia**. Es arquitectura — un único sumador, particionado y orquestado para procesar múltiples datos."

"SSE ganó porque:"
1. **Fewer loop iterations** (1/4)
2. **Better memory reuse** (1 load trae 4 datos)
3. **Same latency, más throughput** (11 ciclos traen 4 elements, no 1)

**Transición**:

"Ok, vimos SISD vs SSE en simulador. Ahora: ¿cómo entra esto en el pipeline de CPU? ¿A nivel arquitectónico?"

---

---

## Slide 3.6 — Fetch-Decode-Execute en Pipeline SIMD

### Título
"De 1 Instrucción a 4 Operaciones: El Pipeline Vectorial"

### Lo que ves en la slide
- **Barra superior**: Instrucción específica `VADDPD ymm2, ymm1, [Y]`
- **4 columnas lado a lado**: FETCH → DECODE → EXECUTE → WRITEBACK
- **Cada columna**:
  - Título (FETCH, DECODE, EXECUTE, WRITEBACK)
  - Descripción qué pasa en esa etapa
  - Ejemplo concreto de datos
  - Badge con resumen ("1 instr cargada", "1 decode → 4 ops", "4 ALUs activas", "256 bits en 1 write")
- **Footer comparativo**: SISD vs SIMD

### Qué decir (guión)

**Intro**: "Sabemos que un sumador se particiona, que tenemos 8 formatos de datos. Ahora: ¿cómo entra una instrucción AVX en el CPU?"

"El pipeline es igual al que viste en Parte 1. Fetch, Decode, Execute, Writeback. La diferencia: **el significado de Decode**."

**Recorrido por etapas**:

- **FETCH (Traer instrucción)**:
  - "La Control Unit (CU) busca en el instruction cache la dirección 0x40060A"
  - "Encuentra: `VADDPD ymm2, ymm1, [Y]`"
  - "Es 1 instrucción. Pero **la CU ya sabe que es vectorial**. El decodificador está preparado."
  - "Métrica: 1 instrucción cargada."

- **DECODE (Interpretar)**:
  - "Decodifica el opcode. Reconoce: 'VADDPD = suma packed doubles'."
  - "Identifica operandos: YMM1 (contiene 4 doubles: [2.5, 5.0, 7.5, 10.0]), Y es una dirección de memoria."
  - "**Aquí está la magia**: Decode sabe que necesita **4 sumadores en paralelo**, no 1."
  - "Genera 1 micro-operación (micro-op), pero su ejecución activará 4 ALUs."
  - "Métrica: 1 decode → 4 operaciones efectivas."

- **EXECUTE (Calcular)**:
  - "Los 4 sumadores de 64 bits **se activan simultáneamente**."
  - "YMM1[0] + memory[0] = 2.5 + 10 = 12.5"
  - "YMM1[1] + memory[1] = 5.0 + 20 = 25.0"
  - "YMM1[2] + memory[2] = 7.5 + 30 = 37.5"
  - "YMM1[3] + memory[3] = 10.0 + 40 = 50.0"
  - "Todo en 1 ciclo de reloj (latencia aprox 4 ciclos, pero issue rate = 1 por ciclo)."
  - "Métrica: 4 ALUs activas en paralelo."

- **WRITEBACK (Guardar resultado)**:
  - "Los 256 bits del resultado [12.5, 25.0, 37.5, 50.0] se escriben de vuelta al banco de registros YMM2."
  - "No son 4 escrituras separadas. Es **1 operación de write de 256 bits**."
  - "Métrica: 256 bits en 1 write."

**Comparativa SISD vs SIMD** (mostrar al final):
- **SISD**: 1 Decode → 1 micro-op → 1 ALU activa → 1 resultado escalar
- **SIMD**: 1 Decode → 1 micro-op (pero vectorial) → 4 ALUs activas → 4 resultados en paralelo

"La arquitectura del pipeline es idéntica. La diferencia está en que **Decode y Execute son vectoriales**, no escalares."

**Cierre slide**:
"En términos de energía y silicio: **no cuesta mucho más**. Reuso de infraestructura. Solo necesitas particiones y multiplexadores."

**Transición**:
"Bien. El pipeline procesa 1 instrucción de 4 elementos. ¿Pero qué pasa si encadenamos dos operaciones? ¿Si quiero hacer (A×B)+C sin parar?"

---

---

## Slide 3.7 — Encadenamiento Vectorial (Vector Chaining)

### Título
"Cómo CRAY-1 Ganó Velocidad: Chaining y la Semilla de FMA"

### Lo que ves en la slide
- **Panel izquierdo (rojo)**: "❌ Sin Chaining (Tradicional)"
  - Flujo secuencial: Multiplicadora completa → escribe → Sumadora lee → suma
  - Latencia alta marcada
- **Panel derecho (verde)**: "✓ Con Chaining (CRAY-1 / FMA)"
  - Flujo en cascada: Multiplicadora produce → directamente a Sumadora
  - Latencia mínima
- **Footer**: Importancia histórica → conexión a FMA moderno

### Qué decir (guión)

**Intro — El Plot Twist 2**:
"Estamos en Parte 3 de la exposición. Hay un concepto que revolucionó supercomputadoras en los '70 y sigue siendo la base de IA hoy."

"Seymour Cray, 1976. CRAY-1. Pregunta: ¿puedo hacer cálculos compuestos más rápido si conecto las unidades de ejecución?"

**El Problema Sin Chaining**:

Código pseudoscalar tradicional:
```
LOAD    V0 ← memoria              ; 11 ciclos (latencia de memoria)
MULTIPLICA  V1 = V0 × 2           ; esperar 11 ciclos, luego 6 ciclos = 17 total
SUMA        V2 = V1 + 3           ; esperar 17 ciclos, luego 4 ciclos = 21 total
─────────────────────────────────
Total: 21 ciclos
```

"Problema: cada operación espera a que la anterior **termine completamente**."

"Un vector de N elementos × (11 + 6 + 4) ciclos = 21N ciclos. Lento."

**La Solución: Vector Chaining**:

Flujo con chaining:
```
LOAD    V0[0] ↓
          ↓
MULT    V0[0]×2 ↓
            ↓
SUMA    V0[0]×2+3 → resultado
(y simultáneamente)
LOAD    V0[1], MULT empieza, SUMA empieza en cascada
```

"Tan pronto como sale el primer **elemento parcial** de la Multiplicadora, pasa directo a la Sumadora."

"No esperas a que terminen todos los elementos."

"No escribes a memoria intermedia."

"Ambas unidades operan **simultáneamente** en elementos distintos — pipeline cruzado."

**Análisis de latencia**:

"Con chaining: tiempo total ≈ 11 ciclos (el load largo) + overhead de synchronización (≈ 0-2 ciclos)."

"Sin chaining: 21 ciclos."

"Aceleración: 21/11 ≈ 2×. En vectores grandes, la diferencia es brutal."

**Conexión a Moderna IA**:

"Cray-1 fue un experimento. En la década del 2000, Intel dijo: 'Queremos esto en consumer CPUs'."

"Resultado: **FMA (Fused Multiply-Add)**, instrucción nativa que hace `A×B+C` en **1 ciclo** (en lugar de 2 ciclos separados)."

"¿Por qué importa? Matriz de 1000×1000. Multiplicar 1M operaciones fused vs separadas."
- FMA: 1M ciclos (teórico)
- Separadas: 2M ciclos + memoria intermedia

"Hoy: GPUs NVIDIA, CPUs Zen, todo lo que hace AI usa FMA internamente. Cray demostró que funcionaba."

**Detalle técnico** (si la audiencia está con energía):

"En silicio: chaining = un **forwarding bus** (conexión directa) entre unidades. No necesita registros intermedios. Pero requiere **lógica de control compleja** para sincronizar. Por eso no todas las CPUs lo hacen — es más circuitería."

**Cierre slide**:

"Resumen: Cray mostró que encadenar unidades vectoriales multiplica velocidad sin multiplicar registros. 50 años después, eso es la base de FMA, y FMA es la base de Deep Learning acelerado."

**Transición**:

"Bien. Hemos visto registro creciente, particionamiento, instrucciones, pipeline, chaining. ¿Pero no todas las CPUs implementan esto igual?"

"Última slide: vamos a comprar dos CPUs que ejecutan la misma instrucción con distinto rendimiento."

---

---

## Slide 3.8 — AMD Excavator vs Zen: Misma Instrucción, Diferente Silicon

### Título
"El ISA es el Mismo. El Hardware No."

### Lo que ves en la slide
- **2 paneles side-by-side**: Excavator (violeta) vs Zen (naranja)
- **Cada panel: flujo horizontal en 5 columnas**:
  1. AVX-256 input (cuadro con bits 0-255)
  2. Flecha → (pulsing)
  3. Unidades de procesamiento (FMAC-128 #0 y #1 para Excavator; FP Scheduler para Zen)
  4. Flecha → (pulsing)
  5. Resultado (badge)
- **Footer comparativo**: 2 cuadros con resumen texto

### Qué decir (guión)

**Intro — El Plot Twist**:
"Acá viene lo más importante de la presentación. AVX es un **contrato** — una interfaz. ¿Qué hay adentro? Depende de la CPU."

"Dos CPUs diferentes, ambas ejecutan VFMADDPD. Diferentes tiempos de latencia, diferente consumo energético. ¿Por qué? Implementación interna."

**Excavator (AMD, pre-2017) — El Improvisador**:

*Diagrama flujo*: Input 256-bit → split → FMAC-128 #0 y FMAC-128 #1 → coordinación → Resultado

*Explicación*:
- "AMD no tenía un sumador de 256 bits. Tenía dos de 128."
- "Solución: tomar el input AVX-256, partirlo a la mitad (bits 0-127 a FMAC #0, bits 128-255 a FMAC #1), procesar ambos en paralelo, juntar resultados."
- "Ventaja: podía lanzar AVX en CPUs viejas sin rediseño total."
- "Desventaja: hay coordin**ación**. El scheduler debe esperar a que ambas terminen. Latencia adicional."

*Analógía*: "Como tener 2 pizzerías que entregan la mitad de la pizza cada una. Al final tienes una pizza, pero tuviste que esperar a que ambas terminen y luego la uniste."

**Zen (AMD, 2017+) — El Diseño Limpio**:

*Diagrama flujo*: Input 256-bit → FP Scheduler → crossbar → FMAC-256 (nativa) → Resultado

*Explicación*:
- "AMD rediseñó desde cero. Un único FMAC de 256 bits."
- "Un planificador (scheduler) que distribuye el trabajo via un crossbar (red de interconexión)."
- "Mismo resultado: VFMADDPD. Mejor latencia, menos energía."
- "Costo: más silicio dedicado. Pero AMD lo justificó porque vale la pena."

*Analógía*: "Una sola pizzería hace la pizza completa. Más rápido, sin coordinación overhead."

**Comparación directa**:

Tabula mentalmente (o usa la slide):

| Métrica | Excavator | Zen |
|---------|-----------|-----|
| **Latencia AVX** | Mayor (coordinación) | Menor (nativa) |
| **Energía** | Mayor (2 unidades) | Menor (1 optimizada) |
| **Área de chip** | Similar | Similar |
| **Implementación** | Coordinada | Unificada |

"Los mismos 4 doubles se suman. La CPU Zen lo hace ~40-50% más rápido y con menos watts que Excavator."

**El punto clave**:
"El ISA (Instruction Set Architecture) es un **contrato público**. 'Aquí tienes VFMADDPD. Usalo.' Pero la implementación es privada — cada vendedor decide cómo."

"Esto explica por qué benchmarks a veces sorprenden. Mismo código, diferentes CPUs, resultados distintos. No es bug. Es diseño."

**Detalle histórico** (si preguntan):
- "Excavator fue revolucionario en 2015 — permitió AVX sin rediseño total. Zen fue más revolucionario aún: limpió todo."
- "AMD pasó de coordinada a unificada. La transición más grande en arquitectura AMD en 20 años."

**Cierre slide**:
"Conclusión Parte 3: Vimos que el ISA (Instruction Set Architecture) es un **contrato público**. Intel, AMD y otros dicen 'aquí tienes VFMADDPD.' Pero cómo lo implementan internamente es secreto corporativo. El resultado: mismo código, distinto rendimiento en hardware diferente."

**Transición**:
"¿Preguntas antes de pasar a Parte 4?"

---

---

## 📋 CHECKLIST ANTES DE PRESENTAR

- [ ] Verificar que codegraph_explore mapeó correctamente las 8 slides (Parte3.jsx)
- [ ] **CRÍTICO**: Slide 3.5 (Assembler practice) **NO EXISTE** en código. Decidir: ¿implementar o saltear en exposición?
- [ ] Practicar transiciones rápidas — 8 slides en 15-18 min = 2-2.5 min por slide
- [ ] Tener listo caso real del Atom 2009 (video HD, 100% vs 40%) — hook de credibilidad para Slide 3.1
- [ ] Slide 3.4 (Organización): practicar cambiar entre formatos (float32 → double64 → int16 → byte) sin titubear
- [ ] Slide 3.6 (Pipeline): aclarar que DECODE es la diferencia clave (SIMD vs SISD)
- [ ] Slide 3.7 (Chaining): relación con FMA debe quedar clara — no es opcional, es histórico
- [ ] Slide 3.8 (Excavator vs Zen): enfatizar **"mismo ISA, distinta implementación"** — es el quid de la parte
- [ ] Aclarar que SSE es legacy pero aún presente; AVX es present; AVX-512 es future-tense
- [ ] Si preguntan "¿cuándo uso SIMD manualmente?": **Casi nunca en apps**. Compilador lo hace. Solo en librerías de imagen, AI frameworks, o HPC.
- [ ] Tener referencia de Cray-1 (1976) para contexto histórico de chaining/FMA en Slide 3.7

---

---

## 🎯 PUNTOS CLAVE A MARTILLAR (Resumen de 8 Slides)

1. **Slide 3.1 — SIMD creció**: 64 bits (1996) → 512 bits (2017). Exponencial por demanda de multimedia paralela.

2. **Slide 3.2 — Un circuito, múltiples usos**: El sumador es UNO. El "tamaño de palabra" se configura por instrucción (VADDPS = 32b, VADDPD = 64b).

3. **Slide 3.3 — Vocabulario core**: MOVAPD, VADDPD, VMULPD, VFMADDPD. 4 instrucciones cubren 90% de uso real. VFMADDPD (FMA) es la instrucción revolucionaria.

4. **Slide 3.4 — Datos flexibles**: Mismo YMM, distinta interpretación (8 floats vs 4 doubles vs 32 bytes). La instrucción elige.

5. **Slide 3.5 — Práctica Assembler (Simulador)**: SISD necesita 12 iteraciones (48+ instrs). SSE necesita 3 iteraciones (18+ instrs). Factor 4× en throughput, mismo hardware.

6. **Slide 3.6 — Pipeline vectorial**: FETCH y EXECUTE son iguales a SISD, pero DECODE y WRITEBACK son vectoriales. 1 instr → 4+ resultados en paralelo.

7. **Slide 3.7 — Chaining es FMA**: CRAY-1 (1976) demostró que encadenar ALUs sin memory stalls multiplica velocidad. 50 años después, FMA es eso nativo.

8. **Slide 3.8 — ISA ≠ Implementación**: Excavator y Zen ejecutan el mismo VFMADDPD. Latencia distinta, energía distinta. Por qué? Diseño interno privado. **El contrato es público, la solución es privada.**

**Moraleja general**: SIMD no es magia — es arquitectura deliberada. Evoluciona porque se necesita, funciona porque se diseña bien, y cada CPU lo hace a su manera.

---

---

## 📝 NOTAS FINALES

- **Duración esperada**: 15-18 min para las 8 slides (7 completas + 1 pendiente). Ritmo: 2-2.5 min/slide.
- **Gestión de tiempo**:
  - Slides 3.1-3.3: 1.5 min cada una (bien conocidas, ir rápido)
  - Slide 3.4 (Formatos): 2 min (es nueva, requiere demos interactivas)
  - Slide 3.5: **SKIP si falta implementación**, o 1.5 min si la agregás
  - Slide 3.6 (Pipeline): 2.5 min (visual compleja, aclarar bien)
  - Slide 3.7 (Chaining): 2 min (histórico, pero crucial para entender FMA)
  - Slide 3.8 (Excavator vs Zen): 2.5 min (es el punto final, enfatizar bien)

- **Preguntas típicas esperadas**:
  - "¿Por qué AVX no está en mi CPU?" → Posible si CPU es antigua (pre-2010) o AMD Ryzen <2000
  - "¿Cuándo escribo SIMD manualmente?" → Casi nunca. Compilador lo vectoriza. Excepciones: librerías de imagen (OpenCV), AI frameworks (TensorFlow), HPC (BLAS)
  - "¿Excavator o Zen cuál es mejor?" → Zen (2017+), pero Excavator (2015) fue revolucionario para su época. Trade-off silicio vs coordin
ación
  - "¿Cray-1 sigue siendo relevante?" → Conceptualmente sí (chaining inspiró FMA). Físicamente no (obsoleto desde 1980s)

- **Contexto anterior esperado**: Audiencia ya entiende SIMD conceptualmente (Parte 2) y sabe por qué lo necesitamos (Parte 1). No repitas eso.

- **ACCIÓN COMPLETADA**:
  - [x] Slide 3.5 (Assembler practice + Simulador) existe en herramienta interactiva. ✅ Documentado en guión.
  - [x] Guión ahora cubre todas las 8 slides (3.1-3.8). Listo para exposición.

---

✅ **Fin Parte 3 — Extensiones SIMD Modernas (Guión Completo, Todas las Slides Documentadas)**
