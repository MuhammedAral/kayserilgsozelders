import { useEffect } from 'react';

/**
 * .reveal sınıfına sahip elemanları görünür olduklarında açığa çıkarır.
 * - Hareket azaltma tercihi olan kullanıcılarda animasyon tamamen atlanır.
 * - MutationObserver ile sonradan DOM'a eklenen .reveal elemanları da izlenir.
 */
const useScrollReveal = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealAll = () =>
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('reveal-visible'));

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealAll();
      return undefined;
    }

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

    const observeAll = () => {
      document
        .querySelectorAll('.reveal:not(.reveal-visible)')
        .forEach((el) => observer.observe(el));
    };

    observeAll();

    const mutationObserver = new MutationObserver(observeAll);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
};

export default useScrollReveal;
