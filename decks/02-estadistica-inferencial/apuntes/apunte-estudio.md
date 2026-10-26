# Tema 2 — Estadística Inferencial: Apunte de Estudio y Preparación

---

## 0. El Fundamento: Población, Muestra y Error de Muestreo

### Definición Operativa
En ingeniería y ciencia de datos, prácticamente **nunca observamos a la población completa**. Solo tenemos acceso a una **muestra** finita y, a partir de ella, debemos inferir afirmaciones rigurosas sobre los **parámetros reales** desconocidos ($\mu$, $p$, $\sigma$). 

A este proceso de generalización inductiva fundamentada matemáticamente se le denomina **inferencia estadística**. El costo inevitable e inherente de trabajar con información parcial es el **error de muestreo**.

| Elemento | Definición Formal | En Ingeniería de Software | Ejemplo del Caso (A/B Test) |
| :--- | :--- | :--- | :--- |
| **Población** | Conjunto total de elementos bajo estudio | Todos los usuarios futuros del sistema | Totalidad de visitantes que navegarán por el e-commerce |
| **Parámetro** ($\mu, p, \sigma$) | Constante fija y desconocida de la población | Tasa de conversión verdadera o latencia media real | Tasa de conversión real $p$ del nuevo diseño de botón |
| **Muestra** ($n$) | Subconjunto representativo observado | Registros observados en una ventana temporal | $n = 4{,}000$ usuarios expuestos a la variante B |
| **Estadístico** ($\bar{x}, \hat{p}, s$) | Función calculada a partir de los datos muestrales | Métrica calculada en el log o base de datos | $\hat{p} = \frac{464}{4{,}000} = 11.6\%$ |
| **Error de Muestreo** | Discrepancia estocástica entre estadístico y parámetro | Desviación por azar entre métrica muestral y realidad | $\hat{p} - p_0 = 11.6\% - 10.0\% = +1.6\text{ pp}$ |

> [!IMPORTANT]
> **El error de muestreo no es un campo de la base de datos ni un error humano:** es una variable aleatoria cuantificable producto del muestreo. Justamente para modelar y acotar este error existen los **intervalos de confianza**, los **niveles de significancia ($\alpha$)** y los **$p$-valores**.

### El Ciclo de Inferencia de 4 Fases
Toda investigación o validación en producción debe respetar este flujo secuencial:

```text
1. FORMULAR   ──>  Definir H₀ (estado base / azar) y H₁ (efecto / mejora esperada)
2. MUESTREAR  ──>  Diseño experimental aleatorizado y cálculo de n a priori
3. CONTRASTAR ──>  Calcular estadístico muestral (z, t, χ²) y su p-valor asociado
4. DECIDIR    ──>  Comparar formalmente: ¿p ≤ α? → Rechazar H₀ : Evidencia insuficiente
```

> [!TIP]
> **Idea fuerza para la exposición:**  
> *"Inferir no es adivinar con mayor seguridad: es calcular con exactitud matemática cuánto margen de error estamos dispuestos a asumir antes de mirar los datos. Población, muestra y error de muestreo son los tres pilares que justifican la existencia de los intervalos de confianza y las pruebas de hipótesis."*

---

## 1. Distribuciones de Probabilidad: De lo Histórico a lo Predictivo

### Concepto General
Una **distribución de probabilidad** es un modelo matemático que asigna una probabilidad formal a cada resultado posible de un espacio muestral. Permite realizar inferencias predictivas sobre escenarios no observados, superando la limitación de los resúmenes descriptivos de datos históricos.

| Criterio | Distribución Discreta | Distribución Continua |
| :--- | :--- | :--- |
| **Dominio** | Conteo de eventos enteros: $k \in \{0, 1, 2, 3, \dots\}$ | Magnitudes en un intervalo real continuo: $x \in \mathbb{R}$ |
| **Métricas Típicas** | Usuarios concurrentes, peticiones HTTP, transacciones | Latencia de red, tiempo de respuesta (ms), consumo de CPU/RAM |
| **Función de Probabilidad** | Masa de probabilidad: $P(X = k)$ tiene valor puntual | Densidad de probabilidad: $f(x)$. Puntos aislados tienen $P(X=x) = 0$ |
| **Modelos Principales** | **Poisson**, Binomial, Bernoulli, Geométrica | **Normal (Gauss)**, Exponencial, $t$-Student |

> [!NOTE]
> **El salto cualitativo:** Un histograma describe lo que ya ocurrió; una distribución matemática modela el proceso generador subyacente. Permite responder preguntas de capacidad como: *"Si el tráfico escala a 50 req/s, ¿cuál es la probabilidad exacta de saturar el buffer del microservicio?"*

---

### 1.1 Distribución de Poisson: Modelado de Llegadas y Eventos en el Tiempo
Un proceso de Poisson modela el número de eventos discretos independientes que ocurren en un intervalo fijo de tiempo o espacio, bajo tres supuestos:
1. **Independencia:** La ocurrencia de un evento no altera la probabilidad de ocurrencia de otro.
2. **Tasa media constante:** La tasa media de llegadas ($\lambda$) permanece uniforme durante la ventana de análisis.
3. **No simultaneidad:** Dos eventos no pueden ocurrir exactamente en el mismo instante infinitesimal.

#### Función de Masa de Probabilidad (FMP)
$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k \in \{0, 1, 2, \dots\}$$

Donde:
* $\lambda > 0$ es el parámetro del modelo: representa tanto la media ($E[X] = \lambda$) como la varianza ($\text{Var}(X) = \lambda$).
* $e \approx 2.71828$ es la base de los logaritmos naturales.

#### Aplicación Práctica: Gestión de Capacidad y Dimensionamiento de Servidores
Consideremos un microservicio que recibe una tasa media $\lambda = 30\text{ req/s}$ y dispone de una capacidad nominal de atención de $30\text{ req/s}$ sin encolamiento.

| Objetivo de Ingeniería | Expresión Matemática | Resultado Numérico | Implicación de Negocio |
| :--- | :--- | :--- | :--- |
| Probabilidad de **cero llegadas** en 1 segundo | $P(X = 0) = e^{-30}$ | $9.36 \times 10^{-14} \approx 0$ | Tráfico constante; el hilo nunca permanece ocioso |
| Probabilidad de **desbordamiento** ($> 40\text{ req/s}$) | $P(X > 40) = 1 - P(X \le 40)$ | $\approx 3.2\%$ | 3 de cada 100 segundos se experimenta encolamiento |
| **Capacidad de provisión** recomendada ($95.45\%$ conf.) | $C = \lambda + 2\sqrt{\lambda}$ | $30 + 2\sqrt{30} \approx 40.95 \implies \mathbf{41\text{ req/s}}$ | Capacidad necesaria para absorber ráfagas sin degradación |

```python
from scipy import stats

lambd = 30
prob_overflow = 1 - stats.poisson.cdf(40, mu=lambd)
print(f"Probabilidad de desborde (>40 req/s): {prob_overflow:.4%}")  # 3.2084%
```

#### El Puente de Poisson a la Distribución Normal
Cuando el parámetro $\lambda$ es grande ($\lambda \ge 20$), la distribución de Poisson pierde asimetría y converge a una **Distribución Normal**:

$$X \sim \text{Poisson}(\lambda) \xrightarrow{\lambda \gg 1} \mathcal{N}(\mu = \lambda, \, \sigma^2 = \lambda)$$

