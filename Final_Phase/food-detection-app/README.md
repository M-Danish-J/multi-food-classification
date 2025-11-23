# Multi-Food Detection Web Application

A modern, AI-powered food detection system built with Next.js and YOLOv5.

## Features

- 🚀 **Real-time Detection**: Upload images and detect multiple food items instantly
- 🎯 **High Accuracy**: 78.1% precision using YOLOv5 hybrid model
- 🎨 **Beautiful UI**: Modern design with smooth animations and responsive layout
- 📊 **Detailed Results**: View bounding boxes, confidence scores, and detection statistics
- ⚡ **Fast Inference**: ONNX Runtime Web for efficient browser-based detection

## Detected Food Classes

The model can detect 8 different food items:

1. Chicken
2. Daal
3. Mixsweet
4. Naan
5. Rice
6. Roti
7. Salad
8. Yogurt

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19, TailwindCSS 4, shadcn/ui
- **AI**: ONNX Runtime Web with YOLOv5 model
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm run start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Upload Image**: Drag and drop or click to upload a food image
2. **Detect**: Click "Detect Food Items" to run the AI model
3. **View Results**: See detected items with bounding boxes and confidence scores
4. **Try Again**: Upload a new image to detect more food items

## Model Information

**Model**: YOLOv5s Hybrid (fine_tuned_food_model_v2)

**Training Configuration**:

- Epochs: 60
- Batch Size: 12
- Input Size: 640x640

**Performance Metrics**:

- Precision: 78.1%
- Recall: 71.7%
- mAP@0.5: 76.1%
- mAP@0.5:0.95: 48.6%

## Project Structure

```
food-detection-app/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ImageUpload.tsx       # Drag & drop upload component
│   ├── DetectionCanvas.tsx   # Canvas for rendering bounding boxes
│   ├── DetectionResults.tsx  # Results display
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── model.ts              # ONNX model inference
│   ├── types.ts              # TypeScript types
│   └── utils.ts              # Utility functions
├── public/
│   └── best.onnx             # Trained YOLOv5 model
└── package.json              # Dependencies
```

## Development

### Adding New Features

The codebase is modular and easy to extend:

- **Add new food classes**: Update `FOOD_CLASSES` and `CLASS_COLORS` in `lib/model.ts`
- **Customize UI**: Modify components in `components/` directory
- **Adjust detection thresholds**: Update `MODEL_CONFIG` in `lib/model.ts`

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier formatting (recommended)

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t food-detection-app .

# Run container
docker run -p 3000:3000 food-detection-app
```

## Performance

- **Model Size**: ~14.5 MB
- **First Load**: ~2-3 seconds (model loading)
- **Inference Time**: 200-500ms per image
- **Bundle Size**: Optimized for production

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Acknowledgments

- **YOLOv5**: Ultralytics YOLOv5 for object detection
- **ONNX Runtime**: Microsoft ONNX Runtime for web inference
- **Next.js**: Vercel Next.js framework
- **shadcn/ui**: Beautiful UI components

## License

This project was created for CS619 Spring 2025 - Final Year Project.

## Contact

For questions or support, please contact your project supervisor.

---

**CS619 Spring 2025** | Multi-Food Image Detection and Classification
