#!/bin/bash

# Setup script for YOLOv5 local training environment
# This script sets up a Python virtual environment and installs all dependencies

set -e  # Exit on error

echo "========================================="
echo "YOLOv5 Local Training Environment Setup"
echo "========================================="
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check Python version
echo "Checking Python version..."
python3 --version

# Create virtual environment
echo ""
echo "Creating virtual environment..."
if [ -d "venv" ]; then
    echo "Virtual environment already exists. Removing old one..."
    rm -rf venv
fi
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo ""
echo "Upgrading pip..."
pip install --upgrade pip

# Install PyTorch CPU version
echo ""
echo "Installing PyTorch (CPU version)..."
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Install other requirements
echo ""
echo "Installing other dependencies..."
pip install -r requirements.txt

# Clone YOLOv5 repository if not exists
echo ""
if [ -d "yolov5" ]; then
    echo "YOLOv5 repository already exists. Skipping clone..."
else
    echo "Cloning YOLOv5 repository..."
    git clone https://github.com/ultralytics/yolov5.git
    cd yolov5
    pip install -r requirements.txt
    cd ..
fi

# Create data directory if not exists
echo ""
echo "Creating data directory..."
mkdir -p data

# Create runs directory for training outputs
echo ""
echo "Creating runs directory..."
mkdir -p runs/train

# Verify installation
echo ""
echo "Verifying installation..."
python3 << EOF
import sys
import torch
import yaml
import cv2
import pandas
import matplotlib

print("Python version:", sys.version)
print("PyTorch version:", torch.__version__)
print("CUDA available:", torch.cuda.is_available())
if not torch.cuda.is_available():
    print("⚠️  Running on CPU; training will be slow.")
else:
    print("GPU:", torch.cuda.get_device_name(0))

print("\nAll dependencies installed successfully!")
EOF

echo ""
echo "========================================="
echo "Setup completed successfully!"
echo "========================================="
echo ""
echo "To activate the environment, run:"
echo "  source venv/bin/activate"
echo ""
echo "To start training, run:"
echo "  python train_local.py"
echo ""
