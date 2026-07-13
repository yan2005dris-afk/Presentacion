# Parte 2 — SIMD: Apunte de estudio

Apunte consolidado para preparar la **Parte 2** de la exposición sobre SIMD (Single Instruction, Multiple Data), asignada al Integrante 2 según el guión de diapositivas.

El material sigue el orden lógico del mapa mental de abajo. Cada sección cierra con una **versión pulida para el oral** (la frase que podés decir en vivo para mostrar que entendés, no que memorizaste).

---

## Mapa mental completo

```
SIMD (Single Instruction, Multiple Data)
├── QUE ES Y DONDE ENCAJA (FLYNN)
│   ├── 1 instruccion decodificada 1 vez, aplicada a N datos en N ALUs
│   │   └── Clave: el costo de fetch+decode se amortiza entre N
│   ├── DLP (paralelismo de datos) vs TLP (paralelismo de hilos)
│   └── SISD (escalar) · SIMD · MIMD (multicore) · MISD (teorico)
├── COMO SE IMPLEMENTA
│   ├── Registros vectoriales: XMM (128b) -> YMM (256b) -> ZMM (512b)
│   ├── Registros de control: VLEN, VSTR, VMASK
│   └── N ALUs / lanes ejecutando en paralelo
├── DOS FORMAS DE PARALELISMO
│   ├── Array Processor -> paralelismo en ESPACIO (N PEs simultaneos)
│   └── Vector Processor -> paralelismo en TIEMPO (1 pipeline, etapas)
│       └── Ejemplo clasico: CRAY-1 (vectorial)
├── CUANDO RINDE
│   ├── Condicion de regularidad:
│   │   ├── Misma operacion
│   │   ├── Datos independientes
│   │   ├── Mismo tamano/tipo
│   │   └── Alineados (stride = 1)
│   └── Si no se cumple -> se degrada
├── VENTAJAS
│   ├── Throughput xN
│   ├── Eficiencia energetica (decode se paga 1 vez)
│   └── Menos instrucciones dinamicas
├── DESVENTAJAS
│   ├── Costo hardware (N ALUs o pipeline ancho)
│   ├── Degradacion con divergencia
│   └── Complejidad de programacion (branchless)
└── APLICACIONES
    ├── Imagenes y video (codecs, filtros)
    ├── Machine Learning (matrices, convoluciones)
    ├── Videojuegos (graficos, fisica)
    ├── Simulaciones fisicas (N cuerpos)
    └── Criptografia
```

---

## 1. Que es SIMD y su lugar en la Taxonomia de Flynn

**Definicion operativa:** una sola instruccion se decodifica una vez y se aplica sobre N datos distintos en N ALUs en paralelo.

**Lo clave no es "es paralelismo"** (eso es generico). Lo clave es que el costo de fetch+decode se divide entre N elementos. Por eso SIMD es energeticamente eficiente: no pagas N veces el control.

**Analogia del guion (comandante + escuadron):**

- El comandante da UNA orden.
- El escuadron (N soldados) la ejecuta al mismo tiempo, cada uno sobre su propio objetivo.
- Una sola voz de mando, N acciones simultaneas.

### Donde encaja SIMD en la Taxonomia de Flynn

> La taxonomia de Flynn la cubre en detalle la **Parte 1** (Reyes Alisson) con un diagrama interactivo en la presentacion. Aca la retomamos como referencia para posicionar SIMD y compararlo con las otras arquitecturas. No repetimos la explicacion desde cero.

|              | Misma instruccion   | Distintas instrucciones   |
|--------------|---------------------|---------------------------|
| **Un dato**  | **SISD** (escalar)  | **MISD** (teorico)        |
| **Multiples datos** | **SIMD**     | **MIMD** (cada core hace lo suyo) |

### La diferencia real no es "cuanto hardware"

Tanto SIMD como MIMD replican recursos (ambos tienen N ALUs). La diferencia esta en **donde se replica el trabajo**:

- **SISD** — 1 instruccion, 1 dato. El procesador clasico Von Neumann. Una instruccion por vez, un dato por vez.
- **SIMD**: paralelismo a nivel de **dato** (DLP - Data Level Parallelism). Una sola unidad de control programa a todas las ALUs (por eso todas hacen lo mismo). Misma instruccion, N datos.
- **MIMD**: paralelismo a nivel de **hilo/tarea** (TLP - Thread Level Parallelism). Cada unidad tiene su propio control y puede hacer lo que quiera en cada ciclo. N instrucciones, N datos.
- **MISD** (Multiple Instruction, Single Data): existe teoricamente. Seria un procesador donde varios "cores" aplican operaciones distintas al MISMO dato (pensalo como un pipeline de filtros de seguridad, donde el mismo paquete pasa por N analisis distintos). En la practica comercial casi no se usa, por eso se suele dejar vacia en la tabla.

**Regla mental:** SIMD replica **datos**, MIMD replica **control** (unidades de control independientes).

### Caso moderno: el procesador actual es las dos cosas