Esta convergencia demuestra la interconexión teórica del programa: **Poisson $\rightarrow$ Normal $\rightarrow$ Teorema del Límite Central**.

---

### 1.2 Variables Discretas en Productos Digitales e Infraestructura
* **Gestión de colas de mensajería:** Mensajes entrantes por segundo en tópicos de Apache Kafka o RabbitMQ.
* **Métricas de conversión:** Cantidad de compras cerradas por hora en una pasarela de pago.
* **Monitoreo de fiabilidad (SRE):** Excepciones HTTP 5xx registradas por minuto en APM (Datadog/Prometheus).
* **Operaciones logísticas:** Pedidos completados por unidad de tiempo en centros de distribución.

---

## 2. Distribución Normal: Propiedades y Campana de Gauss

### 2.1 La Ecuación de Densidad y Parámetros
La distribución normal o gaussiana es el pilar de la inferencia paramétrica continua. Está gobernada exclusivamente por dos parámetros: la media poblacional $\mu$ (localización central) y la desviación estándar $\sigma$ (dispersión o escala).

$$f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left( -\frac{(x - \mu)^2}{2\sigma^2} \right), \quad x \in \mathbb{R}$$

```text
                        μ
                        │
                     ┌──┴──┐
                    ╱   │   ╲
                   ╱    │    ╲
                  ╱  68.27%   ╲
                ┌─┴─────┼─────┴─┐        μ ± 1σ
               ╱│       │       │╲
             ┌─┴┴───────┼───────┴┴─┐      μ ± 2σ (95.45%)
            ─┴──────────┴──────────┴─     μ ± 3σ (99.73%)
```

### 2.2 Propiedades Matemáticas Fundamentales
1. **Simetría perfecta:** Coincidencia exacta de las tres medidas de tendencia central en el eje de simetría: $\mu = \text{Mediana} = \text{Moda}$.
2. **Integral unitaria:** El área total bajo la curva de densidad es idénticamente igual a 1: $\int_{-\infty}^{\infty} f(x) dx = 1$.
3. **Puntos de inflexión:** La concavidad de la curva cambia en $x = \mu - \sigma$ y $x = \mu + \sigma$.
4. **Regla Empírica 68–95–99.7:**
   * $\mu \pm 1\sigma$ concentra el **$68.27\%$** del área probabilística.
   * $\mu \pm 2\sigma$ concentra el **$95.45\%$** del área (base del estándar de tolerancia industrial).
   * $\mu \pm 3\sigma$ concentra el **$99.73\%$** del área (fundamento de metodologías Six Sigma y detección de anomalías).

---

### 2.3 Estandarización: El Z-Score como Métrica Universal
La transformación a variable normal tipificada $Z \sim \mathcal{N}(0, 1)$ elimina las unidades físicas de medida y cuantifica la distancia entre una observación $x$ y la media en unidades de dispersión:

$$Z = \frac{x - \mu}{\sigma}$$

#### Caso Práctico en Arquitectura de Software (`POST /api/v1/users`)
Un endpoint de registro ejecuta tres etapas secuenciales (cálculo de hash Argon2, persistencia en PostgreSQL y publicación en broker). La latencia agregada se distribuye de forma aproximadamente normal con parámetros:
$$\mu = 150\text{ ms}, \quad \sigma = 20\text{ ms}$$

| Latencia Observada ($x$) | Z-Score ($Z = \frac{x - 150}{20}$) | Percentil Teórico Acumulado | Diagnóstico de Infraestructura |
| :--- | :--- | :--- | :--- |
| **$150\text{ ms}$** | $Z = 0.00$ | $50.00\%$ | Comportamiento nominal central |
| **$190\text{ ms}$** | $Z = +2.00$ | $97.72\%$ | Límite superior del SLA estándar de servicio |
| **$220\text{ ms}$** | $Z = +3.50$ | $99.98\%$ | Anomalía estadística extrema $\rightarrow$ Posible contención o bloqueo |

```python
from scipy import stats

mu, sigma = 150, 20
percentil_190 = stats.norm.cdf(190, loc=mu, scale=sigma)
print(f"P(X <= 190 ms): {percentil_190:.2%}")  # 97.72%
```

---

## 3. Teorema del Límite Central (TLC): El Puente de la Inferencia

### 3.1 Enunciado y Formalismo Matemático
Sean $X_1, X_2, \dots, X_n$ variables aleatorias independientes e idénticamente distribuidas (i.i.d.) provenientes de una población arbitraria con media finita $\mu$ y varianza finita $\sigma^2$ (sin importar si la población original es sesgada, bimodal, uniforme o discreta). A medida que el tamaño muestral $n$ crece, la media muestral $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$ converge en distribución hacia una normal:

$$\bar{X} \xrightarrow{d} \mathcal{N}\left(\mu, \, \sigma_{\bar{X}}^2 = \frac{\sigma^2}{n}\right)$$

O expresado en su forma estandarizada:

$$Z = \frac{\bar{X} - \mu}{\frac{\sigma}{\sqrt{n}}} \xrightarrow{d} \mathcal{N}(0, 1)$$

> [!IMPORTANT]
> **El valor del TLC:** No afirma que los datos crudos se conviertan en una campana de Gauss. Establece que **la distribución muestral de la media** adquiere forma de campana, lo que habilita el uso de tablas normales y modelos lineales sobre métricas agregadas de cualquier proceso real.

---

### 3.2 Error Estándar de la Media ($SE$)
La desviación estándar de la distribución muestral de la media se denomina **Error Estándar ($SE$)**:

$$SE = \frac{\sigma}{\sqrt{n}}$$

* **Propiedad de precisión:** El margen de variabilidad de las medias disminuye de forma inversamente proporcional a la raíz cuadrada del tamaño de la muestra ($\sqrt{n}$).
* **Consecuencia de costo en recolección de datos:** Para reducir el error estándar a la mitad, es estrictamente necesario **cuadruplicar** el tamaño de la muestra ($4n$).

---

### 3.3 Las 4 Condiciones de Aplicabilidad
Para aplicar con rigor el Teorema del Límite Central se deben verificar los siguientes requisitos:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ CONDICIONES DEL TEOREMA DEL LÍMITE CENTRAL                             │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Muestreo Aleatorio       ──> Selección libre de sesgos sistemáticos.│
│ 2. Independencia Muestral   ──> Eventos no correlacionados entre sí.   │
│                                 (Regla del 10%: n ≤ 10% de Población)  │
│ 3. Variable Cuantitativa    ──> Escala de medición de intervalo/razón. │
│ 4. Muestra Suficiente       ──> Si datos no son normales: n ≥ 30       │
│                                 (Distribuciones muy sesgadas: n > 100) │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.4 El Criterio $n \ge 30$
En variables provenientes de ensayos Bernoulli ($X \in \{0, 1\}$), la media muestral es la proporción $\hat{p}$. La aproximación normal de la binomial (Teorema de De Moivre–Laplace) exige que $n \cdot p \ge 10$ y $n \cdot (1 - p) \ge 10$. En el caso simétrico ($p = 0.5$), $n \approx 40$ cubre la condición con holgura. La regla práctica de $n \ge 30$ es el estándar empírico mínimo aceptado para variables asimétricas moderadas.

---

## 4. Margen de Error e Intervalos de Confianza

