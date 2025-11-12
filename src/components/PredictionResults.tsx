import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PredictionResult {
  prediction: "diabetic" | "non-diabetic";
  confidence: number;
  naiveBayesProb: number;
  logisticRegressionProb: number;
  riskLevel: "low" | "moderate" | "high";
}

interface PredictionResultsProps {
  result: PredictionResult;
}

export const PredictionResults = ({ result }: PredictionResultsProps) => {
  const isDiabetic = result.prediction === "diabetic";
  const confidencePercent = Math.round(result.confidence * 100);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "text-destructive";
      case "moderate": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "high": return "destructive";
      case "moderate": return "secondary";
      case "low": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Alert className={isDiabetic ? "border-destructive/50 bg-destructive/5" : "border-success/50 bg-success/5"}>
        {isDiabetic ? (
          <AlertCircle className="h-5 w-5 text-destructive" />
        ) : (
          <CheckCircle2 className="h-5 w-5 text-success" />
        )}
        <AlertTitle className="text-lg font-semibold">
          {isDiabetic ? "⚠️ Diabetic - High Risk" : "✅ Non-Diabetic"}
        </AlertTitle>
        <AlertDescription className="mt-2">
          {isDiabetic
            ? "Based on the provided medical data, our models indicate a higher likelihood of diabetes. Please consult with a healthcare professional for proper diagnosis and treatment."
            : "The analysis suggests a lower risk of diabetes based on the provided data. Continue maintaining a healthy lifestyle."}
        </AlertDescription>
      </Alert>

      <Card className="shadow-card bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Prediction Confidence</span>
            <Badge className={getRiskColor(result.riskLevel)} variant={getRiskBadgeVariant(result.riskLevel)}>
              {result.riskLevel.toUpperCase()} RISK
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Confidence</span>
              <span className="font-semibold text-foreground">{confidencePercent}%</span>
            </div>
            <Progress value={confidencePercent} className="h-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Naïve Bayes Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {Math.round(result.naiveBayesProb * 100)}%
                    </span>
                    <span className="text-sm text-muted-foreground">probability</span>
                  </div>
                  <Progress value={result.naiveBayesProb * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  Logistic Regression
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {Math.round(result.logisticRegressionProb * 100)}%
                    </span>
                    <span className="text-sm text-muted-foreground">probability</span>
                  </div>
                  <Progress value={result.logisticRegressionProb * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-semibold mb-2 text-foreground">Model Information</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This prediction uses two complementary machine learning models trained on the PIMA Indians Diabetes Dataset.
              The Naïve Bayes classifier provides probabilistic predictions based on feature independence,
              while Logistic Regression offers a weighted linear combination approach. Both models contribute to the final assessment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
