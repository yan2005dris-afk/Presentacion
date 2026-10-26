import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck } from 'lucide-react';

export default function SpeakerNotesDrawer({ show, speakerText }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="absolute bottom-16 left-6 right-6 bg-white/95 dark:bg-slate-900/95 border-2 border-amber-500/40 p-4 rounded-2xl shadow-2xl z-30 backdrop-blur-lg flex items-start gap-3"
        >
          <UserCheck size={24} className="text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
          <div>
            <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
              Guión del Orador (Resumen):
            </h4>
            <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed font-serif italic">
              "{speakerText}"
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
