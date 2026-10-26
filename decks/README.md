# Hub de Presentaciones y Decks Temáticos

Este directorio centraliza las presentaciones y sus materiales complementarios (apuntes, guiones, prácticas y datasets).

---

## 🗂️ Temas Disponibles

1. **[01-simd-arquitectura/](./01-simd-arquitectura/README.md)**:
   * **Materia:** Arquitectura y Organización de Computadoras
   * **Contenido:** Taxonomía de Flynn, Vector Chaining, MMX/SSE/AVX, Divergencia y Práctica en Assembler (EMU8086 y SAMS).
   * **Identificador en app:** `simd` (`/?deck=simd`)

2. **[02-estadistica-inferencial/](./02-estadistica-inferencial/README.md)**:
   * **Materia:** Probabilidad y Estadística
   * **Contenido:** Poisson en servidores, Gauss y Z-score, Teorema del Límite Central, Intervalos de confianza, $\alpha$, $p$-valor, A/B Testing con datos reales de Kaggle y Sample Ratio Mismatch (SRM).
   * **Identificador en app:** `stats` (`/?deck=stats`)

---

## 🚀 Cómo Agregar un Nuevo Tema
1. Crear una carpeta `decks/03-nombre-tema/` con sus subcarpetas `apuntes/` y `practica/`.
2. Crear la definición de diapositivas en `src/decks/nombre-tema/deck.jsx`.
3. Registrar el nuevo deck en `src/decks/registry.js`.
