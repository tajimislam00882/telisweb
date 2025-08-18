'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

export function useProductFilters(allProducts: Product[]) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [sortOption, setSortOption] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by search term
    if (searchTerm) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price range
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort products
    switch (sortOption) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming products are already somewhat sorted by date or have a date field
        // For now, we'll reverse the array to simulate newest
        products.reverse();
        break;
      case 'relevance':
      default:
        // Default order, or implement a more complex relevance logic
        break;
    }

    return products;
  }, [searchTerm, sortOption, priceRange, selectedCategories, allProducts]);

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
  };
}
