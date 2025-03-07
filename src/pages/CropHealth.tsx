import { useState } from 'react';
import { Leaf, Microscope, AlertTriangle, ThumbsUp, Gauge } from 'lucide-react';
import Layout from '@/components/Layout';
import ImageUploader from '@/components/ImageUploader';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AnalysisResult {
  health: number;
  disease: string | null;
  recommendations: string[];
  confidence: number;
}

const CropHealth = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  const handleImageAnalyzed = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  const getHealthStatus = (health: number) => {
    if (health >= 90) return { label: "Excellent", color: "text-green-600" };
    if (health >= 75) return { label: "Good", color: "text-green-500" };
    if (health >= 60) return { label: "Fair", color: "text-yellow-500" };
    if (health >= 40) return { label: "Poor", color: "text-orange-500" };
    return { label: "Critical", color: "text-red-500" };
  };
  
  const getHealthColor = (health: number) => {
    if (health >= 90) return "bg-green-600";
    if (health >= 75) return "bg-green-500";
    if (health >= 60) return "bg-yellow-500";
    if (health >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Layout>
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-down">
            <h1 className="text-4xl font-semibold mb-4">Crop Health Analysis</h1>
            <p className="text-lg text-muted-foreground">
              Upload images of your crops to get AI-powered health assessments and recommendations
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 animate-fade-in-left">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl">
                    <Leaf className="h-5 w-5 mr-2 text-primary" />
                    How It Works
                  </CardTitle>
                  <CardDescription>
                    Our AI system can detect diseases, nutrient deficiencies, and other health issues
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full text-primary">
                      <Microscope className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Visual Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Our AI algorithm analyzes visual patterns, colors, and textures in your crop images.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full text-primary">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Disease Detection</h4>
                      <p className="text-sm text-muted-foreground">
                        Identifies common crop diseases like leaf rust, powdery mildew, and blight with high accuracy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full text-primary">
                      <Gauge className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Health Assessment</h4>
                      <p className="text-sm text-muted-foreground">
                        Provides an overall health score and identifies specific areas of concern.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="mt-0.5 bg-primary/10 p-2 rounded-full text-primary">
                      <ThumbsUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Personalized Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Offers tailored suggestions for treatment, fertilization, and care based on the analysis.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">For Best Results</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span>Take clear, well-lit photos showing the entire plant or affected areas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span>Avoid shadows and make sure the image is in focus</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span>Include both healthy and unhealthy parts for comparison</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        <span>Provide multiple angles for more comprehensive analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8 animate-fade-in">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl">
                    <ImageUploader onImageAnalyzed={handleImageAnalyzed} />
                  </CardTitle>
                </CardHeader>
              </Card>
              
              {analysisResult && (
                <Card className="overflow-hidden">
                  <div className={`h-2 ${getHealthColor(analysisResult.health)}`}></div>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span>Analysis Results</span>
                      <span className={`text-sm ${getHealthStatus(analysisResult.health).color}`}>
                        {getHealthStatus(analysisResult.health).label}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Confidence: {analysisResult.confidence.toFixed(1)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Health Score</span>
                        <span className="text-sm">{analysisResult.health.toFixed(1)}%</span>
                      </div>
                      <Progress value={analysisResult.health} className="h-2" />
                    </div>
                    
                    {analysisResult.disease && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <div className="flex items-center text-amber-700">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          <span className="font-medium">Detected Issue: {analysisResult.disease}</span>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CropHealth;
