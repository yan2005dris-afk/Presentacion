# Tema 1: SIMD y Arquitecturas Paralelas

Este directorio contiene todo el material teórico, práctico y los guiones de exposición del **Tema 1: Arquitectura y Organización de Computadoras — SIMD y Cómputo Vectorial**.

---

## 👥 Integrantes y Secciones

| Sección | Tema | Expositor |
| :--- | :--- | :--- |
| **Parte 0** | Inicio y Agenda | Introducción general |
| **Parte 1** | El Problema Secuencial y Taxonomía de Flynn | Reyes Alisson |
| **Parte 2** | El Principio Vectorial y Modelo de Ejecución | Rivera Yandris |
| **Parte 3** | Extensiones MMX, SSE, AVX y Hardware Interno | Alejandro Andy |
| **Parte 4** | Rendimiento, Divergencia y Aplicaciones Modernas | Bermudez Gino |

---

## 📁 Estructura de Contenidos

```text
decks/01-simd-arquitectura/
├── README.md                           # Este archivo
├── apuntes/
│   ├── apunte-estudio.md               # Apunte consolidado teórico (Parte 2 y general)
│   └── guion-pedagogico-parte3.md      # Guion pedagógico completo de Parte 3
└── practica/
    ├── README.md                       # Explicación de las prácticas ensamblador
    ├── EMU8086 - ESCALAR.asm           # Código escalar clásico en EMU8086
    └── SAMS - VECTORIAL.asm            # Implementación vectorial en SAMS
```

---

## 🖥️ Diapositivas en React
Las diapositivas interactivas asociadas a este tema están registradas en el motor web bajo el identificador `simd`:
* Configuración de slides: `src/decks/simd/deck.jsx`
* Componentes de diapositivas: `src/slides/`
* URL directa en el navegador: `http://localhost:5173/?deck=simd`
