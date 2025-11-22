#!/usr/bin/env python3
"""
Quick verification script to check if everything is set up correctly.
Run this before starting training.
"""

import os
import sys
from pathlib import Path

def check_mark(condition):
    return "✓" if condition else "✗"

def main():
    print("=" * 60)
    print("YOLOv5 Local Setup Verification")
    print("=" * 60)
    print()
    
    all_good = True
    
    # Check Python version
    print("1. Python Version")
    py_version = sys.version_info
    py_ok = py_version.major == 3 and py_version.minor >= 7
    print(f"   {check_mark(py_ok)} Python {py_version.major}.{py_version.minor}.{py_version.micro}")
    if not py_ok:
        print("   ⚠️  Python 3.7+ required")
        all_good = False
    print()
    
    # Check required files
    print("2. Required Files")
    required_files = [
        'requirements.txt',
        'setup_env.sh',
        'train_local.py',
        'data/food_yolov5_data.yaml',
        'README.md'
    ]
    
    for file in required_files:
        exists = os.path.exists(file)
        print(f"   {check_mark(exists)} {file}")
        if not exists:
            all_good = False
    print()
    
    # Check dataset
    print("3. Dataset Structure")
    dataset_paths = [
        'design/Train_Set/images',
        'design/Train_Set/labels',
        'design/Test_Set/images',
        'design/Test_Set/labels'
    ]
    
    for path in dataset_paths:
        exists = os.path.isdir(path)
        print(f"   {check_mark(exists)} {path}")
        if not exists:
            all_good = False
        else:
            # Count files
            files = list(Path(path).glob('*'))
            print(f"      ({len(files)} files)")
    print()
    
    # Check if virtual environment exists
    print("4. Virtual Environment")
    venv_exists = os.path.isdir('venv')
    print(f"   {check_mark(venv_exists)} venv/ directory")
    if not venv_exists:
        print("   ⚠️  Run ./setup_env.sh to create virtual environment")
        all_good = False
    print()
    
    # Check if YOLOv5 is cloned
    print("5. YOLOv5 Repository")
    yolo_exists = os.path.isdir('yolov5')
    print(f"   {check_mark(yolo_exists)} yolov5/ directory")
    if not yolo_exists:
        print("   ⚠️  Run ./setup_env.sh to clone YOLOv5")
        all_good = False
    print()
    
    # Check if in virtual environment
    print("6. Virtual Environment Status")
    in_venv = hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)
    print(f"   {check_mark(in_venv)} Currently in virtual environment")
    if not in_venv:
        print("   ⚠️  Activate with: source venv/bin/activate")
    print()
    
    # Try importing required packages
    if in_venv:
        print("7. Required Packages")
        packages = {
            'torch': 'PyTorch',
            'yaml': 'PyYAML',
            'cv2': 'OpenCV',
            'pandas': 'Pandas',
            'matplotlib': 'Matplotlib'
        }
        
        for module, name in packages.items():
            try:
                __import__(module)
                print(f"   ✓ {name}")
            except ImportError:
                print(f"   ✗ {name} (not installed)")
                all_good = False
        print()
    
    # Final verdict
    print("=" * 60)
    if all_good and in_venv:
        print("✓ All checks passed! Ready to train.")
        print()
        print("To start training, run:")
        print("  python train_local.py")
    elif all_good and not in_venv:
        print("⚠️  Almost ready! Activate virtual environment:")
        print("  source venv/bin/activate")
    else:
        print("✗ Some checks failed. Please fix the issues above.")
        if not venv_exists or not yolo_exists:
            print()
            print("Run setup script:")
            print("  ./setup_env.sh")
    print("=" * 60)

if __name__ == '__main__':
    main()
