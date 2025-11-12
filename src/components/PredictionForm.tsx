import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientData {
  pregnancies: string;
  glucose: string;
  bloodPressure: string;
  skinThickness: string;
  insulin: string;
  bmi: string;
  diabetesPedigree: string;
  age: string;
}

interface PredictionResult {
  prediction: "diabetic" | "non-diabetic";
  confidence: number;
  naiveBayesProb: number;
  logisticRegressionProb: number;
  riskLevel: "low" | "moderate" | "high";
}

interface PredictionFormProps {
  onPredictionComplete: (result: PredictionResult) => void;
}

export const PredictionForm = ({ onPredictionComplete }: PredictionFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PatientData>({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof PatientData)[] = ["glucose", "bloodPressure", "bmi", "age"];
    
    for (const field of requiredFields) {
      if (!formData[field] || parseFloat(formData[field]) <= 0) {
        toast({
          title: "Validation Error",
          description: `Please enter a valid ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate ML prediction - In production, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const glucose = parseFloat(formData.glucose);
      const bmi = parseFloat(formData.bmi);
      const age = parseFloat(formData.age);
      
      // Simple heuristic for demo (replace with actual ML model)
      const score = (glucose > 140 ? 0.4 : 0.1) + 
                   (bmi > 30 ? 0.3 : 0.1) + 
                   (age > 45 ? 0.2 : 0.1);

      const isDiabetic = score > 0.5;
      const confidence = Math.min(0.95, 0.6 + score * 0.3);

      const result: PredictionResult = {
        prediction: isDiabetic ? "diabetic" : "non-diabetic",
        confidence: confidence,
        naiveBayesProb: Math.min(0.95, confidence + Math.random() * 0.1 - 0.05),
        logisticRegressionProb: Math.min(0.95, confidence + Math.random() * 0.1 - 0.05),
        riskLevel: score > 0.6 ? "high" : score > 0.4 ? "moderate" : "low",
      };

      onPredictionComplete(result);
      
      toast({
        title: "Analysis Complete",
        description: "Your diabetes risk assessment is ready.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { name: "pregnancies" as keyof PatientData, label: "Pregnancies", placeholder: "Number of pregnancies", type: "number" },
    { name: "glucose" as keyof PatientData, label: "Glucose Level", placeholder: "mg/dL", type: "number", required: true },
    { name: "bloodPressure" as keyof PatientData, label: "Blood Pressure", placeholder: "mm Hg", type: "number", required: true },
    { name: "skinThickness" as keyof PatientData, label: "Skin Thickness", placeholder: "mm", type: "number" },
    { name: "insulin" as keyof PatientData, label: "Insulin", placeholder: "mu U/ml", type: "number" },
    { name: "bmi" as keyof PatientData, label: "BMI", placeholder: "Body Mass Index", type: "number", required: true },
    { name: "diabetesPedigree" as keyof PatientData, label: "Diabetes Pedigree", placeholder: "Function value", type: "number", step: "0.001" },
    { name: "age" as keyof PatientData, label: "Age", placeholder: "Years", type: "number", required: true },
  ];

  return (
    <Card className="w-full shadow-card bg-gradient-card border-border/50">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-2xl">Patient Information</CardTitle>
        </div>
        <CardDescription>
          Enter medical data for diabetes risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                <Input
                  id={field.name}
                  type={field.type}
                  step={field.step}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="bg-background border-border"
                  required={field.required}
                />
              </div>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-medical hover:opacity-90 transition-opacity shadow-medical"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Predict Diabetes Risk"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
