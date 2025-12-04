/**
 * Utility functions for safe navigation handling
 */

/**
 * Safely scroll to an element by ID with error handling
 */
export const safeScrollToElement = (elementId: string): boolean => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.warn(`Element with ID "${elementId}" not found`);
      return false;
    }

    // Check if smooth scrolling is supported
    const supportsSmooth = 'scrollBehavior' in document.documentElement.style;
    
    if (supportsSmooth) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    } else {
      // Fallback for browsers that don't support smooth scrolling
      const elementTop = element.offsetTop;
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = elementTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        left: 0
      });
    }
    
    return true;
  } catch (error) {
    console.error(`Error scrolling to element "${elementId}":`, error);
    return false;
  }
};

/**
 * Validate navigation references exist in the DOM
 */
export const validateNavigationReferences = (refs: string[]): { valid: string[]; invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];
  
  refs.forEach(ref => {
    try {
      const element = document.getElementById(ref);
      if (element) {
        valid.push(ref);
      } else {
        invalid.push(ref);
      }
    } catch (error) {
      console.error(`Error validating reference "${ref}":`, error);
      invalid.push(ref);
    }
  });
  
  return { valid, invalid };
};

/**
 * Get all navigation sections that exist in the DOM
 */
export const getAvailableNavigationSections = (): string[] => {
  const commonSections = ['home', 'about', 'experience', 'portfolio', 'education', 'contact'];
  const { valid } = validateNavigationReferences(commonSections);
  return valid;
};

/**
 * Handle navigation click with error recovery
 */
export const handleNavigationClick = (
  sectionId: string, 
  onError?: (error: string) => void
): void => {
  try {
    const success = safeScrollToElement(sectionId);
    
    if (!success && onError) {
      onError(`Could not navigate to section: ${sectionId}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Navigation failed';
    console.error('Navigation error:', errorMessage);
    onError?.(errorMessage);
  }
};