import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative h-11 w-11 min-h-[44px] min-w-[44px] rounded-md border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center touch-manipulation"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 10,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-4 w-4 text-yellow-500" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 10,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-4 w-4 text-blue-400" />
      </motion.div>
    </button>
  );
};