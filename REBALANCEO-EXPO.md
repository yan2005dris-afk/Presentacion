# Rebalanceo de la Exposición — Estadística Inferencial

**Deck**: `src/deckStats.jsx` · **Estado**: 26 slides · ≈ 47 min · 5 ponentes + equipo
**Rama**: `brydyan/expo-nivel-significancia-p-valor` · **Verificación**: `node scripts/verify-deck.mjs`

Este documento es el que le faltaba al equipo. Dice, sin ambigüedad, **qué expone cada uno, cuánto
tiempo lleva y qué le falta** para llegar al objetivo del sílabo. Las reorganizaciones son
**aditivas**: no se ha editado el contenido de ninguna slide de Said, Yandris, Alisson o Gino.

---

## 1. La estructura: cuatro bloques, no seis secciones

El deck ya no es una lista de seis temas sueltos. Son cuatro preguntas que se contestan en orden:

| Bloque | Pregunta que contesta | Secciones | Quién |
|---|---|---|---|
| **A · Describir** | ¿Qué comportamiento tiene el dato? | P1 Said · P2 Yandris · P3 Alisson | Said, Yandris, Alisson |
| **B · Afirmar** | ¿Qué sabemos del parámetro real? | P4 | Gino |
| **C · Decidir** | ¿El efecto es real o es ruido? | P5 | Andy |
| **D · Usar** | ¿Qué hago con esa decisión en software? | P6 | Equipo (contrastes, aplicaciones, cierre) |

**Apertura** (P0): portada, agenda y **qué es la estadística inferencial** — el marco que antes
faltaba y que obligaba a Andy a explicar H₀/H₁ desde cero.

**El bloque de Andy no se disuelve: es la bisagra.** Es el único bloque del sílabo que describe una
*función* — el criterio estadístico para validar resultados en software — y no una distribución. Por
eso entrega el bloque al equipo en el contraste de hipótesis.

### Mapa de cobertura (a confirmar con la cátedra)

> El sílabo original no está en el repo. Si en la cátedra **«Estadística Inferencial (concepto)» es un
> ítem numerado y no un encabezado**, la slide `stats-0.2` lo cubre y hay que asignarle dueño.
> Si es solo un encabezado, esa slide es opcional y se puede incorporar a `stats-5.0`.

| Ítem del sílabo | Bloque | Estado |
|---|---|---|
| Concepto de inferencia (población / muestra / error de muestreo) | Apertura | ✅ `stats-0.2` (listo, sin dueño) |
| Distribuciones de probabilidad, Poisson, colas | A | ✅ Said (2 slides) |
| Distribución normal, campana, Z-score, regla 68-95-99.7 | A | ✅ Yandris (3 slides) |
| Teorema del límite central | A | ⚠️ Alisson (1 slide) — ver §3 |
| Margen de error e intervalos de confianza | B | ⚠️ Gino (1 slide) — ver §3 |
| Nivel de significancia (α) y p-valor, criterio en software | C | ✅ Andy (7 slides) |
| Contraste de hipótesis (T-test, ANOVA, χ²) | D | ✅ Equipo (`stats-6.0`) |
| Aplicaciones y cierre | D | ✅ Equipo (`stats-6.1`, `stats-6.2`) |

---

## 2. Estructura actual del deck

| # | Bloque | Sección | Expositor | Slides | ≈ min | ids |
|---|---|---|---|---|---|---|
| 0 | Apertura | P0 Portada e Índice | Grupo 3 y 4 | 3 | 4 | `stats-0.0` … `stats-0.2` |
| 1 | A · Describir | P1 Distribuciones & Poisson | Said | 3 | 5 | `stats-1.h`, `stats-1.0`, `stats-1.1` |
| 2 | A · Describir | P2 Normal & Gauss | Yandris | 4 | 6 | `stats-2.h`, `stats-2.0` … `stats-2.2` |
| 3 | A · Describir | P3 TLC | Alisson | 2 | 4 | `stats-3.h`, `stats-3.0` |
| 4 | B · Afirmar | P4 Intervalos | Gino | 2 | 4 | `stats-4.h`, `stats-4.0` |
| 5 | C · Decidir | P5 α y p-valor | Andy | 8 | 18 | `stats-5.h`, `stats-5.0` … `stats-5.6` |
| 6 | D · Usar | P6 Contraste, aplicaciones, cierre | Grupo 3 y 4 | 4 | 6 | `stats-6.h`, `stats-6.0` … `stats-6.2` |

