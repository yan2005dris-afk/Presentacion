# Guion — Tema 05: Nivel de Significancia (α) y P-Valor

**Expositor**: Andy · **Bloque**: C · Decidir · **Slides**: 7 (+ 1 de apertura de bloque)
**Duración**: 17–18 min (tope 20) · **Archivo de slides**: `src/slides2/SlideAlphaPValor.jsx`
**Case que recorre todas las slides**: e-commerce, botón de checkout.

> Versión vigente y versionada. El borrador anterior vivía en `docs/expo1/tema05/guion-ordenado-t05.md`
> (carpeta `docs/` está en `.gitignore`, así que no viajaba con la rama).

---

## 📍 ANTES DE EMPEZAR — Recordatorio de Contexto

Tu audiencia acaba de ver:

- **Said**: qué es una distribución y cómo se modela lo que llega (Poisson, colas).
- **Yandris**: la campana de Gauss: μ, σ, las franjas ±1σ/±2σ/±3σ y el Z-score.
- **Allison**: el TLC — las medias de muestras grandes se parecen a una campana.
- **Gino**: el intervalo de confianza. Su slide ya muestra literalmente **«IC al 95 % (α = 0.05)»**.

**Tu rol**: el bloque que convierte evidencia en decisión. Gino te dejó acotado el parámetro;
tú decides si el efecto que ves es real o es ruido. Eres el único bloque del sílabo que describe una
**función** (el criterio estadístico para validar resultados en software) y no una distribución.

**El puente con Gino** (lo dice tu slide 5.0): *«ese 5 % que deja fuera es mi tema — la otra cara de
la misma campana»*.

**Tu caso, el mismo en todas las slides**: el equipo de producto quiere subir el botón «Comprar» a una
versión B. A convierte 10.0 % (400/4.000) y B convierte 11.6 % (464/4.000). z = 2.3054,
p bilateral = 0.0211, p unilateral = 0.0106.

**Lo que entregas al equipo**: el criterio. Se lo pasas en el contraste de hipótesis.

---

## 1. Regla dual: una slide, dos audiencias

Cada slide tiene **dos pistas**:

- **El cuerpo**: lo que se dice en voz alta y lo que se ve. Segunda persona del plural, sin fórmulas
  que no se puedan seguir. Un solo trabajo por slide.
- **«Para el especialista»** (la franja inferior en rojo): la nota técnica, en 1–3 líneas. Es lo que
  permite que el mismo material sirva a una audiencia donde no se conoce el estadístico y a una
  audiencia donde sí.

Nunca leas la franja «Para el especialista» en voz alta: está para que el especialista la encuentre.

---

## Slide 5.0 — Toda Decisión Tiene un Riesgo

### Título
"Toda decisión tiene un riesgo"

### Lo que ves en la slide
- **Puente con Gino**: «ese 5 % que deja fuera es mi tema — la otra cara de la misma campana».
- **Columna izquierda · la analogía del tribunal**: H₀ (el acusado es inocente) / H₁ (es culpable),
  los dos errores (falso positivo = Error I · falso negativo = Error II) y la frase clave en ámbar.
- **Columna derecha · el caso real**: A 10.0 % (400/4.000) vs B 11.6 % (464/4.000), las hipótesis del
  caso en notación y el **toggle bilateral / unilateral** dentro de la tarjeta de H₁.
- **Nota del especialista** al pie.

### Qué decir (guión)

**Intro**: "Hola, soy Andy. Mi bloque es el que convierte evidencia en decisión, y antes de hablar de
alpha y del p-valor quiero plantar una pregunta: ¿cuánta evidencia necesita un juez para declarar
culpable, y cuánto se equivoca si lo hace?"

**El tribunal**: "Cada vez que un sistema decide — un botón, un modelo, una alerta — hay un juez y hay
un error posible. El juez declara inocente por defecto: eso es H₀, el estado por defecto. Si hay efecto
real, la alternativa es H₁. Y hay dos formas de equivocarse: si rechazas a un inocente, Error Tipo I, un
falso positivo. Si absuelves a un culpable, Error Tipo II, un falso negativo."

