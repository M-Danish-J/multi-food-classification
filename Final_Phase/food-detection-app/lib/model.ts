// ONNX model inference utilities for YOLOv5 food detection

import * as ort from "onnxruntime-web";
import type { Detection, DetectionResult, ModelConfig } from "./types";

// Food classes in order (from your YOLOv5 training)
const FOOD_CLASSES = [
  "chicken",
  "daal",
  "mixsweet",
  "naan",
  "rice",
  "roti",
  "salad",
  "yogurt",
];

// Color palette for bounding boxes (one per class)
export const CLASS_COLORS: Record<string, string> = {
  chicken: "#FF6B6B",
  daal: "#4ECDC4",
  mixsweet: "#FFE66D",
  naan: "#A8E6CF",
  rice: "#FF8B94",
  roti: "#C7CEEA",
  salad: "#95E1D3",
  yogurt: "#F38181",
};

// Model configuration
const MODEL_CONFIG: ModelConfig = {
  modelPath: "/best.onnx",
  inputSize: 640,
  classes: FOOD_CLASSES,
  confidenceThreshold: 0.25,
  iouThreshold: 0.45,
};

let session: ort.InferenceSession | null = null;

/**
 * Load the ONNX model
 */
export async function loadModel(): Promise<void> {
  if (session) return; // Already loaded

  try {
    // Configure ONNX Runtime for web
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.simd = true;
    ort.env.wasm.wasmPaths =
      "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.2/dist/";
    ort.env.logLevel = "error"; // Suppress warnings

    console.log("Loading ONNX model from:", MODEL_CONFIG.modelPath);

    // Load the model with web-optimized settings
    session = await ort.InferenceSession.create(MODEL_CONFIG.modelPath, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "basic",
      executionMode: "sequential",
      enableCpuMemArena: false,
    });

    console.log("Model loaded successfully");
    console.log("Input names:", session.inputNames);
    console.log("Output names:", session.outputNames);
  } catch (error) {
    console.error("Failed to load model:", error);
    session = null;
    throw new Error(
      "Failed to load ONNX model. Please check console for details."
    );
  }
}

/**
 * Preprocess image for YOLOv5 input
 */
function preprocessImage(
  imageData: ImageData,
  targetSize: number
): { tensor: ort.Tensor; scale: number; padX: number; padY: number } {
  const { width, height, data } = imageData;

  // Calculate scaling to fit within target size while maintaining aspect ratio
  const scale = Math.min(targetSize / width, targetSize / height);
  const scaledWidth = Math.round(width * scale);
  const scaledHeight = Math.round(height * scale);

  // Calculate padding to center the image
  const padX = Math.floor((targetSize - scaledWidth) / 2);
  const padY = Math.floor((targetSize - scaledHeight) / 2);

  // Create tensor array [1, 3, 640, 640] in CHW format
  const input = new Float32Array(1 * 3 * targetSize * targetSize);

  // Fill with gray color (128/255)
  input.fill(128 / 255);

  // Process each pixel
  for (let y = 0; y < scaledHeight; y++) {
    for (let x = 0; x < scaledWidth; x++) {
      // Calculate source pixel position
      const srcX = Math.floor(x / scale);
      const srcY = Math.floor(y / scale);
      const srcIdx = (srcY * width + srcX) * 4;

      // Calculate destination position in CHW format
      const dstX = x + padX;
      const dstY = y + padY;

      // Normalize RGB values to [0, 1] and place in CHW format
      const rIdx = dstY * targetSize + dstX;
      const gIdx = targetSize * targetSize + rIdx;
      const bIdx = 2 * targetSize * targetSize + rIdx;

      input[rIdx] = data[srcIdx] / 255; // R
      input[gIdx] = data[srcIdx + 1] / 255; // G
      input[bIdx] = data[srcIdx + 2] / 255; // B
    }
  }

  const tensor = new ort.Tensor("float32", input, [
    1,
    3,
    targetSize,
    targetSize,
  ]);

  return { tensor, scale, padX, padY };
}

/**
 * Non-Maximum Suppression (NMS)
 */
