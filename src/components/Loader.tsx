import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoaderProps {
  onLoadComplete: () => void;
}

export const Loader = ({ onLoadComplete }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    // Set up 3-second maximum timeout
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onLoadComplete();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {!logoError ? (
          <img
            src="/images/logo/logo.png"
            alt="Logo"
            className="w-32 h-32 object-contain"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="text-8xl font-manrope font-bold text-foreground border-4 border-primary rounded-lg px-6 py-4">
            R
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};