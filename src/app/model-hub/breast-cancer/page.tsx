"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2, Upload } from "lucide-react";

type FormValues = {
  radius_mean: number;
  texture_mean: number;
  perimeter_mean: number;
  area_mean: number;
  smoothness_mean: number;
  compactness_mean: number;
  concavity_mean: number;
  concave_points_mean: number;
  symmetry_mean: number;
  fractal_dimension_mean: number;
  radius_se: number;
  texture_se: number;
  perimeter_se: number;
  area_se: number;
  smoothness_se: number;
  compactness_se: number;
  concavity_se: number;
  concave_points_se: number;
  symmetry_se: number;
  fractal_dimension_se: number;
  radius_worst: number;
  texture_worst: number;
  perimeter_worst: number;
  area_worst: number;
  smoothness_worst: number;
  compactness_worst: number;
  concavity_worst: number;
  concave_points_worst: number;
  symmetry_worst: number;
  fractal_dimension_worst: number;
};

export default function BreastCancerPredictionPage() {
  const [prediction, setPrediction] = useState<{
    prediction: number;
    diagnosis: string;
    probability: number;
    timestamp: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      radius_mean: 0,
      texture_mean: 0,
      perimeter_mean: 0,
      area_mean: 0,
      smoothness_mean: 0,
      compactness_mean: 0,
      concavity_mean: 0,
      concave_points_mean: 0,
      symmetry_mean: 0,
      fractal_dimension_mean: 0,
      radius_se: 0,
      texture_se: 0,
      perimeter_se: 0,
      area_se: 0,
      smoothness_se: 0,
      compactness_se: 0,
      concavity_se: 0,
      concave_points_se: 0,
      symmetry_se: 0,
      fractal_dimension_se: 0,
      radius_worst: 0,
      texture_worst: 0,
      perimeter_worst: 0,
      area_worst: 0,
      smoothness_worst: 0,
      compactness_worst: 0,
      concavity_worst: 0,
      concave_points_worst: 0,
      symmetry_worst: 0,
      fractal_dimension_worst: 0,
    },
  });

  const handleCSVUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const lines = text.split('\n');
      if (lines.length < 2) throw new Error('CSV file is empty');

      const headers = lines[0].trim().split(',');
      const values = lines[1].trim().split(',');

      const data: Partial<FormValues> = {};
      headers.forEach((header, index) => {
        const cleanHeader = header.trim().toLowerCase().replace(/["\s]/g, '_');
        if (cleanHeader in form.getValues()) {
          data[cleanHeader as keyof FormValues] = parseFloat(values[index]);
        }
      });

      form.reset(data as FormValues);
      setError(null);
    } catch (err) {
      setError('Error parsing CSV file. Please ensure it matches the required format.');
    }

    // Reset the input value so the same file can be uploaded again
    event.target.value = '';
  }, [form]);

  async function onSubmit(values: FormValues) {
    try {
      setError(null);
      setPrediction(null);

      const response = await fetch(
        "https://nthander2002-medhive-breastcancer.hf.space/api/v1/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail?.[0]?.msg || "Prediction failed");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-gradient-to-br from-zinc-900/60 to-black/80 border border-cyan-500/20 shadow-lg backdrop-blur-lg rounded-3xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-4xl font-['Poppins'] text-cyan-400 drop-shadow-md">
              Breast Cancer Prediction
            </CardTitle>
            <div className="relative">
              <Input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Upload CSV"
              />
              <Button
                variant="outline"
                className="bg-transparent border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-200"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload CSV
              </Button>
            </div>
          </div>
          <CardDescription className="text-gray-400 mt-1 font-['Poppins']">
            Enter the tumor characteristics to get a prediction, or upload a CSV file with the data.
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {["mean", "se", "worst"].map((section) => (
                  <div
                    key={section}
                    className="space-y-4 p-4 bg-zinc-800/40 rounded-xl border border-cyan-400/10 shadow-inner backdrop-blur-md"
                  >
                    <h3 className="text-xl font-['Poppins'] text-cyan-300 drop-shadow-sm border-b border-cyan-400/20 pb-2">
                      {section === "mean"
                        ? "Mean Values"
                        : section === "se"
                        ? "Standard Error Values"
                        : "Worst Values"}
                    </h3>
                    {Object.entries(form.getValues())
                      .filter(([key]) => key.endsWith(`_${section}`))
                      .map(([key]) => (
                        <FormField
                          key={key}
                          control={form.control}
                          name={key as keyof FormValues}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300 text-sm font-['Poppins']">
                                {key
                                  .replace(/_/g, " ")
                                  .replace(section, "")
                                  .trim()}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.0001"
                                  className="bg-zinc-900 border-cyan-400/20 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseFloat(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 text-white font-['Poppins'] text-lg py-3 rounded-xl shadow-md hover:shadow-cyan-500/30 flex items-center justify-center gap-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Predicting...
                  </>
                ) : (
                  "Get Prediction"
                )}
              </Button>
            </form>
          </Form>

          {error && (
            <Alert
              variant="destructive"
              className="mt-8 border border-red-500/30 bg-red-500/10 text-red-200 backdrop-blur-md"
            >
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {prediction && (
            <Alert className="mt-6 bg-cyan-500/20 border-cyan-400/30">
              <CheckCircle2 className="h-5 w-5 !text-white" />
              <AlertTitle className="text-cyan-400 font-['Poppins'] underline">
                PREDICTION RESULT
              </AlertTitle>
              <AlertDescription className="text-gray-200">
                <div className="mt-2 text-gray-200 space-y-1 font-['Poppins']">
                  <p>
                    <strong>Diagnosis:</strong> {prediction.diagnosis}
                  </p>
                  <p>
                    <strong>Probability:</strong>{" "}
                    {prediction.probability < 0.01
                      ? "< 0.01%"
                      : (prediction.probability*100).toFixed(2) + "%"}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