### 4.1 Construcción Matemática
Un **intervalo de confianza (IC)** para un parámetro desconocido $\mu$ (con $\sigma$ conocida o estimada mediante $s$ con muestra suficiente) al nivel de confianza $1 - \alpha$ es un rango aleatorio acotado por:

$$IC_{1 - \alpha} = \left[ \bar{x} - Z_{\alpha/2} \frac{\sigma}{\sqrt{n}}, \,\, \bar{x} + Z_{\alpha/2} \frac{\sigma}{\sqrt{n}} \right]$$

El **Margen de Error ($ME$)** corresponde a la semi-amplitud del intervalo:

$$ME = Z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$$

---

### 4.2 Niveles de Confianza Típicos y Valores Críticos

| Nivel de Confianza ($1 - \alpha$) | Nivel de Riesgo ($\alpha$) | Valor Crítico Bilateral ($Z_{\alpha/2}$) | Escenario de Aplicación |
| :---: | :---: | :---: | :--- |
| **$90\%$** | $0.10$ | $1.645$ | Exploración inicial de features / prototipado rápido |
| **$95\%$** | $0.05$ | **$1.960$** | Estándar de la industria para A/B testing y analítica digital |
| **$99\%$** | $0.01$ | $2.576$ | Sistemas de pago, análisis de riesgo financiero o biomédico |

> [!NOTE]
> **La dualidad matemática entre IC y $\alpha$:**  
> El $5\%$ que queda fuera de un intervalo de confianza del $95\%$ es exactamente el nivel de significancia $\alpha = 0.05$. El intervalo de confianza y la prueba de hipótesis bilateral son dos representaciones de la misma región de plausibilidad matemática.

---

### 4.3 Interpretación Frecuentista Rigurosa vs. Falacia Clásica

> [!IMPORTANT]
> **Interpretación Frecuentista Correcta:**  
> *"Si repitiéramos el proceso de muestreo un número infinito de veces bajo idénticas condiciones y construyéramos un intervalo para cada muestra, el $95\%$ de los intervalos calculados contendrían al parámetro poblacional fijo $\mu$."*

> [!WARNING]
> **La Falacia Común (Error Conceptual Grave):**  
> ❌ *"Existe un $95\%$ de probabilidad de que el parámetro $\mu$ caiga dentro de este intervalo calculado."*  
> **Fundamento del error:** En la inferencia frecuentista, el parámetro $\mu$ **no es una variable aleatoria**, sino una constante poblacional fija. Una vez calculados los extremos del intervalo con datos numéricos, no hay probabilidad: el parámetro o bien está dentro ($P=1$) o está fuera ($P=0$). La probabilidad reside en el **método de estimación**, no en el parámetro.

---

### 4.4 Dinámica del Margen de Error ($n$ vs. $\sigma$)
El margen de error es independiente del valor puntual observado $\bar{x}$. Depende únicamente de la varianza poblacional y del tamaño muestral.

Suponiendo una dispersión fija $\sigma = 0.20$ al $95\%$ de confianza ($Z_{\alpha/2} = 1.96$):

| Tamaño Muestral ($n$) | Error Estándar ($SE = \frac{0.20}{\sqrt{n}}$) | Margen de Error ($ME = 1.96 \cdot SE$) | Amplitud Total del IC ($2 \cdot ME$) |
| :---: | :---: | :---: | :---: |
| **$100$** | $0.0200$ | $\pm 0.0392$ ($\pm 3.92\text{ pp}$) | $7.84\text{ pp}$ |
| **$400$** | $0.0100$ | $\pm 0.0196$ ($\pm 1.96\text{ pp}$) | $3.92\text{ pp}$ |
| **$4{,}000$** | $0.0032$ | $\pm 0.0062$ ($\pm 0.62\text{ pp}$) | $1.24\text{ pp}$ |

---

## 5. Nivel de Significancia ($\alpha$) y $p$-valor: El Criterio de Decisión

### 5.1 Planteamiento de Hipótesis
Toda prueba formal contrasta dos proposiciones exhaustivas y mutuamente excluyentes:

* **Hipótesis Nula ($H_0$):** Representa el estado por defecto, la conservación del statu quo o la ausencia de efecto real.
  $$H_0: \mu_1 = \mu_2 \quad \text{o} \quad H_0: p_1 = p_2$$
* **Hipótesis Alternativa ($H_1$):** Representa la afirmación del investigador o el cambio detectable.
  * *Bilateral (dos colas):* $H_1: p_1 \ne p_2$ (interesa detectar cualquier discrepancia significativa).
  * *Unilateral (una cola):* $H_1: p_1 > p_2$ (direccional, definida estrictamente a priori).

> [!WARNING]
> **Prohibición de $p$-hacking direccional:** La hipótesis alternativa $H_1$ debe redactarse **antes** de inspeccionar los resultados muestrales. Si se examinan los datos y luego se elige una prueba unilateral porque el estadístico favorece la dirección observada, se reduce artificialmente el $p$-valor a la mitad, invalidando la validez causal de la inferencia.

---

### 5.2 Nivel de Significancia ($\alpha$): El Presupuesto de Error Tipo I
El nivel de significancia $\alpha$ es la probabilidad condicional de cometer un **Error Tipo I** (falso positivo):

$$\alpha = P(\text{Rechazar } H_0 \mid H_0 \text{ es Verdadera})$$

* Se fija obligatoriamente de forma **previa a la captura de datos**.
* Funciona como un presupuesto estricto de error tolerable. Fijar $\alpha = 0.05$ implica asumir que, en 5 de cada 100 contrastes donde el efecto no exista, la prueba arrojará una falsa alarma por azar.

---

### 5.3 Matriz de Confusión en Decisiones Estadísticas
Toda decisión estadística se evalúa según la siguiente matriz de contingencia:

| Decisión Tomada | Realidad: $H_0$ es Verdadera (Sin Efecto) | Realidad: $H_0$ es Falsa (Existe Efecto Real) |
| :---: | :---: | :---: |
| **No Rechazar $H_0$** | **Decisión Correcta**<br>Probabilidad $= 1 - \alpha$ (Nivel de Confianza) | **Error Tipo II ($\beta$)**<br>Falso Negativo (Efecto no detectado) |
| **Rechazar $H_0$** | **Error Tipo I ($\alpha$)**<br>Falso Positivo (Alarma falsa) | **Decisión Correcta**<br>Probabilidad $= 1 - \beta$ (**Potencia Estadística**) |

#### El Trade-off Ineludible entre $\alpha$ y $\beta$
Para un tamaño muestral $n$ constante, la reducción de $\alpha$ incrementa inevitablemente la probabilidad de cometer un Error Tipo II ($\beta$). 

*Ejemplo en el caso de conversión ($n = 4{,}000$ por variante, efecto real esperado de $+1.6\text{ pp}$):*
* Si se define $\alpha = 0.05 \implies \text{Potencia} = 66.5\% \quad (\beta = 33.5\%)$.
* Si se exige $\alpha = 0.001 \implies \text{Potencia} = 18.3\% \quad (\beta = 81.7\%)$.

---

### 5.4 Potencia Estadística ($1 - \beta$) y Tamaño Muestral Requerido
La potencia estadística mide la sensibilidad de la prueba para detectar un efecto real de magnitud $\delta$. El estándar de la industria exige una potencia mínima del **$80\%$** ($\beta = 0.20$).