Un CPU moderno (ej. con AVX-512) tiene varios cores (eso lo hace MIMD cuando los usas en paralelo) **y dentro de cada core** tiene lanes SIMD (eso es SIMD). Entonces conviven. Ademas es superescalar (ILP — paralelismo a nivel de instruccion). Son **capas de paralelismo que conviven**, no son excluyentes.

Si te preguntan "mi laptop es SIMD o MIMD?", la respuesta honesta es: **las dos cosas, segun el grano de paralelismo que estes mirando**.

**Version para el oral:** "SIMD no es 'muchas cosas funcionando a la vez' — eso es MIMD o multithreading. SIMD es una sola instruccion aplicada a muchos datos a la vez, y por eso es energeticamente eficiente: el costo de decodificar se paga una sola vez. En la taxonomia de Flynn que vimos en la Parte 1, SIMD comparte el eje de 'multiples datos' con MIMD, pero se diferencia en que comparte la instruccion. Dicho de otro modo: SIMD replica datos, MIMD replica control. Y un procesador moderno es ambas cosas segun el nivel de granularidad."

---

## 2. Como se implementa el hardware

SIMD necesita:

- **Una unidad de control** (la misma que tendria un procesador escalar).
- **N unidades funcionales (ALUs/lanes)** ejecutando en paralelo.
- **Registros vectoriales anchos**, mas anchos que un registro escalar normal.

### Registros vectoriales (x86)

| Registro | Tamano | Cantidad de floats (32b) que entran |
|----------|--------|-------------------------------------|
| XMM      | 128 b  | 4 floats                            |
| YMM      | 256 b  | 8 floats                            |
| ZMM      | 512 b  | 16 floats                           |

A medida que crecio la extension SIMD en Intel/AMD, los registros se fueron ensanchando: SSE (XMM) -> AVX (YMM) -> AVX-512 (ZMM).

### Como se ve un registro por dentro

Un registro SIMD no es "magia": son N slots contiguos donde cada slot guarda un dato independiente. Cuando el CPU dice `VADDPS ymm0, ymm1, ymm2`, internamente esta haciendo N sumas en paralelo.

**XMM (128 bits, SSE) — 4 lanes de float32:**

```
+--------+--------+--------+--------+
| float  | float  | float  | float  |
| lane 0 | lane 1 | lane 2 | lane 3 |
+--------+--------+--------+--------+
   32b      32b      32b      32b
|<---------- 128 bits -------------->|
```

**YMM (256 bits, AVX) — 8 lanes de float32:**

```
+--------+--------+--------+--------+--------+--------+--------+--------+
| lane 0 | lane 1 | lane 2 | lane 3 | lane 4 | lane 5 | lane 6 | lane 7 |
+--------+--------+--------+--------+--------+--------+--------+--------+
|<------------------------- 256 bits ------------------------------->|
```

**ZMM (512 bits, AVX-512) — 16 lanes de float32:**

```
+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
|  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  | 13  | 14  | 15  |
+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
|<-------------------------------------------- 512 bits ------------------------------------->|
```

Idea clave: **un solo nombre de registro (XMM0, YMM0, ZMM0)**, pero por dentro son N slots trabajando a la vez. Una instruccion, N resultados.

### Registros de control

| Registro | Que hace |
|----------|----------|
| **VLEN** | Cuantos elementos del vector estan activos en esta operacion |
| **VSTR** | Distancia (stride) entre elementos consecutivos en memoria |
| **VMASK** | Predicado por elemento (que lanes escriben y cuales se descartan) |

**Version para el oral:** "SIMD no es magia. Necesita registros mas anchos — XMM de 128 bits, YMM de 256, ZMM de 512 — y dentro de cada registro, N slots trabajando en paralelo. Ademas tiene registros de control como VLEN para saber cuantos elementos estan activos, VSTR para el stride en memoria, y VMASK para enmascarar lanes cuando hay divergencia. Una instruccion como VADDPS opera sobre el registro completo, pero por dentro son N sumas simultaneas."

---

## 3. Dos formas de paralelismo: Array vs Vector Processor

Ambos implementan SIMD. La diferencia esta en **como** logran el paralelismo.

### Analogia del restaurant

Mismo objetivo: cocinar 8 platos de risotto. Dos estrategias:

- **Restaurant A — Array Processor (paralelismo en ESPACIO)**
  8 cocineros, todos con su propia cocina completa. El gerente grita UNA orden: "risotto". Los 8 cocineros arrancan al mismo tiempo. En 10 minutos salen los 8 platos.
  Hay 8 cocinas funcionando a la vez. Costo: 8 cocinas enteras. Latencia del primer plato: baja.

- **Restaurant B — Vector Processor (paralelismo en TIEMPO)**
  1 sola cocina, pero organizada como linea de ensamblaje: cortar -> hervir -> salar -> emplatar. El primer plato tarda 4 minutos en pasar por todas las etapas. PERO al minuto 2, el plato 1 ya esta en "salar" mientras el plato 2 esta en "hervir" y el plato 3 arranco a "cortar". En estado estable, cada minuto sale un plato.
  Hay 1 sola cocina, pero super aprovechada. Costo: 1 cocina. Latencia del primer plato: alta. Throughput estable: excelente.