**El caso**: "Nuestro caso: producto quiere subir el botón «Comprar» a una versión B. A convierte el
10 %, B convierte el 11.6 %. Los datos ya están. La pregunta no es cuál convierte más — eso ya lo
sabemos. La pregunta es: ¿esta diferencia es un efecto real, o es ruido que se invierte mañana?"

**El remate** (señala la caja ámbar): "Y aquí está el orden que importa: alpha es el riesgo que
aceptas **antes** de ver las pruebas. El p-valor se calcula **después**. Ese orden temporal es la idea
más importante de todo el tema."

**Transición**: "Empecemos por ese riesgo: alpha."

### Para el especialista
H₀ es el estado por defecto y H₁ la afirmación que se quiere sostener. Fijar α **y la dirección de H₁**
antes de recoger los datos separa una prueba de una búsqueda de significatividad: elegir unilateralidad
reduce el p-valor a la mitad, pero definirla después de verlos es p-hacking.

### Cifras de esta slide
A = 10.0 % (400/4.000) · B = 11.6 % (464/4.000) · z = 2.3054 · p bilateral = 0.0211 · unilateral = 0.0106

---

## Slide 5.1 — α: el Área que Decides Tolerar

### Título
"α es el área de la cola que decides tolerar"

### Lo que ves en la slide
- **Campana** con la región de rechazo sombreada en rosa, la línea punteada del z crítico y el valor
  de z arriba a la derecha.
- **Selector de α** (0.05 · 0.01 · 0.001) — al cambiar, se mueven la zona sombreada, el z y las marcas.
- **V1 · la banda de 100 marcas**: 100 puntos cuadrados, 5 en rojo. Es α hecho tangible.
- **Tira de una línea**: umbrales por industria (0.05 web · 0.01 crédito · 0.001 ensayos clínicos).
- **El puente con el intervalo de confianza**.
- **Nota del especialista** al pie.

### Qué decir (guión)

**Intro**: "Alpha es el presupuesto de errores que te das antes de empezar. Mira esta campana: la zona
sombreada es la parte de resultados **tan raros** que, si la apuesta por defecto fuera cierta, no
esperaríamos ver. Tú eliges cuánto de esa zona te molesta."

**El visual de las marcas**: "Y así se vuelve concreto. De cada 100 pruebas en las que la hipótesis por
defecto es cierta, 5 dan un falso positivo. En promedio, ojo: no es una promesa, es una frecuencia. Con
alpha 0.01 baja a 1 de cada 100; con 0.001, 1 de cada 1.000."

**El z crítico**: "Fíjate que al mover alpha el umbral también se mueve: 1.96, 2.576, 3.29. Ese número
es el que después va a comparar con nuestro z."

**El puente con Gino**: "Y otra cosa: el intervalo que ya vimos y alpha son la misma campana por los dos
lados. Confianza 95 % es igual a alpha 0.05. El 5 % que el intervalo deja fuera es exactamente este
alpha."

### Para el especialista
α = P(rechazar H₀ | H₀ verdadera) = **Error Tipo I**. La región de rechazo se sombrea **antes** de
observar los datos; el umbral crítico bilateral es z = 1.96 (α = 0.05), 2.576 (α = 0.01) y
3.29 (α = 0.001). «5 de cada 100» es un promedio, no una garantía.

### Cifras de esta slide
z = 1.960 (α 0.05) · 2.576 (α 0.01) · 3.291 (α 0.001) · 5 marcas rojas de 100

---

## Slide 5.2 — El P-Valor: ¿Qué Tan Raro Fue Eso si Nada Cambió?

### Título
"El p-valor: ¿qué tan raro fue eso si nada cambió?"

### Lo que ves en la slide
- **Banner con la pregunta**, literal: «¿Qué tan raro o sorprendente es el resultado que obtuvimos si
  asumimos que nada cambió (H₀ es cierta)?»
- **Campana** con la zona de sorpresa sombreada en cyan y un **slider de z** en vivo.
- **V2 · el inset de 20 monedas**: histograma binomial real (n = 20, p = 0.5), con la cola k ≥ 15
  sombreada en cyan — el área sombreada *es* el p-valor. Etiqueta: P(X ≥ 15) = 0.0207.
- **Panel lateral**: los dos dominios (0.0207 monedas · 0.0211 e-commerce) y bilateral vs unilateral.
- **Nota del especialista** al pie.

### Qué decir (guión)

