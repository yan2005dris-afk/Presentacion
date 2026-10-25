import React, { createContext, useContext, useState, useEffect } from 'react';
import { useIsPresent } from 'framer-motion';

const SlideStepContext = createContext({
  step: 0,
  maxSteps: 0,
  registerMaxSteps: () => {},
  nextStep: () => false,
  prevStep: () => false,
});

export function SlideStepProvider({ children, currentSlide }) {
  const [step, setStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);

  // Reiniciar paso cuando cambia de diapositiva
  useEffect(() => {
    setStep(0);
    setMaxSteps(0);
  }, [currentSlide]);

  const registerMaxSteps = (n) => {
    setMaxSteps(prev => Math.max(prev, n));
  };

  const nextStep = () => {
    if (step < maxSteps) {
      setStep(s => s + 1);
      return true; // consumió el paso dentro de la diapositiva
    }
    return false; // ya llegó al final de los pasos, avanzar de slide
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(s => s - 1);
      return true; // retrocedió un paso
    }
    return false; // ya estaba en el primer paso, retroceder de slide
  };

  return (
    <SlideStepContext.Provider value={{ step, maxSteps, registerMaxSteps, nextStep, prevStep }}>
      {children}
    </SlideStepContext.Provider>
  );
}

export function useSlideStep() {
  return useContext(SlideStepContext);
}

/**
 * Registra cuántos pasos internos tiene la diapositiva.
 * Solo registra si la diapositiva está presente: con AnimatePresence
 * mode="wait" la diapositiva saliente sigue montada durante su animación
 * y, sin este filtro, le dejaría sus pasos a la siguiente.
 */
export function useRegisterSteps(n) {
  const { registerMaxSteps } = useSlideStep();
  const isPresent = useIsPresent();

  useEffect(() => {
    if (isPresent) registerMaxSteps(n);
  }, [n, isPresent, registerMaxSteps]);
}

/**
 * Componente RevealStep para mostrar elementos progresivamente.
 * stepIndex: A partir de qué paso (1, 2, 3...) se vuelve visible.
 */
export function RevealStep({ stepIndex, children, className = '' }) {
  const { step } = useSlideStep();
  useRegisterSteps(stepIndex);

  const isVisible = step >= stepIndex;

  return (
    <div
      className={`transition-all duration-500 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none pointer-events-auto'
          : 'opacity-15 translate-y-2 blur-[1px] pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
}