Misma cantidad de platos al final, hardware radicalmente distinto.

### Tabla comparativa

|                         | Array Processor                          | Vector Processor                            |
|-------------------------|------------------------------------------|---------------------------------------------|
| Como paraleliza         | N PEs en paralelo simultaneo             | 1 pipeline por donde pasan los datos        |
| Eje del paralelismo     | **Espacio** (muchos lugares)             | **Tiempo** (muchas etapas secuenciales)     |
| Hardware                | N ALUs completas (caro)                  | 1 pipeline profundo (mas barato)            |
| Latencia del 1er elem.  | Baja                                     | Alta (hay que llenar el pipeline)           |
| Throughput estable      | Alto                                     | Alto                                        |
| Ejemplo clasico         | ILLIAC IV (anios 60, 64 PEs)             | **CRAY-1** (1976, Seymour Cray)             |

### Ejemplos modernos (tu laptop)

- **CPU con AVX-512**: cada core tiene 2 unidades SIMD de 512 bits. Cuando hace una operacion vectorial, los elementos van fluyendo por un pipeline -> se comporta como un **Vector Processor** por dentro. PERO tiene varios cores, y cada core puede hacer esto en paralelo -> **MIMD entre cores, SIMD dentro de cada core**.
- **GPU moderna**: tiene miles de shaders, y cada shader tiene unidades vectoriales adentro -> literalmente un **array de procesadores vectoriales**.

**Conectando con la analogia del restaurant:** tu laptop con AVX-512 es como tener 4 restaurantes Vector Processor (los 4 cores), donde cada restaurante tiene su propia linea de ensamblaje SIMD. No es ni puro Array ni puro Vector — es una **arquitectura hibrida**: MIMD entre cores, SIMD vectorial dentro de cada core. La GPU, en cambio, esta mas cerca del Array Processor: muchos "cocineros" (shaders) ejecutando la misma receta sobre ingredientes distintos.

### Truco mental

- **ESPACIO** -> muchos lugares a la vez -> **ARRAY**
- **TIEMPO** -> un lugar, pero la produccion esta tan bien pipelineada que parece paralelo -> **VECTOR**

**Version para el oral:** "Dentro de SIMD hay dos formas de implementar el paralelismo. Array Processor replica el hardware en el espacio — N procesadores trabajando simultaneo, como el ILLIAC IV. Vector Processor replica en el tiempo — un pipeline profundo por donde los datos fluyen como en el CRAY-1. La misma receta, ingredientes radicalmente distintos. Y tu laptop moderna? Es las dos cosas: MIMD entre cores, SIMD vectorial dentro de cada core."

---

### Nivel de hardware: ILLIAC IV vs CRAY-1

Esto es lo que te preguntan a fondo si querés mostrar que entendés el "como" del paralelismo, no solo el "que".

**Array Processor (estilo ILLIAC IV):**
- N ALUs **identicas** (N copias del mismo circuito en el silicio)
- En cada ciclo, TODAS las N ALUs ejecutan LA MISMA instruccion sobre datos distintos (lockstep)
- Ejemplo concreto: 4 PEs con 4 ALUs de suma. En 1 ciclo las 4 ALUs suman a la vez: 4 sumas en 1 ciclo
- La instruccion PUEDE cambiar ciclo a ciclo (suma → mul → store), pero las N ALUs la cambian juntas
- Cada PE tiene su propio banco de registros y memoria local
- Caracteristica clave: **N circuitos iguales replicados en el chip**

**Vector Processor (estilo CRAY-1):**
- Pocas unidades funcionales, pero **especializadas** y cada una es un pipeline:
  - Vector Add pipeline (FP add segmentado)
  - Vector Multiply pipeline
  - Vector Divide pipeline (mas lento, no totalmente segmentado)
  - Vector Logical pipeline
  - Integer pipeline
  - Load/Store pipeline
- Las unidades pueden trabajar en **paralelo** (sumar y multiplicar a la vez)
- **Vector chaining** (introducido por Seymour Cray en el CRAY-1): la salida del Multiply pipeline entra directo al Add pipeline sin pasar por memoria
- Caracteristica clave: **pocos circuitos especializados, profundos y segmentados**

### Como fluye un pipeline a nivel de hardware

El pipeline vectorial de la diapositiva 2.3 demuestra cómo los datos fluyen a través de etapas en serie (segmentación). A diferencia del Array Processor (donde todos los Processing Elements operan en paralelo en el espacio), el procesador vectorial opera en el **tiempo**:

