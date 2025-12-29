import { useState, useEffect, useCallback } from 'react';

export const useOptimizedScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    // Reduce scroll effects on mobile for better performance
    setScrollY(isMobile ? currentScrollY * 0.5 : currentScrollY);
    setIsScrolled(currentScrollY > 50);
  }, [isMobile]);

  useEffect(() => {
    let ticking = false;

    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', optimizedScrollHandler);
  }, [handleScroll]);

  return { scrollY, isScrolled, isMobile };
};