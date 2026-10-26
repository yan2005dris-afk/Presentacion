    ; ==============================================================================
    ; ARCHIVO: escalar_puro.asm (emu8086 / 8086 16-bit)
    ; DESCRIPCI�N: Demostraci�n pura de Suma Escalar (SISD) elemento por elemento
    ;              recorriendo los 16 vectores secuencialmente en la ALU.
    ; ==============================================================================

    include 'emu8086.inc'       ; Macros de impresi�n de emu8086

    org 100h                    ; Formato ejecutable .COM de MS-DOS

    jmp inicio                  ; Salta la definici�n de datos

    ; ------------------------------------------------------------------------------
    ; SECCI�N DE DATOS (Arreglos escalares de 16 bits)
    ; ------------------------------------------------------------------------------
    vec1  dw 1, 1, 1, 1
    vec2  dw 2, 2, 2, 2
    vec3  dw 3, 3, 3, 3
    vec4  dw 4, 4, 4, 4
    vec5  dw 5, 5, 5, 5
    vec6  dw 6, 6, 6, 6
    vec7  dw 7, 7, 7, 7
    vec8  dw 8, 8, 8, 8
    vec9  dw 9, 9, 9, 9
    vec10 dw 10, 10, 10, 10
    vec11 dw 11, 11, 11, 11
    vec12 dw 12, 12, 12, 12
    vec13 dw 13, 13, 13, 13
    vec14 dw 14, 14, 14, 14
    vec15 dw 15, 15, 15, 15
    vec16 dw 16, 16, 16, 16

    vecResultado dw 0, 0, 0, 0 ; Espacio reservado para el resultado escalar

    ; ------------------------------------------------------------------------------
    ; C�DIGO EJECUTABLE (C�mputo SISD)
    ; ------------------------------------------------------------------------------
    inicio:
        mov cx, 0               ; CX = �ndice de elemento (0 a 3)

    loop_elementos:
        cmp cx, 4               ; �Procesamos los 4 elementos?
        jge fin_calculo

        ; Calcular offset en bytes (offset = CX * 2)
        mov bx, cx
        shl bx, 1

        mov ax, 0               ; Resetear acumulador AX en 0

        ; C�MPUTO ESCALAR: 16 sumas individuales de 16 bits en el registro AX
        add ax, vec1[bx]
        add ax, vec2[bx]
        add ax, vec3[bx]
        add ax, vec4[bx]
        add ax, vec5[bx]
        add ax, vec6[bx]
        add ax, vec7[bx]
        add ax, vec8[bx]
        add ax, vec9[bx]
        add ax, vec10[bx]
        add ax, vec11[bx]
        add ax, vec12[bx]
        add ax, vec13[bx]
        add ax, vec14[bx]
        add ax, vec15[bx]
        add ax, vec16[bx]

        mov vecResultado[bx], ax ; Guarda el resultado en memoria RAM

        inc cx                  ; Siguiente elemento
        jmp loop_elementos

    ; ------------------------------------------------------------------------------
    ; MOSTRADO DE RESULTADOS EN CONSOLA MS-DOS
    ; ------------------------------------------------------------------------------
    fin_calculo:
        PRINTN '=== DEMOSTRACION ESCALAR (EMU8086) ==='
        PRINT 'Vector Resultante ESCALAR: [ '

        mov ax, vecResultado[0]  ; Elemento 0
        CALL PRINT_NUM
        PRINT ', '
        mov ax, vecResultado[2]  ; Elemento 1
        CALL PRINT_NUM
        PRINT ', '
        mov ax, vecResultado[4]  ; Elemento 2
        CALL PRINT_NUM
        PRINT ', '
        mov ax, vecResultado[6]  ; Elemento 3
        CALL PRINT_NUM
        PRINTN ' ]'

        ; Finalizaci�n limpia de programa MS-DOS
        mov ax, 4c00h
        int 21h

    DEFINE_PRINT_NUM
    DEFINE_PRINT_NUM_UNS

    end