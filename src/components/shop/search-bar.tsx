import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for products..."
        className="w-full pl-10"
      />
    </div>
  );
}
