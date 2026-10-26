# 📘 Guía de Estudio y Defensa: Bloque 2 · Distribución Normal

> **Expositor:** Yandris Rivera Torres (Software 7/1)  
> **Tema:** Distribución Normal: Propiedades y uso de la campana de Gauss en Software  
> **Estructura:** Exactamente tus 3 Diapositivas (`stats-2.0`, `stats-2.1`, `stats-2.2`)  
> **Objetivo:** Qué significa cada concepto, qué hace cada fórmula y cómo interactuar en vivo con la pantalla.

---

## 📍 DIAPOSITIVA 2.0: Fundamentos, Variables Continuas y la Ecuación

### 1. ¿Qué significa y qué hace lo que está en esta Diapositiva?

* **Variables Continuas (vs Discretas de Said):**  
  * **Qué significa:** Una variable discreta (Poisson) son conteos enteros sin decimales (0, 1, 2, 3 peticiones). Una variable continua son **mediciones físicas con infinitos decimales** (latencia de red: 142.38 ms, CPU: 64.12%, RAM: 1024.5 MB).
  * **Por qué cambia la probabilidad:** Como entre dos números cualesquiera hay infinitos números decimales posibles, la probabilidad matemática de acertarle a un valor con infinitos decimales exactos es 1 dividido infinito, es decir, cero. Por eso, en variables continuas **un punto individual NO tiene probabilidad**. La probabilidad se mide como el **ÁREA bajo la curva** dentro de un rango (ej. *¿cuál es la probabilidad de que la latencia caiga entre 130 ms y 170 ms?*).

* **La Ecuación de Densidad Normal f(x):**  
  * **Qué hace:** Esta fórmula **NO** es la probabilidad directa; es la función geométrica que **dibuja la curva de la campana**:
    * **μ (Mu):** Parámetro de **Centro o Localización**. Es el promedio del sistema. Si cambia, mueve la campana horizontalmente a la izquierda o derecha.
    * **σ (Sigma):** Parámetro de **Escala o Dispersión**. Mide cuánto fluctúan los datos. Si σ es pequeña, los datos están agrupados y la campana es alta y angosta; si σ es grande, la campana se aplana y se ensancha.
    * **(x - μ) / σ:** Mide a cuántas desviaciones estándar está tu valor consultado x respecto al centro.
    * **Factor 1 / (σ √(2π)):** Es el factor normalizador que obliga a que **toda el área total encerrada bajo la curva sume exactamente 1.0 (el 100% de los casos)**.

* **El Puente con Python (`scipy.stats.norm`):**  
  * En ingeniería nadie resuelve integrales a mano. En Python usamos `norm.pdf(x, loc=mu, scale=sigma)` para dibujar la campana, y `norm.cdf()` para calcular el área acumulada (la probabilidad) en una sola línea de código.

---

### 2. Qué decir durante la exposición (Guion oral)
> *"Buenos días con todos, soy Yandris Rivera. Pasamos al modelado de variables continuas.*  
> *A diferencia de lo que explicaba Said con Poisson —donde contábamos números enteros de peticiones—, en infraestructura casi todo lo que medimos es **continuo**: una latencia no tarda 150 ms exactos, tarda 142.38 ms.*  
> *En variables continuas, la probabilidad de un punto exacto con infinitos decimales es cero. Por eso la probabilidad se mide como el **área encerrada bajo la curva**.*  
> *Para dibujar esa campana usamos la función de densidad f(x) que ven a la derecha. Toda la forma de la campana depende de dos parámetros clave:*  
> * *μ (Mu), que marca el **centro de equilibrio** de nuestro sistema.*  
> * *σ (Sigma), que mide la **dispersión o fluctuación**.*  
> *Y en lugar de resolver integrales complejas, en software usamos librerías como `scipy.stats` que calculan estas probabilidades automáticamente."*

---

### 3. Cómo interactuar con la pantalla en la Slide 2.0
1. **Mover el Slider de μ (Mu):** Mostrá cómo al subir o bajar μ, la campana completa se desplaza horizontalmente sin cambiar su forma.
2. **Mover el Slider de σ (Sigma):** Mostrá cómo al subir σ, la campana se aplana y ensancha (inestabilidad); y al bajar σ, se vuelve alta y delgada (alta estabilidad).
3. **Clic en el botón "Ver cómo Python ahorra el cálculo" (Flip Card):** La tarjeta gira en 3D y muestra el código real en Python con `scipy.stats.norm.pdf()` y el gráfico generado por matplotlib.

