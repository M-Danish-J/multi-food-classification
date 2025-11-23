"use client";

import { useState, useCallback, useRef } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { DetectionCanvas } from "@/components/DetectionCanvas";
import { DetectionResults } from "@/components/DetectionResults";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { detectFood, loadModel } from "@/lib/model";
import type { DetectionResult } from "@/lib/types";
import { Loader2, RotateCcw, Sparkles, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string>("");
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageSelected = useCallback((file: File, url: string) => {
    setImageFile(file);
    setImageUrl(url);
    setResult(null);
    setError("");
  }, []);

  const handleDetect = useCallback(async () => {
    if (!imageUrl) return;

    setIsLoading(true);
    setIsModelLoading(true);
    setError("");

    try {
      // Load model first
      await loadModel();
      setIsModelLoading(false);

      // Create image element
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Run detection
      const detectionResult = await detectFood(img);
      setResult(detectionResult);
    } catch (err) {
      console.error("Detection error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to detect food items"
      );
    } finally {
      setIsLoading(false);
      setIsModelLoading(false);
    }
  }, [imageUrl]);

  const handleReset = useCallback(() => {
    setImageFile(null);
    setImageUrl("");
    setResult(null);
    setError("");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-3 shadow-lg">
              <Sparkles className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Multi-Food Detection
              </h1>
              <p className="text-sm text-muted-foreground">
                YOLOv5-powered food classification system
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <AnimatePresence mode="wait">
          {!imageUrl ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Info Card */}
              <Card className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900">
                <div className="flex gap-4">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 h-fit">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                      How it works
                    </h3>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>✨ Upload an image containing food items</li>
                      <li>
                        🔍 Our YOLOv5 model detects and classifies up to 8 food
                        types
                      </li>
                      <li>📊 View detection results with confidence scores</li>
                      <li>
                        🎯 Detectable foods: Chicken, Daal, Mixsweet, Naan,
                        Rice, Roti, Salad, Yogurt
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <ImageUpload
                onImageSelected={handleImageSelected}
                disabled={isLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                {!result && (
                  <Button
                    onClick={handleDetect}
                    disabled={isLoading}
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {isModelLoading ? "Loading Model..." : "Detecting..."}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Detect Food Items
                      </>
                    )}
                  </Button>
                )}
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="shadow hover:shadow-lg transition-all duration-200"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Upload New Image
                </Button>
              </div>

              {/* Error Display */}
              {error && (
                <Card className="p-6 bg-destructive/10 border-destructive/20">
                  <p className="text-destructive font-medium">{error}</p>
                </Card>
              )}

              {/* Results Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Image with Detections */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Detection Result</h2>
                  {result ? (
                    <DetectionCanvas
                      imageUrl={imageUrl}
                      detections={result.detections}
                      imageWidth={result.imageWidth}
                      imageHeight={result.imageHeight}
                    />
                  ) : (
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded food"
                        className="w-full h-auto rounded-xl shadow-2xl border border-border"
                      />
                      {isLoading && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                            <p className="text-lg font-medium">
                              {isModelLoading
                                ? "Loading AI Model..."
                                : "Analyzing Image..."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Results Panel */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Analysis</h2>
                  {result ? (
                    <DetectionResults
                      detections={result.detections}
                      inferenceTime={result.inferenceTime}
                    />
                  ) : (
                    <Card className="p-8 h-full flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="rounded-full bg-muted p-6 inline-block">
                          <Sparkles className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">
                          Click "Detect Food Items" to start analysis
                        </p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Multi-Food Detection System • Powered by YOLOv5 • CS619 Spring 2025
          </p>
          <p className="mt-2">
            Best Model: Hybrid (60 epochs, batch 12) • 78.1% Precision • 76.1%
            mAP@0.5
          </p>
        </div>
      </footer>
    </div>
  );
}
