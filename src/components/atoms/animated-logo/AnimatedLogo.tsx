import { useEffect } from 'react';
import styles from './AnimatedLogo.module.scss';

interface AnimatedLogoProps {
  onAnimationComplete?: () => void;
}

function AnimatedLogo({ onAnimationComplete }: AnimatedLogoProps) {
  useEffect(() => {
    const animationDuration = 4000; // 4 seconds
    const timer = setTimeout(() => {
      if (onAnimationComplete) onAnimationComplete();
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className={styles['animated-logo-container']}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        className={styles['animated-logo-svg']}
      >
        <path
          className={styles['logo-path']}
          d="M80 60c22-2 45-2 67 1 18 3 35 9 47 22 9 10 13 22 13 35 0 18-9 33-26 42 21 8 34 24 37 45 3 25-8 46-29 59-14 9-31 13-49 14-20 1-40 1-60 0l-2-2c3-4 3-8 3-12V75c0-5-1-9-2-13l1-2c1 0 2 0 3 0h7zm35 92h25c10 0 19-3 26-9 8-7 12-15 11-26-1-11-6-19-16-24-7-3-15-4-24-4h-22v63zm0 97h27c10 0 19-2 27-8 9-6 14-15 13-27-1-14-8-24-21-29-7-3-14-4-22-4h-24v68z"
        />
      </svg>
    </div>
  );
}

export default AnimatedLogo;