---

## 📍 DIAPOSITIVA 2.1: Cómo Interpretar la Campana de Gauss

### 1. ¿Qué significa y qué hace lo que está en esta Diapositiva?

* **El Área Total Unitaria (= 1.0 o 100%):**  
  Toda el área debajo de la campana representa la totalidad de las observaciones posibles del universo (100%).

* **La Regla Empírica de las 3 Sigmas (Márgenes Universales):**  
  Como la forma de la campana es matemáticamente simétrica y fija, los porcentajes encerrados entre múltiplos de σ siempre son los mismos:
  * **μ ± 1σ (Entre 1 desvío a la izquierda y 1 a la derecha):** Atrapa el **68.27%** de los datos. Representa la zona cotidiana y habitual de operación.
  * **μ ± 2σ (Entre 2 desvíos a la izquierda y 2 a la derecha):** Atrapa el **95.45%** de los datos. Representa el rango normal de operación esperado.
  * **μ ± 3σ (Entre 3 desvíos a la izquierda y 3 a la derecha):** Atrapa el **99.73%** de los datos. Cubre prácticamente todo el sistema.
  * **Más allá de ± 3σ (|Z| > 3):** Solo queda el **0.27%** exterior (1 de cada 370 casos). Son anomalías, caídas o tráfico sospechoso.

* **Tipos de Campana y Deformaciones (Asimetría / Skewness):**  
  * **Simétrica (Skew = 0):** La Media, la Mediana y la Moda coinciden en el centro. (Ejemplo: frecuencia de reloj o variaciones térmicas en reposo).
  * **Sesgo Positivo / A la Derecha (Skew > 0):** La cola se estira hacia valores altos porque la **Media > Mediana > Moda**. (Ejemplo en software: latencia de peticiones web, donde el 95% responde rápido en 40 ms, pero unos pocos timeouts de 3000 ms inflan el promedio hacia la derecha).
  * **Sesgo Negativo / A la Izquierda (Skew < 0):** La cola se estira hacia valores bajos porque la **Media < Mediana < Moda**. (Ejemplo en software: Uptime SLA, donde casi todo opera al 99.9%, pero caídas puntuales al 70% estiran la cola hacia la izquierda).

---

### 2. Qué decir durante la exposición (Guion oral)
> *"Ahora aprendamos a **leer esta campana**.*  
> *La propiedad central es que **toda el área bajo la curva suma exactamente el 100% de los eventos**.*  
> *De ahí surge la famosa **Regla Empírica de las 3 Sigmas**:*  
> * *Si encendemos ± 1σ, cubrimos el **68.27%** de todas las peticiones habituales.*  
> * *Si abrimos a ± 2σ, atrapamos el **95.45%** de todo el tráfico normal.*  
> * *Y si abrimos a ± 3σ, tenemos el **99.73%** del comportamiento esperado del sistema. Lo que queda fuera es apenas el 0.27%, es decir, eventos sumamente atípicos.*  
> *Si pasamos a la pestaña de tipos de campana:*  
> * *Una campana normal ideal es simétrica.*  
> * *Pero en software, la latencia real suele tener **sesgo positivo a la derecha**: la mayoría de peticiones son rápidas, pero unos pocos timeouts extremos alargan la cola hacia valores altos e inflan el promedio."*

---

### 3. Cómo interactuar con la pantalla en la Slide 2.1
1. **Botones de Sigmas (± 1σ, ± 2σ, ± 3σ):** Hacé clic en cada botón. La campana iluminará las franjas de color violeta y actualizará el porcentaje exacto (68.3%, 95.5%, 99.7%).
2. **Pestaña "Tipos de Campana":** Hacé clic en la pestaña superior derecha. Verás los 3 botones:
   * **Simétrica:** Muestra la campana estándar.
   * **Sesgo a la Derecha:** Muestra la curva asimétrica con el ejemplo de latencia web y timeouts.
   * **Sesgo a la Izquierda:** Muestra la curva con el ejemplo del Uptime SLA.

---

## 📍 DIAPOSITIVA 2.2: Caso Práctico en Software (`POST /api/v1/users`)

### 1. ¿Qué significa y qué hace lo que está en esta Diapositiva?

