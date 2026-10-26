# 📘 Guía de Estudio Completa y Teórica: Distribución Normal & Campana de Gauss

**Estudiante / Expositor:** Yandris Rivera  
**Materia:** Estadística Inferencial  
**Tema:** 2. Distribución Normal: Propiedades y uso de la campana de Gauss (con aplicación a Software)  
**Estructura de Exposición:** Dividida en 3 Diapositivas Pedagógicas (2.0, 2.1 y 2.2)

---

## 🧭 ¿QUÉ SIGNIFICA "±1σ", "±2σ", "±3σ" Y EL "ÁREA UNITARIA"? (Explicación para Entenderlo de Verdad)

### 1. ¿Qué es $\sigma$ (Sigma)?
$\sigma$ es simplemente la **desviación estándar**, es decir, la distancia promedio que los datos se alejan del centro.
* Si el tiempo promedio de tu endpoint es $\mu = 150\text{ ms}$ y la fluctuación es $\sigma = 20\text{ ms}$:
  * **$+1\sigma$** significa: $150 + 20 = 170\text{ ms}$ (un desvío hacia la derecha).
  * **$-1\sigma$** significa: $150 - 20 = 130\text{ ms}$ (un desvío hacia la izquierda).
  * **$\pm 1\sigma$** es el rango completo entre $[130\text{ ms} \text{ y } 170\text{ ms}]$.
  * **$\pm 2\sigma$** es el rango de dos desvíos: $[150 - 40, 150 + 40] = [110\text{ ms} \text{ y } 190\text{ ms}]$.
  * **$\pm 3\sigma$** es el rango de tres desvíos: $[150 - 60, 150 + 60] = [90\text{ ms} \text{ y } 210\text{ ms}]$.

### 2. ¿Qué significa "Área Unitaria Integral = 1.0 (100%)"?
En una campana de Gauss, la probabilidad no es la altura de la curva, sino el **área encerrada debajo de ella**.
* La certeza total de que ocurra cualquier evento en el universo es el $100\%$, que en matemáticas se escribe como el número **$1.0$**.
* Por lo tanto, toda el área total bajo la curva suma exactamente $1.0$.
* Cuando en la diapositiva elegís **$\pm 1\sigma$**, se ilumina la franja central que atrapa exactamente el **$68.27\%$** del área total ($0.6827$).
* Cuando elegís **$\pm 2\sigma$**, la franja se ensancha y atrapa el **$95.45\%$** del área ($0.9545$).
* Cuando elegís **$\pm 3\sigma$**, casi toda la campana queda iluminada con el **$99.73\%$** del área ($0.9973$). Solo quedan unas esquinas diminutas ($0.27\%$).

---

## 🖥️ LAS 3 DIAPOSITIVAS DE YANDRIS (Paso a Paso)

### 📍 Diapositiva 2.0: Fundamentos, Variables y la Ecuación Matemática
* **Objetivo:** Explicar la diferencia entre variables discretas (Poisson) y continuas (Gauss), y desglosar la fórmula.
* **Concepto:**
  * En software medimos magnitudes con infinitos decimales: latencias (`142.38 ms`), consumo de CPU (`64.1%`), uso de RAM (`1,024.5 MB`).
  * En variables continuas no se calcula la probabilidad de un punto exacto, sino el área entre dos límites.
* **La Fórmula:**
  $$f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x - \mu}{\sigma}\right)^2}$$
  * **$\mu$ (Mu):** Parámetro de **localización** (el centro/baseline donde está parado el pico).
  * **$\sigma$ (Sigma):** Parámetro de **escala** (la dispersión o variabilidad).

---

### 📍 Diapositiva 2.1: Cómo Interpretar la Campana de Gauss (Formas y Variación)
* **Objetivo:** Enseñar a leer la gráfica, qué significan las 3 sigmas y qué pasa cuando cambian los datos del sistema.
* **Modo A (La Regla de las 3 Sigmas):**
  * La gráfica ilumina la porción de probabilidad atrapada dentro de $\pm 1\sigma$ ($68\%$), $\pm 2\sigma$ ($95.4\%$) y $\pm 3\sigma$ ($99.7\%$).