**Intro**: "Ya fijamos cuánto riesgo aceptamos. Ahora falta medir cuánta evidencia tenemos, y la
pregunta del p-valor es una sola: **¿qué tan raro o sorprendente es lo que vimos si asumimos que nada
cambió?**"

**El slider**: "Mueve el estadístico y observa cómo se expande la zona de sorpresa. En nuestro caso
z = 2.3054, y el p-valor bilateral es 0.0211."

**Las monedas**: "Para que el p-valor deje de ser abstracto, un ejemplo más simple que el A/B test:
monedas. Quince caras en veinte tiradas de una moneda justa. ¿Qué tan raro es eso? El área de la cola
sombreada en cyan: 0.0207. Es decir, el 2.07 % de las veces."

**El remate**: "Y ahora el remate, que es la idea que más me importa: 0.0207 en las monedas, 0.0211 en
el e-commerce. Casi el mismo número en dos dominios completamente distintos. Por eso el p-valor es un
concepto único y no un truco del A/B testing."

### Para el especialista
p = P(X ≥ x_obs | H₀ cierta): una **probabilidad condicional** sobre la distribución nula, no sobre
H₀. Con z = 2.3054 el p bilateral es 0.0211 y el unilateral 0.0106. El p-valor es un **área**, no un
punto: por eso el inset sombrea la cola completa.

### Cifras de esta slide
z = 2.3054 → p = 0.0211 (bilateral) / 0.0106 (unilateral) · P(X ≥ 15 | n=20, p=0.5) = 0.0207

---

## Slide 5.3 — La Regla de Decisión: p ≤ α

### Título
"La regla de decisión: p ≤ α"

### Lo que ves en la slide
- **V3 · la matriz 2×2 como diagrama**: eje X = decisión (no rechazamos / rechazamos), eje Y = realidad
  (H₀ verdadera / H₀ falsa). Las cuatro celdas llevan su probabilidad **en vivo**: α en la celda del
  Error Tipo I y β en la del Error Tipo II, calculados con n = 4.000 y efecto 1.6 pp.
- **Regla universal**: p ≤ α ⟹ rechazar H₀ · p > α ⟹ evidencia insuficiente.
- **El caso**: p = 0.0211 contra el α que tengas elegido, y qué pasa al bajar el umbral.
- **V4 · control de calidad** (segundo dominio): 1.000 piezas, 25 defectuosas, H₀ = 2 % → z = 1.1294 →
  **p = 0.2587 → no rechazamos H₀**.
- **Nota del especialista** al pie.

### Qué decir (guión)

**Intro**: "Y ahora la regla, que es una línea: si el p-valor es menor o igual que alpha, rechazamos H₀.
En nuestro caso 0.0211 contra 0.05: rechazamos. El botón B convierte más y no es casualidad."

**La matriz**: "Esta matriz es donde se entiende el riesgo. Dos filas: lo que era verdad y lo que no
era. Dos columnas: lo que decidimos. En diagonal, aciertos; fuera de diagonal, los dos errores. Y fíjate
que los números son reales: el Error Tipo I es tu alpha, y el Error Tipo II es el 33.5 % con 4.000
personas por grupo."

**El otro lado de la regla**: "Ojo con el reverso: no rechazar H₀ **no es** aceptar H₀. Es no tener
evidencia suficiente. Que es muy distinto de tener evidencia de que son iguales."

**El segundo dominio**: "Y el criterio no es del A/B testing. En control de calidad: mil piezas, 25
defectuosas, la hipótesis por defecto es que el proceso está en el 2 %. Sale z = 1.1294, p = 0.2587. No
rechazamos. La línea sigue normal. Mismo criterio, otro dominio."

**El remate sobre α y β**: "Y una última cosa sobre el umbral: si bajas alpha de 0.05 a 0.001, β pasa
del 33.5 % al 81.7 %. Menos falsos positivos, pero muchísimos más falsos negativos. El umbral no es solo
un riesgo: es una apuesta."

### Para el especialista
«No rechazar H₀» **no** es «aceptar H₀»: es ausencia de evidencia, no evidencia de igualdad. Con
n = 4.000 por grupo el poder para detectar 1.6 pp de conversión es **66.5 %** (β = 33.5 %); un
resultado no significativo aquí no descarta el efecto. En control de calidad, p = 0.2587 deja la línea
dentro de lo esperado.

