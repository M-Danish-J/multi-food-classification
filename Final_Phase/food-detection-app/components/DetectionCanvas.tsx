"use client";

import { useEffect, useRef } from "react";
import { CLASS_COLORS } from "@/lib/model";
import type { Detection } from "@/lib/types";

interface DetectionCanvasProps {
  imageUrl: string;
  detections: Detection[];
  imageWidth: number;
  imageHeight: number;
}

export function DetectionCanvas({
  imageUrl,
  detections,
  imageWidth,
  imageHeight,
}: DetectionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imageRef.current;

    const drawDetections = () => {
      // Set canvas size to match image
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Draw bounding boxes and labels
      detections.forEach((detection) => {
        const [x, y, w, h] = detection.bbox;
        const color = CLASS_COLORS[detection.class] || "#00FF00";

        // Draw bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, w, h);

        // Draw label background
        const label = `${detection.class} ${(
          detection.confidence * 100
        ).toFixed(1)}%`;
        ctx.font = "bold 16px Inter, sans-serif";
        const textMetrics = ctx.measureText(label);
        const textWidth = textMetrics.width;
        const textHeight = 20;

        const labelX = x;
        const labelY = y - textHeight - 4;

        // Background for label
        ctx.fillStyle = color;
        ctx.fillRect(labelX, labelY, textWidth + 12, textHeight + 8);

        // Draw label text
        ctx.fillStyle = "#FFFFFF";
        ctx.textBaseline = "top";
        ctx.fillText(label, labelX + 6, labelY + 4);
      });
    };

    if (img.complete) {
      drawDetections();
    } else {
      img.onload = drawDetections;
    }
  }, [imageUrl, detections, imageWidth, imageHeight]);

  return (
    <div className="relative w-full">
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Uploaded food"
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-xl shadow-2xl border border-border"
      />
    </div>
  );
}
