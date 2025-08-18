import { useState, useEffect, useCallback, RefObject } from 'react';
import type { Product } from '@/lib/types';
import { products } from '@/lib/data';

// Debounce function
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useSearchSuggestions(
  searchQuery: string,
  containerRef: RefObject<HTMLElement>
) {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredProducts.slice(0, 5)); // Limit to 5 suggestions
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      fetchSuggestions(debouncedSearchQuery);
      setIsSuggestionsVisible(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  }, [debouncedSearchQuery, fetchSuggestions]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  return {
    suggestions,
    isLoading,
    isSuggestionsVisible,
    setIsSuggestionsVisible,
  };
}
