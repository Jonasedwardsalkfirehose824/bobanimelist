import { Link } from 'react-router';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import Label from '../label';
import styles from './ErrorState.module.scss';
import classNames from 'classnames';

export type ErrorType = '404' | '500' | 'network' | 'timeout' | 'unauthorized' | 'forbidden' | 'generic' | 
  'deployment-blocked' | 'deployment-deleted' | 'deployment-disabled' | 'deployment-not-ready' | 
  'deployment-paused' | 'dns-error' | 'edge-function-error' | 'function-timeout' | 'function-throttled' | 
  'infinite-loop' | 'invalid-request' | 'middleware-error' | 'router-error' | 'sandbox-error' | 
  'too-many-requests' | 'internal-error';

interface ErrorConfig {
  emoji: string;
  image?: string;
  defaultTitle: string;
  defaultMessage: string;
  color: string;
}

interface ErrorStateProps {
  type?: ErrorType;
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
  retryButtonText?: string;
  navigateTo?: string;
  navigateButtonText?: string;
  className?: string;
  role?: string;
}

const errorConfigs: Record<ErrorType, ErrorConfig> = {
  '404': {
    emoji: '🔍',
    image: '/shocked-min.gif',
    defaultTitle: 'Page Not Found',
    defaultMessage: "The page you're looking for doesn't exist or has been moved.",
    color: '#FFAEC9',
  },
  '500': {
    emoji: '⚠️',
    defaultTitle: 'Server Error',
    defaultMessage: 'Something went wrong on our end. Please try again later.',
    color: '#ef4444',
  },
  network: {
    emoji: '📡',
    defaultTitle: 'Connection Lost',
    defaultMessage: 'Please check your internet connection and try again.',
    color: '#f59e0b',
  },
  timeout: {
    emoji: '⏱️',
    defaultTitle: 'Request Timeout',
    defaultMessage: 'The request took too long. Please try again.',
    color: '#FFAEC9',
  },
  unauthorized: {
    emoji: '🔒',
    defaultTitle: 'Unauthorized',
    defaultMessage: 'You need to be logged in to access this page.',
    color: '#FFAEC9',
  },
  forbidden: {
    emoji: '🚫',
    defaultTitle: 'Access Forbidden',
    defaultMessage: "You don't have permission to access this resource.",
    color: '#dc2626',
  },
  generic: {
    emoji: '😔',
    defaultTitle: 'Something Went Wrong',
    defaultMessage: 'An unexpected error has occurred. Please try again.',
    color: '#FFAEC9',
  },
  'deployment-blocked': {
    emoji: '🛑',
    defaultTitle: 'Deployment Blocked',
    defaultMessage: 'This deployment has been blocked. Please check your Vercel dashboard for more information.',
    color: '#ef4444',
  },
  'deployment-deleted': {
    emoji: '🗑️',
    defaultTitle: 'Deployment Deleted',
    defaultMessage: 'The deployment you are trying to access has been deleted.',
    color: '#6b7280',
  },
  'deployment-disabled': {
    emoji: '⏸️',
    defaultTitle: 'Deployment Disabled',
    defaultMessage: 'This deployment has been disabled. Please contact the site administrator.',
    color: '#f59e0b',
  },
  'deployment-not-ready': {
    emoji: '⏳',
    defaultTitle: 'Deployment Not Ready',
    defaultMessage: 'This deployment is still being prepared. Please try again in a few moments.',
    color: '#3b82f6',
  },
  'deployment-paused': {
    emoji: '⏸️',
    defaultTitle: 'Deployment Paused',
    defaultMessage: 'This deployment has been temporarily paused and is currently unavailable.',
    color: '#8b5cf6',
  },
  'dns-error': {
    emoji: '🌍',
    defaultTitle: 'DNS Resolution Error',
    defaultMessage: 'We are unable to resolve the domain name. Please check the URL or contact support.',
    color: '#ec4899',
  },
  'edge-function-error': {
    emoji: '⚡',
    defaultTitle: 'Edge Function Error',
    defaultMessage: 'An error occurred while executing an edge function. Please try again later.',
    color: '#8b5cf6',
  },
  'function-timeout': {
    emoji: '⏰',
    defaultTitle: 'Function Timeout',
    defaultMessage: 'The serverless function took too long to execute. Please try again.',
    color: '#f59e0b',
  },
  'function-throttled': {
    emoji: '🚦',
    defaultTitle: 'Function Throttled',
    defaultMessage: 'Too many requests are being processed. Please try again later.',
    color: '#ef4444',
  },
  'infinite-loop': {
    emoji: '🔄',
    defaultTitle: 'Infinite Loop Detected',
    defaultMessage: 'An infinite loop has been detected in your application. Please contact support.',
    color: '#ef4444',
  },
  'invalid-request': {
    emoji: '❌',
    defaultTitle: 'Invalid Request',
    defaultMessage: 'The request you made is invalid. Please check your request and try again.',
    color: '#ef4444',
  },
  'middleware-error': {
    emoji: '⚙️',
    defaultTitle: 'Middleware Error',
    defaultMessage: 'An error occurred in the middleware layer. Please try again later.',
    color: '#8b5cf6',
  },
  'router-error': {
    emoji: '🧭',
    defaultTitle: 'Router Error',
    defaultMessage: 'The router is unable to match your request to a valid route.',
    color: '#f59e0b',
  },
  'sandbox-error': {
    emoji: '🧰',
    defaultTitle: 'Sandbox Error',
    defaultMessage: 'The execution environment is not available. Please try again later.',
    color: '#ec4899',
  },
  'too-many-requests': {
    emoji: '📈',
    defaultTitle: 'Too Many Requests',
    defaultMessage: 'You have sent too many requests. Please wait before making more requests.',
    color: '#ef4444',
  },
  'internal-error': {
    emoji: '🔧',
    defaultTitle: 'Internal Error',
    defaultMessage: 'An internal error occurred. This is likely a platform issue. Please try again later.',
    color: '#dc2626',
  },
};

