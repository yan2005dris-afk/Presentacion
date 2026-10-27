# Rebalanceo de la Exposición — Estadística Inferencial

**Deck**: `src/decks/stats/deck.jsx` (registro en `src/decks/registry.js`) · **Estado**: 35 slides · ≈ 60 min
**Verificación**: `node scripts/verify-deck.mjs`

> Este documento se había borrado junto con el resto del `.md` de la raíz en el commit *«eliminar
> documentación»*. Se restaura aquí, junto a `GUION-T05.md`, que es donde el equipo **no** ha tocado
> la documentación del deck de Inferencia. Si la limpieza de la raíz fue intencional y no quieres
> este archivo en el repo, se borra sin tocar nada más: la información está en el deck.

Cada bloque del sílabo contesta una pregunta distinta, y el deck las recorre en ese orden:

| Bloque | Pregunta que contesta | Sección | Expositor | Slides | ≈ min |
|---|---|---|---|---|---|
| **Apertura** | ¿De qué estamos hablando? | P0 | Grupo 3 y 4 | 3 | 4 |
| **A · Describir** | ¿Qué comportamiento tiene el dato? | P1 | Said | 3 | 5 |
| | | P2 | Yandris | 4 | 6 |
| | | P3 | Alisson | 9 | 14 |
| **B · Afirmar** | ¿Qué sabemos del parámetro real? | P4 | Gino | 4 | 7 |
| **C · Decidir** | ¿El efecto es real o es ruido? | P5 | Andy | 8 | 18 |
| **D · Usar** | ¿Qué hago con esa decisión en software? | P6 | Grupo 3 y 4 | 4 | 6 |

**Total ≈ 60 min · tope por ponente 20 min** (el máximo es Andy, 18 min con handoff incluido).

Cada sección abre con un **handoff** (`stats-N.h`): cabecera con el bloque, el expositor, los títulos
de su sección, qué deja y a dónde pasa. Plantilla en `src/slides2/SlideIntroSeccion.jsx`.

**El bloque de Andy no se disuelve: es la bisagra.** Es el único bloque del sílabo que describe una
*función* — el criterio estadístico para validar resultados en software — y no una distribución. Por
eso entrega el bloque al equipo en el contraste de hipótesis (`stats-6.0`).

---

## 1. Mapa de cobertura del sílabo

| Ítem del sílabo | Bloque | Estado | Dónde |
|---|---|---|---|
| Concepto de inferencia (población / muestra / error de muestreo) | Apertura | ✅ | `stats-0.2` — **sin dueño**, lo expone el grupo de apertura |
| Distribuciones de probabilidad, binomial, Poisson, colas | A | ✅ | Said · `stats-1.0` (variables discretas, binomial) + `stats-1.1` (Poisson y dengue) |
| Distribución normal, campana, Z-score, regla 68-95-99.7 | A | ✅ | Yandris · `stats-2.0` … `stats-2.2` |
| Teorema del límite central | A | ✅ | Alisson · `stats-3.0` … `stats-3.7` (8 slides) |
| Margen de error e intervalos de confianza | B | ✅ | Gino · `stats-4.0` … `stats-4.2` |
| Nivel de significancia (α) y p-valor, criterio en software | C | ✅ | Andy · `stats-5.0` … `stats-5.6` (7 slides) |
| Contraste de hipótesis (T-test, ANOVA, χ²) | D | ✅ | Equipo · `stats-6.0` |
| Aplicaciones y cierre | D | ✅ | Equipo · `stats-6.1`, `stats-6.2` |

**Pendiente de confirmar con la cátedra**: si *«Estadística Inferencial (concepto)»* es un ítem
numerado del sílabo o solo el encabezado del bloque. Si es ítem, `stats-0.2` lo cubre y hay que
asignarle dueño; si es encabezado, la slide es opcional y se puede incorporar a `stats-5.0`.

---

## 2. Qué entregó cada uno

El objetivo del sílabo era que ningún bloque quedara con una sola slide. **El reparto se cerró:**

### Said — 2 slides de contenido
- **Distribuciones de Probabilidad & Variables Discretas**: qué es una distribución, discreto vs
  continuo, y la **binomial** con su interpretación.
- **Poisson & Gestión de Colas: Dengue en Santa Elena**: λ, flujo, riesgo de cola, capacidad máxima,
  con un caso real de epidemiology.

### Yandris — 3 slides de contenido
- Anatomía de la normal (μ, σ) con código Python · las franjas ±1σ/±2σ/±3σ y las formas de campana ·
- caso real `POST /api/v1/users` con la suma de demoras, Z-score contra el SLA y rate limiting.

### Alisson — 8 slides de contenido
- El TLC y su error estándar σ/√n · **condiciones de aplicación** · **propiedades matemáticas** ·
- por qué importa en la práctica · **caso de latencia de un microservicio (API REST)** ·
- **paso a paso del TLC al valor Z** y el cálculo con la tabla Z · conclusión: ¿azar o degradación?

### Gino — 3 slides de contenido
- Construcción del IC (95 % vs 99 %) con la fórmula · **el papel de n y simulación de muestreo** ·
- **caso real de software: SLA de microservicios**.

### Andy — 7 slides de contenido
- α · p-valor · regla de decisión · las cuatro trampas · criterio automatizado en código, con
  **5 visuales calculados en vivo** (banda de 100 marcas, inset de 20 monedas, matriz 2×2, control
  de calidad, slider de n) y **dos dominios** (e-commerce y control de calidad).
