'use client';

import { categories } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Star } from 'lucide-react';

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
}

export default function Filters({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedRating,
  setSelectedRating,
}: FiltersProps) {
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter((c) => c !== categoryId)
        : [...selectedCategories, categoryId]
    );
  };

  const allProductCategories = categories.filter((c) => c.id !== 'all');

  return (
    <Card className="bg-card border-border/20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="font-semibold mb-4">Category</h3>
          <div className="space-y-3">
            {allProductCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <Label
                  htmlFor={`cat-${category.id}`}
                  className="flex-1 cursor-pointer hover:text-primary"
                >
                  {category.name}
                </Label>
                <span className="text-xs text-muted-foreground">
                  {category.productCount}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[priceRange[1]]}
            onValueChange={(value) => setPriceRange([0, value[0]])}
          />
          <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-20 h-8 bg-background"
              min={0}
            />
            <span className="px-2">-</span>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-20 h-8 bg-background"
              max={100}
            />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Rating</h3>
          <RadioGroup
            value={String(selectedRating)}
            onValueChange={(value) => setSelectedRating(Number(value))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="r1" />
              <Label htmlFor="r1" className="flex items-center gap-1 cursor-pointer">
                4 <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> & Up
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="r2" />
              <Label htmlFor="r2" className="flex items-center gap-1 cursor-pointer">
                3 <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> & Up
              </Label>
            </div>
             <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="r3" />
              <Label htmlFor="r3" className="cursor-pointer">All</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
