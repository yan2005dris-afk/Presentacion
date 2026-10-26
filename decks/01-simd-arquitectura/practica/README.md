# Prácticas

Este directorio contiene dos prácticas independientes, una por cada exposición del proyecto:

| Subdirectorio | Tema | Qué hay |
|---|---|---|
| *(raíz)* | Práctica de Arquitectura Ensamblador: Procesamiento Escalar vs Vectorial | Dos ejemplos en ensamblador (emu8086 y NASM/SASM) — la práctica del deck de SIMD. Detalle abajo. |
| [`Estadistica/`](Estadistica/README.md) | Práctica de Estadística Inferencial — A/B Testing con datos reales | Un notebook (`Inferencia_AB_Testing.ipynb`) que resuelve un problema real de negocio con el dataset `faviovaz/marketing-ab-testing` de Kaggle: Poisson, campana de Gauss, TLC, intervalos de confianza, α y p-valor, contrastes y decisión. |

---

# Práctica de Arquitectura Ensamblador: Procesamiento Escalar vs Vectorial

Este directorio contiene dos ejemplos prácticos desarrollados en lenguaje ensamblador para demostrar experimentalmente las diferencias arquitectónicas entre el procesamiento escalar (SISD) y el procesamiento vectorial (SIMD).

---

## 📄 Archivos en este Directorio

1. **`EMU8086 - ESCALAR.asm`**: Código ensamblador escalar puro diseñado para el entorno **emu8086** (Arquitectura Intel 8086 de 16 bits).
2. **`SAMS - VECTORIAL`** (`simd_puro.asm`): Código ensamblador vectorial SIMD diseñado para el entorno **SASM (SimpleASM)** usando el ensamblador **NASM** en modo 32-bit con extensiones **SSE2** (registros `XMM` de 128 bits).

---

## 📌 ¿Por qué `EMU8086` es exclusivamente para Procesamiento Escalar?

**emu8086** es un emulador educativo basado estrictamente en el microprocesador **Intel 8086** (lanzado en 1978).

### Razones Técnicas por las que NO se puede hacer Procesamiento Vectorial en emu8086:

1. **Arquitectura de 16 bits Antigua**: El Intel 8086 posee únicamente registros generales de 16 bits (`AX`, `BX`, `CX`, `DX`). No cuenta con registros vectoriales anchos (`XMM` de 128 bits o `YMM` de 256 bits).
2. **Ausencia de Juegos de Instrucciones Vectoriales (SIMD)**: Las extensiones vectoriales MMX, SSE y AVX no existían en 1978. 
   - **MMX** fue introducido en **1996** (Intel Pentium MMX).
   - **SSE** fue introducido en **1999** (Intel Pentium III).
   - **AVX** fue introducido en **2011** (Intel Sandy Bridge).
3. **Limitación del Emulador**: Al emular únicamente el juego de instrucciones x86 de 16 bits en modo real, el compilador de emu8086 arroja error de sintaxis al reconocer instrucciones vectoriales modernas como `movaps`, `addps` o `paddd`.

Por este motivo, en `EMU8086 - ESCALAR.asm` la suma de elementos se realiza obligatoriamente **elemento por elemento** mediante bucles secuenciales y registros escalares de 16 bits (`AX`, `BX`).

---

## ⚡ SASM (SimpleASM) + NASM como Alternativa Vectorial (SIMD)

Para poder compilar y ejecutar instrucciones vectoriales modernas reales en un entorno IDE ligero, se utiliza **SASM (SimpleASM)** en conjunto con el ensamblador **NASM** (Netwide Assembler).

### Ventajas y Características de la Implementación Vectorial en SASM:

1. **Soporte para Instrucciones SSE / SSE2 / AVX**: Permite utilizar instrucciones de 128 bits (`movaps`, `addps`, `paddd`) que procesan 4 floats de 32-bit o 4 enteros de 32-bit en un solo ciclo de reloj de la ALU vectorial.
2. **Acceso a Registros Vectoriales `XMM0` - `XMM7`**: Permite almacenar vectores completos de datos contiguos directamente en el banco de registros vectoriales de la CPU.
3. **Alineación de Memoria (`align 16`)**: Requiere la directiva `align 16` en la sección `.data` para asegurar que los vectores en memoria RAM coincidan con los límites de 128 bits del bus de datos, requisito obligatorio para evitar fallos de alineación.

En `SAMS - VECTORIAL`, se cargan vectores enteros en registros `XMM` y se suman en paralelo utilizando instrucciones vectoriales SIMD puras.

---

## 📊 Tabla Comparativa Resumen

| Característica | EMU8086 - ESCALAR | SAMS - VECTORIAL (SASM + NASM) |
| :--- | :--- | :--- |
| **Paradigma** | SISD (Single Instruction, Single Data) | SIMD (Single Instruction, Multiple Data) |
| **Arquitectura** | Intel 8086 (16-bit Real Mode) | IA-32 / x86-64 con SSE2 (32/64-bit) |
| **Registros Utilizados** | Escalares: `AX`, `BX`, `CX`, `DX` (16 bits) | Vectoriales: `XMM0` - `XMM7` (128 bits) |
| **Instrucción de Suma** | `ADD ax, bx` (1 dato por ciclo) | `ADDPS xmm0, xmm1` (4 datos por ciclo) |
| **Throughput** | Lineal (1 elemento por iteración) | Vectorial (4 elementos simultáneos) |
