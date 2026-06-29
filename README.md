# Arquitectura y Organización de Computadoras — Presentación Interactiva SIMD & Taxonomía de Flynn

Presentación interactiva desarrollada en **React + Vite + Tailwind CSS + Framer Motion** sobre Paralelismo a Nivel de Datos, Arquitectura SIMD y Extensiones Vectoriales x86 (MMX, SSE, AVX).

---

## 🚀 Cómo Ejecutar la Aplicación (Deployment & Local Run)

### Requisitos Previos
- **Node.js**: v18 o superior
- **npm** o **pnpm** / **yarn**

### Pasos para Ejecutar Localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo Vite
npm run dev
```

El servidor iniciará en `http://localhost:5173/` con Hot Module Replacement (HMR).

### Build de Producción

```bash
# Compilar bundle optimizado para producción
npm run build

# Previsualizar el build de producción
npm run preview
```

---

## 📖 Estructura de la Presentación y Expositores

La presentación está dividida en **4 partes principales** asignadas a los 4 integrantes del grupo, completamente alineadas con la *Guía de Estudio Completa*:

### 🟢 Parte 1: El Problema y Taxonomía de Flynn (`Reyes Ricardo`)
- **Slide 1.0**: Límite del modelo secuencial SISD con video explicativo de YouTube incrustado.
- **Slide 1.1**: Simulación animada interactiva SISD vs SIMD (Cajero vs Parrilla).
- **Slide 1.2**: Ciclo Fetch-Decode-Execute (FDEW) en arquitecturas Von Neumann.
- **Slide 1.3**: Matriz 2x2 interactiva de la Taxonomía de Flynn (SISD, SIMD, MISD, MIMD).
- **Slide 1.4**: Limitaciones físicas de SISD y cuellos de botella en MIMD/SMP (Spinlocks & Bus Congestion).

### 🔵 Parte 2: Arquitectura SIMD y el Principio Vectorial (`Rivera Yandris`)
- **Slide 2.1**: Principio SIMD: "Una orden, ocho soldados" y ahorro energético en Control Unit.
- **Slide 2.2**: Registros Vectoriales XMM/YMM y registros de control (`VLEN`, `VSTR`, `VMASK`).
- **Slide 2.3**: Dualidad Espacio-Tiempo: Array Processor vs Vector Processor con **esquema arquitectónico CRAY-1/VMIPS** y tabla comparativa.
- **Slide 2.4**: Ventajas del procesamiento vectorial y Requisitos de Regularidad (Homogeneidad, Alineación, Ausencia de dependencias).
- **Slide 2.5**: Comparativa de código secuencial vs vectorial.

### 🟣 Parte 3: Extensiones SIMD Modernas (`Alejandro Andy`)
- **Slide 3.1**: Evolución histórica x86 (MMX, SSE, AVX, AVX-512) y caso real Intel Atom.
- **Slide 3.2**: Subword Parallelism (particionamiento del sumador de 256 bits en silicio).
- **Slide 3.3**: Vocabulario vectorial AVX y la instrucción FMA (`Fused Multiply-Add`).
- **Slide 3.4**: Visor interactivo de datos empaquetados en registro YMM (Float32, Double64, Int16, Byte8) con scroll horizontal.
- **Slide 3.5**: **Práctica Assembler Sincronizada Paso a Paso** (`movss`/`addss` vs `movaps`/`addps`) con monitor de registro `XMM0` y actualización de memoria RAM tras el `STORE`.
- **Slide 3.6**: Pipeline de 4 etapas Fetch-Decode-Execute en SIMD.
- **Slide 3.7**: Encadenamiento Vectorial (Vector Chaining en CRAY-1).
- **Slide 3.8**: Comparativa de microarquitectura (AMD Excavator vs AMD Zen).

### 🔴 Parte 4: Rendimiento, Aplicaciones y Conclusiones (`Bermudez Gino`)
- **Slide 4.1**: Desglose dinámico de instrucciones y cálculo de Speedup real (7.0x).
- **Slide 4.2**: Escalado de Throughput (GFLOPS) y simulador de la Ley de Amdahl.
- **Slide 4.3**: La Kryptonita del SIMD: Divergencia Condicional (`if/else` con `VMASK`).
- **Slide 4.4**: 6 Dominios de aplicación real (Imágenes, Audio/Video, 3D, IA/ML, NumPy, GPUs).
- **Slide 4.5**: Paradigma híbrido en SoCs modernos (CPU + GPU).
- **Slide 4.6**: Tabla de diagnóstico estructural SMP vs SIMD.
- **Slide 4.7**: Conclusiones finales.

---

## 🛠️ Tecnologías Utilizadas
- **React 18** + **Vite 6**
- **Tailwind CSS** (Estilos y layout responsivo)
- **Framer Motion** (Animaciones y transiciones suaves)
- **Lucide React** (Iconografía técnica)
