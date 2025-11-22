# YOLOv5 Food Classification - Local Training

This directory contains the adapted YOLOv5 training pipeline for local execution (CPU-only).

## Dataset

- **Classes**: 8 food items (chicken, daal, mixsweet, naan, rice, roti, salad, yogurt)
- **Training Images**: 348
- **Test Images**: 88
- **Format**: YOLOv5 format (images + YOLO labels)

## Setup

### 1. Run the setup script:

```bash
cd /home/danish/University/FYP/multi-food-classification/Prototype_Phase
bash setup_env.sh
```

This will:

- Create a Python virtual environment
- Install PyTorch (CPU version)
- Install all required dependencies
- Clone the YOLOv5 repository
- Create necessary directories

### 2. Activate the environment:

```bash
source venv/bin/activate
```

## Training

### Option 1: Using the Python Script

```bash
python train_local.py --epochs 50 --batch 16 --img 640 --data data/food_yolov5_data.yaml --weights yolov5s.pt --name food_model
```

### Option 2: Using Jupyter Notebook

```bash
jupyter notebook Prototype_Phase_Solution.ipynb
```

Then run all cells sequentially.

## Training Parameters

- `--epochs`: Number of training epochs (default: 50)
- `--batch`: Batch size (default: 16, reduce if running out of memory)
- `--img`: Image size (default: 640)
- `--data`: Path to data configuration YAML
- `--weights`: Pre-trained weights to use (yolov5s.pt, yolov5m.pt, etc.)
- `--name`: Name for this training run

## Output

Training results will be saved in:

```
runs/train/<name>/
├── weights/
│   ├── best.pt      # Best model weights
│   └── last.pt      # Last epoch weights
├── results.png      # Training metrics plots
├── confusion_matrix.png
└── ...
```

## Notes

⚠️ **CPU Training**: This setup uses CPU-only PyTorch. Training will be slower than GPU training. Consider:

- Using smaller batch sizes (8 or 16)
- Using smaller model variants (yolov5n.pt or yolov5s.pt)
- Reducing image size if needed (--img 416)

## Directory Structure

```
Prototype_Phase/
├── design/
│   ├── Train_Set/
│   │   ├── images/
│   │   └── labels/
│   └── Test_Set/
│       ├── images/
│       └── labels/
├── yolov5/              # Cloned YOLOv5 repo
├── data/
│   └── food_yolov5_data.yaml
├── venv/                # Python virtual environment
├── runs/                # Training outputs
├── requirements.txt
├── setup_env.sh
├── train_local.py
├── Prototype_Phase_Solution.ipynb
└── README.md
```
