import { categories } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '../ui/input';

export default function Filters() {
  return (
    <Card className="bg-card border-border/20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="font-semibold mb-4">Category</h3>
          <RadioGroup defaultValue="all" className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={`cat-${category.id}`} />
                <Label htmlFor={`cat-${category.id}`} className="flex-1 cursor-pointer hover:text-primary">
                  {category.name}
                </Label>
                <span className="text-xs text-muted-foreground">{category.productCount}</span>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <Slider defaultValue={[500]} max={1000} step={10} />
           <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">
            <Input type="number" defaultValue="0" className="w-20 h-8 bg-background"/>
            <span className="px-2">-</span>
            <Input type="number" defaultValue="500" className="w-20 h-8 bg-background"/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