- **Segmentación:** La unidad funcional (ej. una ALU de suma) se divide en subetapas (ej. alinear exponentes, sumar mantisas, normalizar).
- **Flujo Continuo:** Cada ciclo de reloj, un nuevo par de elementos entra al pipeline, y el resultado de la etapa anterior avanza a la siguiente.
- **Latencia inicial:** El primer elemento tarda $K$ ciclos en salir (siendo $K$ el número de etapas del pipeline).
- **Throughput sostenido:** Una vez lleno el pipeline, sale **1 resultado por ciclo**, logrando un alto rendimiento con muchísimo menos hardware que el Array Processor.

### Comparacion directa a nivel hardware

| Aspecto | Array (ILLIAC IV) | Vector (CRAY-1) |
|---|---|---|
| Cantidad de ALUs | N (64 en ILLIAC IV) | Pocas (~5 unidades especializadas) |
| Tipo de ALU | Identicas (replicas del mismo circuito) | Especializadas (Add, Mul, Div...) |
| Accion por ciclo | TODAS ejecutan MISMO op | Una unidad procesa un elemento distinto cada ciclo |
| Paralelismo | En espacio (N a la vez) | En tiempo (N elementos en pipeline) |
| Hardware | Mucho silicio (N copias del ALU) | Menos silicio, mas complejo por unidad |
| Flexibilidad | Cualquier op en cada PE (cambia por ciclo) | Cada unidad hace UNA cosa bien |
| Costo | Mas caro de fabricar (N ALUs replicadas) | Mas barato (menos unidades) |

### Analogia corta para el oral

**Array Processor** = 4 cocineros, todos con la misma receta. Gritas "¡Corten!" y los 4 cortan a la vez. Gritas "¡Sumen!" y los 4 suman a la vez. Cada uno cocina SU propio plato, pero todos hacen lo mismo en cada paso.

**Vector Processor** = 1 sola cocina organizada en cadena (cortar → hervir → salar → emplatar). El plato 1 tarda 4 minutos en pasar por toda la cadena. PERO al minuto 2, el plato 1 ya esta en "salar" mientras el plato 2 esta en "hervir" y el plato 3 arranco a "cortar". En estado estable, cada minuto sale un plato completo.

### Pregunta típica de examen

> "Si tengo que hacer muchas sumas sobre un vector largo, ¿Array Processor o Vector Processor?"

**Respuesta:**
- Si la operacion es **una sola pasada** sobre pocos datos, **Array** gana: arranca todos los PEs a la vez y entrega el primer resultado en 1 ciclo.
- Si son **muchas sumas en serie** sobre un vector largo, **Vector** gana: una vez lleno el pipeline, produce 1 resultado por ciclo con mucho menos hardware.
- En chips modernos (CPU con AVX-512): **conviven ambos** — MIMD entre cores, SIMD vectorial dentro de cada core, e ILP (superescalar) conviviendo en el mismo die.

---

## 4. Cuando SIMD rinde (y cuando no)

SIMD gana cuando hay **regularidad**: misma operacion sobre datos **independientes** y del **mismo tamano**.

### Condicion de regularidad

Para que SIMD rinda al maximo, los datos tienen que cumplir:

1. **Misma operacion** sobre todos los elementos del vector.
2. **Datos independientes** (sin dependencias entre elementos, no hay que esperar el resultado de otro).
3. **Mismo tamano/tipo** (todos float, todos int, etc.).
4. **Alineados** (stride = 1, consecutivos en memoria).

Si alguna de estas condiciones falla, SIMD se degrada.

### Ejemplo que SI vectoriza perfecto

```c
// SIMD rendira muy bien aca: misma op, sin dependencias, datos alineados
for (i = 0; i < N; i++)
    a[i] = b[i] * 2.0;
```

### Ejemplo que NO vectoriza bien

```c
// SIMD se degrada: operaciones distintas por elemento
for (i = 0; i < N; i++) {
    if (a[i] > 0) b[i] = a[i] + 1;   // op A
    else          b[i] = a[i] * 2;   // op B (distinta)
}
```

**Version para el oral:** "SIMD no es magia que acelera cualquier cosa. Gana cuando hay regularidad: misma operacion, datos independientes, mismo tipo y alineados. Cuando aparecen condiciones, strides no unitarios o dependencias entre elementos, la ventaja se degrada. No es que SIMD sea lento — es que el problema no es SIMD-friendly."

---

---

## 6. Ventajas y desventajas

### Ventajas

- **Throughput xN**: en una sola instruccion procesas N elementos en paralelo en lugar de 1. Si tu loop hace `a[i] = b[i] * 2`, en escalar lo hace en N instrucciones, en SIMD lo hace en N/N instrucciones (osea N veces menos). En la practica, en operaciones regulares, el speedup efectivo suele ser 4x-8x con AVX (256 bits) y 8x-16x con AVX-512 bien usado.
- **Eficiencia energetica**: el costo de control (fetch, decode, issue) se paga UNA vez y se amortiza entre N datos. Comparado con MIMD (donde cada core paga su propio control), SIMD gasta mucha menos energia por operacion. Por eso las GPUs usan modelos SIMD/SIMT: necesitan mover miles de operaciones por watt para que el rendimiento energetico tenga sentido.
- **Menos instrucciones dinamicas**: el procesador emite menos instrucciones en vuelo, lo que reduce presion sobre la cache de instrucciones, el branch predictor, el reorder buffer y las unidades de control. Esto libera recursos para que el resto del programa corra mas holgado, y de hecho tambien ayuda al ILP (Instruction Level Parallelism) del superescalar.

