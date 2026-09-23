import React, { useEffect, useRef, useState } from 'react';
import './ScrollReveal.scss';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'slide-up' | 'scale-up' | 'fade-zoom' | 'curtain-wipe' | 'heavy-lift';
  delay?: number; // ms
  threshold?: number;
  rootMargin?: string;
  staggerChildren?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
  staggerChildren = false,
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            // Once revealed, disconnect to keep loaded state
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-box animation-${animation} ${isRevealed ? 'is-revealed' : 'is-hidden'} ${staggerChildren ? 'stagger-enabled' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

