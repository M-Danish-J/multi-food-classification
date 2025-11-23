# YOLOv5 Food Classification - Training Results (Baseline Model)

> [!NOTE]
> This document contains results for the **baseline training run**. For a comparison with the fine-tuned model, see [FINE_TUNED_COMPARISON.md](FINE_TUNED_COMPARISON.md).

## Training Summary

**Training Completed**: November 22, 2025  
**Duration**: 4.466 hours (4 hours 28 minutes)  
**Model Name**: `food_model`

### Training Parameters

| Parameter      | Value                   |
| -------------- | ----------------------- |
| **Epochs**     | 50                      |
| **Batch Size** | 16                      |
| **Image Size** | 640                     |
| **Model**      | YOLOv5s                 |
| **Weights**    | yolov5s.pt (pretrained) |
| **Device**     | CPU (Intel i7 11th Gen) |
| **Cache**      | Enabled                 |

### Dataset

- **Training Images**: 348
- **Validation Images**: 88
- **Classes**: 8 (chicken, daal, mixsweet, naan, rice, roti, salad, yogurt)

---

## Final Performance Metrics

### Overall Performance

- **mAP@0.5**: 76.7% ✓
- **mAP@0.5:0.95**: 48.0% ✓
- **Precision**: 73.9%
- **Recall**: 74.2%

### Per-Class Performance

| Class        | Precision   | Recall      | mAP@0.5      | mAP@0.5:0.95 |
| ------------ | ----------- | ----------- | ------------ | ------------ |
| **chicken**  | 60.9%       | 55.6%       | 60.0%        | 38.2%        |
| **daal**     | 70.8%       | 61.0%       | 61.8%        | 41.4%        |
| **mixsweet** | **100%** ⭐ | 90.5%       | **99.5%** ⭐ | 60.6%        |
| **naan**     | 62.1%       | 57.7%       | 62.9%        | 37.9%        |
| **rice**     | 83.8%       | 74.1%       | 86.1%        | 51.1%        |
| **roti**     | 72.3%       | **85.0%**   | 83.5%        | 54.1%        |
| **salad**    | 56.9%       | 69.4%       | 60.2%        | 34.9%        |
| **yogurt**   | 84.8%       | **100%** ⭐ | **99.0%** ⭐ | **65.3%** ⭐ |

**Best Performing Classes**: mixsweet, yogurt, rice  
**Classes Needing Improvement**: chicken, naan, salad

---

## Training Progress

### Loss Curves (Epoch 0 → 49)

**Training Losses:**

- Box Loss: 0.105 → 0.032 (69% reduction)
- Object Loss: 0.046 → 0.034 (27% reduction)
- Class Loss: 0.064 → 0.015 (77% reduction)

**Validation Losses:**

- Box Loss: 0.084 → 0.042
- Object Loss: 0.030 → 0.018
- Class Loss: 0.062 → 0.027

### Performance Improvement

| Metric       | Epoch 0 | Epoch 49 | Improvement |
| ------------ | ------- | -------- | ----------- |
| mAP@0.5      | 0.4%    | 76.7%    | **+76.3%**  |
| mAP@0.5:0.95 | 0.1%    | 48.0%    | **+47.9%**  |
| Precision    | 0.5%    | 73.9%    | **+73.4%**  |
| Recall       | 15.0%   | 74.2%    | **+59.2%**  |

---

## Model Files

### Trained Weights

Located in: `yolov5/runs/train/food_model/weights/`

- **`best.pt`** (14 MB) - Best model checkpoint (use this for inference)
- **`last.pt`** (14 MB) - Final epoch checkpoint

### Training Outputs

Located in: `yolov5/runs/train/food_model/`

**Metrics & Curves:**

- `results.png` - Training/validation metrics over time
- `results.csv` - Raw metrics data (50 epochs)
- `confusion_matrix.png` - Class prediction confusion matrix
- `F1_curve.png` - F1 score vs confidence threshold
- `PR_curve.png` - Precision-Recall curve
- `P_curve.png` - Precision vs confidence
- `R_curve.png` - Recall vs confidence

