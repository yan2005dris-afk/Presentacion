import React from 'react';
import {
  SlidePortada2, SlideIndice2, SlideConceptoInferencia, SlideIntroSeccion,
  SlideInferencialFundamentos, SlidePoissonNegocio,
  SlideNormalFundamentos, SlideNormalCampanaLectura, SlideNormalSoftwareCaso,
  SlideTLCConcepto, SlideTLCTamanoMuestra, SlideTLCPropiedades, SlideTLCImportancia,
  SlideTLCEscenario, SlideTLCPasos, SlideTLCTablaZ, SlideTLCConclusion,
  SlideIntervalosConfianza, SlideIntervalosTamanoMuestra, SlideIntervalosCasoSoftware,
  SlideDecisionRiesgo, SlideAlphaCampana, SlidePValorSorpresa,
  SlideReglaDecision, SlidePValorNoEs, SlideCriterioSoftware, SlideCierreT05,
  SlideComparacionMedias,
  SlideABTestingAplicaciones, SlideConclusionesInferencial
} from './slides2';

// Bloques narrativos del deck: cada bloque responde una pregunta distinta.
//   A · Describir  ->  ¿qué comportamiento tiene el dato?
//   B · Afirmar    ->  ¿qué sabemos del parámetro real?
//   C · Decidir    ->  ¿el efecto es real o es ruido?
//   D · Usar       ->  ¿qué hago con esa decisión en software?
export const SECTIONS_STATS = [
  { id: 0, title: 'Portada e Índice', member: 'Grupo 3 y 4', color: 'from-blue-600 to-indigo-600', bloque: 'Apertura', minutos: 4 },
  { id: 1, title: 'Distribuciones de Probabilidad & Poisson', member: 'Said', color: 'from-cyan-500 to-blue-500', bloque: 'A · Describir', minutos: 5 },
  { id: 2, title: 'Distribución Normal & Gauss en Software', member: 'Yandris', color: 'from-purple-500 to-indigo-500', bloque: 'A · Describir', minutos: 6 },
  { id: 3, title: 'Teorema del Límite Central (TLC)', member: 'Alisson', color: 'from-teal-500 to-emerald-500', bloque: 'A · Describir', minutos: 4 },
  { id: 4, title: 'Margen de Error & Intervalos', member: 'Gino', color: 'from-amber-500 to-orange-500', bloque: 'B · Afirmar', minutos: 4 },
  { id: 5, title: 'Nivel de Significancia (α) & P-Valor', member: 'Andy', color: 'from-rose-500 to-pink-500', bloque: 'C · Decidir', minutos: 18 },
  { id: 6, title: 'Aplicaciones & Cierre', member: 'Grupo 3 y 4', color: 'from-blue-600 to-cyan-500', bloque: 'D · Usar', minutos: 6 },
];

