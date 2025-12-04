/**
 * Utility functions for image optimization
 */

/**
 * Generate WebP source URLs for modern browsers with fallback
 */
export const getOptimizedImageSrc = (src: string): { webp?: string; fallback: string } => {
  if (!src) return { fallback: src };
  
  // Check if the image is already optimized or external
  if (src.includes('http') || src.includes('.webp')) {
    return { fallback: src };
  }
  
  // Generate WebP version for local images
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return {
    webp: webpSrc,
    fallback: src
  };
};

/**
 * Check if browser supports WebP format
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Generate responsive image sizes
 */
export const getResponsiveImageSizes = (baseWidth: number) => {
  return {
    mobile: Math.round(baseWidth * 0.5),
    tablet: Math.round(baseWidth * 0.75),
    desktop: baseWidth
  };
};