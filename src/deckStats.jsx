import React from 'react';
import {
  SlidePortada2, SlideIndice2,
  SlideInferencialFundamentos, SlidePoissonNegocio,
  SlideNormalFundamentos, SlideNormalCampanaLectura, SlideNormalSoftwareCaso, SlideTLC,
  SlideIntervalosConfianza,
  SlideDecisionRiesgo, SlideAlphaCampana, SlidePValorSorpresa,
  SlideReglaDecision, SlidePValorNoEs, SlideCriterioSoftware, SlideCierreT05,
  SlideComparacionMedias,
  SlideABTestingAplicaciones, SlideConclusionesInferencial
} from './slides2';

export const SECTIONS_STATS = [
  { id: 0, title: 'Portada e Índice', member: 'Grupo 3 y 4', color: 'from-blue-600 to-indigo-600' },
  { id: 1, title: 'Distribuciones de Probabilidad & Poisson', member: 'Said', color: 'from-cyan-500 to-blue-500' },
  { id: 2, title: 'Distribución Normal & Gauss en Software', member: 'Yandris', color: 'from-purple-500 to-indigo-500' },
  { id: 3, title: 'Teorema del Límite Central (TLC)', member: 'Allison', color: 'from-teal-500 to-emerald-500' },
  { id: 4, title: 'Margen de Error & Intervalos', member: 'Gino', color: 'from-amber-500 to-orange-500' },
  { id: 5, title: 'Nivel de Significancia (α) & P-Valor', member: 'Andy', color: 'from-rose-500 to-pink-500' },
  { id: 6, title: 'Aplicaciones & Cierre', member: 'Grupo 3 y 4', color: 'from-blue-600 to-cyan-500' },
];

export const getStatsSlides = (onSelectSection) => [
  {
    id: 'stats-0.0',
    section: 0,
    title: 'Estadística Inferencial y Toma de Decisiones',
    subtitle: 'Exposición Oficial · Grupo 3 y 4',
    speaker: 'Bienvenidos a la presentación de Estadística Inferencial. Hoy analizaremos el paso de los datos muestrales a decisiones certeras en software y negocio: Said, Yandris, Allison, Gino y Andy abordaremos cada fundamento.',
    component: <SlidePortada2 />
  },
  {
    id: 'stats-0.1',
    section: 0,
    title: 'Agenda de Estadística Inferencial',
    subtitle: 'Asignación de Temas por Expositor',
    speaker: 'Nuestra agenda está distribuida entre Said (Distribuciones y Poisson), Yandris (Distribución Normal en Sistemas y Monitoreo), Allison (Teorema del Límite Central), Gino (Intervalos de Confianza) y Andy (Significancia y P-Valor).',
    component: <SlideIndice2 onSelectSection={onSelectSection} />
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

  // === ALLISON: TEOREMA DEL LÍMITE CENTRAL (TLC) ===
  {
    id: 'stats-3.0',
    section: 3,
    title: 'Teorema del Límite Central (TLC)',
    subtitle: 'Expositor: Allison · Normalidad de Medias Muestrales y Caso E-Commerce (n ≥ 30)',
    speaker: 'Hola, soy Allison. El Teorema del Límite Central es el puente de la inferencia: sin importar qué tan asimétricos sean los datos de origen, el promedio de muestras grandes (n >= 30) siempre convergerá a una campana normal con error estándar sigma sobre raíz de n.',
    component: <SlideTLC />
  },

  // === GINO: MARGEN DE ERROR Y NIVEL DE CONFIANZA ===
  {
    id: 'stats-4.0',
    section: 4,
    title: 'Margen de Error & Intervalos de Confianza',
    subtitle: 'Expositor: Gino · Construcción (95% vs 99%) e Interpretación Frecuentista',
    speaker: 'Soy Gino. Un intervalo de confianza acota el parámetro desconocido mu con una garantía probabilística. Analizamos el equilibrio del 95% frente al 99% y la falacia de creer que la media poblacional es una variable aleatoria.',
    component: <SlideIntervalosConfianza />
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
