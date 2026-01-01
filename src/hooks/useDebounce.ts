// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Mettre en place un timer pour retarder la mise à jour
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nettoyer le timer à chaque fois que la valeur change ou au démontage
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Version alternative avec callback
export function useDebounceCallback<T>(
  value: T,
  delay: number,
  callback: (debouncedValue: T) => void
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, callback]);
}