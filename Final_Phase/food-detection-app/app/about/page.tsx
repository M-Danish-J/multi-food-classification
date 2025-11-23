"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sparkles,
  Brain,
  Zap,
  Shield,
  Globe,
  Cpu,
  Target,
  TrendingUp,
  Home,
  Github,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "YOLOv5 deep learning model with 78.1% precision",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Real-time detection in 200-500ms per image",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All processing happens in your browser",
  },
  {
    icon: Globe,
    title: "Works Anywhere",
    description: "No installation needed, just open and use",
  },
  {
    icon: Cpu,
    title: "ONNX Runtime",
    description: "Optimized WebAssembly inference engine",
  },
  {
    icon: Target,
    title: "8 Food Classes",
    description: "Detects Pakistani cuisine items accurately",
  },
];

const stats = [
  { label: "Precision", value: "78.1%" },
  { label: "mAP@0.5", value: "76.1%" },
  { label: "Inference Time", value: "<500ms" },
  { label: "Model Size", value: "28 MB" },
];

const foodClasses = [
  "Chicken",
  "Daal",
  "Mixsweet",
  "Naan",
  "Rice",
  "Roti",
  "Salad",
  "Yogurt",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-3 shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  FoodScan
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI-Powered Food Recognition
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              CS619 Spring 2025 Project
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            About This Project
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            An advanced AI-powered system for detecting and classifying multiple
            food items in real-time using state-of-the-art deep learning
            technology.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-muted/20">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Food Classes Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Detectable Food Classes
          </h2>
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {foodClasses.map((food, index) => (
                <motion.div
                  key={food}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                >
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">{food}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI & ML
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• YOLOv5s (Ultralytics)</li>
                <li>• ONNX Runtime Web</li>
                <li>• PyTorch (Training)</li>
                <li>• WebAssembly (Inference)</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Frontend
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Next.js 16 (App Router)</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• TailwindCSS 4</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20">
          <TrendingUp className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Try It?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload your food images and see our AI detect and classify multiple
            items with impressive accuracy in real-time.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Try Detection Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a
                href="https://github.com/M-Danish-J/multi-food-classification"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Multi-Food Detection System • CS619 Spring 2025</p>
          <p className="mt-2">
            Powered by YOLOv5 • Built with Next.js • Deployed on Vercel
          </p>
        </div>
      </footer>
    </div>
  );
}