### Desventajas

- **Costo hardware**: necesitas N ALUs simultaneas (en array) o un pipeline ancho (en vector). No es gratis: mas transistores, mas area de silicio, mas consumo. Por eso el CRAY-1 era carisimo: replicar hardware cuesta plata. En chips modernos el area de SIMD es una fraccion significativa del die.
- **Degradacion con divergencia**: cuando distintos elementos del vector necesitan operaciones distintas (divergencia condicional, `if/else` por elemento), el hardware paga el costo de ejecutar ambas ramas y enmascara la mitad — el speedup se evapora. (Este tema lo explica en profundidad **Bermudez Gino** en la **Parte 4**).
- **Complejidad de programacion**: para sacarle el jugo real hay que escribir codigo branchless, usar intrinsics (`_mm256_add_ps`), o reorganizar los datos en estructuras SoA (Structure of Arrays) en lugar de AoS (Array of Structures). El compilador a veces vectoriza solo, pero confiar en eso es pedirle optimizacion al "divino boton" — para codigo serio se hace a mano.

**Version para el oral:** "SIMD te da throughput xN con alta eficiencia energetica porque el costo de control se amortiza entre todos los datos. Pero no es gratis: necesita hardware extra, se degrada con divergencia condicional, y programarlo bien requiere pensar en estructuras SoA y codigo branchless."

---

## 7. Aplicaciones del mundo real
> ⚠️ **Nota:** La explicación detallada de estas aplicaciones y del desglose numérico de instrucciones (304 vs 7) pertenece a la **Parte 4** (Bermudez Gino). En tu Parte 2 solo las mencionás conceptualmente como ejemplos prácticos en la Slide 2.4.

SIMD se usa masivamente donde hay operaciones regulares, repetitivas, sobre grandes volumenes de datos, sin dependencias entre elementos. La regularidad es lo que SIMD necesita para mostrar su ventaja.

| Aplicacion            | Por que SIMD ayuda                                                                                  |
|-----------------------|----------------------------------------------------------------------------------------------------|
| Imagenes y video      | Cada frame es una matriz enorme de pixeles. Un filtro es la misma op sobre millones de pixeles. Codecs como H.264/HEVC, JPEG, filtros de imagen -> SSE/AVX. |
| Machine Learning      | Operacion central de una red neuronal: multiplicacion de matrices (GEMM) y convoluciones. Misma op, muchos datos, sin dependencias. TensorFlow y PyTorch vectorizan automaticamente. |
| Videojuegos           | Transformaciones geometricas (rotar, escalar, proyectar vertices 3D), shading por pixel, fisica de particulas. Las GPUs estan llenas de lanes SIMD justamente para esto. |
| Simulaciones fisicas  | N cuerpos interactuando, operaciones identicas sobre cada uno. Mas cuerpos por ciclo = mayor fidelidad (fluidos, dinamica molecular, clima, particulas). |
| Criptografia          | Operaciones sobre bloques de bytes: AES, SHA, RSA. Misma op sobre muchos bytes -> vectorizable.    |

**Version para el oral:** "SIMD esta en todos lados: cuando procesas una imagen, cuando entrenas una red neuronal, cuando renderizas un videojuego, o cuando cifras datos. Cualquier operacion que sea la misma operacion repetida sobre millones de datos independientes se beneficia de SIMD."

---

## 8. Ejercicios de practica

Responde en voz alta (o escribi tu respuesta) antes de mirar la solucion. Esto es lo que mas te prepara para preguntas en vivo.

### Ejercicio 1: ¿Este loop vectoriza?

```c
// CASO A
for (int i = 0; i < N; i++)
    c[i] = a[i] + b[i];       // suma de arrays

// CASO B
for (int i = 0; i < N; i++)
    c[i] = a[i] * c[i-1];     // dependencia entre elementos

// CASO C
for (int i = 0; i < N; i++) {
    if (a[i] > 0)
        b[i] = sin(a[i]);     // funcion compleja
    else
        b[i] = 0;
}
```

**Pregunta:** ¿Cuales vectorizan bien y cuales no? ¿Por que?

<details>
<summary>Respuesta (intentalo primero)</summary>

- **CASO A**: Vectoriza perfecto. Misma operacion (+), datos independientes, mismo tipo, stride=1.
- **CASO B**: NO vectoriza. Cada iteracion depende del resultado anterior (`c[i-1]`). Hay una dependencia de datos que impide el paralelismo.
- **CASO C**: Vectoriza pero con `if/else` que fuerza a ejecutar ambas ramas y enmascarar. El `sin()` ademas es una funcion costosa que se paga doble. Speedup efectivo bajo. (Este tema de divergencia condicional y enmascaramiento lo explica Gino en la **Parte 4**).
</details>

