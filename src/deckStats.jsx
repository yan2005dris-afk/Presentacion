import React from 'react';
import {
  SlidePortada2, SlideIndice2,
  SlideInferencialFundamentos, SlidePoissonNegocio,
  SlideNormalGauss, SlideTLC,
  SlideIntervalosConfianza,
  SlideHipotesisPValor, SlideComparacionMedias,
  SlideABTestingAplicaciones, SlideConclusionesInferencial
} from './slides2';

export const SECTIONS_STATS = [
  { id: 0, title: 'Portada e Índice', member: 'Grupo 3 y 4', color: 'from-blue-600 to-indigo-600' },
  { id: 1, title: 'Distribuciones de Probabilidad & Poisson', member: 'Said', color: 'from-cyan-500 to-blue-500' },
  { id: 2, title: 'Distribución Normal & Gauss', member: 'Yandris', color: 'from-purple-500 to-indigo-500' },
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
    speaker: 'Nuestra agenda está distribuida entre Said (Distribuciones y Poisson), Yandris (Distribución Normal), Allison (Teorema del Límite Central), Gino (Intervalos de Confianza) y Andy (Significancia y P-Valor).',
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

  // === YANDRIS: DISTRIBUCIÓN NORMAL ===
  {
    id: 'stats-2.0',
    section: 2,
    title: 'Distribución Normal & Campana de Gauss',
    subtitle: 'Expositor: Yandris · Simetría, Z-Score y Regla Empírica 68-95-99.7',
    speaker: 'Soy Yandris. La distribución normal es el modelo continuo por excelencia: simétrica, con media, mediana y moda coincidentes en mu, y una regla empírica que cuantifica la dispersión en 1, 2 y 3 desviaciones estándar mediante la puntuación Z.',
    component: <SlideNormalGauss />
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
  {
    id: 'stats-5.0',
    section: 5,
    title: 'Nivel de Significancia (α) & P-Valor (p-value)',
    subtitle: 'Expositor: Andy · Regla de Decisión (p ≤ α), Errores Tipo I y II',
    speaker: 'Hola a todos, soy Andy. El p-valor mide qué tan improbable es observar los datos muestreados si la hipótesis nula fuera cierta. Si p es menor o igual a alfa, rechazamos H0 formalmente, asumiendo un riesgo controlado de falso positivo.',
    component: <SlideHipotesisPValor />
  },
  {
    id: 'stats-5.1',
    section: 5,
    title: 'Contraste de Hipótesis: Comparación entre Grupos',
    subtitle: 'Expositor: Andy · Pruebas T-Test, ANOVA y Chi-Cuadrado',
    speaker: 'Andy aquí nuevamente: Para aplicar contrastes en la práctica, usamos el T-test al comparar dos grupos continuos, ANOVA para tres o más variantes evitando inflar el error, y Chi-cuadrado para tasas o categorías discretas.',
    component: <SlideComparacionMedias />
  },

  // === APLICACIONES EN SOFTWARE & CIERRE ===
  {
    id: 'stats-6.0',
    section: 6,
    title: 'Aplicaciones Prácticas: A/B Testing, Modelos & Pipelines',
    subtitle: 'Equipo Completo · Automatización con SciPy, Statsmodels y Feature Flags',
    speaker: 'Cerramos integrando la inferencia en ingeniería: experimentación controlada con A/B Testing en checkout, selección de variables en machine learning y pipelines de CI/CD que deciden rollouts basados en p-valores.',
    component: <SlideABTestingAplicaciones />
  },
  {
    id: 'stats-6.1',
    section: 6,
    title: 'Síntesis y Cierre de la Exposición',
    subtitle: 'Equipo Completo · Ciclo de Inferencia de 4 Fases',
    speaker: 'Concluimos con el ciclo de inferencia: formulación rigurosa de H0/H1, muestreo representativo con TLC, contraste matemático con p-valor y decisión estratégica en producto.',
    component: <SlideConclusionesInferencial />
  }
];