function ErrorState({
  type = 'generic',
  title,
  message,
  onRetry,
  showRetryButton = true,
  retryButtonText = 'Try Again',
  navigateTo,
  navigateButtonText = 'Go Home',
  className,
  role = 'alert'
}: ErrorStateProps) {
  const config = errorConfigs[type];
  const finalTitle = title || config.defaultTitle;
  const finalMessage = message || config.defaultMessage;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [20, -20]);
  const rotateY = useTransform(mouseX, [-300, 300], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, mouseX, mouseY]);

  const retryButton = showRetryButton && onRetry && (
    <motion.button 
      className={styles['error-state__button']}
      onClick={onRetry}
      aria-label={retryButtonText}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Label as='span' font='typo-primary-m-medium'>{retryButtonText}</Label>
    </motion.button>
  );

  const navigateButton = navigateTo && (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={navigateTo} className={styles['error-state__button']}>
        <Label as='span' font='typo-primary-m-medium'>{navigateButtonText}</Label>
      </Link>
    </motion.div>
  );

  return (
    <motion.div 
      ref={containerRef}
      className={classNames(styles['error-state'], className)} 
      role={role}
      aria-live="polite"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className={styles['error-state__icon-container']}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className={classNames(styles['error-state__icon'], styles['error-state__icon--animated'])}
          initial={{ scale: 0, rotateY: 0 }}
          animate={{ 
            scale: 1, 
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{ 
            scale: {
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.1
            },
            rotateY: {
              duration: 0.6,
              ease: 'easeInOut'
            }
          }}
          style={{
            transformStyle: 'preserve-3d',
            '--error-color': config.color,
          } as React.CSSProperties}
        >
          <div className={styles['error-state__card-face']} style={{ transform: 'rotateY(0deg)', backfaceVisibility: 'hidden' }}>
            <img
              src="/card__front.png"
              alt="Error card front"
              className={styles["error-state__image"]}
            />
          </div>
          
          <div className={styles['error-state__card-back']} style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
            <img
              src="/card__back.png"
              alt="Error card back"
              className={styles["error-state__image"]}
            />
          </div>
          
          {/* Sparkle effects for added shimmer */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className={styles['error-state__sparkle']}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0.3))',
                zIndex: 3,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles['error-state__content']}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Label as='h3' font='typo-primary-l-semibold' className={styles['error-state__title']}>
          {finalTitle}
        </Label>
        <Label as='p' font='typo-primary-m-regular' className={styles['error-state__message']}>
          {finalMessage}
        </Label>
      </motion.div>

      {(retryButton || navigateButton) && (
        <motion.div 
          className={styles['error-state__actions']}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {retryButton}
          {navigateButton}
        </motion.div>
      )}

      <div className={styles['error-state__particles']}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={styles['error-state__particle']}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0,
              scale: 0 
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default ErrorState;
