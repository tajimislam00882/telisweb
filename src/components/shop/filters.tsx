import { categories } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function Filters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Category</h3>
          <RadioGroup defaultValue="all" className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={`cat-${category.id}`} />
                <Label htmlFor={`cat-${category.id}`} className="flex-1">
                  {category.name}
                </Label>
                <span className="text-xs text-muted-foreground">{category.productCount}</span>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <Slider defaultValue={[50]} max={100} step={1} />
           <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>$0</span>
            <span>$100+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
