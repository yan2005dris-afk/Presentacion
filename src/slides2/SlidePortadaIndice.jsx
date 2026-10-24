import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, ArrowRight, BarChart2, CheckCircle2, Layers, User } from 'lucide-react';

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
        className="text-lg md:text-xl text-slate-300 max-w-2xl font-light mb-8"
      >
        De distribuciones muestrales y pruebas de hipótesis hasta experimentación cuantitativa y A/B Testing en software.
      </motion.p>

      {/* Expositores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-2 max-w-3xl"
      >
        {[
          { name: 'Said', topic: 'Distribuciones' },
          { name: 'Yandris', topic: 'Dist. Normal' },
          { name: 'Allison', topic: 'TLC' },
          { name: 'Gino', topic: 'Intervalos' },
          { name: 'Andy', topic: 'Significancia & P-Valor' },
        ].map((member) => (
          <div
            key={member.name}
            className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="font-bold text-white">{member.name}</span>
            <span className="text-slate-400 text-[11px]">({member.topic})</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function SlideIndice2({ onSelectSection }) {
  const items = [
    {
      idx: 1,
      speaker: "Said",
      color: "border-cyan-500/40 text-cyan-400",
      title: "1. Distribuciones de Probabilidad & Poisson",
      desc: "Minería de datos, variables discretas y gestión de colas de servidores.",
      tag: "Said"
    },
    {
      idx: 2,
      speaker: "Yandris",
      color: "border-purple-500/40 text-purple-400",
      title: "2. Distribución Normal & Campana de Gauss",
      desc: "Propiedades fundamentales, simetría, puntuación Z y regla 68-95-99.7.",
      tag: "Yandris"
    },
    {
      idx: 3,
      speaker: "Allison",
      color: "border-teal-500/40 text-teal-400",
      title: "3. Teorema del Límite Central (TLC)",
      desc: "Convergencia de medias (n ≥ 30), 4 condiciones y caso resuelto de E-Commerce.",
      tag: "Allison"
    },
    {
      idx: 4,
      speaker: "Gino",
      color: "border-amber-500/40 text-amber-400",
      title: "4. Margen de Error & Nivel de Confianza",
      desc: "Construcción al 95% y 99%, cálculo de precisión y falacias frecuentes.",
      tag: "Gino"
    },
    {
      idx: 5,
      speaker: "Andy",
      color: "border-rose-500/40 text-rose-400",
      title: "5. Nivel de Significancia (α) & P-Valor",
      desc: "Criterio de validación (p ≤ α), matriz de errores I/II y contraste entre grupos.",
      tag: "Andy"
    },
    {
      idx: 6,
      speaker: "Equipo",
      color: "border-blue-500/40 text-blue-400",
      title: "6. Aplicaciones en Software & Cierre",
      desc: "A/B Testing en checkout, feature selection en ML y pipelines automáticos.",
      tag: "Equipo"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Agenda de la Exposición</h2>
        <p className="text-slate-400 text-sm mt-1">Distribución de temas y expositores · Grupo 3 y 4</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => onSelectSection && onSelectSection(item.idx)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-950 border ${item.color}`}>
                Expositor: {item.speaker}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
