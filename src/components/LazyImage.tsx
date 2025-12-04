import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  retryCount?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==',
  fallbackSrc,
  onLoad,
  onError,
  retryCount = 2
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const loadImage = (imageUrl: string) => {
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(imageUrl);
      setIsLoaded(true);
      setHasError(false);
      onLoad?.();
    };
    
    img.onerror = () => {
      if (attempts < retryCount) {
        // Retry loading the image
        setAttempts(prev => prev + 1);
        setTimeout(() => loadImage(imageUrl), 1000 * (attempts + 1)); // Exponential backoff
      } else if (fallbackSrc && imageUrl !== fallbackSrc) {
        // Try fallback image
        setAttempts(0);
        loadImage(fallbackSrc);
      } else {
        // Show error placeholder
        setHasError(true);
        setImageSrc(generateErrorPlaceholder(alt));
        onError?.();
      }
    };
    
    img.src = imageUrl;
  };

  const generateErrorPlaceholder = (altText: string) => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="20" y="20" width="160" height="160" fill="none" stroke="#d1d5db" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="50%" y="45%" font-family="Arial" font-size="12" fill="#6b7280" text-anchor="middle">Image</text>
        <text x="50%" y="55%" font-family="Arial" font-size="12" fill="#6b7280" text-anchor="middle">Not Found</text>
        <text x="50%" y="70%" font-family="Arial" font-size="10" fill="#9ca3af" text-anchor="middle">${altText.substring(0, 15)}</text>
      </svg>
    `)}`;
  };

  useEffect(() => {
    if (!src) {
      setHasError(true);
      setImageSrc(generateErrorPlaceholder(alt));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded && !hasError) {
            loadImage(src);
            // Stop observing once we start loading
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, isLoaded, hasError, alt, attempts]);

  return (
    <div className={`relative ${className}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-70'
        }`}
        loading="lazy"
        decoding="async"
      />
      
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-destructive" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};