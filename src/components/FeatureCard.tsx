
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  chip?: string;
}

const FeatureCard = ({ icon, title, description, chip }: FeatureCardProps) => {
  return (
    <div className="glass-card group">
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
    </div>
  );
};

export default FeatureCard;
