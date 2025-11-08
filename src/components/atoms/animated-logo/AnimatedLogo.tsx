import { useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './AnimatedLogo.module.scss';

interface AnimatedLogoProps {
  onAnimationComplete?: () => void;
  isExiting?: boolean;
}

function AnimatedLogo({ onAnimationComplete, isExiting = false }: AnimatedLogoProps) {
  useEffect(() => {
    const animationDuration = 1500;

    const timer = setTimeout(() => {
      if (onAnimationComplete) onAnimationComplete();
    }, animationDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [onAnimationComplete]);

  return (
    <div className={styles['animated-logo-container']}>
      <motion.h1 
        className={styles['brand-text']}
        initial={{ y: 0, opacity: 1 }}
        animate={isExiting ? { 
          y: '150vh',
          opacity: 0,
        } : { 
          y: 0,
          opacity: 1,
        }}
        transition={isExiting ? {
          duration: 0.8,
          ease: [0.4, 0, 0.6, 1],
          opacity: {
            duration: 0.4,
            delay: 0,
            ease: "easeIn"
          }
        } : {
          duration: 0,
        }}
      >
        bobanimelist
      </motion.h1>
    </div>
  );
}

export default AnimatedLogo;