### Cifras de esta slide
p = 0.0211 vs α = 0.05 · α = 5.0 % · β = 33.5 % (n = 4.000) · poder = 66.5 % · control de calidad: z = 1.1294, p = 0.2587

---

## Slide 5.4 — Lo que el P-Valor NO Es

### Título
"Lo que el p-valor NO es"

### Lo que ves en la slide
- **Cuatro tarjetas**: las cuatro confusiones canónicas.
- En la tercera, el **contraejemplo de 1 millón** con la cifra protagonista: **1.000 órdenes extra**
  (≈ 50.000 $/mes con ticket de 50 $).
- **Una línea de cierre**: significancia estadística ≠ significancia práctica.
- **Nota del especialista** al pie.

### Qué decir (guión)

**Intro**: "Cuatro frases que he escuchado decir a gente brillante, y que son las que más caro salen."

**Una**: "El p-valor es la probabilidad de que H₀ sea verdadera. No: es la probabilidad de los datos
dada H₀. Está condicionada al revés."

**Dos**: "Es la probabilidad de que fuera azar. No: es qué tan raro es el resultado *si* fuera azar.
Mide compatibilidad con H₀, no la causa de los datos."

**Tres**: "Y esta es la que cuesta dinero: p pequeño significa cambio grande. Con un millón de usuarios
por grupo, cero coma uno puntos porcentuales da p = 0.0184, estadísticamente significativo. ¿Y eso
cuánto es? Mil órdenes extra al mes, unos 50.000 dólares con ticket de 50. Significativo no es lo mismo
que útil."

**Cuatro**: "Y si no rechacé, es que son iguales. No: es que no tuve poder para detectarlo."

**Cierre**: "Por eso el p-valor nunca viaja solo: se reporta con el tamaño del efecto y con el
intervalo de confianza."

### Para el especialista
Las tres confusiones canónicas (p ≠ P(H₀), p ≠ «probabilidad de azar», p ≠ tamaño del efecto) y la
cuarta (no rechazar ≠ aceptar). Reportar siempre **p-valor + intervalo de confianza + tamaño del
efecto**; un p-valor aislado no permite decidir nada.

### Cifras de esta slide
n = 1.000.000 por grupo · Δ = 0.1 pp → z = 2.357, p = 0.0184 → 1.000 órdenes extra ≈ 50.000 $/mes

---

## Slide 5.5 — El Criterio Estadístico, Automatizado

### Título
"El criterio estadístico, automatizado"

### Lo que ves en la slide
- **Terminal con el código** de SciPy (`stats.proportions_ztest`) y su salida. Los números cambian
  con el slider, y en n = 4.000 reproducen exactamente el caso del guion: `[400, 464], [4000, 4000]`.
- **V5 · el slider de n** (500 → 50.000) que recalcula en vivo **z, p-valor, decisión y poder 1 − β**.
  Lecturas fijas: n = 4.000 → poder 66.5 % · n ≈ 5.519 → 80 % de poder · con 500 personas, 13.5 %.
- **Tira de los 3 usos** en el stack: auto-deploy de A/B · feature selection · alertas de anomalías.
- **Nota del especialista** al pie, con los dos caveats de ingeniería.

### Qué decir (guión)

**Intro**: "Y aquí es donde esto se vuelve útil de verdad. En software el criterio no lo decide una
persona: lo decide una línea de código. La librería te devuelve el p-valor, y la comparación con alpha
es una línea más."

**El slider**: "Y antes de decidir, mira esto, porque es la pregunta que se hacen todos demasiado
tarde: ¿cuánta muestra necesito? El efecto es el mismo —1.6 puntos porcentuales— en todos los casos.
Lo que cambia es tu capacidad de detectarlo. Con 500 personas por grupo, z = 0.8151, p = 0.4150: no hay
evidencia, y el poder es apenas 13.5 %. Con 4.000, p = 0.0211: sale. El poder sube al 66.5 %. Y para
tener 80 % de poder necesitas unas 5.519 personas por grupo."

**El remate**: "El efecto no cambia. Cambia tu capacidad de detectarlo. Por eso el poder se calcula
**antes** de recoger los datos, no después."

