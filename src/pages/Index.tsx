
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Leaf, BarChart3, FileText, Image, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast
    toast({
      title: "Welcome to Agri-Aide Hub",
      description: "Explore our AI tools designed specifically for farmers.",
      duration: 5000,
    });
  }, [toast]);

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Crop Price Estimation",
      description: "Get accurate price forecasts based on your land, resources, and market trends using our AI algorithms.",
      chip: "AI-Powered",
      link: "/price-estimation",
      imageSrc: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Government Schemes",
      description: "Stay updated with the latest agricultural schemes, subsidies, and loan offers from government agencies.",
      chip: "Updated Weekly",
      link: "/government-schemes",
      imageSrc: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Crop Health Analysis",
      description: "Upload images of your crops and receive instant health assessments and treatment recommendations.",
      chip: "Computer Vision",
      link: "/crop-health",
      imageSrc: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Direct Market Access",
      description: "Connect directly with consumers and industries to sell your produce without intermediaries.",
      chip: "Marketplace",
      link: "/direct-market",
      imageSrc: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  return (
    <Layout>
      <HeroSection />
      
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Our Features</h2>
            <p className="section-subtitle">
              Comprehensive solutions designed to revolutionize farming operations and increase profitability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="block hover:no-underline">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  chip={feature.chip}
                  imageSrc={feature.imageSrc}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Agricultural background" 
            className="object-cover w-full h-full opacity-10"
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="glass-panel rounded-2xl p-8 animate-float">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Crop Analysis Dashboard</h4>
                      <p className="text-sm text-muted-foreground">Real-time monitoring</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded-full w-full"></div>
                    <div className="h-4 bg-muted rounded-full w-3/4"></div>
                    <div className="h-4 bg-muted rounded-full w-1/2"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-agri-green/10 flex flex-col items-center">
                      <div className="text-lg font-medium">84%</div>
                      <div className="text-xs text-muted-foreground">Health</div>
                    </div>
                    <div className="p-4 rounded-lg bg-agri-blue/10 flex flex-col items-center">
                      <div className="text-lg font-medium">$12.4</div>
                      <div className="text-xs text-muted-foreground">Price/kg</div>
                    </div>
                    <div className="p-4 rounded-lg bg-agri-brown/10 flex flex-col items-center">
                      <div className="text-lg font-medium">+8%</div>
                      <div className="text-xs text-muted-foreground">Yield</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="section-title">Why Choose Agri-Aide Hub?</h2>
              <p className="text-lg text-muted-foreground">
                Our platform brings together cutting-edge AI technologies specifically designed for agricultural needs, helping farmers make data-driven decisions.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Advanced AI algorithms for accurate price predictions",
                  "Real-time crop health monitoring through image processing",
                  "Comprehensive database of government schemes and subsidies",
                  "Direct marketplace connection to eliminate middlemen",
                  "User-friendly interface designed for farmers of all tech levels"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6">
                <Button asChild className="rounded-full">
                  <Link to="/price-estimation">
                    Get Started Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Rural farmland"
            className="object-cover w-full h-full opacity-5"
          />
        </div>
        
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="section-title">Ready to Transform Your Farming?</h2>
          <p className="section-subtitle">
            Join thousands of farmers already using our platform to increase productivity and profitability
          </p>
          
          <div className="mt-10">
            <Button size="lg" asChild className="rounded-full">
              <Link to="/price-estimation">
                Start Your Journey
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