Cada sección empieza con un **handoff** (`*.h`): cabecera con el bloque, el expositor, los títulos de
su sección, qué deja y a dónde pasa. Es la plantilla `src/slides2/SlideIntroSeccion.jsx` — **nueva**,
y cada expositor puede instanciarla con sus propios textos.

**Tope por ponente: 20 min.** Hoy el máximo es el de Andy (18 min, con el handoff incluido).

---

## 3. Qué le toca a cada uno

> Las cifras de la izquierda son de las slides **de contenido** (sin contar el handoff).

### Said — 2 slides → objetivo 3
**Ya cubre**: qué es una distribución · histórico vs predictivo · discretas (enteros y contables) vs
continuas (rango infinito) · Poisson con λ, flujo normal, riesgo de cola y capacidad máxima.
**Lo que le falta** (1 slide):
- **La binomial con fórmula e interpretación** — hoy solo se nombra junto a Poisson, sin P(X = k).
- **La aproximación Poisson → Normal**, que es el puente natural hacia el bloque de Yandris: una
 Requests/s con λ = 30 ya es normal, y eso justifica el TLC de Alisson.

### Yandris — 3 slides → objetivo 3 ✅
**Ya cubre**: μ y σ · la anatomía de la fórmula con código Python · franjas ±1σ/±2σ/±3σ y formas de
campana · el caso real `POST /api/v1/users` con suma de demoras y Z-score contra el SLA.
**Le falta**: nada obligatorio. *Opcional*: una slide de percentiles y tabla de valores Z.

### Alisson — 1 slide → objetivo 3
**Ya cubre**: el TLC, el error estándar σ/√n y el caso e-commerce con n ≥ 30.
**Lo que le falta** (2 slides):
- **Las 4 condiciones del TLC, una por una y verificables.** Hoy se mencionan de pasada: no se puede
  decir «se cumple el TLC» sin poder señalar las cuatro.
- **Por qué n ≥ 30 y no n ≥ 10**: la demonstración con la binomial (la media de la binomial se parece
  a la normal cuando n·p·q es grande). Es la pieza que conecta su bloque con el de Poisson.

### Gino — 1 slide → objetivo 3
**Ya cubre**: la fórmula de construcción `IC = x̄ ± Z(α/2) · σ/√n` · el 95 % vs el 99 % · la
interpretación frecuente correcta · la falacia clásica.
**Lo que le falta** (2 slides):
- **El error estándar y el papel de n**: por qué 100 personas dan un margen de error y 10.000 dan otro
  (el denominador √n es lo que cambia todo). Sin esto, el bloque B es una fórmula sin intuición.
- **Un caso con números de punta a punta**, del estilo del que hizo Yandris con `POST /users`.

### Andy — 7 slides → objetivo 7 ✅
**Ya cubre**: α · p-valor · regla de decisión · trampas · criterio automatizado en código, con 5
visuales calculados en vivo (banda de 100 marcas, inset de 20 monedas, matriz 2×2, control de
calidad, slider de n) y dos dominios (e-commerce y control de calidad). Guion en
`src/slides2/GUION-T05.md`.
**Cifras en pantalla, todas verificadas**: 0.0211 · 0.0207 · 0.2587 · z 1.96/2.576/3.29 · poder 66.5 % ·
n ≈ 5.519 · 64.15 %.

### Grupo 3 y 4 — bloque coral
Contrastes (T-test, ANOVA, χ²), aplicaciones (A/B testing, feature selection, pipelines) y cierre.
**Lo que hace falta**: que **cada bloque deje un caso para el coral**. Said deja Poisson en colas,
Yandris deja la normal, Alisson deja el TLC, Gino deja los intervalos y Andy deja el criterio de
decisión. El contraste se arma con esos cinco.

---

## 4. Decisiones pendientes