### Ejercicio 2: Array vs Vector — Latencia y Throughput

Procesar un array de 100 elementos con la operacion `a[i] = a[i] * 2 + 5`:
- **Array Processor** con 10 PEs: ¿cuantos ciclos hasta el primer resultado? ¿Cuantos hasta el ultimo?
- **Vector Processor** con pipeline de 4 etapas: ¿cuantos ciclos hasta el primer resultado? ¿Cuantos hasta el resultado 100?
- ¿Cual tiene **latencia** de arranque mas baja? ¿Y cual tiene **throughput** sostenido mas alto?

<details>
<summary>Respuesta (intentalo primero)</summary>

- **Array** (10 PEs): primer resultado en **1 ciclo** (todos los PEs arrancan en lockstep). Ultimo resultado en **10 ciclos** (100/10). Latencia baja, hardware caro.
- **Vector** (pipeline de 4 etapas): primer resultado en **4 ciclos** (hay que llenar el pipeline). Luego 1 resultado por ciclo. Ultimo resultado en **4 + 96 = 100 ciclos**. Latencia alta, hardware barato.
- **Throughput sostenido**: una vez estable, ambos producen 1 resultado por ciclo. Mismo throughput, distinta inversion de hardware.
</details>

### Ejercicio 3: Clasifica segun Flynn

Decis si cada caso es SISD, SIMD, o MIMD:

1. Un CPU de 4 cores ejecutando 4 programas distintos.
2. Una instruccion `_mm256_add_ps` en un core con AVX2.
3. Un loop escalar `for(i=0;i<N;i++) a[i]++` sin vectorizar.
4. Una GPU ejecutando el mismo shader sobre 1000 pixeles.

<details>
<summary>Respuesta (intentalo primero)</summary>

1. **MIMD** — cada core ejecuta su propio flujo de instrucciones.
2. **SIMD** — una instruccion opera sobre 8 floats en paralelo.
3. **SISD** — una instruccion por vez, un dato por vez.
4. **SIMD** (o SIMT) — misma instruccion, muchos datos. Es SIMD por abajo.
</details>

### Ejercicio 4: Array vs Vector Processor

Un problema requiere procesar 100 elementos con la misma operacion. Compara:

- **Array Processor** con 10 PEs: ¿cuantos ciclos minimo si cada operacion tarda 1 ciclo por PE?
- **Vector Processor** con un pipeline de 5 etapas: ¿cuantos ciclos hasta el primer resultado? ¿Cuantos hasta el resultado 100?

<details>
<summary>Respuesta (intentalo primero)</summary>

- **Array**: 10 PEs -> 100/10 = 10 ciclos. Todos arrancan juntos, latencia del primero = 1 ciclo.
- **Vector**: pipeline de 5 etapas -> primer resultado en 5 ciclos (llenado del pipeline). Luego 1 resultado por ciclo. Resultado 100 en 5 + 99 = 104 ciclos. Pero el hardware es mucho mas simple.
</details>

---

## 9. Tips para el oral

1. **Si te trabas, volve a una analogia.** La del restaurant (Array vs Vector) o la del comandante/escuadrón (definicion de SIMD). Las analogias te desbloquean en vivo.

2. **Si te preguntan algo que no sabes, no inventes.** Decí *"no estoy seguro pero lo relacionaria con..."* y conecta con lo que si sabes. Eso muestra que pensas, no que memorizaste.

3. **Mapa mental como red de seguridad.** Si te preguntan algo especifico, ubica donde cae en el mapa y explica desde ahi.

4. **Nombra los conceptos tecnicos clave**: SISD, SIMD, MIMD, DLP, TLP, VLEN, VSTR, VMASK, ILLIAC IV, CRAY-1. Aunque no los explayes todos, que aparezcan en tu explicacion muestra nivel.

5. **Si el tiempo te queda corto, no corras.** Mejor cerrar bien una idea (la kryptonita, por ejemplo) que pasar de largo por todo.

---

## 10. Auto-checklist de preguntas

Responde en voz alta, como si estuvieras frente al profesor. Si te trabas en alguna, volve a la seccion correspondiente.

### Pregunta 1: SIMD vs MIMD
>
> "Que diferencia a SIMD de tener N cores corriendo en paralelo?"

**Respuesta esperada:** MIMD replica unidades de control (cada procesador hace lo que quiere, paralelismo a nivel de hilo). SIMD replica unidades funcionales pero comparte el control (todos hacen lo mismo al mismo tiempo, paralelismo a nivel de dato). Por eso SIMD gasta menos en fetch/decode: ese costo se paga una vez y se amortiza en N datos.

### Pregunta 2: Array vs Vector Processor
>
> "Que diferencia hay entre un Array Processor y un Vector Processor? Ambos hacen SIMD."

