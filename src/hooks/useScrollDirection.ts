import { useState, useEffect, useCallback } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export const useScrollDirection = (threshold: number = 10): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const updateScrollDirection = useCallback(() => {
    const scrollY = window.scrollY;
    
    if (Math.abs(scrollY - lastScrollY) < threshold) {
      return;
    }
    
    setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
    setLastScrollY(scrollY > 0 ? scrollY : 0);
  }, [lastScrollY, threshold]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollDirection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [updateScrollDirection]);

  return scrollDirection;
};