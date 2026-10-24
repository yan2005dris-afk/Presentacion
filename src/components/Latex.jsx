import React, { useEffect, useRef } from 'react';

/**
 * Componente Latex para renderizar fórmulas matemáticas vectoriales
 * usando KaTeX sin dependencias pesadas en el bundle.
 */
export function Latex({ math, block = false, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const render = () => {
      if (window.katex) {
        try {
          window.katex.render(math, containerRef.current, {
            displayMode: block,
            throwOnError: false,
          });
        } catch (e) {
          containerRef.current.innerText = math;
        }
      } else {
        // Fallback si KaTeX aún está cargando desde CDN
        containerRef.current.innerText = math;
      }
    };

    render();

    // Reintentar si KaTeX cargó asíncronamente
    if (!window.katex) {
      const interval = setInterval(() => {
        if (window.katex) {
          render();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [math, block]);

  if (block) {
    return <div ref={containerRef} className={`my-1 text-center overflow-x-auto ${className}`} />;
  }

  return <span ref={containerRef} className={`inline-block ${className}`} />;
}
