// ==========================================
// === MATEMÁTICA DEL DECK DE ESTADÍSTICA INFERENCIAL ===
// ==========================================
// Funciones puras (sin JSX) usadas por las slides del tema de significancia.
// Todo el cálculo corre en el cliente: sin dependencias externas.
//
// Verificado con cálculo independiente:
//   z = 2.3054  -> p bilateral 0.0211 · p unilateral 0.0106
//   15 caras de 20 monedas -> P(X >= 15) = 0.0207
//   z = 1.1294  -> p bilateral 0.2587

// ───────── Normal estándar ─────────
const SQRT2PI = Math.sqrt(2 * Math.PI);

export function normPdf(z) {
  return Math.exp(-(z * z) / 2) / SQRT2PI;
}

// Aproximación de Abramowitz & Stegun 7.1.26 para erf
export function erf(x) {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

export function normCdf(z) {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

// z crítico para una α bilateral (cola de dos lados) — bisección acotada
export function zCritico(alpha) {
  const objetivo = 1 - alpha / 2;
  let lo = 0;
  let hi = 6;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (normCdf(mid) < objetivo) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// p-valor a partir de z — bilateral (dos colas) o unilateral (cola superior)
export function pFromZ(z, bilateral = true) {
  const cola = 1 - normCdf(Math.abs(z));
  return bilateral ? 2 * cola : cola;
}

// ───────── Binomial (usada por el inset de 20 monedas) ─────────
// Coeficiente recursivo: evita desbordes de factorial con n grande
export function binomialPMF(k, n, p) {
  if (k < 0 || k > n) return 0;
  const q = 1 - p;
  let c = 1; // C(n, 0)
  for (let i = 1; i <= k; i++) c = (c * (n - i + 1)) / i;
  return c * Math.pow(p, k) * Math.pow(q, n - k);
}

// P(X >= k)
export function binomialTail(k, n, p) {
  let suma = 0;
  for (let i = Math.max(0, k); i <= n; i++) suma += binomialPMF(i, n, p);
  return suma;
}

// Vector de PMF para dibujar el histograma
export function binomialHist(n, p) {
  const out = [];
  for (let k = 0; k <= n; k++) out.push({ k, p: binomialPMF(k, n, p) });
  return out;
}

// ───────── Poder estadístico ─────────
// Poder de detectar un efecto `delta` con n observaciones por grupo
export function powerForEffect(n, delta, p0, alpha) {
  if (n <= 0) return 0;
  const se = Math.sqrt(p0 * (1 - p0) * (2 / n));
  const zc = zCritico(alpha);
  const a = Math.min(6, zc - delta / se);
  const b = Math.min(6, -zc - delta / se);
  return 1 - normCdf(a) + normCdf(b);
}

// n por grupo necesaria para alcanzar un poder objetivo — bisección
export function nForPower(target, delta, p0, alpha) {
  let lo = 100;
  let hi = 200000;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (powerForEffect(mid, delta, p0, alpha) < target) lo = mid;
    else hi = mid;
  }
  return Math.round(hi);
}

// ───────── Contraste de dos proporciones ─────────
// z del contraste de A contra B con `n` observaciones por grupo y un efecto
// `delta` sobre una tasa base `p0`. Usa el estimador pooled, el mismo que
// stats.proportions_ztest de SciPy:
//   z = 0.016 / sqrt(0.108 * 0.892 * 2/4000) = 2.3054  ->  p = 0.0211
export function zProporciones(n, delta, p0) {
  if (n <= 0) return 0;
  const pooled = p0 + delta / 2;
  const se = Math.sqrt(pooled * (1 - pooled) * (2 / n));
  return delta / se;
}

// ───────── Formato seguro para etiquetas ─────────
// Evita que un NaN se muestre en pantalla
export function num(val, decimales = 4, sufijo = '') {
  if (val === null || val === undefined || Number.isNaN(val) || !Number.isFinite(val)) return '—';
  return val.toFixed(decimales) + sufijo;
}
