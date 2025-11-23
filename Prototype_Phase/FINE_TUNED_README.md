# Fine-Tuned YOLOv5 Food Classification Model

## Quick Summary

This directory contains results from a **fine-tuned training run** with adjusted hyperparameters to compare against the baseline model.

**Key Changes:**

- Epochs: 50 → **70** (+40%)
- Batch Size: 16 → **8** (-50%)
- Training Time: 4.47h → **3.73h** (-16% faster!)

**Performance:**

- mAP@0.5: **75.1%** (baseline: 76.7%)
- mAP@0.5:0.95: **49.3%** (baseline: 48.0%) ✓

---

## Training Details

**Training Completed**: November 23, 2025  
**Duration**: 3.733 hours (3 hours 44 minutes)  
**Model Name**: `fine_tuned_food_model`

### Training Parameters

| Parameter      | Value                   | vs Baseline |
| -------------- | ----------------------- | ----------- |
| **Epochs**     | 70                      | +20 (+40%)  |
| **Batch Size** | 8                       | -8 (-50%)   |
| **Image Size** | 640                     | Same        |
| **Model**      | YOLOv5s                 | Same        |
| **Weights**    | yolov5s.pt (pretrained) | Same        |
| **Device**     | CPU (Intel i7 11th Gen) | Same        |
| **Cache**      | Enabled                 | Same        |
| **Patience**   | 10                      | New         |

### Training Command

```bash
cd /home/danish/University/FYP/multi-food-classification/Prototype_Phase
source venv/bin/activate
python train_local.py --epochs 70 --batch 8 --name fine_tuned_food_model
```

---

## Performance Metrics

### Overall Performance

| Metric           | Fine-Tuned | Baseline | Change  |
| ---------------- | ---------- | -------- | ------- |
| **mAP@0.5**      | 75.1%      | 76.7%    | -1.6%   |
| **mAP@0.5:0.95** | 49.3%      | 48.0%    | +1.3% ✓ |
| **Precision**    | 72.7%      | 73.9%    | -1.2%   |
| **Recall**       | 72.2%      | 74.2%    | -2.0%   |

### Per-Class Performance

| Class        | Precision   | Recall       | mAP@0.5      | mAP@0.5:0.95 |
| ------------ | ----------- | ------------ | ------------ | ------------ |
| **chicken**  | 64.6%       | 50.6%        | 58.8%        | 37.9%        |
| **daal**     | 57.8%       | 56.8%        | 56.9%        | 38.4%        |
| **mixsweet** | **100%** ⭐ | 90.0%        | **98.9%** ⭐ | **72.0%** ⭐ |
| **naan**     | 58.3%       | 46.2%        | 61.9%        | 41.5%        |
| **rice**     | 86.2%       | 84.1%        | 84.3%        | 50.0%        |
| **roti**     | 69.7%       | **95.0%** ⭐ | 80.8%        | 54.0%        |
| **salad**    | 63.1%       | 61.8%        | 62.2%        | 34.4%        |
| **yogurt**   | 81.8%       | 92.9%        | 96.8%        | 66.3%        |

---

## Key Improvements vs Baseline

### ✅ What Got Better

1. **Better Generalization**

   - mAP@0.5:0.95: 48.0% → 49.3% (+1.3%)

2. **Mixsweet Quality**

   - mAP@0.5:0.95: 60.6% → 72.0% (+11.4%) 🌟

3. **Rice Recall**

   - Recall: 74.1% → 84.1% (+10.0%)

4. **Roti Recall**

   - Recall: 85.0% → 95.0% (+10.0%)

5. **Salad Detection**

   - mAP@0.5: 60.2% → 62.2% (+2.0%)
   - Precision: 56.9% → 63.1% (+6.2%)

6. **Training Speed**
   - 16% faster despite 40% more epochs

### ⚠️ What Got Worse

1. **Overall mAP@0.5**

   - 76.7% → 75.1% (-1.6%)

2. **Daal Precision**

   - 70.8% → 57.8% (-13.0%)

3. **Naan Recall**
   - 57.7% → 46.2% (-11.5%)

---

## Model Files

**Location**: `yolov5/runs/train/fine_tuned_food_model/`

### Weights

- `weights/best.pt` (14.5 MB) - Best model checkpoint
- `weights/last.pt` (14.5 MB) - Final epoch checkpoint

### Results

- `results.png` - Training/validation metrics
- `results.csv` - Raw metrics data (70 epochs)
- `confusion_matrix.png` - Class prediction confusion matrix
- `F1_curve.png`, `PR_curve.png`, `P_curve.png`, `R_curve.png` - Performance curves

### Configuration

- `hyp.yaml` - Hyperparameters used
- `opt.yaml` - Training options/arguments

---

## Usage

### Inference

```bash
cd /home/danish/University/FYP/multi-food-classification/Prototype_Phase
source venv/bin/activate
python yolov5/detect.py \
  --weights yolov5/runs/train/fine_tuned_food_model/weights/best.pt \
  --source path/to/test/images \
  --conf 0.25
```

### Validation

```bash
python yolov5/val.py \
  --weights yolov5/runs/train/fine_tuned_food_model/weights/best.pt \
  --data data/food_yolov5_data.yaml \
  --img 640 \
  --batch 8
```

---

## Comparison with Baseline

For a detailed comparison between the baseline and fine-tuned models, see:

- **[FINE_TUNED_COMPARISON.md](FINE_TUNED_COMPARISON.md)** - Comprehensive analysis

**Quick Recommendation:**

- Use **baseline model** for balanced performance across all classes
- Use **fine-tuned model** for better generalization and faster training

---

## Conclusion

The fine-tuned model demonstrates that:

- ✅ Smaller batch sizes can improve training efficiency
- ✅ More epochs improve some classes but may hurt others
- ✅ Trade-offs exist between mAP@0.5 and mAP@0.5:0.95
- ✅ Hyperparameter tuning has significant class-specific impacts

**Overall**: The fine-tuned model achieved better generalization (mAP@0.5:0.95) with faster training, but slightly lower overall accuracy (mAP@0.5). Both models are production-ready with different strengths.