**Los usos**: "La misma línea vive en el auto-deploy de A/B, en la selección de variables de un modelo y
en las alertas de anomalías."

**El caveat**: "Y dos detalles de ingeniería que importan: alpha en configuración, no en la lógica. Y
atentos: veinte tests al 5 % dan un 64.15 % de probabilidad de al menos un falso positivo. Por eso
existen el ajuste de comparaciones múltiples y el pre-registro del análisis."

### Para el especialista
`stats.proportions_ztest(counts, nobs)` · `ttest_ind` · `mannwhitneyu`. Reportar **p-valor + tamaño
del efecto + intervalo de confianza**, y calcular el **poder** antes de recoger datos, no después. El
slider usa el estimador pooled (el mismo de SciPy): z = 0.016 / √(0.108 · 0.892 · 2/n).

### Cifras de esta slide
n = 500 → z = 0.8151, p = 0.4150, poder 13.5 % · n = 4.000 → z = 2.3054, p = 0.0211, poder 66.5 % · n = 5.519 → 80 % de poder · 20 tests al 5 % → 64.15 %

---

## Slide 5.6 — Lo que te Llevas

### Título
"Lo que te llevas"

### Lo que ves en la slide
- **Cheat sheet** de tres filas: α · p-valor · Decisión, con su fórmula y su cifra.
- **Tres reglas** numeradas.
- **Fila de cierre**: entrega del bloque al equipo + «¿Alguien tiene dudas?».

### Qué decir (guión)

**Recap**: "Para llevarse: alpha es el riesgo que fijaste antes; el p-valor es qué tan raro fue lo que
viste dado que nada cambió; y la decisión es solo compararlos."

**Las tres reglas**: "Uno: fija alpha antes de mirar los datos. Dos: reporta el p-valor con el tamaño
del efecto. Tres: si no rechazaste, no digas que son iguales — di que no tienes poder para detectarlo."

**El cierre y la entrega**: "Con esto cerramos el tema de significancia y p-valor. La regla la aplican
ahora en el contraste de hipótesis. ¿Alguien tiene dudas?"

### Para el especialista
El p-valor se reporta siempre acompañado del tamaño del efecto y del intervalo de confianza; α se
fija y se documenta antes de la recolección de datos; y el resultado de un contraste se enuncia como
«el efecto no es distinguible de cero con esta muestra», nunca como «no hay efecto».

### Cifras de esta slide
α = P(rechazar H₀ | H₀ verdadera) · p = P(datos tan extremos | H₀ cierta) = 0.0211 en nuestro caso

---

## Checklist de números verificados

**No recalcules nada en el escenario.** Todos verificados con cálculo real:

| Dato | Valor |
|---|---|
| E-commerce A/B | 400/4.000 (10.0 %) vs 464/4.000 (11.6 %) |
| z del caso | **2.3054** |
| p bilateral / unilateral | **0.0211** / 0.0106 |
| 20 monedas, 15 caras | P(X ≥ 15) = **0.0207** |
| Control de calidad | 1.000 piezas, 25 defectuosas, H₀ = 2 % → z = **1.1294**, p = **0.2587** |
| z críticos | 1.960 (α 0.05) · 2.576 (α 0.01) · 3.291 (α 0.001) |
| Poder con efecto 1.6 pp | n = 500 → 13.5 % · n = 4.000 → **66.5 %** · n = 5.519 → 80 % |
| β con n = 4.000 | 33.5 % (α 0.05) · 57.6 % (α 0.01) · 81.7 % (α 0.001) |
| 20 tests al α = 0.05 | **64.15 %** de al menos un falso positivo |
| Contraejemplo | n = 1.000.000, Δ = 0.1 pp → z = 2.357, p = 0.0184 → 1.000 órdenes extra (≈ 50.000 $/mes) |

## Checklist antes de exponer

- [ ] Ensayo cronometrado de las 7 slides: objetivo **17–18 min**, tope 20.
- [ ] `npm run build` sin errores y `node scripts/verify-deck.mjs` en verde.
- [ ] Los tres «NO es» dichos en voz alta, sin p-hacking verbal.
- [ ] Comprobar que el guion y lo que dices coinciden (el drawer **[HABLAR] Guión**).
- [ ] Si te pasas de 18 min: el cierre (`stats-5.6`) es lo primero que se recorta.
