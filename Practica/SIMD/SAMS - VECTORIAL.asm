    ; ==============================================================================
    ; ARCHIVO: simd_puro.asm (SASM / NASM 32-bit)
    ; DESCRIPCIÓN: Demostración pura de Suma Vectorial SIMD (SSE2) acumulando 16
    ;              vectores en paralelo de 128 bits sin intermediación de bucles.
    ; ==============================================================================

    %include "io.inc"          ; Incluye librería de macros de entrada/salida de SASM

    ; ------------------------------------------------------------------------------
    ; SECCIÓN DE DATOS INICIALIZADOS (Memoria RAM)
    ; ------------------------------------------------------------------------------
    section .data
        msg_intro db "=== DEMOSTRACION VECTORIAL SIMD (SASM) ===", 0
        msg_vec   db "Vector Resultante SIMD: [ ", 0
        msg_sep   db ", ", 0
        msg_fin   db " ]", 0

        ; align 16: Requisito de hardware para alinear a 128 bits en memoria RAM
        align 16
        vec1  dd 1, 1, 1, 1      ; Vector 1: [1, 1, 1, 1]
        align 16
        vec2  dd 2, 2, 2, 2      ; Vector 2: [2, 2, 2, 2]
        align 16
        vec3  dd 3, 3, 3, 3
        align 16
        vec4  dd 4, 4, 4, 4
        align 16
        vec5  dd 5, 5, 5, 5
        align 16
        vec6  dd 6, 6, 6, 6
        align 16
        vec7  dd 7, 7, 7, 7
        align 16
        vec8  dd 8, 8, 8, 8
        align 16
        vec9  dd 9, 9, 9, 9
        align 16
        vec10 dd 10, 10, 10, 10
        align 16
        vec11 dd 11, 11, 11, 11
        align 16
        vec12 dd 12, 12, 12, 12
        align 16
        vec13 dd 13, 13, 13, 13
        align 16
        vec14 dd 14, 14, 14, 14
        align 16
        vec15 dd 15, 15, 15, 15
        align 16
        vec16 dd 16, 16, 16, 16  ; Vector 16: [16, 16, 16, 16]

    ; ------------------------------------------------------------------------------
    ; SECCIÓN DE DATOS NO INICIALIZADOS
    ; ------------------------------------------------------------------------------
    section .bss
        align 16
        vecResultado resd 4     ; Reserva 128 bits (4 enteros de 32 bits) para el resultado

    ; ------------------------------------------------------------------------------
    ; CÓDIGO EJECUTABLE
    ; ------------------------------------------------------------------------------
    section .text
    global CMAIN
        mov ebp, esp
    CMAIN:
    mov ebp, esp; for correct debugging

        ; CÓMPUTO VECTORIAL SIMD (Procesamiento en paralelo en registro XMM0)
        movups xmm0, [vec1]     ; Carga el vector 1 (128 bits) en XMM0
        movups xmm1, [vec2]     ; Carga el vector 2 en XMM1
        paddd  xmm0, xmm1       ; SUMA SIMD: Suma simultáneamente los 4 enteros de 32 bits

        ; Acumulación secuencial de los 14 vectores restantes
        movups xmm1, [vec3]
        paddd  xmm0, xmm1
        movups xmm1, [vec4]
        paddd  xmm0, xmm1
        movups xmm1, [vec5]
        paddd  xmm0, xmm1
        movups xmm1, [vec6]
        paddd  xmm0, xmm1
        movups xmm1, [vec7]
        paddd  xmm0, xmm1
        movups xmm1, [vec8]
        paddd  xmm0, xmm1
        movups xmm1, [vec9]
        paddd  xmm0, xmm1
        movups xmm1, [vec10]
        paddd  xmm0, xmm1
        movups xmm1, [vec11]
        paddd  xmm0, xmm1
        movups xmm1, [vec12]
        paddd  xmm0, xmm1
        movups xmm1, [vec13]
        paddd  xmm0, xmm1
        movups xmm1, [vec14]
        paddd  xmm0, xmm1
        movups xmm1, [vec15]
        paddd  xmm0, xmm1
        movups xmm1, [vec16]
        paddd  xmm0, xmm1

        movups [vecResultado], xmm0 ; Guarda el resultado vectorial final en memoria RAM

        ; MOSTRADO DE RESULTADOS EN CONSOLA
        PRINT_STRING msg_intro
        NEWLINE
        PRINT_STRING msg_vec

        mov eax, [vecResultado]      ; Elemento 0
        PRINT_DEC 4, eax
        PRINT_STRING msg_sep
        mov eax, [vecResultado + 4]  ; Elemento 1
        PRINT_DEC 4, eax
        PRINT_STRING msg_sep
        mov eax, [vecResultado + 8]  ; Elemento 2
        PRINT_DEC 4, eax
        PRINT_STRING msg_sep
        mov eax, [vecResultado + 12] ; Elemento 3
        PRINT_DEC 4, eax
        PRINT_STRING msg_fin
        NEWLINE

        xor eax, eax            ; Return 0
        ret