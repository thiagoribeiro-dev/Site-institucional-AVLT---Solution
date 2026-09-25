'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver enxuto.
 *
 * Usado em dois lugares com propósitos diferentes:
 *  - ScrollReveal: dispara a animação de entrada uma única vez (`once`).
 *  - SceneCanvas: monta e desmonta o canvas 3D conforme ele entra e sai
 *    da viewport, para não gastar GPU renderizando o que ninguém vê.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}) {
  const { once = false, rootMargin = '0px', threshold = 0 } = options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
