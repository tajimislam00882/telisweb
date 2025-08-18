'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/language-context';
import { Search } from 'lucide-react';

interface SearchAndSortProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

export default function SearchAndSort({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
}: SearchAndSortProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t('search_placeholder')}
          className="w-full pl-10 bg-card border-border/20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className='text-sm text-muted-foreground shrink-0'>{t('sort_by_label')}:</span>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full md:w-[180px] bg-card border-border/20">
            <SelectValue placeholder={t('sort_by_label')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">{t('sort_relevance')}</SelectItem>
            <SelectItem value="best-selling">{t('sort_best_selling')}</SelectItem>
            <SelectItem value="top-rated">{t('sort_top_rated')}</SelectItem>
            <SelectItem value="newest">{t('sort_newest')}</SelectItem>
            <SelectItem value="price-asc">{t('sort_price_asc')}</SelectItem>
            <SelectItem value="price-desc">{t('sort_price_desc')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
