# YOLOv5 Food Classification - Training Comparison Report

## Executive Summary

This document compares two training runs of the YOLOv5s model on the food classification dataset with different hyperparameters to analyze the impact of parameter adjustments.

---

## Training Configurations

### Training Run #1: Baseline Model

**Training Completed**: November 22, 2025  
**Model Name**: `food_model`

| Parameter      | Value                   |
| -------------- | ----------------------- |
| **Epochs**     | 50                      |
| **Batch Size** | 16                      |
| **Image Size** | 640                     |
| **Model**      | YOLOv5s                 |
| **Weights**    | yolov5s.pt (pretrained) |
| **Device**     | CPU (Intel i7 11th Gen) |
| **Duration**   | 4.466 hours (4h 28min)  |
| **Time/Epoch** | ~5.36 minutes           |

### Training Run #2: Fine-Tuned Model

**Training Completed**: November 23, 2025  
**Model Name**: `fine_tuned_food_model`

| Parameter      | Value                   | Change            |
| -------------- | ----------------------- | ----------------- |
| **Epochs**     | 70                      | +20 (+40%)        |
| **Batch Size** | 8                       | -8 (-50%)         |
| **Image Size** | 640                     | Same              |
| **Model**      | YOLOv5s                 | Same              |
| **Weights**    | yolov5s.pt (pretrained) | Same              |
| **Device**     | CPU (Intel i7 11th Gen) | Same              |
| **Duration**   | 3.733 hours (3h 44min)  | -0.733h (-16%) ⚡ |
| **Time/Epoch** | ~3.20 minutes           | -2.16 min (-40%)  |

> [!NOTE]
> Despite having 40% more epochs, the fine-tuned model trained **16% faster** overall due to the smaller batch size (8 vs 16), which reduced memory overhead and improved CPU efficiency.

---

## Performance Comparison

### Overall Metrics

| Metric           | Baseline (50 epochs, batch 16) | Fine-Tuned (70 epochs, batch 8) | Improvement |
| ---------------- | ------------------------------ | ------------------------------- | ----------- |
| **mAP@0.5**      | 76.7%                          | **75.1%**                       | -1.6% ⚠️    |
| **mAP@0.5:0.95** | 48.0%                          | **49.3%**                       | +1.3% ✓     |
| **Precision**    | 73.9%                          | **72.7%**                       | -1.2%       |
| **Recall**       | 74.2%                          | **72.2%**                       | -2.0%       |

### Per-Class Performance Comparison

| Class        | Baseline mAP@0.5 | Fine-Tuned mAP@0.5 | Change   | Baseline mAP@0.5:0.95 | Fine-Tuned mAP@0.5:0.95 | Change    |
| ------------ | ---------------- | ------------------ | -------- | --------------------- | ----------------------- | --------- |
| **chicken**  | 60.0%            | **58.8%**          | -1.2%    | 38.2%                 | **37.9%**               | -0.3%     |
| **daal**     | 61.8%            | **56.9%**          | -4.9% ⚠️ | 41.4%                 | **38.4%**               | -3.0%     |
| **mixsweet** | 99.5%            | **98.9%**          | -0.6%    | 60.6%                 | **72.0%**               | +11.4% ✓✓ |
| **naan**     | 62.9%            | **61.9%**          | -1.0%    | 37.9%                 | **41.5%**               | +3.6% ✓   |
| **rice**     | 86.1%            | **84.3%**          | -1.8%    | 51.1%                 | **50.0%**               | -1.1%     |
| **roti**     | 83.5%            | **80.8%**          | -2.7%    | 54.1%                 | **54.0%**               | -0.1%     |
| **salad**    | 60.2%            | **62.2%**          | +2.0% ✓  | 34.9%                 | **34.4%**               | -0.5%     |
| **yogurt**   | 99.0%            | **96.8%**          | -2.2%    | 65.3%                 | **66.3%**               | +1.0% ✓   |

### Detailed Precision & Recall Comparison

| Class        | Baseline P/R  | Fine-Tuned P/R    | Precision Change | Recall Change |
| ------------ | ------------- | ----------------- | ---------------- | ------------- |
| **chicken**  | 60.9% / 55.6% | **64.6% / 50.6%** | +3.7% ✓          | -5.0% ⚠️      |
| **daal**     | 70.8% / 61.0% | **57.8% / 56.8%** | -13.0% ⚠️        | -4.2%         |
| **mixsweet** | 100% / 90.5%  | **100% / 90.0%**  | 0%               | -0.5%         |
| **naan**     | 62.1% / 57.7% | **58.3% / 46.2%** | -3.8%            | -11.5% ⚠️     |
| **rice**     | 83.8% / 74.1% | **86.2% / 84.1%** | +2.4% ✓          | +10.0% ✓✓     |
| **roti**     | 72.3% / 85.0% | **69.7% / 95.0%** | -2.6%            | +10.0% ✓✓     |
| **salad**    | 56.9% / 69.4% | **63.1% / 61.8%** | +6.2% ✓          | -7.6%         |
| **yogurt**   | 84.8% / 100%  | **81.8% / 92.9%** | -3.0%            | -7.1%         |

---

## Key Findings

### 🎯 What Improved

1. **Better Generalization (mAP@0.5:0.95)**

   - Improved from 48.0% → 49.3% (+1.3%)
   - Indicates better performance across multiple IoU thresholds

