
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { Toaster } from "@/components/ui/toaster";
import RotatingObject from './3DRotatingObject';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Background decorative elements */}
      <div className="fixed bottom-10 right-10 opacity-30 pointer-events-none z-0 hidden md:block">
        <RotatingObject size={150} color="rgba(75, 192, 75, 0.4)" />
      </div>
      
      <main className="flex-1 page-transition">
        {children}
      </main>
      
      <footer className="py-6 px-8 border-t border-border/40 backdrop-blur-sm relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Agri-Aide Hub. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