**Respuesta esperada:** Ambos son SIMD, pero la diferencia esta en **como** paralelizan. El Array Processor replica el hardware en el **espacio** (N unidades de procesamiento trabajando en paralelo simultaneo, ejemplo ILLIAC IV). El Vector Processor lo replica en el **tiempo** (un pipeline profundo por donde los elementos pasan en ciclos consecutivos, ejemplo CRAY-1). Mismo resultado, distinta implementacion: array tiene mas hardware, vector tiene menos hardware pero latencia inicial mayor.

### Pregunta 3: SIMD siempre es mas rapido?
>
> "SIMD siempre es mas rapido que escalar?"

**Respuesta esperada:** No. SIMD gana cuando hay regularidad: misma operacion sobre datos independientes, del mismo tamano y alineados. Cuando los datos exigen operaciones distintas por elemento (divergencia condicional), el hardware tiene que ejecutar ambos caminos y enmascarar, y se pierde la ventaja. Tambien se degrada con datos no alineados o stride != 1.

### Pregunta 4: Array vs Vector en la practica
>
> "Tengo una operacion que aplica la misma formula a todos los elementos: ¿Array Processor o Vector Processor me conviene?"

**Respuesta esperada:** Si tenes un problema pequeno y puntual donde la latencia de arranque importa, **Array Processor** gana: arranca todos los PEs a la vez y entrega el primer resultado en 1 ciclo. Si tenes un loop largo sobre muchos elementos donde lo que importa es el **throughput sostenido**, **Vector Processor** gana: una vez lleno el pipeline, produce 1 resultado por ciclo con mucho menos hardware. En chips modernos, ambos conviven: MIMD entre cores (cada core ejecuta cosas distintas) y SIMD dentro de cada core (lanes vectoriales).

### Pregunta 5: Aplicaciones del mundo real
>
> "Donde se usa SIMD en la practica? Dame 2 o 3 ejemplos y explica por que."

**Respuesta esperada:** Imagenes y video (codecs, filtros), machine learning (multiplicacion de matrices, convoluciones), videojuegos (transformaciones geometricas, shading), simulaciones fisicas (N cuerpos, fluidos). En todos: operaciones regulares, repetitivas, sobre grandes volumenes de datos sin dependencias. Esa regularidad es lo que SIMD necesita para mostrar ventaja.

---

## 11. Conceptos que suelen confundirse con SIMD

Estas tres preguntas caen seguido. Si las tenes claras, descolocas al profesor.

### SIMD vs CPU superescalar / Out-of-Order

Un superescalar moderno (cualquier Intel/AMD actual) emite VARIAS instrucciones por ciclo. **Pero son instrucciones DISTINTAS** (ej: un ADD, un MUL, un LOAD en paralelo), no la misma sobre datos distintos.

|                  | Superescalar                              | SIMD                                              |
|------------------|-------------------------------------------|---------------------------------------------------|
| Que ejecuta      | Instrucciones DISTINTAS en paralelo       | La MISMA instruccion sobre N datos                |
| Donde paraleliza | Pipeline (ILP - Instruction Level Par.)   | Datos (DLP)                                       |
| Ejemplo          | `a = b + c` y `d = e * f` al mismo ciclo | `a[0..N] = b[0..N] + c[0..N]` en una sola op     |

**Clave para el oral:** "Superescalar paraleliza INSTRUCCIONES distintas. SIMD paraleliza DATOS con la misma instruccion. Por eso un CPU moderno es las dos cosas: superescalar (ILP) y SIMD (DLP) conviviendo en el mismo core."

### SIMT en GPUs (Single Instruction, Multiple Threads)
> ⚠️ **Nota:** Este tema corresponde a la **Parte 3 / 4** (Alejandro Andy / Gino). No entra en tu exposición de la Parte 2.

Las GPUs usan una variante llamada **SIMT**: misma instruccion, multiples threads.

- En SIMD puro: 1 thread emite la instruccion, N lanes la ejecutan.
- En SIMT: N threads independientes ejecutan la misma instruccion en paralelo, cada uno con sus propios registros.
- Practicamente el hardware es parecido (lanes SIMD), pero el modelo de programacion es "como si fueran threads" (CUDA, OpenCL).

**Por que importa:** si te preguntan "las GPUs son SIMD?", la respuesta honesta es **SIMD por abajo, SIMT por arriba**. El programador de GPU piensa en threads, pero el hardware realmente ejecuta lanes SIMD.

### FMA — Fused Multiply-Add
> ⚠️ **Nota:** Este tema corresponde a la **Parte 3** (Alejandro Andy). No entra en tu exposición de la Parte 2.

Es una instruccion compuesta: hace `a*b + c` en un solo ciclo, sin redondeo intermedio.

- Aparece en **AVX2** (como `VFMADD231PS`) y masivamente en **AVX-512**.
- Es CLAVE en machine learning: una neurona es `activation(w*x + b)` — un FMA hace exactamente eso en hardware.
- En benchmarks de BLAS (multiplicacion de matrices), FMA es lo que hace que la diferencia entre escalar y vectorial sea 8x-16x en lugar de 4x.