Para comparar dos proporciones con una diferencia mínima detectable $\delta = p_1 - p_2$, el tamaño muestral aproximado por variante se formula:

$$n \approx \frac{\left(Z_{\alpha/2} + Z_{1 - \beta}\right)^2 \cdot 2 \cdot \bar{p}(1 - \bar{p})}{\delta^2}$$

| Tamaño Muestral por Grupo ($n$) | Z Observado | $p$-valor | Potencia para Detectar $+1.6\text{ pp}$ |
| :---: | :---: | :---: | :---: |
| **$500$** | $0.8151$ | $0.4150$ | $13.5\%$ (Completamente subdimensionado) |
| **$4{,}000$** | $2.3054$ | $0.0211$ | $66.5\%$ (Riesgo de falso negativo moderado) |
| **$\approx 5{,}519$** | — | — | **$80.0\%$** (Muestra requerida para diseño óptimo) |

---

### 5.5 El $p$-valor: Definición Operativa y Desmitificación

$$p\text{-valor} = P(\text{Obtener un estadístico tan o más extremo que el observado} \mid H_0 \text{ es verdadera})$$

* Es una **probabilidad condicional** calculada sobre la hipótesis nula, no sobre la hipótesis alternativa.
* Es una **medida de consistencia** de los datos observados con respecto a un modelo de puro ruido/azar.
* Corresponde al área bajo la curva en las colas de la distribución de referencia.

---

### 5.6 Regla de Decisión Formal

$$\begin{cases}
p\text{-valor} \le \alpha & \implies \text{\textbf{Rechazar }} H_0 \quad (\text{Existe evidencia estadística suficiente a favor de } H_1) \\
p\text{-valor} > \alpha & \implies \text{\textbf{No Rechazar }} H_0 \quad (\text{Evidencia insuficiente; se retiene } H_0)
\end{cases}$$

> [!IMPORTANT]
> **No rechazar $H_0$ NO equivale a aceptar $H_0$:**  
> La ausencia de evidencia estadística no constituye evidencia de equivalencia. Si una prueba con $n = 500$ arroja $p = 0.415$, no demuestra que las variantes sean idénticas; demuestra que el experimento carece de potencia para descartar el efecto del azar.

---

### 5.7 Cuatro Grandes Confusiones sobre el $p$-valor

| Frase Común | Fundamento del Error | Formulación Correcta |
| :--- | :--- | :--- |
| *"El $p$-valor es la probabilidad de que $H_0$ sea verdadera."* | Invierte la dirección de la probabilidad condicional ($P(\text{Datos} \mid H_0) \ne P(H_0 \mid \text{Datos})$). | Es la probabilidad de los **datos observados**, asumiendo que $H_0$ fuese cierta. |
| *"Un $p$-valor muy pequeño indica un tamaño de efecto grande."* | Confunde significancia estadística con relevancia práctica. El estadístico $Z \propto \sqrt{n}$. | Con muestras masivas, diferencias minúsculas alcanzan significancia formal sin valor de negocio. |
| *"El $p$-valor es la probabilidad de que el resultado se deba al azar."* | Asigna una causa probabilística al evento sin considerar sesgos o modelos alternativos. | Es el grado de compatibilidad empírica entre las observaciones y el modelo estocástico nulo. |
| *"Si $p > \alpha$, queda demostrado que las variantes son iguales."* | Confunde insuficiencia de prueba con verificación afirmativa de igualdad. | La muestra no aportó evidencia concluyente para refutar el statu quo. |

#### El Caso Comparativo: Significancia Estadística vs. Impacto Económico Real
* **Escenario de Muestra Masiva ($n = 1{,}000{,}000$ por grupo):**  
  Un incremento marginal de $\Delta = 0.1\text{ pp}$ ($10.0\%$ vs $10.1\%$) arroja $Z = 2.357 \implies p = 0.0184$ (altamente significativo con $\alpha = 0.05$). En una operación de escala masiva, $0.1\text{ pp}$ equivale a **$1{,}000$ órdenes mensuales adicionales**, lo que con un ticket promedio de $\$50$ representa **$\$50{,}000\text{ USD/mes}$**.
* **Escenario de Muestra Acotada ($n = 4{,}000$ por grupo):**  
  Un incremento sustancial de $\Delta = 1.6\text{ pp}$ ($10.0\%$ vs $11.6\%$) arroja $Z = 2.305 \implies p = 0.0211$. No obstante, sobre una base de $4{,}000$ clientes, representa **$64$ órdenes adicionales** ($\approx \$3{,}200\text{ USD/mes}$).

---

### 5.8 Implementación Automatizada en Software

```python
from statsmodels.stats.proportion import proportions_ztest

# Definición de hiperparámetro de riesgo en configuración (no hardcodeado)
ALPHA = 0.05

# Éxitos observados y tamaños de muestra por variante
exitos = [464, 400]        # Variante B vs Variante A
muestras = [4000, 4000]

# Ejecución formal del contraste
z_stat, p_val = proportions_ztest(count=exitos, nobs=muestras, alternative='two-sided')

# Inferencia programática
decision = "Rechazar H0 (Efecto Significativo)" if p_val <= ALPHA else "Evidencia Insuficiente"
print(f"Z = {z_stat:.4f} | p-valor = {p_val:.4f} | Decisión: {decision}")
```

> [!NOTE]
> **Detalle técnico de bibliotecas:** `proportions_ztest` forma parte del paquete **`statsmodels.stats.proportion`** y **no** reside en `scipy.stats`. SciPy provee `stats.ttest_ind`, `stats.chi2_contingency` y las funciones de distribución continua/discreta.

---

## 6. Contraste de Hipótesis: Selección de Pruebas Estadísticas

### 6.1 Matriz de Decisión según la Naturaleza de los Datos

| Prueba Estadística | Objetivo Analítico | Supuestos Teóricos | Estadístico Central |
| :--- | :--- | :--- | :---: |
| **$z$-test de proporciones** | Comparar dos tasas o proporciones de conversión | Muestras independientes, $n_i \cdot p_i \ge 5$ | $Z$ |
| **$t$-test de Student** (Welch) | Comparar la media continua de 2 grupos | Distribución normal o $n \ge 30$. No asume varianzas iguales | $t$ |
| **ANOVA ($F$-test)** | Comparar la media continua entre 3 o más grupos | Normalidad, homogeneidad de varianzas residuales | $F$ |
| **Chi-cuadrado ($\chi^2$)** | Evaluar independencia entre variables categóricas | Frecuencias observadas $\ge 5$ en celdas esperadas | $\chi^2$ |

---

### 6.2 Fórmulas Clave

#### $t$-test para Dos Muestras Independientes (Welch):
$$t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$$

#### $z$-test para Dos Proporciones:
$$Z = \frac{\hat{p}_1 - \hat{p}_2}{\sqrt{\hat{p}_{pooled}(1 - \hat{p}_{pooled}) \left(\frac{1}{n_1} + \frac{1}{n_2}\right)}}, \quad \hat{p}_{pooled} = \frac{x_1 + x_2}{n_1 + n_2}$$

---

### 6.3 Riesgo de Multiplicidad y Pruebas ANOVA
Si se evalúan múltiples variantes (por ejemplo, A vs B, A vs C, B vs C) ejecutando pruebas de dos muestras independientes al nivel $\alpha = 0.05$, la tasa de error global por familia de hipótesis (**Family-Wise Error Rate, FWER**) se infla drásticamente:

