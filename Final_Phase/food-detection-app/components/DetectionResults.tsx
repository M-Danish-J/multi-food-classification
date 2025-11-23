"use client";

import { Card } from "@/components/ui/card";
import { CLASS_COLORS } from "@/lib/model";
import type { Detection } from "@/lib/types";
import { Clock, Target, Utensils } from "lucide-react";

interface DetectionResultsProps {
  detections: Detection[];
  inferenceTime: number;
}

export function DetectionResults({
  detections,
  inferenceTime,
}: DetectionResultsProps) {
  if (detections.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-muted p-6">
            <Target className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">No Food Detected</h3>
            <p className="text-muted-foreground">
              Try uploading a different image with food items
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/20 p-3">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Items Detected</p>
              <p className="text-3xl font-bold">{detections.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-muted/10 border-secondary/20">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-secondary/20 p-3">
              <Clock className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inference Time</p>
              <p className="text-3xl font-bold">{inferenceTime.toFixed(0)}ms</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detection List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Detected Food Items
        </h3>
        <div className="space-y-3">
          {detections
            .sort((a, b) => b.confidence - a.confidence)
            .map((detection, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full shadow-lg"
                    style={{ backgroundColor: CLASS_COLORS[detection.class] }}
                  />
                  <span className="font-medium capitalize">
                    {detection.class}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="font-semibold">
                      {(detection.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${detection.confidence * 100}%`,
                        backgroundColor: CLASS_COLORS[detection.class],
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