2. **Mixsweet Detection Quality**

   - mAP@0.5:0.95: 60.6% → 72.0% (+11.4%) 🌟
   - Best improvement across all classes

3. **Rice Recall**

   - Recall: 74.1% → 84.1% (+10.0%)
   - Better at finding all rice instances

4. **Roti Recall**

   - Recall: 85.0% → 95.0% (+10.0%)
   - Near-perfect detection rate

5. **Salad Detection**

   - mAP@0.5: 60.2% → 62.2% (+2.0%)
   - Precision: 56.9% → 63.1% (+6.2%)

6. **Chicken Precision**

   - Precision: 60.9% → 64.6% (+3.7%)
   - Fewer false positives

7. **Training Efficiency**
   - 16% faster overall despite 40% more epochs
   - Smaller batch size improved CPU utilization

### ⚠️ What Degraded

1. **Overall mAP@0.5**

   - Decreased from 76.7% → 75.1% (-1.6%)
   - Slight reduction in detection at IoU=0.5

2. **Daal Detection**

   - mAP@0.5: 61.8% → 56.9% (-4.9%)
   - Precision: 70.8% → 57.8% (-13.0%)
   - Most significant degradation

3. **Naan Recall**

   - Recall: 57.7% → 46.2% (-11.5%)
   - Missing more naan instances

4. **Overall Recall**
   - Decreased from 74.2% → 72.2% (-2.0%)

---

## Analysis & Insights

### Why Did Performance Change?

#### Positive Changes

1. **Smaller Batch Size (16 → 8)**
   - **Pros**: More frequent weight updates, better generalization, improved CPU efficiency
   - **Evidence**: Better mAP@0.5:0.95, improved recall for rice/roti
2. **More Epochs (50 → 70)**
   - **Pros**: More training iterations, better convergence for complex patterns
   - **Evidence**: Improved mixsweet mAP@0.5:0.95 (+11.4%)

#### Negative Changes

1. **Smaller Batch Size Trade-off**

   - **Cons**: Noisier gradients, less stable training
   - **Evidence**: Reduced precision for daal (-13%), reduced recall for naan (-11.5%)

2. **Potential Overfitting**
   - More epochs may have caused slight overfitting on some classes
   - Evidence: Mixed results across classes

### Class-Specific Observations

**Winners:**

- **Mixsweet**: Significantly better generalization (+11.4% mAP@0.5:0.95)
- **Rice & Roti**: Much better recall (+10% each)
- **Salad**: Improved precision and mAP@0.5

**Losers:**

- **Daal**: Significant precision drop (-13%)
- **Naan**: Large recall reduction (-11.5%)

---

## Recommendations

### For Production Deployment

**Use Baseline Model (`food_model`)** if:

- You prioritize **overall detection accuracy** (mAP@0.5)
- You need **balanced performance** across all classes
- **Daal and naan detection** are critical

**Use Fine-Tuned Model (`fine_tuned_food_model`)** if:

- You need **better generalization** (mAP@0.5:0.95)
- **Rice and roti detection** are most important
- You want **higher recall** for common items
- **Faster training** is needed for future iterations

### For Further Improvement

1. **Hybrid Approach**

   - Use batch size 12 (middle ground between 8 and 16)
   - Train for 60 epochs (middle ground between 50 and 70)

2. **Data Augmentation**

   - Add more daal and naan training samples
   - Use stronger augmentation for underperforming classes

3. **Class Weights**

   - Increase loss weight for daal and naan classes
   - Balance the dataset better

4. **Learning Rate Tuning**
   - Try learning rate scheduling
   - Use warmup epochs for stability

---

## Model Files & Locations

### Baseline Model

**Location**: `yolov5/runs/train/food_model/`

- Best weights: `weights/best.pt` (14.5 MB)
- Last weights: `weights/last.pt` (14.5 MB)

### Fine-Tuned Model

**Location**: `yolov5/runs/train/fine_tuned_food_model/`

- Best weights: `weights/best.pt` (14.5 MB)
- Last weights: `weights/last.pt` (14.5 MB)

---

## Conclusion

Both models demonstrate strong performance with different trade-offs:

- **Baseline Model**: Better overall accuracy (76.7% mAP@0.5), more balanced
- **Fine-Tuned Model**: Better generalization (49.3% mAP@0.5:0.95), faster training

The **1.6% drop in mAP@0.5** is relatively minor and is offset by the **1.3% improvement in mAP@0.5:0.95**, suggesting the fine-tuned model generalizes better to varying IoU thresholds.

For most applications, the **baseline model is recommended** due to its more balanced performance. However, the fine-tuned model's improvements in specific classes (mixsweet, rice, roti) and faster training time make it valuable for certain use cases.

### Assignment Conclusion

This comparison demonstrates that:

1. ✅ **Batch size reduction** (16→8) improved training efficiency but introduced gradient noise
2. ✅ **Increased epochs** (50→70) improved some classes but risked overfitting on others
3. ✅ **Parameter tuning** has significant class-specific impacts
4. ✅ **Trade-offs exist** between overall accuracy and generalization

**Key Learning**: Hyperparameter tuning requires careful evaluation of trade-offs, and "better" depends on the specific application requirements.
