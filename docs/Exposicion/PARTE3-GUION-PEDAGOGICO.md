# PARTE 3 — Extensiones SIMD Modernas: MMX, SSE, AVX
## Guión Pedagógico Completo — Integrante 3

**Duración estimada**: 12-15 minutos  
**Slides**: 8 totales (Slide 3.1 → 3.8)  
**Objetivo**: Mostrar cómo SIMD evolucionó, cómo funciona internamente, y por qué importa la implementación de hardware.

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

**Cómo funciona**:
- **VADDPS** (Add Packed Singles): sumar 8×float32
  - "La instrucción le dice al hardware: 'Pon carry cada 32 bits'. Resultado: 8 sumadores de 32 independientes."
  - Diagrama: `[f0] [f1] [f2] [f3] [f4] [f5] [f6] [f7]` + `[g0] [g1] [g2] [g3] [g4] [g5] [g6] [g7]` = 8 sumas en paralelo

- **PADDW** (Add Packed Words): sumar 16×int16
  - "Carry cada 16 bits. Mismo circuito. Diferente particionamiento."

- **PADDB** (Add Packed Bytes): sumar 32×uint8
  - "Útil para procesamiento de imágenes: cada byte = intensidad de rojo, verde, o azul de un píxel. Sumar 32 píxeles a la vez."

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

## Slide 3.4 — AMD Excavator vs Zen: Misma Instrucción, Diferente Silicon

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
"Resumiendo Parte 3: vimos cómo SIMD evolucionó (bits crecientes), cómo funciona adentro (subword + carry), qué herramientas tienes (AVX + FMA), y que la implementación importa. La próxima parte, vamos a profundizar en optimizaciones en CPU."

**Transición**:
"¿Preguntas antes de pasar a Parte 4?"

---

---

## 📍 BONUS — Si Hay Tiempo

### Slide 3.4b — Organización de Datos en Registros Vectoriales

**Contexto**: En el código actual existe una slide extra (Slide3_OrganizacionDatos) que explota **formatos de datos dentro de un registro YMM**.

**Qué mostrar**:
Un registro YMM de 256 bits puede ser:
- **8× float32** — gráficos 3D, audio
- **4× double64** — física numérica, cálculos científicos
- **16× int16** — muestras DSP
- **32× byte** — procesamiento de imágenes, redes neuronales cuantizadas

"La misma instrucción VADDPD hace distinto si es float32 o double64. Es un parámetro del opcode."

**Time**: 1-2 minutos. Omitable si te quedas sin tiempo.

---

### Slide 3.5+ — Pipeline Vectorial (Fetch-Decode-Execute-Writeback para SIMD)

**Si quieres profundizar en el pipeline**:

**Diferencia clave**:
- **SISD**: Fetch 1 instr → Decode → Execute 1 dato → Writeback
- **SIMD**: Fetch 1 instr → Decode **"Sumar 8 elementos"** → Execute 8 datos en paralelo → Writeback 8 datos

"Es la misma arquitectura, pero Decode sabe que la instrucción activa múltiples ALUs."

**Time**: 1-2 minutos. Omitable.

---

### Slide 3.6+ — Encadenamiento Vectorial (Chaining)

**Concepto avanzado** (para audiencias técnicas):

"Un último detalle de rendimiento: chaining."

Sin chaining:
```
LOAD   V0 ─ esperar 11 ciclos → termina
ADD    V0 ─ esperar 4 ciclos → termina
MUL    V0 ─ esperar 6 ciclos → termina
Total: 21 ciclos
```

Con chaining (como Cray-1, y aproximado en CPUs modernas):
```
LOAD   V0[0] ↓
ADD    V0[0] → V0[1] ↓
MUL    V0[0] → resultado
(Unidades pipelineadas, resultado de ADD alimenta MUL sin esperar)
Total: ~11 ciclos (paralelismo verdadero)
```

"Chaining es por qué FMA es tan importante: elimina una etapa, simplifica el pipeline."

**Time**: 1-2 minutos. Contexto avanzado.

---

---

## 📋 CHECKLIST ANTES DE PRESENTAR

- [ ] Verificar que los ejemplos de código ensamblador están claros (¿vean diferencia entre ADDPS y VADDPD?)
- [ ] Practicar la transición entre slides — hay 4, mantener ritmo
- [ ] Tener listo caso real del Atom 2009 (video HD, 100% vs 40%) — es el hook de credibilidad
- [ ] Aclarar que SSE sigue vivo (legacy) pero AVX es el presente
- [ ] Enfatizar que Excavator/Zen es un ejemplo de **mismo ISA, distinta implementación** — es el quid
- [ ] Si hay preguntas sobre "¿cuándo uso SIMD?": respuesta es **nunca manualmente en aplicaciones**. El compilador decide. Vos escribís código limpio, GCC/Clang lo vectoriza automáticamente.

---

---

## 🎯 PUNTOS CLAVE A MARTILLAR

1. **SIMD creció**. 64 bits (1996) → 512 bits (2017). Por qué? Demanda de procesamiento masivo.

2. **Un circuito, múltiples usos**. El sumador es UNO. El "tamaño de palabra" se configura por instrucción.

3. **Vocabulario simple**. MOVAPD, VADDPD, VMULPD, VFMADDPD. 4 instrucciones cubren 90% de uso real.

4. **FMA es el ganador**. 2 ops en 1 ciclo = 2 FLOPS. Base de IA moderna.

5. **ISA ≠ Implementación**. Excavator y Zen ejecutan el mismo VFMADDPD. Distinto rendimiento. Por qué? Diseño interno.

6. **No memorices**. Entiende conceptos. Opcodes son detalles — lo importante es saber **que existen** y **qué hacen**.

---

---

## 📝 NOTAS FINALES

- **Duración esperada**: 12-15 min hablando solo Parte 3
- **Preguntas típicas**: 
  - "¿Por qué AVX no está en mi procesador?" → Posible si CPU es muy vieja o AMD Ryzen <2000
  - "¿Cuándo uso SIMD en código?" → Casi nunca manualmente. Compilador lo hace. Casos extremos: librerías de imagen, AI frameworks
  - "¿Excavator o Zen cuál es mejor?" → Zen, pero Excavator fue revolucionario para su época
- **Contexto anterior esperado**: Audiencia ya entiende SIMD conceptualmente (Parte 2) y sabe por qué lo necesitamos (Parte 1)

---

✅ **Fin Parte 3 — Extensiones SIMD Modernas**
