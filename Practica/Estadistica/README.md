# Práctica de Estadística Inferencial — A/B Testing con datos reales

Práctica de laboratorio del **Tema 2 (Estadística Inferencial — concepto)** del Grupo 3 y 4.
Resuelve un problema real de negocio de punta a punta usando las siete herramientas del sílabo.

El notebook sigue el mismo house style que tus prácticas de Minería de Datos: bloque de
metadatos, celda de entorno con `sns.set_theme("whitegrid")`, secciones numeradas con banners
`# ===== PASO N · ... =====`, sección **RETO EN PAREJAS** con esqueleto de solución, entregables
por **`### Criterio N`** y cierre con cuadro sinóptico.

---

## 📄 Archivo

**`Practica_T02_Inferencia_Estadistica_AB_Testing.ipynb`** — 49 celdas (24 de código + 25 de
markdown), con las **7 figuras ya renderizadas** y **todas las salidas ejecutadas**. Se abre y se
lee sin correr nada; si lo volvés a ejecutar, tarda ~12 segundos.

---

## 🎯 El caso de negocio

Una empresa de marketing lanza una campaña de anuncios. El grupo que **vio anuncios** convirtió
más que el grupo de control. La pregunta del equipo es:

> "¿Esta diferencia es un efecto real de los anuncios, o es ruido que se va a invertir mañana?"

Esa pregunta la responden **α**, el **p-valor** y el **intervalo de confianza**.

---

## 📊 El dataset

| | |
|---|---|
| **Nombre** | Marketing A/B Testing |
| **Autor** | Favio Vázquez |
| **Kaggle** | <https://www.kaggle.com/datasets/faviovaz/marketing-ab-testing> |
| **Licencia** | CC0: Public Domain |
| **Contenido** | 588.101 usuarios · 7 columnas · 22 MB |

**Columnas:** `user id` · `test group` (`ad` vio anuncios / `psa` vio el aviso) · `converted`
(compró o no) · `total ads` (anuncios vistos) · `most ads day` · `most ads hour`.

**Carga con treslevels de fallback** (igual que el patrón `os.path.exists` de tus prácticas):

1. `marketing_AB.csv` junto al notebook (funciona **offline**, ideal para el laboratorio).
2. Descarga desde Kaggle con `kagglehub` (sin cuenta de Kaggle) — deja el archivo cacheado.
3. Mensaje de error explícito con la instrucción de descarga manual.

---

## 🗺️ El recorrido

| Paso | Ítem del sílabo | Qué hace |
|---|---|---|
| 1 | — | Carga del dataset |
| 2 | — | Descripción (EDA): reparto, tasas, forma de las variables |
| 3 | Distribuciones · Poisson | Llegadas por hora → λ, GLM de Poisson con efecto hora, **test de razón de verosimilitudes** contra la tasa constante, índice de dispersión V/λ̄, y dimensionado de la cola |
| 4 | Normal · campana de Gauss | `total ads` no es normal (skew 7,4): la regla 68-95-99,7 falla y el Z-score se usa como métrica de anomalía, no como probabilidad |
| 5 | TLC | Distribución muestral de la tasa de conversión: el sesgo ↓ y el SE empírico converge a σ/√n |
| 6 | Margen de error · IC | IC de Wald vs **Wilson** al 95 % y 99 %, y el margen de error como función de n |
| 7 | α y p-valor | z-test de proporciones, sensibilidad a α, IC de la diferencia |
| 8 | Calibración del test | **Nulo simulado** (2.000 experimentos bajo H₀) + la partición real del grupo `ad` en dos mitades |
| 9 | Poder | Cálculo de poder, tamaño de muestra para 80 %, y **multiplicidad** (Bonferroni vs Benjamini-Hochberg) |
| 10 | Contraste de hipótesis | **Chequeo de reparto primero**, χ² hora × conversión, χ² día × grupo, t-test y Cohen's d |
| 11 | Aplicaciones | Regresión logística (significatividad de variables predictoras) |
| 12 | Decisión | La decisión de negocio, con impacto en dinero y riesgos |
| 🎯 | **RETO EN PAREJAS (40 min)** | 5 pasos: reproducir el caso del sílabo, sensibilidad al umbral, tamaño de muestra, recomendación operativa y diseño corregido |
| 📝 | **Entregables** | `### Criterio 1` … `### Criterio 5` con las respuestas redactadas |
| 🏁 | **Cierre** | Conclusión + cuadro sinóptico + vinculación con el proyecto |

---

## 💡 Los 3 hallazgos que valen como clase

**1 · El Poisson de tasa constante queda rechazado — y el χ² clásico no lo puede detectar.**
Con λ ≈ 24.500 por hora, la probabilidad de Poisson de que una hora tenga menos de 1.000 llegadas
es ≈ 0, así que un χ² con clases por hora es numéricamente indefinido. La forma correcta es un GLM
de Poisson con efecto hora contra el modelo de tasa constante, comparado por razón de
verosimilitudes (χ² = 341.443, df = 23, p ≈ 0), y el índice de dispersión V/λ̄ = 11.850 dice que
el modelo correcto sería quasi-Poisson o binomial negativo.

**2 · El p-valor se puede construir desde cero y calibrar.**
Simulando 2.000 experimentos bajo H₀: media de z ≈ 0, sd ≈ 0,98, **P(|z| > 1,96) ≈ 0,04** (el α
bilateral) y P(|z| > 2,576) ≈ 0,01. Ojo: en un test bilateral al 5 %, **cada cola vale 2,5 %**, no
5 %. La partición real del grupo `ad` en dos mitades da z = −1,07 (p = 0,28): ruido puro, como
debe ser.

**3 · El p-valor es 1,7 × 10⁻¹³ y aun así el diseño está roto.**
El z-test da p = 1,705 × 10⁻¹³ y una diferencia de **+0,7692 pp** (2,5547 % vs 1,7854 %). Pero el
reparto es **96 % / 4 %**, no 50/50: el chequeo contra la suposición 50/50 da χ² = 497.769.
Comparar "ad vs psa" con ese reparto confunde *"ver un anuncio"* con *"estar en el 96 % de la
población"*: el efecto estimado es una **cota superior**, no un efecto causal. Por eso el reparto
se mira **primero**.

> Es el contrapeso exacto de la slide *"Lo que el p-valor NO es"*: p bajo ⟹ efecto real **solo si el
> diseño fue correcto**.

---

## ⚙️ Requisitos

```bash
pip install pandas numpy scipy statsmodels matplotlib seaborn kagglehub
```

Probado con: Python 3.15 · pandas 3.0.6 · numpy 2.5.4 · scipy 1.18.1 · statsmodels 0.15.0 ·
matplotlib 3.11.2 · seaborn 0.13.2.

> **Ojo con la API:** el z-test de proporciones **no existe en SciPy**
> (`scipy.stats.proportions_ztest` → `AttributeError`). La función correcta es
> `statsmodels.stats.proportion.proportions_ztest`, que devuelve `(zstat, pvalue)`.
> SciPy sí aporta `norm`, `binom`, `poisson`, `chi2_contingency` y `ttest_ind`.

---

## 🔗 Material relacionado

| | |
|---|---|
| Apunte de estudio | [`Tema 2 — Estadística Inferencial Apunte de estudio.md`](../../Tema%202%20—%20Estadística%20Inferencial%20Apunte%20de%20estudio.md) |
| Deck | `src/deckStats.jsx` (26 slides) |
| Guion del bloque α y p-valor | `src/slides2/GUION-T05.md` |
| Estructura y pendientes | `REBALANCEO-EXPO.md` |