$$\text{FWER} = 1 - (1 - \alpha)^k$$

Para $k = 10$ comparaciones pareadas:
$$\text{FWER} = 1 - (0.95)^{10} \approx 40.13\%$$

Por este motivo, cuando se contrastan 3 o más variantes se utiliza inicialmente **ANOVA** (análisis global de varianza) o correcciones de multiplicidad formales (**Bonferroni**, **Holm**, o **Benjamini–Hochberg** para control de FDR).

---

### 6.4 Implementación en Python

```python
from scipy import stats
from statsmodels.stats.proportion import proportions_ztest

# 1. Z-test de proporciones (A/B testing de conversión)
z_stat, p_val_z = proportions_ztest([464, 400], [4000, 4000])

# 2. t-test de Student para medias continuas (latencia o ticket promedio)
t_stat, p_val_t = stats.ttest_ind(grupo_a, grupo_b, equal_var=False)

# 3. Chi-cuadrado de independencia para tablas de contingencia
chi2, p_val_chi, dof, expected = stats.chi2_contingency(tabla_contingencia)
```

---

## 7. Aplicaciones Prácticas en Ingeniería de Datos y Software

### 7.1 Estimación de Parámetros Poblacionales
Todo estadístico puntual presentado en un dashboard de monitoreo o métricas de negocio debe acompañarse de su incertidumbre muestral calculada mediante su intervalo de confianza.

### 7.2 Definición de SLAs y Garantías de Rendimiento
Un Service Level Agreement (SLA) es la formalización contractual de un intervalo de tolerancia estadística en el lenguaje del negocio:

| Requerimiento de Negocio / SLA | Formalización Estadística | Parámetros del Modelo |
| :--- | :--- | :--- |
| *"El $95\%$ de las solicitudes debe resolverse en $< 200\text{ ms}$"* | $P(X \le 200) \ge 0.95 \iff \mu + 1.645\sigma \le 200$ | Distribución Normal de latencias |
| *"La probabilidad de caída no superará 1 evento semanal"* | $P(X = 0) = e^{-\lambda} \ge 0.99 \implies \lambda \le 0.01$ | Distribución de Poisson para fallas |
| *"La tasa de checkout esperada es $11.6\% \pm 0.6\text{ pp}$ al $95\%$"* | $\hat{p} \pm Z_{0.025} \cdot \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$ | Intervalo de confianza de proporción |

---

### 7.3 Evaluación de Significancia en Variables Predictoras (Machine Learning)
Para integrar una nueva variable explicativa en un modelo productivo (e.g., regresión logística), se exige un triple filtro de admisibilidad:
1. **Significancia estadística:** El coeficiente $\beta_j$ debe exhibir un $p$-valor $< 0.05$ (test de Wald), confirmando que aporta señal por encima del ruido estocástico.
2. **Tamaño del efecto:** El Odds Ratio ($\exp(\beta_j)$) o la ganancia neta en AUC-ROC debe compensar el costo computacional de cálculo en inferencia en tiempo real.
3. **Ausencia de multicolinealidad:** El factor de inflación de la varianza debe controlarse ($\text{VIF} < 5$) para asegurar estabilidad en los coeficientes.

---

### 7.4 Protocolo Riguroso de A/B Testing
El despliegue experimental debe seguir una secuencia estricta:

1. **Definir hipótesis:** Fijar métrica primaria (OEC) y plantear $H_0$ y $H_1$ direccional/no direccional.
2. **Dimensionar muestra a priori:** Calcular $n$ en función de $\alpha = 0.05$, potencia $1 - \beta = 0.80$ y el MDE (Minimum Detectable Effect).
3. **Aleatorización uniforme:** Garantizar aislamiento del usuario y asignación balanceada en idéntica ventana temporal.
4. **Validar Sample Ratio Mismatch (SRM):** Contrastar si la distribución real de usuarios asignados coincide con el ratio diseñado.
5. **Calcular métricas y contrastar:** Evaluar el estadístico de prueba únicamente al cumplirse el tamaño muestral planificado.
6. **Reportar resultado integral:** Reportar simultáneamente: $p$-valor, diferencia absoluta ($\Delta\text{ pp}$), diferencia relativa ($\%$) e intervalo de confianza del impacto económico.

---

### 7.5 Trampas Comunes en Experimentación Digital

| Trampa Experimental | Mecanismo del Error | Solución Técnica |
| :--- | :--- | :--- |
| **Monitoreo Continuo (Peeking Problem)** | Evaluar el $p$-valor a diario y detener el test ante la primera señal de significancia infla el Error Tipo I real hasta superar el $30\%$. | Fijar la duración del test según cálculo de potencia y no tomar decisiones anticipadas, o aplicar métodos secuenciales (Sequential Testing / Always Valid p-values). |
| **Sample Ratio Mismatch (SRM)** | Asignación observada inconsistente con el diseño (e.g., diseño 50/50 que produce un reparto real 52/48 con $p < 0.001$). Revela problemas en la capa de redirección o tracking. | Ejecutar una prueba $\chi^2$ de bondad de ajuste sobre los volúmenes de usuarios por grupo antes de evaluar la conversión. |
| **Comparaciones Múltiples no Ajustadas** | Evaluar 20 métricas secundarias en simultáneo garantiza un $64.15\%$ de probabilidad de detectar al menos un falso positivo al azar. | Declarar una única métrica primaria a priori y aplicar corrección de Benjamini–Hochberg sobre métricas secundarias. |
| **Confundir Significancia con Negocio** | Resultados con $p = 0.0001$ logrados sobre millones de usuarios que representan un cambio económico irrelevante frente al costo de mantenimiento. | Evaluar siempre el intervalo de confianza del beneficio monetario neto esperado. |

---

## 8. Catálogo de Errores y Mitos a Desmentir (Guía Rápida)

