import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useScrollStop } from '../hooks/useScrollStop';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  className?: string;
}

const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = ({ className = '' }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const scrollDirection = useScrollDirection(10);
  const isScrolling = useScrollStop(150);
  
  // Determine navbar visibility
  const shouldShowNavbar = scrollDirection !== 'down' || !isScrolling;

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {shouldShowNavbar && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 ${className}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0"
                >
                  <button
                    onClick={() => scrollToSection('#home')}
                    className="flex items-center"
                    aria-label="Go to home section"
                  >
                    {!logoError ? (
                      <img
                        src="/images/logo/logo.png"
                        alt="Logo"
                        className="h-10 w-auto object-contain"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <span className="text-2xl font-bold font-manrope text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                        R
                      </span>
                    )}
                  </button>
                </motion.div>
                {/* Desktop Navigation */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-8">
                    {navigationLinks.map((link) => (
                      <motion.button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium font-inter transition-colors duration-200 relative group"
                        aria-label={`Navigate to ${link.name} section`}
                      >
                        {link.name}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Theme Toggle and Mobile Menu Button */}
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  
                  {/* Mobile menu button */}
                  <div className="md:hidden">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="inline-flex items-center justify-center p-3 min-h-[44px] min-w-[44px] rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 touch-manipulation"
                      aria-label="Toggle mobile menu"
                      aria-expanded={isMobileMenuOpen}
                    >
                      {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                      ) : (
                        <Menu className="h-6 w-6" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile menu header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-bold font-manrope text-gray-900 dark:text-white">
                    Menu
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label="Close mobile menu"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Mobile navigation links */}
                <div className="flex-1 px-4 py-6 space-y-4">
                  {navigationLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(link.href)}
                      className="block w-full text-left px-4 py-3 text-base font-medium font-inter text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                      aria-label={`Navigate to ${link.name} section`}
                    >
                      {link.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};