* **El Endpoint Real:**  
  Analizamos un microservicio de registro de usuarios: `POST /api/v1/users`.  
  Este endpoint suma tres micro-operaciones:
  1. Hashing criptográfico Argon2 de la contraseña en CPU (aprox. 70 ms).
  2. Inserción de la fila en PostgreSQL (aprox. 50 ms).
  3. Publicación del evento en Apache Kafka (aprox. 30 ms).  
  La suma de estas operaciones independientes converge a una campana con promedio **μ = 150 ms** y desviación **σ = 20 ms**.

* **El Z-Score: `Z = (x - μ) / σ`**  
  * **Qué hace:** Estandariza la métrica eliminando las unidades físicas. Nos dice **a cuántas desviaciones estándar del centro está una petición que tardó x milisegundos**.
  * **Para qué se usa en software:**
    1. **Auditar SLAs:** Si el contrato exige responder en menos de 190 ms:  
       * **Fórmula:** `Z = (190 - 150) / 20 = +2.0`  
       * **Conclusión:** Como Z = +2.0 deja al 97.7% de los casos a la izquierda, sabemos con certeza matemática que el **97.7% del tráfico cumple el SLA**.
    2. **Detectar Anomalías y Ataques:** Si entra una petición que tarda 220 ms:  
       * **Fórmula:** `Z = (220 - 150) / 20 = +3.5`  
       * **Conclusión:** Un valor Z ≥ 3.0 tiene una probabilidad inferior al 0.02% (1 en 5.000). No es lentitud normal: delata un ataque de contraseñas complejas o degradación crítica de la base de datos, y el sistema activa el *rate-limiting*.

---

### 2. Qué decir durante la exposición (Guion oral)
> *"Aterricemos esto en producción con nuestro microservicio de usuarios: `POST /api/v1/users`.*  
> *Este endpoint procesa el hash Argon2, guarda en PostgreSQL y emite a Kafka. La suma de esas demoras converge a una campana con media de 150 ms y desviación de 20 ms.*  
> *Para tomar decisiones en código usamos el **Z-score**: `Z = (x - μ) / σ`.*  
> *Nos dice a cuántas desviaciones estándar está una petición de su promedio:*  
> * *Si el cliente pide un SLA de 190 ms (movemos el slider a 190 ms): calculamos Z = +2.0. Mirando la campana confirmamos que el **97.7% de las peticiones cumplen el contrato**.*  
> * *Pero si de repente entra una petición de 220 ms (movemos el slider a 220 ms): el Z-score salta a **+3.5**. Una probabilidad menor al 0.02% no es azar: delata un ataque de contraseñas o saturación, y el sistema activa el rate-limiting de forma automática.*  
> 
> *Para hacer todo esto asumimos que la latencia sigue una campana de Gauss. Pero en el mundo real, ¿qué nos garantiza que podemos usar la campana si los datos originales no son normales?*  
> *Le doy paso a Alisson con el Teorema del Límite Central."*

---

### 3. Cómo interactuar con la pantalla en la Slide 2.2
1. **Slider de Latencia:**
   * Mové el control deslizante a **190 ms**: en pantalla verás el cálculo automático `Z = +2.0`, con un badge verde que dice **"Cumple SLA (Percentil 97.7%)"**.
   * Mové el control deslizante a **220 ms**: el cálculo subirá a `Z = +3.5`, la interfaz cambiará a alerta roja con un badge de advertencia que dice **"Alerta Crítica: Anomalía / Rate Limiting Activado"**.
2. **Diagrama de Bloques:** Señalá los tres bloques de arquitectura (CPU Argon2 → DB PostgreSQL → Broker Kafka) para justificar por qué la suma de tiempos se distribuye como una campana.

---

## 📺 Videos de YouTube para Repasar Visualmente

1. **[StatQuest — The Normal Distribution, Clearly Explained!](https://www.youtube.com/watch?v=rzFX5faN3AY)** (Ideal para entender por qué la probabilidad es el área y qué hacen μ y σ).
2. **[Matemóvil — Distribución Normal y Tabla Z](https://www.youtube.com/watch?v=VES8qjbKnJs)** (Ideal para dominar el cálculo de Z y cómo interpretar las probabilidades).
3. **[3Blue1Brown — But what is the Central Limit Theorem?](https://www.youtube.com/watch?v=zeJD6J_ZnVE)** (Excelente para ver por qué sumar operaciones de microservicios forma una campana de Gauss).