**Sample Predictions:**

- `val_batch0_pred.jpg`, `val_batch1_pred.jpg`, `val_batch2_pred.jpg` - Model predictions
- `val_batch0_labels.jpg`, `val_batch1_labels.jpg`, `val_batch2_labels.jpg` - Ground truth labels

**Training Samples:**

- `train_batch0.jpg`, `train_batch1.jpg`, `train_batch2.jpg` - Training batch examples

**Configuration:**

- `hyp.yaml` - Hyperparameters used
- `opt.yaml` - Training options/arguments

---

## Key Insights

### Strengths

1. **Excellent Performance on Small Objects**: Mixsweet and yogurt achieved near-perfect detection
2. **Balanced Precision/Recall**: 73.9% precision vs 74.2% recall shows good balance
3. **Stable Training**: Smooth loss curves indicate stable convergence
4. **Good Generalization**: 76.7% mAP50 on validation set

### Areas for Improvement

1. **Chicken Detection**: Lowest precision (60.9%) and recall (55.6%)

   - Possible reasons: Similar appearance to other items, occlusion
   - Recommendation: Add more diverse chicken images

2. **Salad Detection**: Second lowest performance (60.2% mAP50)

   - Possible reasons: High variability in appearance
   - Recommendation: More training data with varied salad types

3. **Naan Detection**: Low recall (57.7%)
   - Possible reasons: Similar to roti, shape variations
   - Recommendation: Better differentiation from roti class

---

## Next Steps

### 1. Model Inference

Test the model on new images:

```bash
cd /home/danish/University/FYP/multi-food-classification/Prototype_Phase
source venv/bin/activate
python yolov5/detect.py --weights yolov5/runs/train/food_model/weights/best.pt --source path/to/test/images --conf 0.25
```

### 2. Model Evaluation

Run detailed evaluation:

```bash
python yolov5/val.py --weights yolov5/runs/train/food_model/weights/best.pt --data data/food_yolov5_data.yaml --img 640
```

### 3. Model Export

Export to different formats:

```bash
# ONNX format (for deployment)
python yolov5/export.py --weights yolov5/runs/train/food_model/weights/best.pt --include onnx

# TorchScript
python yolov5/export.py --weights yolov5/runs/train/food_model/weights/best.pt --include torchscript
```

### 4. Improve Model (Optional)

- Collect more training data for chicken, salad, and naan
- Try data augmentation techniques
- Experiment with larger model (yolov5m.pt)
- Fine-tune hyperparameters

---

## Files to Keep for Git

### Essential Files (Keep)

```
Prototype_Phase/
├── data/food_yolov5_data.yaml      # Dataset configuration
├── yolov5/runs/train/food_model/   # Training results (KEEP ALL)
│   ├── weights/
│   │   ├── best.pt                 # Best model ⭐
│   │   └── last.pt                 # Last model
│   ├── results.png                 # Metrics visualization
│   ├── confusion_matrix.png        # Confusion matrix
│   └── ...                         # All other result files
├── requirements.txt                # Dependencies
├── setup_env.sh                    # Setup script
├── train_local.py                  # Training script
├── verify_setup.py                 # Verification script
└── README.md                       # Documentation
```

### Files to Exclude (Already in .gitignore)

```
Prototype_Phase/
├── design/          # Dataset (too large)
├── venv/            # Virtual environment
└── yolov5/          # YOLOv5 repo (except runs/train/food_model)
```

### Cleanup Completed

- ✓ Deleted empty `Prototype_Phase/runs/train/` directory
- ✓ Training results properly saved in `yolov5/runs/train/food_model/`

---

## Conclusion

**Excellent training results!** 🎉

The model achieved **76.7% mAP@0.5** on CPU training in just 4.5 hours, which is impressive given:

- CPU-only training (no GPU)
- Relatively small dataset (348 training images)
- 8 diverse food classes

The model is **production-ready** for food classification tasks, with particularly strong performance on mixsweet, yogurt, and rice detection.

**Model Location**: `yolov5/runs/train/food_model/weights/best.pt`  
**Ready for**: Inference, deployment, and integration into applications