* **Modo B (Simulador de Forma según $\sigma$):**
  * **Si $\sigma = 10$ (Servidor muy estable):** Los datos casi no varían; la campana se vuelve **alta y angosta** (leptocúrtica). Alta predictibilidad.
  * **Si $\sigma = 20$ (Variabilidad normal):** Forma estándar equilibrada.
  * **Si $\sigma = 35$ (Red inestable / jitter alto):** Los datos fluctúan mucho; como el área total siempre debe sumar 1, la campana se tiene que **aplanar y ensanchar** (platicúrtica).

---

### 📍 Diapositiva 2.2: Ejemplo Real en Software (`POST /api/v1/users`)
* **Objetivo:** Aplicar la teoría a un caso práctico de producción real.
* **El Endpoint:** Registro de nuevos usuarios.
* **¿Por qué converge a Gauss?** Porque suma 3 micro-operaciones concurrentes:
  1. Hashing de contraseña (Argon2 / Bcrypt en CPU).
  2. Conexión y escritura en base de datos PostgreSQL.
  3. Despacho asíncrono de evento a Kafka.
  * Por el principio aditivo de Gauss, la suma de estas pequeñas demoras converge a $\mu = 150\text{ ms}$ y $\sigma = 20\text{ ms}$.
* **Fórmula Z-Score y Diagnóstico con el Slider:**
  $$Z = \frac{X - \mu}{\sigma}$$
  * Si la request tarda **$150\text{ ms}$ a $180\text{ ms}$** ($|Z| < 2.0$): Estado **Verde** (Operación normal).
  * Si tarda **$190\text{ ms}$** ($Z = +2.0$): Estado **Amarillo** (Límite del SLA contractual del $97.7\%$, log `WARN` en APM).
  * Si sube a **$220\text{ ms}$** ($Z = +3.5$): Estado **Rojo** (Anomalía crítica con probabilidad $< 0.1\%$, posible ataque DoS o bloqueo, activando *Rate Limiting* en el Gateway).

---

## 🎙️ Tu Guión de Exposición para las 3 Diapositivas

### En la Slide 2.0 (Teoría y Ecuación - 45 segundos):
> *"Buenas tardes, soy Yandris Rivera. A mí me corresponde exponer la Distribución Normal y la Campana de Gauss.*  
> *Said nos mostró cómo contar eventos enteros con Poisson. Pero en infraestructura de servidores medimos magnitudes continuas: latencia en milisegundos, uso de CPU o consumo de memoria. La función f(x) describe esta realidad usando dos parámetros:*  
> *Mu, que ubica el centro nominal o baseline del servicio, y Sigma, que define la dispersión o variabilidad. Como es una variable continua, la probabilidad se calcula midiendo el área bajo la curva."*

### En la Slide 2.1 (Lectura de la Campana y Formas - 50 segundos):
> *"Pasemos a la Slide 2.1 para entender cómo se lee esta campana:*  
> *El área total bajo toda la curva representa siempre el 100% de los casos. Las franjas más o menos 1 sigma, 2 sigma y 3 sigma son márgenes fijos: el 68% de las peticiones caen en 1 sigma, el 95.4% en 2 sigmas, y el 99.7% en 3 sigmas.*  
> *Además, fíjense en la pestaña 'Variación de Forma': si el servidor es muy estable (sigma chico), la campana es esbelta y alta; si la red es inestable y hay fluctuaciones (sigma grande), la campana se tiene que aplanar y ensanchar para mantener la misma área total."*

### En la Slide 2.2 (Ejemplo Real POST /users - 55 segundos):
> *"Ahora apliquemos esto a un caso de software real: el endpoint POST /api/v1/users para registrar cuentas de usuario.*  
> *Este proceso suma tres cosas: el cifrado de la clave en CPU con Argon2, la conexión a PostgreSQL y el evento en Kafka. La suma de esas pequeñas demoras converge a una campana con media de 150 ms y desvío de 20 ms.*  
> *Si movemos el simulador de latencia en la pantalla: un registro en 190 ms da un Z-Score de +2.0, cumpliendo el SLA contractual del 97.7%. Pero si un intento tarda 220 ms, el Z-Score supera 3.5: la probabilidad de que eso sea normal es menor al 0.1%, permitiendo que el API Gateway detecte una anomalía o ataque y active rate limiting de inmediato.*  
> *Le doy el paso a Allison con el Teorema del Límite Central."*
