import { useState, useEffect, useCallback } from 'react';

interface UseLocalStorageOptions {
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
  onError?: (error: Error, operation: 'read' | 'write') => void;
}

export function useLocalStorage<T>(
  key: string, 
  initialValue: T,
  options: UseLocalStorageOptions = {}
): [T, (value: T | ((prev: T) => T)) => void, { error: Error | null; isSupported: boolean }] {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    onError
  } = options;

  // Check if localStorage is supported
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Test localStorage support
  useEffect(() => {
    try {
      const testKey = '__localStorage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      setIsSupported(true);
    } catch (e) {
      setIsSupported(false);
      const err = new Error('localStorage is not supported or available');
      setError(err);
      onError?.(err, 'read');
    }
  }, [onError]);

  // Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isSupported) return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return initialValue;
      return deserialize(item);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to read from localStorage');
      setError(err);
      onError?.(err, 'read');
      console.warn(`Error reading localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  // Update localStorage when storedValue changes
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setError(null); // Clear previous errors
      
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (isSupported) {
        window.localStorage.setItem(key, serialize(valueToStore));
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to write to localStorage');
      setError(err);
      onError?.(err, 'write');
      console.warn(`Error setting localStorage key "${key}":`, err);
    }
  }, [key, serialize, storedValue, isSupported, onError]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    if (!isSupported) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserialize(e.newValue));
          setError(null);
        } catch (error) {
          const err = error instanceof Error ? error : new Error('Failed to sync localStorage change');
          setError(err);
          onError?.(err, 'read');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserialize, isSupported, onError]);

  return [storedValue, setValue, { error, isSupported }];
}
