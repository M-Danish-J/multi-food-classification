"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageUpload } from "@/components/ImageUpload";
import { DetectionCanvas } from "@/components/DetectionCanvas";
import { DetectionResults } from "@/components/DetectionResults";
import { SampleSelector } from "@/components/SampleSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { detectFood, loadModel } from "@/lib/model";
import type { DetectionResult } from "@/lib/types";
import {
  Loader2,
  RotateCcw,
  Sparkles,
  Info,
  ArrowRight,
  Zap,
} from "lucide-react";
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

  const handleSampleSelected = useCallback(async (sampleUrl: string) => {
    setImageUrl(sampleUrl);
    setImageFile(null);
    setResult(null);
    setError("");
  }, []);

  const handleDetect = useCallback(async () => {
    if (!imageUrl) return;

    setIsLoading(true);
    setIsModelLoading(true);
    setError("");

    try {
      await loadModel();
      setIsModelLoading(false);

      const img = document.createElement("img") as HTMLImageElement;
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

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
      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="rounded-xl bg-gradient-to-br from-primary to-accent p-3 shadow-lg"
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  FoodScan
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI-Powered Recognition
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/about">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  About
                  <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <AnimatePresence mode="wait">
          {!imageUrl ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <div className="text-center space-y-4 py-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4"
                >
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    Powered by YOLOv5 AI
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient"
                >
                  Detect Food Instantly
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                  Upload an image and let our AI identify multiple food items
                  with impressive accuracy
                </motion.p>
              </div>

              {/* Info Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-4 md:p-6 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-950/20 dark:to-yellow-950/20 border-green-200 dark:border-green-900">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2.5 md:p-3 h-fit mx-auto sm:mx-0">
                      <Info className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-2 flex-1 text-center sm:text-left">
                      <h3 className="font-semibold text-sm md:text-base text-green-900 dark:text-green-100">
                        How it works
                      </h3>
                      <ul className="text-xs md:text-sm text-green-800 dark:text-green-200 space-y-1.5">
                        <li className="flex items-center gap-2 justify-center sm:justify-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600 flex-shrink-0" />
                          <span>Upload an image or try a sample</span>
                        </li>
                        <li className="flex items-center gap-2 justify-center sm:justify-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600 flex-shrink-0" />
                          <span>Our YOLOv5 AI detects up to 8 food types</span>
                        </li>
                        <li className="flex items-center gap-2 justify-center sm:justify-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600 flex-shrink-0" />
                          <span>View results with bounding boxes</span>
                        </li>
                      </ul>
                      <div className="pt-2">
                        <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                          Detectable: Chicken • Daal • Mixsweet • Naan • Rice •
                          Roti • Salad • Yogurt
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Upload Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <ImageUpload
                  onImageSelected={handleImageSelected}
                  disabled={isLoading}
                />
              </motion.div>

              {/* Sample Selector */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <SampleSelector
                  onSampleSelected={handleSampleSelected}
                  disabled={isLoading}
                />
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="grid md:grid-cols-3 gap-4 pt-8"
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">78.1% Precision</h3>
                  <p className="text-sm text-muted-foreground">
                    Highly accurate food detection
                  </p>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-3">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Real-Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Results in under 500ms
                  </p>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-3">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Privacy First</h3>
                  <p className="text-sm text-muted-foreground">
                    All processing in browser
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Action Buttons */}
              <div className="flex gap-3 justify-center flex-wrap">
                {!result && (
                  <Button
                    onClick={handleDetect}
                    disabled={isLoading}
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {isModelLoading ? "Loading Model..." : "Detecting..."}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Detect Food Items
                      </>
                    )}
                  </Button>
                )}
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="shadow hover:shadow-lg transition-all duration-200 gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  Upload New Image
                </Button>
              </div>

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Card className="p-6 bg-destructive/10 border-destructive/20">
                      <p className="text-destructive font-medium">{error}</p>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Image with Detections */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
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
                </motion.div>

                {/* Results Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold">Analysis</h2>
                  {result ? (
                    <DetectionResults
                      detections={result.detections}
                      inferenceTime={result.inferenceTime}
                    />
                  ) : (
                    <Card className="p-8 h-full flex items-center justify-center min-h-[400px]">
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
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t mt-20 py-6 md:py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="text-center">
              <p className="font-medium">Multi-Food Detection System</p>
              <p className="text-xs mt-1">CS619 Spring 2025 • YOLOv5 AI</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              <Link
                href="/about"
                className="hover:text-foreground transition-colors"
              >
                About
              </Link>
              <a
                href="https://github.com/M-Danish-J/multi-food-classification"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <span className="text-xs hidden sm:inline">
                Best Model: 78.1% Precision • 76.1% mAP@0.5
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
