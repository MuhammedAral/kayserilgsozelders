import { useEffect } from 'react';

/**
 * .reveal sınıfına sahip elemanları görünür olduklarında açığa çıkarır.
 * - Hareket azaltma tercihi olan kullanıcılarda animasyon tamamen atlanır.
 * - Prerender edilmiş HTML hydrate olmadan önce de içerik görünür kalsın diye
 *   .reveal elemanları CSS'te varsayılan olarak görünürdür; bu hook yalnızca
 *   JavaScript çalıştığında animasyonu devreye alır (bkz. App.css / .js-reveal).
 */
const useScrollReveal = () => {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) return undefined;

    // Animasyonu ancak burada açıyoruz: JS çalışmazsa içerik gizli kalmaz.
    root.classList.add('js-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);
};

export default useScrollReveal;