---

## 12. Errores comunes en el oral (que NO decir)

Lista de frases-concepto que estan MAL y te pueden preguntar para ver si las detectas:

- **NO** decir "SIMD es cuando hay varios cores". Eso es MIMD.
- **NO** decir "SIMD siempre es mas rapido". Ya visto: depende de la regularidad.
- **NO** decir "SIMD = GPU". Las GPUs son SIMD/SIMT, pero SIMD tambien vive en cualquier CPU moderno (SSE, AVX).
- **NO** confundir SIMD con multithreading. SIMD = mismo thread, N datos. Multithreading = N threads, cada uno con su flujo.
- **NO** decir "CRAY-1 era un Array Processor". CRAY-1 es Vector Processor. El Array Processor clasico es ILLIAC IV.
- **NO** decir "el branch predictor rompe SIMD". El branch predictor es para saltos en el flujo de control, no para condicionales dentro de vectores. La kryptonita de SIMD es el `if` por elemento, otra cosa.

Regla de oro: si una frase suena a "SIMD = muchas cosas funcionando a la vez", probablemente es MIMD o multithreading, no SIMD. SIMD es **una sola cosa aplicada a muchos datos a la vez**.

---

## 13. Cheat sheet para repaso 5 minutos antes del oral

**SIMD en una linea:** una instruccion, N datos, N ALUs en paralelo. El costo de control se paga una vez.

**Diferencia clave SIMD vs MIMD:** SIMD replica **datos**, MIMD replica **control** (unidades de control independientes).

**Array vs Vector:** Array = N PEs simultaneos (paralelismo en ESPACIO, ILLIAC IV). Vector = 1 pipeline por donde pasan los elementos (paralelismo en TIEMPO, CRAY-1).

**Registros x86:** XMM=128b (4 floats), YMM=256b (8 floats), ZMM=512b (16 floats). Crecieron SSE -> AVX -> AVX-512.

**Control:** VLEN (cuantos activos), VSTR (stride), VMASK (que lanes escriben).

**Cuando rinde:** misma op + datos independientes + mismo tipo + alineados (stride=1).

**Ventajas:** throughput xN, eficiencia energetica, menos instrucciones dinamicas.

**Desventajas:** hardware extra, degradacion con divergencia, programacion branchless/intrinsics.

**Aplicaciones:** imagenes/video, ML (matrices, convoluciones), videojuegos, simulaciones N-cuerpos, criptografia.

**Nombres que suman puntos:** Flynn, SISD/SIMD/MIMD, DLP/TLP, CRAY-1, ILLIAC IV, FMA, SIMT.

**Analogias de rescate:** comandante+escuadron (definicion), restaurant Array vs Vector (dos formas).

---

## Glosario rapido

| Termino  | Significado                                                                          |
|----------|--------------------------------------------------------------------------------------|
| **SIMD** | Single Instruction, Multiple Data. Una instruccion, N datos.                         |
| **SISD** | Single Instruction, Single Data. El procesador escalar clasico.                      |
| **MIMD** | Multiple Instruction, Multiple Data. Cada procesador hace lo suyo.                   |
| **DLP**  | Data Level Parallelism. Paralelismo a nivel de dato (es SIMD).                       |
| **TLP**  | Thread Level Parallelism. Paralelismo a nivel de hilo (es MIMD).                     |
| **XMM**  | Registro SIMD de 128 bits (SSE). Almacena 4 floats.                                  |
| **YMM**  | Registro SIMD de 256 bits (AVX). Almacena 8 floats.                                  |
| **ZMM**  | Registro SIMD de 512 bits (AVX-512). Almacena 16 floats.                             |
| **VLEN** | Vector Length. Cantidad de elementos activos en el vector.                           |
| **VSTR** | Vector Stride. Distancia entre elementos consecutivos en memoria.                    |
| **VMASK**| Vector Mask. Predicado por elemento: que lanes escriben y cuales no.                 |
| **PE**   | Processing Element. Una unidad de procesamiento (en array processors).                |
| **CRAY-1** | Ejemplo clasico de Vector Processor (1976, Seymour Cray).                         |
| **ILLIAC IV** | Ejemplo clasico de Array Processor (anios 60, 64 PEs).                        |

---

## Conexion con el resto de la exposicion

La Parte 2 es **conceptual**: define que es SIMD, como se implementa, cuando rinde, y cuando se degrada. Las partes que siguen (3 y 4) probablemente bajan a implementaciones concretas:

- **Parte 3** (segun el material): instrucciones multimedia, AVX en detalle, GPUs.
- **Parte 4**: probablemente extensiones mas nuevas, optimizaciones, o aplicaciones especificas.

Si en el oral te preguntan algo de las partes 3 o 4, podes pararte en lo que viste aca y decir: *"Eso es implementacion concreta de lo que vimos en la parte 2, donde..."*. Eso muestra que entendiste el marco general, no solo tu parte aislada.
