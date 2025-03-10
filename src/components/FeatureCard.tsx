
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  chip?: string;
  imageSrc?: string;
}

const FeatureCard = ({ icon, title, description, chip, imageSrc }: FeatureCardProps) => {
  return (
    <div className="glass-card group overflow-hidden relative h-full">
      {imageSrc && (
        <>
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <img src={imageSrc} alt={title} className="feature-image group-hover:scale-110" />
            <div className="bg-gradient-overlay"></div>
          </div>
          <div className="relative z-20">
            {chip && (
              <div className="mb-4">
                <span className="feature-chip">{chip}</span>
              </div>
            )}
            <div className="p-3 rounded-full bg-primary/20 backdrop-blur-md w-fit mb-4 text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {icon}
            </div>
            <h3 className="text-xl font-medium mb-2 text-white">{title}</h3>
            <p className="text-white/80 leading-relaxed flex-1">{description}</p>
          </div>
        </>
      )}
      
      {!imageSrc && (
        <div className="flex flex-col h-full">
          {chip && (
            <div className="mb-4">
              <span className="feature-chip">{chip}</span>
            </div>
          )}
          <div className="p-3 rounded-full bg-primary/10 w-fit mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            {icon}
          </div>
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed flex-1">{description}</p>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
