import { useState, useEffect, useCallback } from 'react';

export const useScrollStop = (delay: number = 150): boolean => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScrollStop = useCallback(() => {
    setIsScrolling(false);
  }, []);

  useEffect(() => {
    let timeoutId: number;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolling(true);
          clearTimeout(timeoutId);
          timeoutId = setTimeout(handleScrollStop, delay);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [delay, handleScrollStop]);

  return isScrolling;
};