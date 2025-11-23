// TypeScript types for the food detection application

export interface Detection {
  class: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
}

export interface ModelConfig {
  modelPath: string;
  inputSize: number;
  classes: string[];
  confidenceThreshold: number;
  iouThreshold: number;
}

export interface DetectionResult {
  detections: Detection[];
  inferenceTime: number;
  imageWidth: number;
  imageHeight: number;
}