export const getStatsSlides = (onSelectSection) => [
  {
    id: 'stats-0.0',
    section: 0,
    title: 'Estadística Inferencial y Toma de Decisiones',
    subtitle: 'Exposición Oficial · Grupo 3 y 4',
    speaker: 'Bienvenidos a la presentación de Estadística Inferencial. Hoy analizaremos el paso de los datos muestrales a decisiones certeras en software y negocio: Said, Yandris, Alisson, Gino y Andy abordaremos cada fundamento.',
    component: <SlidePortada2 />
  },
  {
    id: 'stats-0.1',
    section: 0,
    title: 'Agenda de Estadística Inferencial',
    subtitle: 'Asignación de Temas por Expositor',
    speaker: 'Nuestra agenda está distribuida entre Said (Distribuciones y Poisson), Yandris (Distribución Normal en Sistemas y Monitoreo), Alisson (Teorema del Límite Central), Gino (Intervalos de Confianza) y Andy (Significancia y P-Valor).',
    component: <SlideIndice2 onSelectSection={onSelectSection} secciones={SECTIONS_STATS} />
  },
  {
    id: 'stats-0.2',
    section: 0,
    title: '¿Qué es la Estadística Inferencial?',
    subtitle: 'Grupo 3 y 4 · Población, muestra y error de muestreo',
    speaker: 'Antes de empezar, una idea que sostiene toda la exposicion: nosotros nunca vemos a la poblacion entera. Nunca vemos a todos los usuarios ni todas las peticiones, solo una muestra. Y de esa muestra hay que sacar una afirmacion sobre el mundo real. Esa es la inferencia. Lo que no existe, el error de muestreo, es justo lo que mide el intervalo de confianza, el p-valor y alpha. Por eso la exposicion va en cuatro pasos: describir, afirmar, decidir y usar.',
    component: <SlideConceptoInferencia />
  },

  // === HANDOFF · SECCION 1 · SAID ===
  {
    id: 'stats-1.h',
    section: 1,
    title: 'Said · Distribuciones de Probabilidad & Poisson',
    subtitle: 'Bloque A · Describir · Apertura de sección',
    speaker: 'Empieza Said. Antes de decidir nada hay que saber que comportamiento esperar: cuanto llegaran las peticiones, cuanto se van a saturar los servidores. Eso es distribuciones.',
    component: (
      <SlideIntroSeccion
        expositor="Said"
        bloque="A · Describir"
        titulo="Distribuciones de Probabilidad & Poisson"
        resumen="Antes de decidir hay que saber qué comportamiento esperar. Said abre el bloque de descripción: qué es una distribución y cómo se modela lo que llega a un servidor."
        tono="cyan"
        temas={[
          'Distribuciones de Probabilidad: Concepto General',
          'Distribución de Poisson & Gestión de Colas',
        ]}
        deja="Ya sabemos qué esperar: una distribución asigna una probabilidad a cada resultado posible."
        puente="Con un modelo de la distribución, el siguiente paso es describir la forma más usada en software: la campana de Gauss (Yandris)."
      />
    )
  },

  // === SAID: DISTRIBUCIONES DE PROBABILIDAD ===
  {
    id: 'stats-1.0',
    section: 1,
    title: 'Distribuciones de Probabilidad: Concepto General',
    subtitle: 'Expositor: Said · Minería de Datos, Variables Continuas vs Discretas',
    speaker: 'Hola a todos, soy Said. Comenzamos definiendo qué es una distribución de probabilidad: la función matemática que nos permite anticipar comportamientos futuros en lugar de solo consultar históricos. En software, las variables discretas como usuarios o errores modelan la interacción.',
    component: <SlideInferencialFundamentos />
  },
  {
    id: 'stats-1.1',
    section: 1,
    title: 'Distribución de Poisson & Gestión de Colas',
    subtitle: 'Expositor: Said · Modelado de Solicitudes y Capacidad de Servidores',
    speaker: 'Continuando con las distribuciones discretas, la de Poisson es la base de la teoría de colas. Permite estimar la probabilidad de que lleguen k peticiones por segundo y dimensionar servidores para evitar el desbordamiento de la cola.',
    component: <SlidePoissonNegocio />
  },

  // === HANDOFF · SECCION 2 · YANDRIS ===
  {
    id: 'stats-2.h',
    section: 2,
    title: 'Yandris · Distribución Normal & Gauss en Software',
    subtitle: 'Bloque A · Describir · Apertura de sección',
    speaker: 'Sigue Yandris con la campana de Gauss: la forma que casi todo lo que se mide en milisegundos o en porcentajes tiene.',
    component: (
      <SlideIntroSeccion
        expositor="Yandris"
        bloque="A · Describir"
        titulo="Distribución Normal & Gauss en Software"
        resumen="La campana de Gauss es el modelo continuo por excelencia: casi todo lo que se mide en infraestructura tiene forma de campana."
        tono="purple"
        temas={[
          'Distribución Normal: Variables & Anatomía de la Ecuación',
          'Cómo Interpretar la Campana de Gauss: Formas y Variación',
          'Ejemplo Real en Software: POST /api/v1/users',
        ]}
        deja="La forma de la distribución ya está: una campana con un centro y una dispersión."
        puente="Una campana descrita es una campana asumida: el Teorema del Límite Central (Alisson) nos dice cuándo vale usarla."
      />
    )
  },

  // === YANDRIS: SLIDE 2.0 (TEORÍA Y ANATOMÍA DE LA FÓRMULA) ===
  {
    id: 'stats-2.0',
    section: 2,
    title: 'Distribución Normal: Variables & Anatomía de la Ecuación',
    subtitle: 'Expositor: Yandris · Slide 2.0 · Modelado Continuo, Parámetro de Centro (μ) y Escala (σ)',
    speaker: 'Soy Yandris. Comenzamos con la base teórica: en infraestructura las métricas son continuas con infinitos decimales (latencia en ms, uso de CPU o RAM). La función de densidad f(x) describe esta realidad usando dos parámetros clave: mu, que posiciona el centro nominal del sistema, y sigma, que define la dispersión e incertidumbre.',
    component: <SlideNormalFundamentos />
  },

  // === YANDRIS: SLIDE 2.1 (CÓMO LEER LA CAMPANA: FORMAS Y REGLA DE LAS 3 SIGMAS) ===
  {
    id: 'stats-2.1',
    section: 2,
    title: 'Cómo Interpretar la Campana de Gauss: Formas y Variación',
    subtitle: 'Expositor: Yandris · Slide 2.1 · Significado de ±1σ, ±2σ, ±3σ y qué pasa cuando cambian los datos',
    speaker: 'En esta segunda diapositiva aprendemos a leer la campana: el área total siempre representa el 100% de los eventos. Las franjas mas o menos 1 sigma, 2 sigma y 3 sigma son márgenes de seguridad fijos: 68% en la primera franja, 95.4% en la segunda y 99.7% en la tercera. Además, si el sistema es muy estable (sigma chico), la campana es esbelta y alta; si el sistema sufre fluctuación de red (sigma grande), la campana se aplana y se ensancha.',
    component: <SlideNormalCampanaLectura />
  },

  // === YANDRIS: SLIDE 2.2 (CASO REAL DE SOFTWARE POST /users) ===
  {
    id: 'stats-2.2',
    section: 2,
    title: 'Ejemplo Real en Software: POST /api/v1/users (Creación de Usuario)',
    subtitle: 'Expositor: Yandris · Slide 2.2 · Hashing Argon2/Bcrypt, Z-Score Dinámico y Detección de Anomalías',
    speaker: 'Ahora que entendemos la teoría y la forma de la campana, veamos el caso real: crear un usuario con POST /users. Este proceso suma el hash de clave en CPU, la conexión SQL y el bus de Kafka. La suma de estas demoras converge a una campana con media de 150 ms y desvío de 20 ms. Con el Z-Score calculamos si una latencia de 190 ms cumple el SLA del 97.7% o si un intento anómalo de 220 ms exige rate limiting de inmediato.',
    component: <SlideNormalSoftwareCaso />
  },

  // === HANDOFF · SECCION 3 · ALISSON ===
  {
    id: 'stats-3.h',
    section: 3,
    title: 'Alisson · Teorema del Límite Central (TLC)',
    subtitle: 'Bloque A · Describir · Apertura de sección',
    speaker: 'Toca a Alisson: el puente de la inferencia, por que las medias de muestras grandes se parecen a una campana.',
    component: (
      <SlideIntroSeccion
        expositor="Alisson"
        bloque="A · Describir"
        titulo="Teorema del Límite Central (TLC)"
        resumen="El puente de la inferencia: por qué las medias de muestras grandes se parecen a una campana aunque el origen de los datos no lo sea."
        tono="teal"
        temas={[
          'Introducción y Concepto Clave',
          'Condiciones de Aplicación',
          'Propiedades Matemáticas',
          '¿Por qué es tan Importante en la Práctica?',
          'Ejemplo en Software: Latencia de un Microservicio',
          'Paso a Paso: del TLC al Valor Z',
          'Paso 4: Probabilidad con la Tabla Z',
          'Conclusión: ¿Azar o Degradación del Servidor?',
        ]}
        deja="La media de una muestra grande se comporta como una normal, aunque los datos de origen no lo fueran."
        puente="Con una campana ya podemos acotar lo que no sabemos: intervalos de confianza (Gino)."
      />
    )
  },

  // === ALISSON: TEOREMA DEL LÍMITE CENTRAL (TLC) ===
  // Pasos internos (flechas): 3.0 desorden → forma original → campana;
  // 3.1 recorre n = 1, 5, 10, 30, 100; 3.2 a 3.7 revelan tarjeta por tarjeta.
  {
    id: 'stats-3.0',
    section: 3,
    title: 'Teorema del Límite Central (TLC)',
    subtitle: 'Expositora: Alisson · Slide 3.0 · Introducción y Concepto Clave',
    speaker: '¡Buenos días a todos! Hoy nos enfocaremos en uno de los pilares más importantes de la estadística: el Teorema del Límite Central. Para entenderlo de forma sencilla, el TLC establece que si extraemos múltiples muestras aleatorias e independientes de una población, la distribución de sus medias muestrales se aproximará a una distribución normal, con forma de campana de Gauss. Lo verdaderamente sorprendente de este teorema es que se cumple sin importar la forma que tenga la población original, ya sea asimétrica, uniforme o discreta.',
    component: <SlideTLCConcepto />
  },
  {
    id: 'stats-3.1',
    section: 3,
    title: 'Condiciones de Aplicación',
    subtitle: 'Expositora: Alisson · Slide 3.1 · Aleatoriedad, Independencia, n ≥ 30 y Varianza Finita',
    speaker: 'Para aplicar el TLC en la práctica, los datos deben cumplir cuatro condiciones, y las vamos a ver en este histograma. Pero primero, qué representa cada barra? No es un solo dato. Tomamos una muestra, calculamos su media y vemos en qué rango cae. Repetimos eso muchas veces, y la altura de cada barra nos dice cuántas medias cayeron en ese rango. Aleatoriedad: si elegimos los datos al azar, ninguna muestra se inclina hacia un lado, y por eso los promedios se acumulan alrededor de la media real, esta línea punteada. Si solo tomáramos clientes lentos, todo el histograma se correría a la derecha. Independencia: un dato no influye en otro; lo que tarda un cliente no cambia lo que tarda el siguiente. Gracias a eso, al promediar, los clientes rápidos compensan a los lentos. Tamaño de muestra: por convención, una muestra de 30 o más datos se considera suficiente para que las medias formen una campana o sigan una distribución normal. Con un solo dato vemos la forma original, asimétrica. Con 30 ya aparece la campana. Y mientras más grande es la muestra, más estrecha queda, porque el error estándar disminuye y las medias se acercan a la media real. Varianza finita: la varianza nos dice qué tan dispersos están los datos. Si todos los clientes tardan más o menos lo mismo, es baja; si unos tardan 2 minutos y otros 22, es alta. Para el TLC, esa dispersión debe tener un límite: los datos pueden variar, pero no alejarse sin control, porque un valor extremo sin límite arrastraría cualquier promedio.',
    component: <SlideTLCTamanoMuestra />
  },
  {
    id: 'stats-3.2',
    section: 3,
    title: 'Propiedades Matemáticas',
    subtitle: 'Expositora: Alisson · Slide 3.2 · Normalidad, Media Centrada y Error Estándar',
    speaker: 'Al cumplirse las condiciones anteriores, la distribución de las medias muestrales adquiere tres propiedades clave. Uno, normalidad: la distribución de las medias se aproxima a una campana de Gauss, independientemente de la forma poblacional original. Dos, media centrada: la media de las medias muestrales es igual a la media poblacional, mu sub X barra igual a mu. Y tres, error estándar: la dispersión disminuye a medida que aumenta el tamaño de la muestra, sigma sub X barra igual a sigma sobre raíz de n.',
    component: <SlideTLCPropiedades />
  },
  {
    id: 'stats-3.3',
    section: 3,
    title: '¿Por qué es tan Importante en la Práctica?',
    subtitle: 'Expositora: Alisson · Slide 3.3 · Beneficios en el Desarrollo de Software',
    speaker: 'La verdadera utilidad del TLC radica en que nos permite realizar inferencias sobre toda una población utilizando únicamente una muestra, evitando el costo y la imposibilidad de analizar cada elemento individual. Gracias al TLC, podemos aplicar pruebas estadísticas paramétricas, como pruebas t o ANOVA, que asumen normalidad en los datos, incluso cuando trabajamos con procesos reales cuyos datos originales no son normales. En desarrollo de software, eso significa estimar el tiempo de respuesta de toda una API midiendo solo una muestra de peticiones, sin procesar millones de registros; comparar dos versiones de una aplicación en una prueba A/B aunque las latencias sean asimétricas; y, así como en finanzas permite gestionar el riesgo estudiando subconjuntos representativos, en software permite monitorear el rendimiento y el riesgo de caídas del sistema con subconjuntos representativos de métricas.',
    component: <SlideTLCImportancia />
  },
  {
    id: 'stats-3.4',
    section: 3,
    title: 'Ejemplo en Software: Latencia de un Microservicio (API REST)',
    subtitle: 'Expositora: Alisson · Slide 3.4 · Escenario y Pregunta',
    speaker: 'Veamos un ejemplo práctico del TLC en desarrollo de software. Un equipo de DevOps monitorea el rendimiento de un microservicio de autenticación. Históricamente, las peticiones de los usuarios tienen una distribución asimétrica a la derecha: la mayoría responde en pocos milisegundos, pero algunas sufren retardos por la base de datos o el almacenamiento en caché. La media poblacional es de 200 milisegundos y la desviación estándar poblacional de 50 milisegundos. Para verificar el estado del servidor, la herramienta de monitoreo analiza de forma aleatoria e independiente un lote de 100 peticiones. La pregunta: cuál es la probabilidad de que el tiempo medio de respuesta de esa muestra supere los 210 milisegundos?',
    component: <SlideTLCEscenario />
  },
  {
    id: 'stats-3.5',
    section: 3,
    title: 'Paso a Paso: del TLC al Valor Z',
    subtitle: 'Expositora: Alisson · Slide 3.5 · Pasos 1 a 3 · Error estándar 5 ms · Z = +2.0',
    speaker: 'Paso uno, aplicar las propiedades del TLC: como n igual a 100 es mayor o igual a 30 y las peticiones son independientes, la muestra es suficientemente grande; y aunque la población original es asimétrica, el TLC garantiza que la media de la muestra se comportará como una distribución normal. Paso dos, calcular el error estándar, que mide la variabilidad de las medias muestrales: es la desviación estándar poblacional dividida por la raíz del tamaño muestral, 50 entre raíz de 100, es decir 50 entre 10, igual a 5 milisegundos. Paso tres, aplicar la fórmula de estandarización Z del TLC: para encontrar la probabilidad, convertimos la media muestral de 210 milisegundos a un valor de la normal estándar. Z es igual a 210 menos 200, entre 5: 10 entre 5, igual a más 2.',
    component: <SlideTLCPasos />
  },
  {
    id: 'stats-3.6',
    section: 3,
    title: 'Paso 4: Calcular la Probabilidad con la Tabla Z',
    subtitle: 'Expositora: Alisson · Slide 3.6 · P(Z ≤ 2.0) = 0.9772 · P(Z > 2.0) = 0.0228',
    speaker: 'Paso cuatro, calcular la probabilidad. Buscamos la probabilidad de que la media sea mayor a 210 milisegundos, es decir, P de Z mayor a 2. Consultando la tabla Z, vamos a la fila 2.0 y a la columna 0.00: el área a la izquierda es 0.9772. Por lo tanto, el área a la derecha es 1 menos 0.9772, igual a 0.0228, es decir, 2.28 por ciento.',
    component: <SlideTLCTablaZ />
  },
  {
    id: 'stats-3.7',
    section: 3,
    title: 'Conclusión: ¿Azar o Degradación del Servidor?',
    subtitle: 'Expositora: Alisson · Slide 3.7 · Resultado y Utilidad en SLA / Alertas',
    speaker: 'Conclusión: existe únicamente un 2.28 por ciento de probabilidad de que el promedio de un bloque de 100 peticiones supere los 210 milisegundos por simple fluctuación aleatoria. Utilidad práctica en software: si el sistema de monitoreo detecta que el promedio de 100 peticiones supera los 210 milisegundos, el equipo de DevOps sabe que la probabilidad de que ocurra por azar es casi nula. Esto significa que realmente hay una degradación o fallo en el servidor, y se debe activar una alerta automática de rendimiento.',
    component: <SlideTLCConclusion />
  },

  // === HANDOFF · SECCION 4 · GINO ===
  {
    id: 'stats-4.h',
    section: 4,
    title: 'Gino · Margen de Error & Intervalos de Confianza',
    subtitle: 'Bloque B · Afirmar · Apertura de sección',
    speaker: 'Toma Gino: aqui cambia el paso. Ya no describimos, afirmamos. Un intervalo de confianza es una afirmacion sobre el parametro real.',
    component: (
      <SlideIntroSeccion
        expositor="Gino"
        bloque="B · Afirmar"
        titulo="Margen de Error & Intervalos de Confianza"
        resumen="Un intervalo no es un punto: es el rango de respuestas que la muestra permite dar sobre el parámetro real."
        tono="amber"
        temas={[
          'Estimación por Intervalos & Trade-off (95% vs 99%)',
          'El Papel de n & Simulación de Muestreo Repetido',
          'Caso de Software: SLA de Microservicios & Puente a α',
        ]}
        deja="El intervalo acota el parámetro real con una garantía probabilística, y ese 5 % que deja fuera es justo el α de mi bloque."
        puente="Acotar no es decidir: falta el criterio que convierte el intervalo en una afirmación. Ese es mi bloque (Andy)."
      />
    )
  },

  // === GINO: MARGEN DE ERROR Y NIVEL DE CONFIANZA ===
  {
    id: 'stats-4.0',
    section: 4,
    title: 'Margen de Error & Intervalos de Confianza',
    subtitle: 'Expositor: Gino · Slide 4.0 · De la Estimación Puntual al Intervalo (95% vs 99%)',
    speaker: 'Soy Gino. Un intervalo de confianza acota el parametro desconocido mu con una garantia probabilistica. Frente a la estimacion puntual que casi seguro falla, el intervalo calcula un margen de error alrededor de la media muestral. Analizamos el equilibrio del 95 frente al 99 y la falacia de creer que la media poblacional es una variable aleatoria: mu esta fijo, lo que varia es el intervalo.',
    component: <SlideIntervalosConfianza />
  },
  {
    id: 'stats-4.1',
    section: 4,
    title: 'El Papel de n & Simulación de Muestreo',
    subtitle: 'Expositor: Gino · Slide 4.1 · Error Estándar y Muestreo Repetido contra la Falacia',
    speaker: 'El margen de error tiene una fisica muy clara: el error estandar divide entre la raiz de n. Para reducir el margen a la mitad necesitamos cuadruplicar la muestra. Y para ver que significa el 95 por ciento de confianza, observen la simulacion: de 24 muestras tomadas de la misma poblacion, la gran mayoria capturan el verdadero mu, mientras que unas pocas caen fuera por simple azar.',
    component: <SlideIntervalosTamanoMuestra />
  },
  {
    id: 'stats-4.2',
    section: 4,
    title: 'Caso Real en Software: SLA de Microservicios',
    subtitle: 'Expositor: Gino · Slide 4.2 · Latencia en PostgreSQL y Conexión con el Nivel de Significancia',
    speaker: 'Aterrizamos esto en ingenieria de software: un microservicio de pagos con SLA de 150 milisegundos. Muestreamos 100 transacciones con media de 138.5 milisegundos y desviacion de 25. Calculamos el error estandar de 2.5 milisegundos y un margen de 4.9. El intervalo resultante va de 133.6 a 143.4 milisegundos: como el limite superior esta por debajo de 150, confirmamos el SLA. Y este 5 por ciento que dejamos fuera en las colas es justo el alpha que toma Andy para contrastar hipotesis.',
    component: <SlideIntervalosCasoSoftware />
  },

// === HANDOFF · SECCION 5 · ANDY ===
// El bloque de Andy no se disuelve: es la bisagra del deck. El único bloque
// del silabo que describe una FUNCION (el criterio estadistico para validar
// resultados en software) y no una distribucion. Por eso arranca con un
// handoff propio y entrega el bloque al equipo en el contraste.
  {
    id: 'stats-5.h',
    section: 5,
    title: 'Andy · Nivel de Significancia (α) & P-Valor',
    subtitle: 'Bloque C · Decidir · Apertura de sección',
    speaker: 'Me toca a mi, y mi bloque es el que convierte evidencia en decision. Hasta ahora el deck nos dio herramientas para mirar y para afirmar. Yo anado el paso que falta: cuando algo tiene que decidirse, quien decide, con que criterio y cuanta equivocacion estamos dispuestos a tolerar.',
    component: (
      <SlideIntroSeccion
        expositor="Andy"
        bloque="C · Decidir"
        titulo="Nivel de Significancia (α) & P-Valor"
        resumen="El bloque que convierte evidencia en decisión: un umbral fijado antes de mirar los datos y una regla que se puede auditar."
        tono="rose"
        temas={[
          'Toda Decisión Tiene un Riesgo',
          'α: el Área que Decides Tolerar',
          'El P-Valor: ¿Qué Tan Raro Fue Eso si Nada Cambió?',
          'La Regla de Decisión: p ≤ α',
          'Lo que el P-Valor NO Es',
          'El Criterio Estadístico, Automatizado',
          'Lo que te Llevas',
        ]}
        deja="El criterio de decisión y el p-valor, con sus cuatro trampas y su versión automatizada en código."
        puente="El equipo lleva la regla al contraste de hipótesis y a las aplicaciones en software."
      />
    )
  },

// === ANDY: NIVEL DE SIGNIFICANCIA (α) Y P-VALOR ===
  // Guion: docs/expo1/tema05/guion-ordenado-t05.md
  // Caso que recorre todas las slides: e-commerce, botón de checkout.
  //   A: 400/4000 (10.0%) · B: 464/4000 (11.6%) · z = 2.3054 · p = 0.0211
  {
    id: 'stats-5.0',
    section: 5,
    title: 'Toda Decisión Tiene un Riesgo',
    subtitle: 'Andy · Plantear la pregunta · El tribunal y el caso del checkout',
    speaker: 'Hola a todos, soy Andy. Antes de hablar de alpha y del p-valor, una pregunta: cuanta evidencia necesita un juez para declarar culpable, y cuanto se equivoca si lo hace? Porque cada vez que un sistema decide, un boton, un modelo, una alerta, hay un juez y hay un error posible. Nuestro caso: el equipo de producto quiere subir el boton Comprar a una version B y ve que B convierte mas. La pregunta real no es cual convierte mas, eso ya lo sabemos, sino si esta diferencia es un efecto real o es ruido que se invierte manana.',
    component: <SlideDecisionRiesgo />
  },
  {
    id: 'stats-5.1',
    section: 5,
    title: 'α: el Área que Decides Tolerar',
    subtitle: 'Andy · El umbral · 5 de cada 100 son falsos positivos',
    speaker: 'Alpha es el presupuesto de errores que te das antes de empezar. Mira esta campana: la zona sombreada es la parte de resultados tan raros que, si la apuesta por defecto fuera cierta, no esperariamos ver. Tu eliges cuanto de esa zona te molesta. Con alpha igual a cero coma cero cinco estas diciendo que de cada cien veces que el sistema diga hay cambio real, aceptaras que cinco sean alarmas falsas. Y fíjate que es el mismo cinco por ciento que Gino dejo fuera del intervalo de confianza.',
    component: <SlideAlphaCampana />
  },
  {
    id: 'stats-5.2',
    section: 5,
    title: 'El P-Valor: ¿Qué Tan Raro Fue Eso si Nada Cambió?',
    subtitle: 'Andy · La pregunta de la sorpresa · Monedas y e-commerce',
    speaker: 'Ya fijamos cuanto riesgo aceptamos. Falta medir cuanta evidencia tenemos, y la pregunta del p-valor es una sola: que tan raro o sorprendente es lo que vimos si asumimos que la apuesta por defecto es cierta. Mira el mismo caso con veinte monedas: ver quince caras es un p-valor de cero coma cero dos cero siete. Y nuestro e-commerce da cero coma cero dos uno uno. Casi el mismo numero en dos dominios distintos: por eso el p-valor es un concepto unico y no un truco del A B testing.',
    component: <SlidePValorSorpresa />
  },
  {
    id: 'stats-5.3',
    section: 5,
    title: 'La Regla de Decisión: p ≤ α',
    subtitle: 'Andy · El criterio · Los dos errores y un segundo dominio',
    speaker: 'Y ahora la regla, que es una linea: si el p-valor es menor o igual que alpha, rechazamos H0. En nuestro caso, cero coma cero dos uno uno contra cero coma cero cinco, rechazamos: el boton B convierte mas y no es casualidad. Ojo con el otro lado: no rechazar H0 no es aceptar H0, es no tener evidencia suficiente. Y el criterio no es del A B testing: en control de calidad, mil piezas con veinticinco defectuosas dan un p-valor de cero coma dos cinco y ocho y no rechazamos: la linea sigue normal.',
    component: <SlideReglaDecision />
  },
  {
    id: 'stats-5.4',
    section: 5,
    title: 'Lo que el P-Valor NO Es',
    subtitle: 'Andy · Las trampas · Significativo no es lo mismo que útil',
    speaker: 'Cuatro frases que he escuchado decir a gente brillante y que son las que mas caro salen en software. Uno: el p-valor es la probabilidad de que H0 sea verdadera. No, es la probabilidad de los datos dada H0. Dos: es la probabilidad de que fuera azar. No, es que tan raro es el resultado si fuera azar. Tres: p pequeno significa cambio grande. Con un millon de usuarios por grupo, cero coma uno puntos porcentuales da p igual a cero coma cero uno ocho, estadisticamente significativo, y son mil ordenes extra. Cuatro: si no rechace, es que son iguales. No, es que no tuve poder para detectarlo.',
    component: <SlidePValorNoEs />
  },
  {
    id: 'stats-5.5',
    section: 5,
    title: 'El Criterio Estadístico, Automatizado',
    subtitle: 'Andy · En producción · SciPy · El poder depende de n',
    speaker: 'Y aqui es donde esto se vuelve util de verdad. En software el criterio no lo decide una persona, lo decide una linea de codigo: la libreria te devuelve el p-valor, y la comparacion con alpha es una linea mas. Esa linea puede ser la que decide si se despliega la variante, si una variable entra al modelo, o si se abre un incidente. Y ojo con la muestra: con cuatro mil personas por grupo solo tenemos un sesenta y seis por ciento de poder, asi que un resultado negativo puede ser que no tuvo poder, no que no hay efecto.',
    component: <SlideCriterioSoftware />
  },
  {
    id: 'stats-5.6',
    section: 5,
    title: 'Lo que te Llevas',
    subtitle: 'Andy · Cierre del tema · Cheat sheet y tres reglas',
    speaker: 'Para llevarse: alpha es el riesgo que fijaste antes, el p-valor es que tan raro fue lo que viste dado que nada cambio, y la decision es solo compararlos. Tres reglas para manana: uno, fija alpha antes de mirar los datos; dos, reporta el p-valor con el tamano del efecto; tres, si no rechazaste, no digas que son iguales, di que no tienes poder. Con esto cerramos el tema de significancia y p-valor, y el equipo sigue con el contraste de hipotesis. Alguien tiene preguntas?',
    component: <SlideCierreT05 />
  },

  // === HANDOFF · SECCION 6 · EQUIPO ===
  {
    id: 'stats-6.h',
    section: 6,
    title: 'Equipo · Contraste, Aplicaciones & Cierre',
    subtitle: 'Bloque D · Usar · Apertura de sección',
    speaker: 'Cerramos en bloque coral: el equipo aplica todo lo anterior. Los contrastes, las aplicaciones y el cierre del ciclo de inferencia.',
    component: (
      <SlideIntroSeccion
        expositor="Grupo 3 y 4"
        bloque="D · Usar"
        titulo="Contraste, Aplicaciones & Cierre"
        resumen="Todo lo anterior aplicado: los contrastes que usa el equipo y los casos donde esto aterriza en software y negocio."
        tono="blue"
        temas={[
          'Contraste de Hipótesis: Comparación entre Grupos',
          'Aplicaciones Prácticas: A/B Testing, Modelos & Pipelines',
          'Síntesis y Cierre de la Exposición',
        ]}
        deja="El ciclo de inferencia completo: formular, muestrear, contrastar y decidir."
        puente="Cerramos con el ciclo de inferencia de 4 fases y las preguntas del equipo."
      />
    )
  },

  // === CONTRASTE DE HIPÓTESIS — ANÁLISIS COMPARTIDO DEL EQUIPO ===
  {
    id: 'stats-6.0',
    section: 6,
    title: 'Contraste de Hipótesis: Comparación entre Grupos',
    subtitle: 'Equipo Completo · Pruebas T-Test, ANOVA y Chi-Cuadrado',
    speaker: 'Este bloque es un analisis compartido del equipo completo. Para aplicar contrastes en la practica usamos el T-test al comparar dos grupos continuos, ANOVA para tres o mas variantes evitando inflar el error, y Chi-cuadrado para tasas o categorias discretas.',
    component: <SlideComparacionMedias />
  },

  // === APLICACIONES EN SOFTWARE & CIERRE ===
  {
    id: 'stats-6.1',
    section: 6,
    title: 'Aplicaciones Prácticas: A/B Testing, Modelos & Pipelines',
    subtitle: 'Equipo Completo · Automatización con SciPy, Statsmodels y Feature Flags',
    speaker: 'Cerramos integrando la inferencia en ingeniería: experimentación controlada con A/B Testing en checkout, selección de variables en machine learning y pipelines de CI/CD que deciden rollouts basados en p-valores.',
    component: <SlideABTestingAplicaciones />
  },
  {
    id: 'stats-6.2',
    section: 6,
    title: 'Síntesis y Cierre de la Exposición',
    subtitle: 'Equipo Completo · Ciclo de Inferencia de 4 Fases',
    speaker: 'Concluimos con el ciclo de inferencia: formulación rigurosa de H0/H1, muestreo representativo con TLC, contraste matemático con p-valor y decisión estratégica en producto.',
    component: <SlideConclusionesInferencial />
  }
];
