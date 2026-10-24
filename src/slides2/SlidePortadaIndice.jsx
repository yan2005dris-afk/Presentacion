import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, ArrowRight, BarChart2, CheckCircle2, Layers } from 'lucide-react';

export function SlidePortada2() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6 tracking-wide"
      >
        <BarChart2 className="w-4 h-4 text-blue-400" />
        GRUPO 3 Y 4 · ESTADÍSTICA INFERENCIAL
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight max-w-4xl"
      >
        Estadística Inferencial y <br className="hidden md:block"/>
        <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-400 bg-clip-text text-transparent">
          Toma de Decisiones en Negocio
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-slate-300 max-w-2xl font-light mb-10"
      >
        De distribuciones muestrales y pruebas de hipótesis hasta experimentación cuantitativa y A/B Testing en software.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left"
      >
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Enfoque</div>
          <div className="text-sm font-semibold text-slate-200">Práctico y Riguroso</div>
          <div className="text-xs text-slate-400 mt-1">Negocio, Producto y Software</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Fundamentos</div>
          <div className="text-sm font-semibold text-slate-200">TLC, Gauss y Poisson</div>
          <div className="text-xs text-slate-400 mt-1">Modelado probabilístico</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Validación</div>
          <div className="text-sm font-semibold text-slate-200">P-Valor e Intervalos</div>
          <div className="text-xs text-slate-400 mt-1">Criterios de significancia</div>
        </div>
      </motion.div>
    </div>
  );
}

export function SlideIndice2({ onSelectSection }) {
  const items = [
    {
      idx: 1,
      title: "1. Fundamentos & Distribución de Poisson",
      desc: "De la muestra al universo poblacional y colas de espera en negocio.",
      tag: "Fundamentos"
    },
    {
      idx: 2,
      title: "2. Distribución Normal & Teorema del Límite Central",
      desc: "Propiedades de la campana de Gauss y convergencia de medias muestrales.",
      tag: "Modelado"
    },
    {
      idx: 3,
      title: "3. Margen de Error & Intervalos de Confianza",
      desc: "Estimación paramétrica (95% vs 99%) y precisión estadística.",
      tag: "Estimación"
    },
    {
      idx: 4,
      title: "4. Contraste de Hipótesis, P-Valor & Significancia (α)",
      desc: "Criterios matemáticos para validar features y comparativa entre grupos.",
      tag: "Validación"
    },
    {
      idx: 5,
      title: "5. Aplicaciones en Software & A/B Testing",
      desc: "Escenarios de riesgo, garantías y toma de decisiones en producto.",
      tag: "Aplicación"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Agenda de la Exposición</h2>
        <p className="text-slate-400 text-sm mt-1">Estructura temática coordinada para el Grupo 3 y 4</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => onSelectSection && onSelectSection(item.idx)}
            className="group cursor-pointer p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {item.tag}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
