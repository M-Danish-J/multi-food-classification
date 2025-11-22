#!/usr/bin/env python3
"""
YOLOv5 Food Classification - Local Training Script

This script trains a YOLOv5 model on the food classification dataset.
Adapted from the Colab notebook for local CPU execution.

Usage:
    python train_local.py --epochs 50 --batch 16 --img 640 --data data/food_yolov5_data.yaml --weights yolov5s.pt --name food_model
"""

import os
import sys
import argparse
import subprocess
from pathlib import Path

# Add yolov5 to path
YOLOV5_DIR = Path(__file__).parent / 'yolov5'
if YOLOV5_DIR.exists():
    sys.path.insert(0, str(YOLOV5_DIR))


def check_environment():
    """Check if the environment is properly set up."""
    print("=" * 60)
    print("Environment Check")
    print("=" * 60)
    
    # Check Python version
    print(f"Python: {sys.version}")
    
    # Check PyTorch
    try:
        import torch
        print(f"PyTorch: {torch.__version__}")
        print(f"CUDA available: {torch.cuda.is_available()}")
        if not torch.cuda.is_available():
            print("⚠️  Running on CPU; training will be slow.")
    except ImportError:
        print("ERROR: PyTorch not installed. Run setup_env.sh first.")
        sys.exit(1)
    
    # Check YOLOv5
    if not YOLOV5_DIR.exists():
        print("ERROR: YOLOv5 directory not found. Run setup_env.sh first.")
        sys.exit(1)
    
    # Check required packages
    required_packages = ['yaml', 'cv2', 'pandas', 'matplotlib']
    for package in required_packages:
        try:
            __import__(package)
            print(f"✓ {package} installed")
        except ImportError:
            print(f"ERROR: {package} not installed. Run setup_env.sh first.")
            sys.exit(1)
    
    print("=" * 60)
    print()


def verify_dataset(data_yaml):
    """Verify that the dataset exists and is properly structured."""
    print("=" * 60)
    print("Dataset Verification")
    print("=" * 60)
    
    import yaml
    
    if not os.path.exists(data_yaml):
        print(f"ERROR: Data config file not found: {data_yaml}")
        sys.exit(1)
    
    with open(data_yaml, 'r') as f:
        data_config = yaml.safe_load(f)
    
    print(f"Dataset path: {data_config['path']}")
    print(f"Number of classes: {data_config['nc']}")
    print(f"Classes: {', '.join(data_config['names'])}")
    
    # Check if paths exist
    base_path = Path(data_config['path'])
    train_path = base_path / data_config['train']
    val_path = base_path / data_config['val']
    
    if not train_path.exists():
        print(f"ERROR: Training images directory not found: {train_path}")
        sys.exit(1)
    
    if not val_path.exists():
        print(f"ERROR: Validation images directory not found: {val_path}")
        sys.exit(1)
    
    # Count images
    train_images = list(train_path.glob('*.jpg')) + list(train_path.glob('*.png'))
    val_images = list(val_path.glob('*.jpg')) + list(val_path.glob('*.png'))
    
    print(f"Training images: {len(train_images)}")
    print(f"Validation images: {len(val_images)}")
    
    if len(train_images) == 0:
        print("ERROR: No training images found!")
        sys.exit(1)
    
    if len(val_images) == 0:
        print("ERROR: No validation images found!")
        sys.exit(1)
    
    print("✓ Dataset verified successfully")
    print("=" * 60)
    print()


def train(args):
    """Run YOLOv5 training."""
    print("=" * 60)
    print("Starting Training")
    print("=" * 60)
    print(f"Epochs: {args.epochs}")
    print(f"Batch size: {args.batch}")
    print(f"Image size: {args.img}")
    print(f"Weights: {args.weights}")
    print(f"Name: {args.name}")
    print("=" * 60)
    print()
    
    # Build training command
    train_script = YOLOV5_DIR / 'train.py'
    
    cmd = [
        sys.executable,
        str(train_script),
        '--img', str(args.img),
        '--batch', str(args.batch),
        '--epochs', str(args.epochs),
        '--data', args.data,
        '--weights', args.weights,
        '--name', args.name,
        '--cache',  # Cache images for faster training
    ]
    
    # Add optional arguments
    if args.device:
        cmd.extend(['--device', args.device])
    
    if args.workers:
        cmd.extend(['--workers', str(args.workers)])
    
    # Run training
    print(f"Running command: {' '.join(cmd)}")
    print()
    
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print(f"ERROR: Training failed with exit code {e.returncode}")
        sys.exit(1)
    
    print()
    print("=" * 60)
    print("Training completed successfully!")
    print(f"Results saved to: runs/train/{args.name}")
    print("=" * 60)


def main():
    """Main function."""
    parser = argparse.ArgumentParser(description='YOLOv5 Food Classification Training')
    
    # Required arguments
    parser.add_argument('--data', type=str, default='data/food_yolov5_data.yaml',
                        help='Path to data configuration YAML file')
    parser.add_argument('--weights', type=str, default='yolov5s.pt',
                        help='Initial weights path (yolov5n.pt, yolov5s.pt, yolov5m.pt, etc.)')
    parser.add_argument('--name', type=str, default='food_model',
                        help='Name for this training run')
    
    # Training parameters
    parser.add_argument('--epochs', type=int, default=50,
                        help='Number of training epochs')
    parser.add_argument('--batch', type=int, default=16,
                        help='Batch size (reduce if running out of memory)')
    parser.add_argument('--img', type=int, default=640,
                        help='Image size (pixels)')
    
    # Optional arguments
    parser.add_argument('--device', type=str, default='cpu',
                        help='Device to use (cpu or cuda device, i.e. 0 or 0,1,2,3 or cpu)')
    parser.add_argument('--workers', type=int, default=2,
                        help='Number of worker threads for data loading')
    parser.add_argument('--skip-checks', action='store_true',
                        help='Skip environment and dataset verification')
    
    args = parser.parse_args()
    
    # Run checks
    if not args.skip_checks:
        check_environment()
        verify_dataset(args.data)
    
    # Run training
    train(args)


if __name__ == '__main__':
    main()
