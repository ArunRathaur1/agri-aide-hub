
import { useState } from 'react';
import { ShoppingBag, Users, Building, Truck } from 'lucide-react';
import Layout from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const MarketplaceItem = ({ 
  title, 
  price, 
  quantity, 
  location, 
  seller, 
  image, 
  category 
}: {
  title: string;
  price: string;
  quantity: string;
  location: string;
  seller: string;
  image: string;
  category: string;
}) => {
  const { toast } = useToast();

  const handleContactSeller = () => {
    toast({
      title: "Contact Request Sent",
      description: `Your request to contact ${seller} has been sent.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 bg-muted">
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">{category}</Badge>
        </div>
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <ShoppingBag className="h-12 w-12" />
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="flex justify-between">
          <span>{location}</span>
          <span className="font-medium text-primary">{price}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pb-2">
        <div className="text-sm">
          <span className="font-medium">Quantity:</span> {quantity}
        </div>
        <div className="text-sm">
          <span className="font-medium">Seller:</span> {seller}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleContactSeller} className="w-full">Contact Seller</Button>
      </CardFooter>
    </Card>
  );
};

const DirectMarket = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const consumerItems = [
    {
      title: "Organic Rice",
      price: "₹35/kg",
      quantity: "500 kg available",
      location: "Bangalore, Karnataka",
      seller: "Krishna Farms",
      image: "",
      category: "Grains"
    },
    {
      title: "Fresh Tomatoes",
      price: "₹25/kg",
      quantity: "200 kg available",
      location: "Pune, Maharashtra",
      seller: "Sunshine Organics",
      image: "",
      category: "Vegetables"
    },
    {
      title: "Alphonso Mangoes",
      price: "₹400/dozen",
      quantity: "50 dozen available",
      location: "Ratnagiri, Maharashtra",
      seller: "Coastal Orchards",
      image: "",
      category: "Fruits"
    },
    {
      title: "Organic Wheat",
      price: "₹30/kg",
      quantity: "1000 kg available",
      location: "Ludhiana, Punjab",
      seller: "Punjab Agro Farms",
      image: "",
      category: "Grains"
    }
  ];

  const industryItems = [
    {
      title: "Raw Cotton Bulk",
      price: "₹60,000/ton",
      quantity: "10 tons available",
      location: "Ahmedabad, Gujarat",
      seller: "Gujarat Cotton Cooperative",
      image: "",
      category: "Fiber"
    },
    {
      title: "Sugarcane for Processing",
      price: "₹2,500/ton",
      quantity: "100 tons available",
      location: "Kolhapur, Maharashtra",
      seller: "Kolhapur Agro Industries",
      image: "",
      category: "Sugar Crops"
    },
    {
      title: "Bulk Potatoes for Chips",
      price: "₹15/kg",
      quantity: "5000 kg available",
      location: "Agra, Uttar Pradesh",
      seller: "UP Potato Farms",
      image: "",
      category: "Vegetables"
    },
    {
      title: "Soybean for Oil Extraction",
      price: "₹40,000/ton",
      quantity: "15 tons available",
      location: "Indore, Madhya Pradesh",
      seller: "Central India Farmers Association",
      image: "",
      category: "Oil Seeds"
    }
  ];

  const handleListProduct = () => {
    toast({
      title: "Coming Soon!",
      description: "The feature to list your products will be available soon.",
    });
  };

  return (
    <Layout>
      <section className="py-12 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl font-bold tracking-tight">Direct Market Access</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Connect directly with consumers and industries to sell your produce without intermediaries
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="w-full md:w-2/3 relative">
              <Input
                type="search"
                placeholder="Search by product, location, or seller..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <Button onClick={handleListProduct} className="w-full md:w-auto">
              List Your Product
            </Button>
          </div>

          <Tabs defaultValue="consumer">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="consumer" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Consumer Market</span>
              </TabsTrigger>
              <TabsTrigger value="industry" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Industry Supply</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="consumer" className="mt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {consumerItems.map((item, index) => (
                  <MarketplaceItem key={index} {...item} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="industry" className="mt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {industryItems.map((item, index) => (
                  <MarketplaceItem key={index} {...item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-medium">Need Transportation for Your Goods?</h3>
                <p className="text-muted-foreground mt-2">Connect with local logistics providers to transport your produce.</p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Find Transportation</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DirectMarket;
