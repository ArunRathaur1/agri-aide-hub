
import { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon, X, Check, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageAnalyzed: (result: AnalysisResult) => void;
}

interface AnalysisResult {
  health: number;
  disease: string | null;
  recommendations: string[];
  confidence: number;
}

const ImageUploader = ({ onImageAnalyzed }: ImageUploaderProps) => {
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    toast({
      title: "Analyzing image...",
      description: "Please wait while we assess your crop's health.",
    });
    
    // Simulate API call with timeout
    setTimeout(() => {
      // This would be replaced with actual AI analysis in production
      const mockResult: AnalysisResult = {
        health: Math.random() * 30 + 70, // 70-100% health
        disease: Math.random() > 0.7 ? "Leaf Rust" : null,
        recommendations: [
          "Ensure adequate irrigation every 3-4 days",
          "Apply nitrogen-rich fertilizer",
          "Monitor for signs of pest activity",
        ],
        confidence: Math.random() * 10 + 85, // 85-95% confidence
      };
      
      onImageAnalyzed(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "We've completed the health assessment of your crop.",
      });
    }, 3000);
  };

  return (
    <div className="w-full">
      {!image ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Upload className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Upload Crop Image</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Drag and drop your image here, or click to browse
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileInput}
              accept="image/*"
              ref={fileInputRef}
            />
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="mt-2"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Select Image
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-xl p-4 bg-background">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Uploaded Image</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden mb-4 aspect-video w-full flex items-center justify-center bg-muted/40">
            <img 
              src={image} 
              alt="Uploaded crop" 
              className="object-cover max-w-full max-h-full"
            />
          </div>
          <Button 
            onClick={analyzeImage} 
            className="w-full"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> Analyze Crop Health
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
