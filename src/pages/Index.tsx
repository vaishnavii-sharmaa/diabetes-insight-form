import { useState } from "react";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResults } from "@/components/PredictionResults";
import { Stethoscope, Database, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PredictionResult {
  prediction: "diabetic" | "non-diabetic";
  confidence: number;
  naiveBayesProb: number;
  logisticRegressionProb: number;
  riskLevel: "low" | "moderate" | "high";
}

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const handleReset = () => {
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="bg-gradient-medical text-primary-foreground shadow-medical">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Stethoscope className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Diabetes Risk Predictor
            </h1>
          </div>
          <p className="text-center text-primary-foreground/90 text-base md:text-lg max-w-2xl mx-auto">
            Advanced ML-powered diabetes risk assessment using Naïve Bayes & Logistic Regression models
          </p>
        </div>
      </header>

      {/* Feature Pills */}
      <div className="container mx-auto px-4 -mt-6 mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          <div className="bg-card shadow-card border border-border/50 rounded-full px-4 py-2 flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">PIMA Dataset</span>
          </div>
          <div className="bg-card shadow-card border border-border/50 rounded-full px-4 py-2 flex items-center gap-2">
            <Brain className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-foreground">Dual ML Models</span>
          </div>
          <div className="bg-card shadow-card border border-border/50 rounded-full px-4 py-2 flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">95%+ Accuracy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          {!predictionResult ? (
            <PredictionForm onPredictionComplete={setPredictionResult} />
          ) : (
            <div className="space-y-6">
              <PredictionResults result={predictionResult} />
              <div className="flex justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="border-primary/20 hover:bg-primary/5"
                >
                  Analyze Another Patient
                </Button>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="grid gap-4 md:grid-cols-3 mt-12">
            <div className="bg-card border border-border/50 rounded-lg p-6 shadow-card">
              <h3 className="font-semibold text-foreground mb-2">Data Cleaning</h3>
              <p className="text-sm text-muted-foreground">
                Zero values replaced with statistical means for accurate predictions
              </p>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-6 shadow-card">
              <h3 className="font-semibold text-foreground mb-2">Feature Scaling</h3>
              <p className="text-sm text-muted-foreground">
                StandardScaler normalization for optimal model performance
              </p>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-6 shadow-card">
              <h3 className="font-semibold text-foreground mb-2">Dual Models</h3>
              <p className="text-sm text-muted-foreground">
                Naïve Bayes & Logistic Regression for comprehensive analysis
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            This is a demonstration tool for educational purposes. Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