function nms(boxes: Detection[], iouThreshold: number): Detection[] {
  // Sort by confidence descending
  boxes.sort((a, b) => b.confidence - a.confidence);

  const selected: Detection[] = [];

  for (const box of boxes) {
    let shouldSelect = true;

    for (const selectedBox of selected) {
      if (calculateIoU(box.bbox, selectedBox.bbox) > iouThreshold) {
        shouldSelect = false;
        break;
      }
    }

    if (shouldSelect) {
      selected.push(box);
    }
  }

  return selected;
}

/**
 * Calculate Intersection over Union (IoU)
 */
function calculateIoU(box1: number[], box2: number[]): number {
  const [x1, y1, w1, h1] = box1;
  const [x2, y2, w2, h2] = box2;

  const x1Max = x1 + w1;
  const y1Max = y1 + h1;
  const x2Max = x2 + w2;
  const y2Max = y2 + h2;

  const intersectX = Math.max(0, Math.min(x1Max, x2Max) - Math.max(x1, x2));
  const intersectY = Math.max(0, Math.min(y1Max, y2Max) - Math.max(y1, y2));
  const intersectArea = intersectX * intersectY;

  const box1Area = w1 * h1;
  const box2Area = w2 * h2;
  const unionArea = box1Area + box2Area - intersectArea;

  return intersectArea / unionArea;
}

/**
 * Process model output and extract detections
 */
function processOutput(
  output: ort.Tensor,
  imageWidth: number,
  imageHeight: number,
  scale: number,
  padX: number,
  padY: number
): Detection[] {
  const data = output.data as Float32Array;
  const detections: Detection[] = [];

  // YOLOv5 output format: [batch, 25200, 13]
  // 13 = [x, y, w, h, objectness, class1_prob, class2_prob, ..., class8_prob]
  const numDetections = 25200;
  const numClasses = MODEL_CONFIG.classes.length;

  for (let i = 0; i < numDetections; i++) {
    const offset = i * (5 + numClasses);

    const objectness = data[offset + 4];

    if (objectness < MODEL_CONFIG.confidenceThreshold) continue;

    // Find class with highest probability
    let maxClassProb = 0;
    let classIdx = 0;

    for (let j = 0; j < numClasses; j++) {
      const prob = data[offset + 5 + j];
      if (prob > maxClassProb) {
        maxClassProb = prob;
        classIdx = j;
      }
    }

    const confidence = objectness * maxClassProb;

    if (confidence < MODEL_CONFIG.confidenceThreshold) continue;

    // Bounding box coordinates (in input image space)
    let x = data[offset + 0];
    let y = data[offset + 1];
    let w = data[offset + 2];
    let h = data[offset + 3];

    // Convert from center format to corner format
    x = x - w / 2;
    y = y - h / 2;

    // Remove padding and scale back to original image size
    x = (x - padX) / scale;
    y = (y - padY) / scale;
    w = w / scale;
    h = h / scale;

    // Clamp to image bounds
    x = Math.max(0, Math.min(x, imageWidth));
    y = Math.max(0, Math.min(y, imageHeight));
    w = Math.min(w, imageWidth - x);
    h = Math.min(h, imageHeight - y);

    detections.push({
      class: MODEL_CONFIG.classes[classIdx],
      confidence,
      bbox: [x, y, w, h],
    });
  }

  // Apply NMS
  return nms(detections, MODEL_CONFIG.iouThreshold);
}

/**
 * Run inference on an image
 */
export async function detectFood(
  imageElement: HTMLImageElement
): Promise<DetectionResult> {
  if (!session) {
    await loadModel();
  }

  if (!session) {
    throw new Error("Model not loaded");
  }

  const startTime = performance.now();

  // Draw image to canvas to get ImageData
  const canvas = document.createElement("canvas");
  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(imageElement, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Preprocess
  const { tensor, scale, padX, padY } = preprocessImage(
    imageData,
    MODEL_CONFIG.inputSize
  );

  // Run inference
  const feeds = { images: tensor };
  const results = await session.run(feeds);
  const output = results.output0;

  // Process output
  const detections = processOutput(
    output,
    imageElement.naturalWidth,
    imageElement.naturalHeight,
    scale,
    padX,
    padY
  );

  const inferenceTime = performance.now() - startTime;

  return {
    detections,
    inferenceTime,
    imageWidth: imageElement.naturalWidth,
    imageHeight: imageElement.naturalHeight,
  };
}