| # | Decisión | Estado |
|---|---|---|
| 1 | ¿«Estadística Inferencial (concepto)» es encabezado o ítem del sílabo? | **A confirmar con la cátedra.** La slide `stats-0.2` está lista en la apertura. Si nadie la expone, Andy la integra en `stats-5.0`. |
| 2 | ¿Quién expone `stats-0.2`? | Sin dueño. Grupo 3 y 4 es lo natural. |
| 3 | ¿Dónde vive el guion? | Resuelto: `src/slides2/GUION-T05.md` (versionado, junto al código). `docs/` está en `.gitignore` y no viajaba con la rama. |
| 4 | ¿Cierre aparte o fusionado con la de software? | **Aparte** (`stats-5.6`, ≈ 1:30). Si al ensayo se pasa de 18 min, se fusiona como panel en `stats-5.5`. |
| 5 | ¿Cuántas slides añade cada compañero? | Decisión de cada uno. Lo que falta está en §3, slide por slide. |
| 6 | Ruido visual del inset de monedas | Resuelto: se ve bien en pantalla y no satura. |

---

## 5. Plantilla de guion (house style)

El equipo usa este formato. El guion de T05 lo sigue entero y conserva la **pista dual**:

```markdown
## Slide 5.3 — La Regla de Decisión: p ≤ α

### Título
"La regla de decisión: p ≤ α"

### Lo que ves en la slide
- **V3 · la matriz 2×2 como diagrama**: eje X = decisión, eje Y = realidad, con α y β en vivo.
- **Regla universal**: p ≤ α ⟹ rechazar H₀ · p > α ⟹ evidencia insuficiente.
- **V4 · control de calidad**: 1.000 piezas, 25 defectuosas → p = 0.2587 → no rechazamos.
- **Nota del especialista** al pie.

### Qué decir (guión)

**Intro**: "Y ahora la regla, que es una línea: si el p-valor es menor o igual que alpha, rechazamos H₀."

**La matriz**: "Dos filas: lo que era verdad y lo que no era. Dos columnas: lo que decidimos."

**El otro lado**: "No rechazar H₀ **no es** aceptar H₀. Es no tener evidencia suficiente."

### Para el especialista
"No rechazar H₀" no es "aceptar H₀": es ausencia de evidencia, no evidencia de igualdad.

### Cifras de esta slide
p = 0.0211 vs α = 0.05 · β = 33.5 % (n = 4.000) · control de calidad: z = 1.1294, p = 0.2587
```

Reglas de la casa:

- **Un solo trabajo por slide.** Si una slide carga dos ideas, se parte.
- **La pista dual es obligatoria**: la franja «Para el especialista» con la nota técnica en 1–3 líneas.
- **Sin tildes en el drawer `[HABLAR] Guión`** (se leen mal en esa tipografía).
- **Las cifras se verifican antes** y no se recalculan en el escenario.
- **Una idea, un visual, una cifra, una decisión.** Un visual sin número ni decisión es decoración.

---

## 6. Cómo verificar

```bash
npm run build
npx vite preview --port 4173 --strictPort     # en otra terminal
node scripts/verify-deck.mjs
```

El script comprueba, sobre el deck renderizado:

- las **7 slides de Andy** en orden, con sus títulos exactos, más su handoff;
- los **6 handoffs** y la slide de apertura;
- **desborde vertical** en las 26 slides (tope 694 px de contenido);
- las **cifras clave** renderizadas (0.0211 · 0.0207 · 0.2587 · z 1.96/2.576/3.29 · 66.5 % ·
  5.519 · 64.15 %);
- **0 errores de consola**.

Si una slide de esta rama desborda, es **fallo**. Si desborda una slide de otro bloque, es **aviso**:
hoy avisa de dos y ambos son del equipo:

- `stats-3.0` «Teorema del Límite Central (TLC)» — ≈ 840 px (desborde ≈ 142 px)
- `stats-6.0` «Contraste de Hipótesis: Comparación entre Grupos» — ≈ 780 px (desborde ≈ 81 px)

Se arreglan con padding, sin tocar una palabra del contenido.

---

## 7. Lo que no se toca

| # | No se toca | Por qué |
|---|---|---|
| D1 | El deck SIMD (`src/slides/`) | No pertenece a esta exposición |
| D2 | El contenido de las slides de Said, Yandris, Alisson y Gino | Es su material y lo están editando; el rebalanceo se hace con piezas aditivas |
| D3 | `SlideHipotesisPValor` | Se conserva como respaldo; su contenido quedó repartido |
| D4 | Dependencias (`recharts`, `d3`, …) | Todo SVG a mano, como el resto del deck |
| D5 | `informacionT05.md` y `contexto.md` | Solo las correcciones ya aplicadas |