| # | Afirmación Errónea | Veredicto | Fundamento Técnico y Corrección |
| :---: | :--- | :---: | :--- |
| **1** | *"El $p$-valor es la probabilidad de que la hipótesis nula sea cierta."* | ❌ | El $p$-valor modela $P(\text{Datos} \mid H_0)$, no $P(H_0 \mid \text{Datos})$. $H_0$ no tiene probabilidad frecuentista. |
| **2** | *"El $p$-valor mide la probabilidad de que los resultados se deban al azar."* | ❌ | Cuantifica la probabilidad de observar datos tan extremos asumiendo el modelo nulo como base de cálculo. |
| **3** | *"Un $p$-valor más pequeño implica que el cambio produjo un impacto mayor."* | ❌ | El $p$-valor depende del tamaño muestral $n$. El tamaño del efecto se mide en unidades reales de negocio ($\Delta\text{ pp}$, Cohen's $d$). |
| **4** | *"No haber rechazado $H_0$ demuestra que ambos grupos son iguales."* | ❌ | Es ausencia de evidencia concluyente. Con baja potencia, efectos relevantes pasan desapercibidos. |
| **5** | *"$\alpha$ representa la probabilidad de cometer cualquier error."* | ⚠️ | Representa exclusivamente la tasa condicional de falsos positivos ($P(\text{Rechazar } H_0 \mid H_0 \text{ es cierta})$). |
| **6** | *"Un IC del $95\%$ indica que el parámetro tiene un $95\%$ de probabilidad de estar dentro."* | ❌ | En la escuela frecuentista el parámetro es fijo. El $95\%$ alude a la tasa de acierto del procedimiento de estimación. |
| **7** | *"Si $n \ge 30$, la aplicación del TLC es automática e infalible."* | ❌ | Se requiere verificar aleatoriedad, independencia estricta y descartar distribuciones con colas infinitas o bimodalidad extrema. |
| **8** | *"Un $p$-valor elevado garantiza que no existe impacto alguno."* | ❌ | Con muestras reducidas, la varianza muestral opaca efectos reales de magnitud moderada. |
| **9** | *"Cualquier métrica que resulte estadísticamente significativa debe pasar a producción."* | ❌ | La significancia estadística debe contrastarse contra el análisis de costo-beneficio del desarrollo y despliegue. |
| **10** | *"Se puede observar la dirección de la muestra y definir luego la hipótesis unilateral."* | ❌ | Constituye $p$-hacking; incrementa el riesgo de falso positivo al doble del valor nominal declarado. |

---

## 9. Ejercicios Prácticos Resueltos Paso a Paso

### Ejercicio 1 · Modelo de Poisson en Dimensionamiento de Capacidad
**Enunciado:** Un microservicio de autenticación recibe en promedio $\lambda = 45\text{ peticiones por minuto}$. La capacidad de procesamiento de cada instancia es de $1.3\text{ segundos por solicitud}$.  
1. ¿Cuál es la capacidad máxima de procesamiento por minuto de una instancia?  
2. ¿Cuál es la probabilidad de que en un minuto dado se supere dicha capacidad (produciendo encolamiento)?  
3. ¿Con qué capacidad por minuto se debe aprovisionar el cluster para garantizar cobertura ante ráfagas al $95.45\%$ de confianza?

**Resolución:**
1. **Capacidad nominal de atención:**
   $$\text{Tasa de servicio} = \frac{60\text{ segundos}}{1.3\text{ s/petición}} \approx 46.15 \implies \mathbf{46\text{ peticiones/minuto}}$$
2. **Probabilidad de saturación de cola:**
   $$P(X > 46) = 1 - P(X \le 46) = 1 - \sum_{k=0}^{46} \frac{45^k e^{-45}}{k!} \approx \mathbf{0.4024} \quad (40.24\%)$$
   *Interpretación:* Aproximadamente 4 de cada 10 minutos la tasa de llegada superará la capacidad de procesamiento de una única instancia, provocando acumulación en el buffer.
3. **Capacidad de provisión recomendada:**
   $$C = \lambda + Z \cdot \sqrt{\lambda} = 45 + 2 \cdot \sqrt{45} = 45 + 2(6.708) = 58.42 \implies \mathbf{59\text{ req/min}}$$
   Con $59\text{ req/min}$, la probabilidad de saturación se reduce a:
   $$P(X > 59) \approx 0.0187 \quad (1.87\%)$$

---

### Ejercicio 2 · Verificación de SLA Mediante Z-Score
**Enunciado:** La métrica de latencia de una pasarela de pagos se modela como $X \sim \mathcal{N}(\mu = 150\text{ ms}, \, \sigma = 20\text{ ms})$. El contrato de servicio (SLA) garantiza que el $95\%$ de las peticiones responderán en menos de $200\text{ ms}$.  
1. ¿Cuál es el Z-score de $200\text{ ms}$ y qué porcentaje de cumplimiento real se tiene?  
2. ¿Cuál es el umbral de latencia exacto que corresponde al percentil $95\%$?

**Resolución:**
1. **Estandarización:**
   $$Z = \frac{200 - 150}{20} = \frac{50}{20} = \mathbf{+2.50}$$
   Consultando la distribución normal estándar:
   $$P(X \le 200) = \Phi(2.50) = \mathbf{0.9938} \quad (99.38\%)$$
   *Diagnóstico:* El sistema opera holgadamente dentro del SLA ($99.38\%$ frente al $95.00\%$ comprometido).
2. **Umbral exacto al $95\%$ de nivel de servicio ($Z_{0.95} = 1.645$):**
   $$x_{95\%} = \mu + Z_{0.95} \cdot \sigma = 150 + 1.645(20) = 150 + 32.9 = \mathbf{182.90\text{ ms}}$$

---

### Ejercicio 3 · Evaluación Crítica del TLC ante Distribuciones Asimétricas
**Enunciado:** Una API REST presenta latencias con una distribución fuertemente asimétrica (mediana $= 80\text{ ms}$, percentil 95 $= 400\text{ ms}$ y cola pesada por fallas de red). Un analista extrae una muestra de $n = 30$ peticiones continuas en horario valle y afirma: *"Como $n = 30$, la media muestral es exactamente normal por el Teorema del Límite Central, por lo que el sistema es predecible"*.  
¿Es rigurosa la afirmación?

**Resolución:**
La afirmación es metodológicamente incorrecta por las siguientes razones:
1. **Violación del supuesto de independencia:** Al capturar datos contiguos en una misma ventana horaria, existe correlación temporal (autocorrelación entre conexiones abiertas e infraestructura compartida).
2. **Sesgo de selección:** Los datos de horario valle no son representativos de la población total de peticiones del sistema.
3. **Insuficiencia del criterio $n = 30$ ante colas pesadas:** Cuando la asimetría es extrema o existen eventos de cola pesada (distribuciones tipo Pareto/Log-Normal), la aproximación normal exige tamaños muestrales significativamente mayores ($n \ge 100$ o superior).
*Dictamen:* Se deben verificar las 4 condiciones del TLC antes de asumir normalidad muestral.

---

### Ejercicio 4 · Dinámica de Reducción del Margen de Error
**Enunciado:** En un estudio de mercado sobre $n = 400$ usuarios, se observa una proporción de compra $\hat{p} = 0.42$.  
1. Calcule el margen de error del intervalo de confianza al $95\%$.  
2. ¿A cuánto se reduce el margen de error si se amplía la muestra a $n = 1{,}600$ observaciones?

**Resolución:**
1. **Margen de error con $n = 400$:**
   $$ME = Z_{0.025} \cdot \sqrt{\frac{\hat{p}(1 - \hat{p})}{n}} = 1.96 \cdot \sqrt{\frac{0.42 \cdot 0.58}{400}} = 1.96 \cdot \sqrt{\frac{0.2436}{400}} = 1.96 \cdot 0.02468 \approx \mathbf{\pm 0.0484} \quad (\pm 4.84\text{ pp})$$
2. **Margen de error con $n = 1{,}600$ (cuadruplicación de muestra):**
   $$ME = 1.96 \cdot \sqrt{\frac{0.2436}{1600}} = 1.96 \cdot 0.01234 \approx \mathbf{\pm 0.0242} \quad (\pm 2.42\text{ pp})$$
   *Conclusión:* Cuadruplicar el tamaño muestral redujo exactamente a la mitad el margen de error ($4.84\text{ pp} / 2 = 2.42\text{ pp}$), confirmando la dependencia $1/\sqrt{n}$.

---

### Ejercicio 5 · Diagnóstico de Fragilidad ante Muestras Pequeñas
**Enunciado:** Un test experimental preliminar con $n = 60$ usuarios por variante reporta un incremento en la tasa de conversión de $+2.0\text{ pp}$, obteniendo un $p$-valor $= 0.048$. El equipo solicita autorización inmediata para desplegar a escala global.  
¿Es estadísticamente defendible la decisión?

**Resolución:**
La decisión es desaconsejada por las siguientes evidencias:
1. **Baja potencia estadística:** Para detectar un efecto moderado de $+2.0\text{ pp}$ con solo $60$ observaciones por grupo, la potencia estadística del diseño es apenas del $\approx 6.5\%$.
2. **Inflación del Error Tipo M (Magnitud / Maldición del Ganador):** Cuando un experimento con potencia muy baja arroja significancia estadística ($p \le 0.05$), la estimación puntual del efecto suele estar sustancialmente sobreestimada por fluctuaciones favorables del azar.
3. **Fragilidad del umbral:** Un $p$-valor de $0.048$ es limítrofe con $\alpha = 0.05$. El cambio de estado en un único usuario alteraría el veredicto.  
*Recomendación:* Mantener la fase experimental hasta alcanzar el tamaño muestral requerido por el cálculo formal de potencia a priori.

---

### Ejercicio 6 · Interpretación de A/B Test con No Rechazo
**Enunciado:** Un experimento de comercio electrónico arroja las siguientes métricas:
* Variante A (Control): $n_A = 12{,}045$ visitantes, $1{,}204$ conversiones ($\hat{p}_A = 9.996\%$)
* Variante B (Tratamiento): $n_B = 12{,}098$ visitantes, $1{,}272$ conversiones ($\hat{p}_B = 10.514\%$)
El $z$-test reporta $Z = 1.33$ y un $p$-valor $= 0.184$. El Product Owner propone adoptar B argumentando que *"al menos no empeora y la conversión absoluta fue mayor"*.

**Resolución:**
1. **Contraste estadístico formal:**
   Con $\alpha = 0.05$, como $p = 0.184 > 0.05$, la decisión matemática es **No Rechazar $H_0$**.
2. **Evaluación de potencia:**
   Para una diferencia observada de $\Delta = 0.52\text{ pp}$, una muestra de $\approx 12{,}000$ usuarios por grupo otorga una potencia de apenas $\approx 25\%$.
3. **Decisión informada:**
   * La evidencia es **insuficiente** para atribuir el incremento a un efecto real del cambio de interfaz.
   * La adopción de B implica incurrir en costos de despliegue y mantenimiento sin garantía de retorno económico verificable. La conducta correcta es mantener A o extender el test hasta el tamaño de muestra que garantice potencia del $80\%$.

---

### Ejercicio 7 · Impacto de Multiplicidad de Métricas
**Enunciado:** Un dashboard analiza simultáneamente $k = 20$ métricas secundarias en un test donde no existe ningún efecto real ($H_0$ verdadera para todas). Si cada prueba se ejecuta individualmente con $\alpha = 0.05$:  
¿Cuál es la probabilidad exacta de obtener al menos un falso positivo?

**Resolución:**
Bajo el supuesto de independencia entre las pruebas:
$$P(\text{Al menos un falso positivo}) = 1 - P(\text{Ningún falso positivo})^{20} = 1 - (1 - \alpha)^{20}$$
$$FWER = 1 - (0.95)^{20} = 1 - 0.3585 = \mathbf{0.6415} \quad (64.15\%)$$
*Conclusión:* En casi dos tercios de las iteraciones de este tipo, el equipo celebrará un resultado "estadísticamente significativo" que es exclusivamente producto del ruido estocástico. Esto justifica la necesidad innegociable de aplicar ajustes como **Benjamini–Hochberg** o pre-registrar una única métrica primaria.

---

## 10. Recomendaciones Estratégicas para la Exposición Oral

> [!TIP]
> ### Claves para Defender el Tema con Solvencia Técnica
> 1. **Priorice la intuición conceptual antes que la deducción algebraica:** Introduzca la prueba de hipótesis mediante la analogía jurídica (presunción de inocencia como $H_0$, culpabilidad más allá de toda duda razonable como $H_1$, falso positivo como condenar a un inocente).
> 2. **Mantenga un hilo conductor único:** Utilice a lo largo de toda la presentación el caso del checkout del e-commerce. Cambiar de contexto entre secciones fragmenta la atención del jurado.
> 3. **Defienda el orden temporal riguroso:** Resalte que fijar $\alpha$ y calcular el tamaño muestral son pasos que preceden estrictamente a la recolección de métricas.
> 4. **Enfatice la frase de oro:** *"No rechazar la hipótesis nula no significa demostrar que las variantes sean idénticas; significa que la muestra no aportó evidencia suficiente para descartar el azar."*
> 5. **Presente la tríada de reporte obligatoria:** Ante cualquier consulta sobre un contraste, informe siempre:
>    $$\text{Reporte} = \left\{ p\text{-valor}, \,\, \text{Tamaño del Efecto } (\Delta\text{ pp}), \,\, \text{Intervalo de Confianza} \right\}$$

---

## 11. Banco de Preguntas de Autoevaluación

### Bloque 0 — Fundamentos
* ¿Por qué el error de muestreo no se puede calcular directamente a partir de la base de datos?
* ¿Qué diferencia conceptual existe entre un estadístico muestral y un parámetro poblacional?
* ¿Cuáles son las 4 fases secuenciales del ciclo de inferencia?

### Bloque 1 — Distribuciones
* ¿Qué diferencia a una función de masa de probabilidad de una función de densidad?
* ¿Cuál es el significado operativo del parámetro $\lambda$ en Poisson y cómo se vincula su media con su varianza?
* ¿Bajo qué condiciones una distribución de Poisson converge a una Normal?

### Bloque 2 — Distribución Normal
* ¿Por qué el eje vertical de la distribución normal no representa directamente probabilidades puntuales?
* ¿Cómo permite el Z-score comparar métricas de distinta naturaleza física (ms vs dólares)?
* ¿Qué porcentaje de observaciones se sitúa fuera del intervalo $\mu \pm 2\sigma$?

### Bloque 3 — Teorema del Límite Central
* ¿Qué converge a la normal según el TLC: los datos originales o la media muestral?
* ¿Cuáles son las 4 condiciones indispensables para aplicar el TLC?
* ¿Por qué el error estándar decrece con $\sqrt{n}$ y no de forma lineal con $n$?

### Bloque 4 — Intervalos de Confianza
* ¿Cómo se define formalmente un intervalo de confianza desde la perspectiva frecuentista?
* ¿Por qué es un error afirmar que el parámetro tiene un $95\%$ de probabilidad de encontrarse dentro del intervalo obtenido?
* ¿Qué factor determina el ancho del intervalo además de la dispersión de los datos?

### Bloque 5 — $\alpha$ y $p$-valor
* ¿Cuál es la diferencia entre el Error Tipo I y el Error Tipo II?
* Si reducimos $\alpha$ de $0.05$ a $0.001$, ¿qué ocurre con la potencia estadística de la prueba si mantenemos $n$ constante?
* ¿Por qué un $p$-valor muy pequeño no implica necesariamente una mejora comercial relevante?

### Bloque 6 — Contraste de Hipótesis
* ¿Qué criterios determinan la elección entre un $z$-test de proporciones, un $t$-test de Welch y una prueba ANOVA?
* ¿Por qué no es metodológicamente válido realizar 10 pruebas $t$ pareadas en lugar de un análisis ANOVA?
* ¿Qué biblioteca de Python contiene formalmente la función `proportions_ztest`?

### Bloque 7 — Aplicaciones Prácticas y Experimentación
* ¿Cómo se traduce un SLA contractual de ingeniería a un modelo de distribución estadística?
* ¿Qué es el Sample Ratio Mismatch (SRM) y por qué invalida un experimento antes de interpretar el $p$-valor?
* ¿Por qué el monitoreo diario con detención temprana (peeking) invalida el control de falsos positivos?

---

## 12. Datasets de Kaggle y Recursos Prácticos

Para validar empíricamente los conceptos de este apunte mediante código ejecutable, se recomiendan los siguientes conjuntos de datos abiertos descargables sin autenticación previa mediante `kagglehub`:

| Dataset | Identificador de Kaggle | Volumen | Relevancia Pedagógica | Licencia |
| :--- | :--- | :--- | :--- | :---: |
| **Marketing A/B Testing** | [`faviovaz/marketing-ab-testing`](https://www.kaggle.com/datasets/faviovaz/marketing-ab-testing) | $588{,}101$ usuarios | **Dataset Principal.** Contraste $z$ de proporciones, desbalance real $96/4$ y análisis de Sample Ratio Mismatch (SRM). | CC0 |
| **A/B Testing Clean Split** | [`aadbutt/ab-testing`](https://www.kaggle.com/datasets/aadbutt/ab-testing) | $294{,}478$ filas | Split balanceado $50/50$ con series temporales para modelado Poisson de llegadas y TLC en el tiempo. | Abierta |
| **Online Shoppers Purchasing Intention** | [`imakash3011/online-shoppers-purchasing-intention-dataset`](https://www.kaggle.com/datasets/imakash3011/online-shoppers-purchasing-intention-dataset) | $12{,}330$ sesiones | Variables predictoras continuas y categóricas para regresión logística, tablas de contingencia y test $\chi^2$. | UCI / CC BY |

### Notebook del Módulo
El notebook que resuelve integralmente estos ejercicios se encuentra disponible en:
* [`Practica/Estadistica/Practica_T02_Inferencia_Estadistica_AB_Testing.ipynb`](Practica/Estadistica/Practica_T02_Inferencia_Estadistica_AB_Testing.ipynb): Contiene 49 celdas ejecutadas (24 de código y 25 analíticas) con 7 visualizaciones pre-renderizadas que cubren el ciclo completo: Poisson de llegadas, campana de Gauss, verificación empírica del TLC, intervalos de confianza, contrastes $\chi^2$ y $z$-test con análisis de SRM, calibración del $p$-valor, cálculo de poder y decisión de negocio. Incluye además una sección **RETO EN PAREJAS** con entregables por criterio.
* Documentación de soporte y requerimientos: [`Practica/Estadistica/README.md`](Practica/Estadistica/README.md).

#### Hallazgos Empíricos Relevantes del Notebook:
1. **Rechazo del supuesto de Poisson homogéneo:** Con una tasa media observada de $\lambda = 24{,}504\text{ llegadas/hora}$, la varianza muestral excede ampliamente a la media ($\text{Índice de Dispersión} \approx 11{,}850$), evidenciando sobredispersión temporal que descarta el modelo de tasa constante y motiva un modelo Quasi-Poisson o Binomial Negativo.
2. **Calibración empírica del $p$-valor:** La simulación de $2{,}000$ experimentos bajo $H_0$ confirma que exactamente el $\approx 4.0\%$ de los contrastes caen en la región crítica bilateral $|Z| > 1.96$, corroborando la correspondencia con $\alpha = 0.05$.
3. **El Sample Ratio Mismatch (SRM) en datos reales:** Aunque el $z$-test reporta un $p$-valor altamente significativo ($p = 1.705 \times 10^{-13}$) con un incremento de $+0.77\text{ pp}$, el contraste $\chi^2$ sobre el reparto de asignación ($96\%$ expuestos a anuncios vs $4\%$ control) arroja $\chi^2 = 497{,}769$ ($p \approx 0$). Esto demuestra que el diseño experimental sufrió un sesgo de asignación en producción, invalidando la atribución causal directa del efecto.

---

## 13. Glosario Técnico Esencial

| Término | Definición Formal en una Línea |
| :--- | :--- |
| **Población vs. Muestra** | Totalidad de elementos bajo estudio vs. subconjunto observado representativo. |
| **Parámetro vs. Estadístico** | Constante fija de la población ($\mu, p, \sigma$) vs. valor calculado en la muestra ($\bar{x}, \hat{p}, s$). |
| **Error Estándar ($SE$)** | Desviación estándar de la distribución muestral de un estadístico ($SE = \sigma / \sqrt{n}$). |
| **Distribución de Poisson** | Modelo discreto que cuenta eventos independientes en intervalos fijos con tasa media $\lambda$. |
| **Distribución Normal** | Distribución continua simétrica en forma de campana gobernada por la media $\mu$ y la dispersión $\sigma$. |
| **Z-Score** | Número de desviaciones estándar que separan a una observación de su media ($Z = (x - \mu) / \sigma$). |
| **Teorema del Límite Central** | Principio que garantiza que la media muestral converge a una distribución normal para $n$ grande. |
| **Intervalo de Confianza** | Rango plausible de estimación para un parámetro poblacional al nivel de certeza $1 - \alpha$. |
| **Margen de Error ($ME$)** | Semi-amplitud del intervalo de confianza ($ME = Z_{\alpha/2} \cdot SE$). |
| **Nivel de Significancia ($\alpha$)** | Máxima probabilidad tolerable de cometer un falso positivo (Error Tipo I), fijada a priori. |
| **$p$-valor** | Probabilidad condicional de observar resultados tan o más extremos asumiendo que $H_0$ es cierta. |
| **Hipótesis Nula ($H_0$) / Alternativa ($H_1$)** | Modelo base que asume ausencia de efecto vs. proposición de investigación que postula un cambio real. |
| **Error Tipo I ($\alpha$) / Tipo II ($\beta$)** | Rechazo erróneo de $H_0$ verdadera (falso positivo) vs. no rechazo de $H_0$ falsa (falso negativo). |
| **Potencia Estadística ($1 - \beta$)** | Probabilidad de detectar con éxito un efecto real cuando este efectivamente existe. |
| **Sample Ratio Mismatch (SRM)** | Discrepancia estadísticamente significativa entre el ratio de tráfico diseñado y el observado. |
| **$p$-hacking** | Manipulación post hoc de hipótesis, métricas o muestras para forzar la significancia ($p \le \alpha$). |

---

## Material de Referencia en el Repositorio
* **Deck de diapositivas interactivo:** [`src/deckStats.jsx`](file:///home/yan2005dris-afk/Documentos/GitHub/Presentacion/src/deckStats.jsx) (26 slides, $\approx 47\text{ min}$).
* **Guion estructurado del bloque $\alpha$ y $p$-valor:** [`src/slides2/GUION-T05.md`](file:///home/yan2005dris-afk/Documentos/GitHub/Presentacion/src/slides2/GUION-T05.md).
* **Esquema de balance de tiempos de exposición:** [`REBALANCEO-EXPO.md`](file:///home/yan2005dris-afk/Documentos/GitHub/Presentacion/REBALANCEO-EXPO.md).
