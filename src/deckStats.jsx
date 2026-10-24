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
  { id: 1, title: 'Fundamentos & Poisson', member: 'Grupo 3 y 4', color: 'from-cyan-500 to-blue-500' },
  { id: 2, title: 'Gauss & TLC', member: 'Grupo 3 y 4', color: 'from-indigo-500 to-purple-500' },
  { id: 3, title: 'Intervalos & Confianza', member: 'Grupo 3 y 4', color: 'from-emerald-500 to-teal-500' },
  { id: 4, title: 'Hipótesis & P-Valor', member: 'Grupo 3 y 4', color: 'from-rose-500 to-amber-500' },
  { id: 5, title: 'A/B Testing & Aplicaciones', member: 'Grupo 3 y 4', color: 'from-teal-500 to-cyan-500' },
];

export const getStatsSlides = (onSelectSection) => [
  {
    id: 'stats-0.0',
    section: 0,
    title: 'Estadística Inferencial y Toma de Decisiones',
    subtitle: 'Grupo 3 y 4 · Modelado, Contraste de Hipótesis y Experimentación',
    speaker: 'Bienvenidos a la presentación de Estadística Inferencial. Hoy veremos cómo transitar de datos muestrales a decisiones estratégicas en software y negocio con rigor matemático.',
    component: <SlidePortada2 />
  },
  {
    id: 'stats-0.1',
    section: 0,
    title: 'Agenda de Estadística Inferencial',
    subtitle: 'Estructura Temática Completa',
    speaker: 'Nuestra presentación cubre 5 ejes fundamentales: desde la delimitación poblacional y colas de Poisson, hasta la campana de Gauss, intervalos, p-valores y A/B testing en producción.',
    component: <SlideIndice2 onSelectSection={onSelectSection} />
  },
  {
    id: 'stats-1.0',
    section: 1,
    title: 'Estadística Inferencial vs Descriptiva',
    subtitle: 'Slide 1.0 · Parámetros Poblacionales (μ, σ) vs Estadísticos Muestrales (x̄, s)',
    speaker: 'La estadística descriptiva nos dice qué pasó con los datos observados; la inferencial nos permite predecir el comportamiento de millones de usuarios a partir de una muestra controlada sin sesgos.',
    component: <SlideInferencialFundamentos />
  },
  {
    id: 'stats-1.1',
    section: 1,
    title: 'Distribución de Poisson & Gestión de Colas',
    subtitle: 'Slide 1.1 · Modelado de Solicitudes y Dimensionamiento en Negocio',
    speaker: 'Poisson modela eventos independientes en un intervalo fijo. En tecnología es vital para calcular capacidad de servidores, colas de atención al cliente y tasas de fallas.',
    component: <SlidePoissonNegocio />
  },
  {
    id: 'stats-2.0',
    section: 2,
    title: 'Distribución Normal & Campana de Gauss',
    subtitle: 'Slide 2.0 · Simetría, Desvío Estándar y Regla Empírica 68-95-99.7',
    speaker: 'La distribución normal es la piedra angular: su simetría alrededor de la media y la regla empírica nos permiten estandarizar cualquier variable mediante la puntuación Z.',
    component: <SlideNormalGauss />
  },
  {
    id: 'stats-2.1',
    section: 2,
    title: 'Teorema del Límite Central (TLC)',
    subtitle: 'Slide 2.1 · Convergencia de Medias Muestrales con n ≥ 30',
    speaker: 'El TLC es asombroso: no importa qué tan asimétricos o caóticos sean los datos originales, el promedio de muestras grandes siempre formará una campana de Gauss.',
    component: <SlideTLC />
  },
  {
    id: 'stats-3.0',
    section: 3,
    title: 'Margen de Error & Intervalos de Confianza',
    subtitle: 'Slide 3.0 · Construcción al 95% y 99% e Interpretación Correcta',
    speaker: 'Un intervalo de confianza acota el valor desconocido de la población. Explicamos por qué el 95% es el equilibrio ideal entre certeza y precisión operativa.',
    component: <SlideIntervalosConfianza />
  },
  {
    id: 'stats-4.0',
    section: 4,
    title: 'Contraste de Hipótesis & P-Valor',
    subtitle: 'Slide 4.0 · Criterio Estadístico (p < α) y Errores Tipo I y II',
    speaker: 'El p-valor mide la probabilidad de observar nuestros datos asumiendo que nada cambió (H0). Si p es menor que alfa, rechazamos H0 y confirmamos el efecto.',
    component: <SlideHipotesisPValor />
  },
  {
    id: 'stats-4.1',
    section: 4,
    title: 'Comparación de Medias entre Grupos',
    subtitle: 'Slide 4.1 · T-Test, ANOVA y Chi-Cuadrado',
    speaker: 'Elegir el test correcto es crítico: T-test para comparar 2 grupos, ANOVA para 3 o más sin inflar el error, y Chi-cuadrado para tasas y frecuencias categóricas.',
    component: <SlideComparacionMedias />
  },
  {
    id: 'stats-5.0',
    section: 5,
    title: 'Aplicaciones en Software & A/B Testing',
    subtitle: 'Slide 5.0 · Experimentación en Producto, Modelos Predictivos y Riesgo',
    speaker: 'En software moderno, el A/B Testing permite desplegar funcionalidades con certeza estadística, evitando falsos positivos y pérdidas económicas.',
    component: <SlideABTestingAplicaciones />
  },
  {
    id: 'stats-5.1',
    section: 5,
    title: 'Síntesis y Cierre de la Exposición',
    subtitle: 'Slide 5.1 · Ciclo de Inferencia de Alto Impacto',
    speaker: 'Concluimos integrando los 4 pasos del ciclo inferencial: formulación de hipótesis, muestreo con TLC, contraste con p-valor y decisión de negocio orientada por datos.',
    component: <SlideConclusionesInferencial />
  }
];
