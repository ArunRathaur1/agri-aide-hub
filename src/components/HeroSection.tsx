
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      
      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;
      
      orbitRef.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tl from-agri-green/20 to-transparent rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute left-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-agri-blue/20 to-transparent rounded-full blur-3xl transform -translate-x-1/4 -translate-y-1/4"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Revolutionizing Agriculture with AI
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
                Empowering Farmers with <span className="text-primary">Smart Technology</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
                Leverage AI to estimate crop prices, monitor crop health, access government schemes, and connect directly with consumers.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/price-estimation">
                  Try Price Estimation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full">
                <Link to="/crop-health">
                  Check Crop Health
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-x-8 gap-y-4 flex-wrap">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted"></div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">1,000+</span> farmers using our platform
              </p>
            </div>
          </div>
          
          <div className="relative animate-fade-in perspective">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Green agricultural field" 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-agri-green/10 to-agri-blue/10"></div>
              
              <div ref={orbitRef} className="preserve-3d transition-transform duration-200 absolute inset-0 flex items-center justify-center">
                <div className="glass-panel rounded-2xl p-6 shadow-lg w-4/5 animate-float z-20">
                  <div className="space-y-4">
                    <div className="w-full h-32 bg-agri-green/10 rounded-lg flex items-center justify-center">
                      <div className="rotating-element w-24 h-24 rounded-full bg-agri-green/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-agri-green/30 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded-full w-3/4"></div>
                      <div className="h-4 bg-muted rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-1/4 right-0 w-16 h-16 glass-panel rounded-full p-2 floating-element" style={{ animationDelay: '1s' }}>
                  <div className="w-full h-full rounded-full bg-primary/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/60"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 left-0 w-12 h-12 glass-panel rounded-full p-2 floating-element" style={{ animationDelay: '2s' }}>
                  <div className="w-full h-full rounded-full bg-accent/30 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-accent/60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