- Guion en `src/slides2/GUION-T05.md` · cifras en pantalla, todas verificadas: 0.0211 · 0.0207 ·
  0.2587 · z 1.96/2.576/3.29 · poder 66.5 % · n ≈ 5.519 · 64.15 %.

### Grupo 3 y 4 — bloque coral
Contraste de hipótesis (T-test, ANOVA, χ²) · aplicaciones (A/B testing, feature selection,
pipelines) · síntesis y cierre.

---

## 3. Decisiones pendientes

| # | Decisión | Estado |
|---|---|---|
| 1 | ¿Quién expone `stats-0.2` (la apertura del deck)? | **Sin dueño.** Lo natural: Grupo 3 y 4. Si nadie la toma, Andy la integra en `stats-5.0`. |
| 2 | ¿«Estadística Inferencial (concepto)» es ítem del sílabo o encabezado? | **A confirmar con la cátedra** (ver §1). |
| 3 | ¿Dónde vive el guion? | Resuelto: `src/slides2/GUION-T05.md`, versionado junto al código. `docs/` está en `.gitignore` y no viajaba con la rama. |
| 4 | ¿Cierre aparte o fusionado con la de software? | **Aparte** (`stats-5.6`, ≈ 1:30). Si al ensayo se pasa de 18 min, se fusiona como panel en `stats-5.5`. |
| 5 | ¿Cuántas slides añade cada compañero? | **Resuelto** (§2). El objetivo era 3 por bloque y el reparto está completo. |
| 6 | Desborde de `stats-6.0` (Contraste) | 33 px. Se arregla con padding, sin tocar el texto. |

---

## 4. Plantilla de guion (house style)

El guion de T05 lo sigue entero y conserva la **pista dual**:

```markdown
## Slide 5.3 — La Regla de Decisión: p ≤ α

### Título
"La regla de decisión: p ≤ α"

### Lo que ves en la slide
- **V3 · la matriz 2×2 como diagrama**: eje X = decisión, eje Y = realidad, con α y β en vivo.
- **Regla universal**: p ≤ α ⟹ rechazar H₀ · p > α ⟹ evidencia insuficiente.
- **V4 · control de calidad**: 1.000 piezas, 25 defectuosas → p = 0.2587 → no rechazamos.
- **Nota del especialista** al pie.

### Qué decir (guion)

**Intro**: "Y ahora la regla, que es una línea: si el p-valor es menor o igual que alpha, rechazamos H₀."

**La matriz**: "Dos filas: lo que era verdad y lo que no era. Dos columnas: lo que decidimos."

**El otro lado**: "No rechazar H₀ **no es** aceptar H₀. Es no tener evidencia suficiente."

### Para el especialista
"No rechazar H₀" no es "aceptar H₀": es ausencia de evidencia, no evidencia de igualdad.

### Cifras de esta slide
p = 0.0211 vs α = 0.05 · β = 33.5 % (n = 4.000) · control de calidad: z = 1.1294, p = 0.2587

### Trampa
«No significativo = no hay diferencia» → falso. Es «no tengo poder para detectarla».
```

Reglas de la casa:

- **Un solo trabajo por slide.** Si una slide carga dos ideas, se parte.
- **La pista dual es obligatoria**: la franja «Para el especialista» con la nota técnica en 1–3 líneas.
- **Sin tildes en el drawer `[HABLAR] Guión`** (se leen mal en esa tipografía).
- **Las cifras se verifican antes** y no se recalculan en el escenario.
- **Una idea, un visual, una cifra, una decisión.** Un visual sin número ni decisión es decoración.
- **El bloque «Trampa»** por slide: el error concreto que no hay que cometer.

---

## 5. Cómo verificar

```bash
npm run build
npx vite preview --port 4173 --strictPort     # en otra terminal
node scripts/verify-deck.mjs
```

El script comprueba, sobre el deck renderizado:

- las **7 slides de Andy** en orden, con sus títulos exactos, más su handoff;
- los **6 handoffs** y la slide de apertura;
- **desborde vertical** en las 35 slides (tope 694 px de contenido);
- las **9 cifras clave** renderizadas (0.0211 · 0.0207 · 0.2587 · z 1.96/2.576/3.29 · 66.5 % ·
  5.519 · 64.15 %);
- **0 errores de consola**.

Si una slide de esta rama desborda, es **fallo**. Si desborda una slide de otro bloque, es **aviso**:
hoy avisa de uno, y es del bloque coral:

- `stats-6.0` «Contraste de Hipótesis: Comparación entre Grupos» — ≈ 783 px (desborde 33 px)

Se arregla con padding, sin tocar una palabra del contenido.

> **Al medir, esperá más de 350 ms tras cada cambio de slide**: la transición de framer-motion dura
> 350 ms y medir antes da alturas falsas.

---

## 6. Lo que no se toca

| # | No se toca | Por qué |
|---|---|---|
| D1 | El deck SIMD (`src/decks/simd/`) | No pertenece a esta exposición |
| D2 | El contenido de las slides de Said, Yandris, Alisson y Gino | Es su material; el rebalanceo se hizo con piezas aditivas (handoffs, metadatos, índice) |
| D3 | `SlideHipotesisPValor` | Se conserva como respaldo; su contenido quedó repartido |
| D4 | Dependencias (`recharts`, `d3`, …) | Todo SVG a mano, como el resto del deck |
| D5 | `informacionT05.md` y `contexto.md` | Solo las correcciones ya aplicadas |
