
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Calculator, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const crops = [
  { value: "rice", label: "Rice" },
  { value: "wheat", label: "Wheat" },
  { value: "corn", label: "Corn" },
  { value: "coffee", label: "Coffee" },
  { value: "sugarcane", label: "Sugarcane" },
  { value: "cotton", label: "Cotton" },
  { value: "potatoes", label: "Potatoes" },
  { value: "tomatoes", label: "Tomatoes" }
];

const PriceCalculator = () => {
  const { toast } = useToast();
  const [cropType, setCropType] = useState("");
  const [landArea, setLandArea] = useState("");
  const [waterAvailability, setWaterAvailability] = useState("");
  const [soilType, setSoilType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
    confidence: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // This would be replaced with actual AI calculation in production
      const basePrice = {
        rice: 25,
        wheat: 22,
        corn: 18,
        coffee: 90,
        sugarcane: 15,
        cotton: 70,
        potatoes: 20,
        tomatoes: 28
      }[cropType as keyof typeof basePrice] || 20;
      
      const landMultiplier = parseFloat(landArea) > 10 ? 1.1 : 1;
      const waterMultiplier = parseFloat(waterAvailability) > 70 ? 1.15 : 0.9;
      const soilMultiplier = {
        "loamy": 1.2,
        "clay": 1.05,
        "sandy": 0.9,
        "silt": 1.1,
      }[soilType as keyof typeof soilMultiplier] || 1;
      
      const calculatedPrice = basePrice * landMultiplier * waterMultiplier * soilMultiplier;
      const variance = calculatedPrice * 0.15; // 15% variance
      
      setResult({
        minPrice: parseFloat((calculatedPrice - variance).toFixed(2)),
        maxPrice: parseFloat((calculatedPrice + variance).toFixed(2)),
        avgPrice: parseFloat(calculatedPrice.toFixed(2)),
        confidence: 85,
      });
      
      setLoading(false);
      
      toast({
        title: "Price Estimation Complete",
        description: "We've generated an estimated price range for your crop.",
      });
    }, 2000);
  };

  return (
    <Card className="glass-card shadow-md transition-all duration-300 hover:shadow-lg w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-primary" />
          Crop Price Estimator
        </CardTitle>
        <CardDescription>
          Enter your crop details to get an AI-powered price estimate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crop-type">Crop Type</Label>
              <Select
                value={cropType}
                onValueChange={setCropType}
                required
              >
                <SelectTrigger id="crop-type" className="input-animated">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="land-area">Land Area (Acres)</Label>
              <Input
                id="land-area"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter land area"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
                className="input-animated"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="water-availability">Water Availability (%)</Label>
              <Input
                id="water-availability"
                type="number"
                min="0"
                max="100"
                placeholder="Enter water availability"
                value={waterAvailability}
                onChange={(e) => setWaterAvailability(e.target.value)}
                className="input-animated"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="soil-type">Soil Type</Label>
              <Select
                value={soilType}
                onValueChange={setSoilType}
                required
              >
                <SelectTrigger id="soil-type" className="input-animated">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
              </>
            ) : "Calculate Estimated Price"}
          </Button>
        </form>
      </CardContent>
      
      {result && (
        <CardFooter className="block">
          <div className="mt-4 p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium text-center">Estimated Price Range</h4>
            <div className="flex justify-between items-center mt-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Minimum</div>
                <div className="text-xl font-medium">${result.minPrice}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Average</div>
                <div className="text-xl font-medium text-primary">${result.avgPrice}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Maximum</div>
                <div className="text-xl font-medium">${result.maxPrice}</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-muted-foreground">
                Confidence: {result.confidence}%
              </span>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PriceCalculator;
