# Plataforma de Presentaciones Interactivas (Multi-Deck)

Plataforma interactiva para defensas y presentaciones académicas desarrollada en **React + Vite + Tailwind CSS + Framer Motion**.

Diseñada bajo una arquitectura modular desacoplada: el **motor de presentación** (`src/core/`) es independiente de los **contenidos temáticos** (`decks/` y `src/decks/`).

---

## 🗂️ Temas y Decks Disponibles

| Deck | Materia | Identificador URL | Contenido Central |
| :--- | :--- | :---: | :--- |
| **Estadística Inferencial** | Probabilidad y Estadística | `/?deck=stats` *(Por defecto)* | Poisson en infraestructura, Distribución Normal, TLC, Intervalos de confianza, $\alpha$ y $p$-valor, A/B Testing con datos de Kaggle y Sample Ratio Mismatch (SRM). |
| **SIMD y Arquitecturas Paralelas** | Arquitectura y Org. de Computadoras | `/?deck=simd` | Límite secuencial Von Neumann, Taxonomía de Flynn, Vector Chaining (Cray-1), MMX/SSE/AVX, microarquitectura y práctica en ensamblador. |

---

## 🚀 Inicio Rápido (Local Run)

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build

# 4. Previsualizar build
npm run preview
```

* El servidor inicia en `http://localhost:5173/`.
* Para cambiar de tema se puede usar el selector en el encabezado o los parámetros de consulta:
  * `http://localhost:5173/?deck=stats`
  * `http://localhost:5173/?deck=simd`

---

## 📁 Arquitectura del Repositorio

```text
├── decks/                                      # Artefactos y documentación por tema
│   ├── 01-simd-arquitectura/
│   │   ├── apuntes/                            # Apuntes teóricos y guiones pedagógicos
│   │   └── practica/                           # Código ensamblador (EMU8086, SAMS)
│   └── 02-estadistica-inferencial/
│       ├── apuntes/                            # Apuntes integrales de estudio
│       └── practica/                           # Notebooks Jupyter (*.ipynb) y datasets
│
├── src/
│   ├── core/                                   # MOTOR: Layout, navegación, atajos y modales
│   │   ├── DeckContainer.jsx                   # Orquestador principal de vista
│   │   ├── DeckHeader.jsx                      # Barra superior, switchers y controles
│   │   ├── DeckFooter.jsx                      # Barra de progreso, pasos y secciones
│   │   └── SpeakerNotesDrawer.jsx              # Drawer de notas del orador
│   │
│   ├── decks/                                  # DEFINICIÓN DE PRESENTACIONES
│   │   ├── registry.js                         # Registro central de decks activos
│   │   ├── simd/deck.jsx                       # Configuración y lista de slides de SIMD
│   │   └── stats/deck.jsx                      # Configuración y lista de slides de Estadística
│   │
│   ├── slides/                                 # Componentes React de slides SIMD
│   ├── slides2/                                # Componentes React de slides Estadística
│   └── components/                             # Componentes UI reutilizables y simuladores
```

---

## ⌨️ Atajos de Teclado del Motor

* `→` / `Espacio`: Avanzar paso / Siguiente diapositiva.
* `←`: Retroceder paso / Diapositiva anterior.
* `H` o `Z`: Alternar **Modo Zen** (oculta encabezado y pie para maximizar pantalla útil).
* `T`: Alternar tema visual (**Dark / Light / Auto**).
* `S`: Alternar drawer con el **Guion del Orador**.
* `F`: Alternar **Pantalla Completa**.

---

## 🛠️ Stack Tecnológico
* **React 19** + **Vite 8**
* **Tailwind CSS 4** (Estilos y variables de color)
* **Framer Motion 12** (Transiciones de diapositivas)
* **Lucide React** (Iconografía técnica)
