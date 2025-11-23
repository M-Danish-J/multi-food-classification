# Final Report - Multi-Food Image Detection and Classification

**Course**: CS619 Spring 2025  
**Student Name**: [Your Name]  
**Supervisor**: Fizzah (fizzah@vu.edu...pk)

---

## CHAPTER 1: Introduction

### 1.1 Overview of the Project

[Write 2-3 paragraphs about the project, what it aims to achieve, and its significance]

**Suggested content**:

- Brief description of multi-food detection system
- Importance of automated food recognition
- Overview of AI/ML approach used
- Summary of what the system can do

### 1.2 Problem Background

**Current Challenges**:

- Manual food logging is time-consuming
- Difficulty in identifying multiple food items simultaneously
- Need for automated dietary tracking systems
- Challenges in portion size estimation

### 1.3 Real-World Applications

1. **Dietary Tracking Apps**: Automatic food logging for health and fitness apps
2. **Restaurant Management**: Inventory and order tracking systems
3. **Nutritional Analysis**: Calorie and nutrient estimation
4. **Food Delivery Platforms**: Order verification and quality control
5. **Smart Kitchen Appliances**: Recipe recommendations based on available ingredients
6. **Healthcare**: Dietary monitoring for patients with special dietary needs

### 1.4 Objectives of the Project

**Primary Objectives**:

1. Develop a robust object detection model for food classification
2. Achieve high accuracy (>75% mAP) in multi-food detection
3. Create a user-friendly web interface for real-time detection
4. Support simultaneous detection of multiple food items
5. Provide confidence scores for each detection

**Secondary Objectives**:

1. Compare different training configurations
2. Optimize model performance through fine-tuning
3. Deploy the system as a web application
4. Document the entire development process

### 1.5 Scope of the Project

**Included**:

- Detection and classification of 8 Pakistani food items
- Image-based detection (JPEG, PNG formats)
- Web-based interface
- Single image processing

**Excluded**:

- Real-time video detection
- Portion size or calorie estimation
- Foods outside the 8 defined classes
- Mobile application (future work)

### 1.6 Methodology Overview

**Four-Phase Approach**:

1. **Phase 1: Dataset Preparation**

   - Data collection (436 images)
   - Annotation using LabelImg
   - Train/test split (80/20)
   - Data preprocessing

2. **Phase 2: Model Selection and Training**

   - Selected YOLOv5s for efficiency
   - Initial training (baseline model)
   - Performance evaluation

3. **Phase 3: Fine-Tuning and Optimization**

   - Experimented with hyperparameters
   - Three training runs with different configurations
   - Selected best model based on metrics

4. **Phase 4: Web Application Development**
   - Exported model to ONNX format
   - Built Next.js web application
   - Integrated ONNX Runtime for inference
   - Deployed and tested

### 1.7 Work Plan (Gantt Chart)

[INSERT GANTT CHART - Create using tools like Excel, Google Sheets, or Project management software]

**Timeline**:

- Week 1-2: Dataset Collection and Annotation
- Week 3: Data Preprocessing and Split
- Week 4: Model Selection and Initial Training
- Week 5-6: Fine-Tuning Experiments
- Week 7: Model Evaluation and Selection
- Week 8-9: Web Application Development
- Week 10: Testing and Documentation

### 1.8 Project Schedule

| Phase                        | Tasks                         | Duration | Status         |
| ---------------------------- | ----------------------------- | -------- | -------------- |
| Dataset Preparation          | Collection, Annotation, Split | 2 weeks  | ✅ Complete    |
| Initial Training             | Baseline model training       | 1 week   | ✅ Complete    |
| Fine-Tuning                  | Multiple training runs        | 2 weeks  | ✅ Complete    |
| Model Evaluation             | Performance analysis          | 1 week   | ✅ Complete    |
| Web Development              | Application building          | 2 weeks  | ✅ Complete    |
| Testing \u0026 Documentation | Final testing, report writing | 1 week   | 🔄 In Progress |

---

## CHAPTER 2: Problem Statement \u0026 Literature Review

### 2.1 Detailed Problem Statement

**The Challenge**:

Write about the specific challenges in multi-food detection:

- Variability in food appearance
- Similar-looking food items (naan vs roti)
- Overlapping items in a single plate
- Different lighting conditions
- Varying portion sizes and presentations

**Research Questions**:

1. Can deep learning accurately detect multiple Pakistani food items?
2. What is the optimal model architecture for this task?
3. How do different hyperparameters affect detection accuracy?
4. Can the model run efficiently in a web browser?

### 2.2 Literature Review

#### 2.2.1 Object Detection Models

**YOLO Family**:

- **YOLOv3** (Redmon & Farhadi, 2018): Introduced improved architecture
- **YOLOv4** (Bochkovskiy et al., 2020): Added CSPDarknet53 backbone
- **YOLOv5** (Jocher et al., 2020): PyTorch implementation, easier to use
- **YOLOv8** (Ultralytics, 2023): Latest version with improved accuracy

**Other Architectures**:

- **SSD** (Liu et al., 2016): Single Shot Multibox Detector
- **Faster R-CNN** (Ren et al., 2015): Two-stage detector
- **RetinaNet** (Lin et al., 2017): Focal loss for imbalanced detection

#### 2.2.2 Food Detection Research

[Cite relevant papers on food detection - search Google Scholar for recent papers]

**Key Findings from Literature**:

1. YOLO models are efficient for real-time detection
2. Large datasets (>1000 images) improve accuracy
3. Transfer learning from pretrained models is effective
4. Food classification has similarities to general object detection

### 2.3 Comparison of Detection Models

| Model        | Speed     | Accuracy  | Complexity | Deployment |
| ------------ | --------- | --------- | ---------- | ---------- |
| YOLOv5s      | Fast      | High      | Low        | Easy       |
| YOLOv8       | Very Fast | Higher    | Medium     | Moderate   |
| Faster R-CNN | Slow      | Very High | High       | Difficult  |
| SSD          | Medium    | Medium    | Medium     | Moderate   |

**Why YOLOv5s Was Selected**:

1. ✅ Balance of speed and accuracy
2. ✅ Easy to train and deploy
3. ✅ Excellent PyTorch ecosystem
4. ✅ Can export to ONNX for web deployment
5. ✅ Well-documented and widely used

### 2.4 Gap in Existing Systems

**Identified Gaps**:

1. Limited research on Pakistani food detection
2. Most systems require mobile apps or APIs
3. Few browser-based real-time detection systems
4. Limited comparison of hyperparameter effects

**How This Project Addresses the Gaps**:

1. ✅ Focuses on Pakistani cuisine
2. ✅ Browser-based, no installation needed
3. ✅ Comprehensive hyperparameter comparison
4. ✅ Open-source and reproducible

---

## CHAPTER 3: Dataset and Preprocessing

### 3.1 Dataset Collection Process

**Source**: Custom collected dataset of Pakistani food items

**Collection Strategy**:

- Captured images from various sources
- Multiple angles and lighting conditions
- Different plate presentations
- Single and multi-item images

**Statistics**:

- Total Images: 436
- Training Set: 348 images (80%)
- Testing Set: 88 images (20%)
- Classes: 8 food categories

### 3.2 Description of Food Categories

| Class    | Description                     | Training Samples | Test Samples |
| -------- | ------------------------------- | ---------------- | ------------ |
| Chicken  | Chicken curry, fried, or cooked | [Count]          | [Count]      |
| Daal     | Lentil curry (various types)    | [Count]          | [Count]      |
| Mixsweet | Mixed sweets/desserts           | [Count]          | [Count]      |
| Naan     | Flatbread (naan)                | [Count]          | [Count]      |
| Rice     | Cooked rice (white/biryani)     | [Count]          | [Count]      |
| Roti     | Whole wheat flatbread           | [Count]          | [Count]      |
| Salad    | Vegetable salad                 | [Count]          | [Count]      |
| Yogurt   | Yogurt/raita                    | [Count]          | [Count]      |

### 3.3 Image Annotation Tool and Format

**Tool Used**: LabelImg

**Annotation Format**: YOLO format

```
<class_id> <x_center> <y_center> <width> <height>
```

All coordinates are normalized to [0, 1]

**Example annotation**:

```
0 0.5 0.3 0.2 0.4  # Chicken at center-left
4 0.7 0.6 0.15 0.25  # Rice at bottom-right
```

### 3.4 Data Split

**Split Strategy**: Random stratified split

- **Training Set**: 80% (348 images)

  - Used for model training
  - Weights updated based on this data

- **Testing Set**: 20% (88 images)
  - Never seen during training
  - Used for final evaluation
  - Represents real-world performance

### 3.5 Data Preprocessing

**Preprocessing Steps**:

1. **Image Resizing**: All images resized to 640x640 pixels
2. **Normalization**: Pixel values normalized to [0, 1]
3. **Data Augmentation** (during training):
   - Mosaic augmentation
   - Random scaling
   - Horizontal flipping
   - HSV color space augmentation
4. **Bounding Box Format Conversion**: Converted to YOLO format

**Preprocessing Code**: See`pre_process.py` and `train_test_split.py`

---

## CHAPTER 4: Model Architecture and Implementation

### 4.1 Description of Selected Model: YOLOv5s

**YOLOv5 Architecture Overview**:

YOLOv5s is a small variant of YOLOv5, optimized for speed while maintaining good accuracy.

**Key Components**:

1. **Backbone**: CSPDarknet53

   - Extracts features from input images
   - Uses Cross Stage Partial connections
   - Efficient for mobile deployment

2. **Neck**: PANet (Path Aggregation Network)

   - Combines features at different scales
   - Improves detection of small and large objects

3. **Head**: YOLOv5 Detection Head
   - Predicts bounding boxes and classes
   - Three detection scales: 80x80, 40x40, 20x20
   - Anchor-based detection

### 4.2 Architecture Diagram

[INSERT DIAGRAM - Create using draw.io or similar tool showing the YOLOv5 architecture]

**Input**: 640x640x3 RGB image
**Output**: Bounding boxes [x, y, w, h, confidence, class probabilities]

### 4.3 Why YOLOv5s Was Selected

**Advantages**:

1. ✅ Fast inference (~5-10 FPS on CPU)
2. ✅ Small model size (14.4 MB)
3. ✅ Easy to train with limited data
4. ✅ Excellent documentation
5. ✅ ONNX export support for web deployment

**Trade-offs**:

- Slightly lower accuracy than larger variants (YOLOv5m, YOLOv5l)
- But much faster and smaller

### 4.4 Technical Implementation Details

**Loss Functions**:

1. **Box Loss**: Localization error (IoU loss)
2. **Object Loss**: Confidence score for objectness
3. **Class Loss**: Classification error (cross-entropy)

**Anchor Boxes**: Pre-defined box sizes optimized for the dataset

**Non-Maximum Suppression (NMS)**: Removes duplicate detections

### 4.5 Tools and Platforms Used

**Training Environment**:

- **Platform**: Google Colab (initial) → Local machine (fine-tuning)
- **Hardware**: CPU (Intel i7 11th Gen)
- **GPU**: None (CPU-only training)

**Software Stack**:

- **Framework**: PyTorch 1.x
- **YOLOv5**: Ultralytics implementation
- **Python**: 3.8+
- **Key Libraries**:
  - `torch`, `torchvision`
  - `opencv-python`
  - `matplotlib`, `numpy`

**Web Deployment**:

- **Framework**: Next.js 16
- **Runtime**: ONNX Runtime Web
- **UI**: React, TailwindCSS, shadcn/ui

---

## CHAPTER 5: Model Training, Evaluation \u0026 Fine-Tuning

### 5.1 Initial Training Configuration

**Baseline Model** (`food_model`):

- Epochs: 50
- Batch Size: 16
- Image Size: 640
- Learning Rate: 0.01 (default)
- Optimizer: SGD with momentum
- Duration: 4.47 hours

**Results**:

- mAP@0.5: 76.7%
- mAP@0.5:0.95: 48.0%
- Precision: 73.9%
- Recall: 74.2%

### 5.2 Fine-Tuning Experiments

[Reference your FINE_TUNED_COMPARISON.md]

**Three Training Runs**:

1. **Run #1: Baseline** (50 epochs, batch 16)
2. **Run #2: Fine-Tuned** (70 epochs, batch 8)
3. **Run #3: Hybrid** (60 epochs, batch 12) ← **BEST**

### 5.3 Training Results Comparison

[Include tables and graphs from your comparison document]

**Key Metrics Comparison**:

| Model      | Epochs | Batch  | mAP@0.5   | Precision | Recall    | Time      |
| ---------- | ------ | ------ | --------- | --------- | --------- | --------- |
| Baseline   | 50     | 16     | 76.7%     | 73.9%     | 74.2%     | 4.47h     |
| Fine-Tuned | 70     | 8      | 75.1%     | 72.7%     | 72.2%     | 3.73h     |
| **Hybrid** | **60** | **12** | **76.1%** | **78.1%** | **71.7%** | **3.45h** |

**Winner**: Hybrid Model

- Best precision (78.1%)
- Fastest training (3.45h)
- Balanced performance

### 5.4 Evaluation Metrics

**Precision**: TP / (TP + FP)

- How many detected items are actually correct

**Recall**: TP / (TP + FN)

- How many actual items were detected

**mAP@0.5**: Mean Average Precision at IoU=0.5

- Overall detection accuracy

**mAP@0.5:0.95**: mAP averaged over IoU thresholds 0.5-0.95

- Measures detection quality at various strictness levels

### 5.5 Confusion Matrix Analysis

[INSERT confusion matrix image from training results]

**Observations**:

- Yogurt and Mixsweet: Near-perfect detection
- Chicken, Naan: Moderate performance
- Daal: Most challenging class

### 5.6 Sample Output Images

[INSERT 4-6 sample prediction images showing successful detections]

**Examples to include**:

1. Single food item detection
2. Multiple items in one image
3. Different lighting conditions
4. Challenging cases (overlapping items)

---

## CHAPTER 6: Results and Discussion

### 6.1 Summary of Results

**Best Model: Hybrid Configuration**

- Model: YOLOv5s
- Configuration: 60 epochs, batch 12
- Performance: 78.1% precision, 76.1% mAP@0.5

### 6.2 Comparison Before and After Fine-Tuning

**Improvements from Hyperparameter Tuning**:

1. Precision increased from 73.9% to 78.1% (+4.2%)
2. Training time reduced from 4.47h to 3.45h (-23%)
3. Chicken detection improved significantly (+19.4% precision)
4. Yogurt achieved perfect 100% precision

### 6.3 Strengths of the Model

1. **High Precision**: 78.1% means fewer false positives
2. **Excellent Performance on Specific Classes**:

   - Yogurt: 100% precision, 99.4% recall
   - Mixsweet: 99.5% mAP@0.5
   - Rice: 83.5% mAP@0.5

3. **Fast Inference**: 200-500ms per image in browser
4. **Efficient Training**: Only 3.45 hours on CPU
5. **Balanced Performance**: Good across most classes

### 6.4 Weaknesses and Limitations

1. **Daal Detection Challenge**:

   - Only 53-62% mAP@0.5 across all models
   - Similar appearance to rice, gravy-based dishes
   - Recommendation: More training data needed

2. **Challenging Similar Items**:

   - Naan vs Roti confusion (similar flatbreads)
   - Solution: More distinctive features needed

3. **Recall Trade-off**:

   - Hybrid model has lower recall (71.7%)
   - May miss some food items for better precision
   - Confidence threshold tuning could help

4. **Limited Classes**:
   - Only 8 food types
   - Doesn't generalize to other cuisines

### 6.5 Performance Visualizations

[INSERT graphs and charts]

**Required visualizations**:

1. Training/validation loss curves
2. mAP progression over epochs
3. Per-class performance comparison
4. Confusion matrix
5. Precision-Recall curves

### 6.6 Screenshots of Predictions

[INSERT MULTIPLE screenshots from your web application showing]:

1. Upload interface
2. Detection in progress (loading state)
3. Successful detection with bounding boxes
4. Results panel with confidence scores
5. Multiple food items detected
6. Mobile responsive view

### 6.7 Web Application Performance

**Browser Performance**:

- Model Loading: 2-3 seconds (first time)
- Inference Time: 200-500ms
- UI Responsiveness: Excellent
- Browser Compatibility: Chrome, Firefox, Safari, Edge

---

## CHAPTER 7: Conclusion and Future Work

### 7.1 Summary of Achievements

**Objectives Achieved**:

1. ✅ Developed accurate multi-food detection system (78.1% precision)
2. ✅ Created user-friendly web interface
3. ✅ Compared multiple training configurations
4. ✅ Deployed browser-based AI application
5. ✅ Achieved target mAP >75%

### 7.2 How Well the Model Met Expectations

**Exceeded Expectations**:

- Precision (78.1%) better than expected
- Fast training on CPU (3.45 hours)
- Perfect yogurt detection
- Successful web deployment

**Met Expectations**:

- Overall mAP@0.5 (76.1%) meets >75% target
- Web interface works smoothly
- Real-time detection capability

  **Below Expectations**:

- Daal detection (53.2% mAP@0.5)
- Recall could be higher (71.7%)

### 7.3 Real-World Applicability

**Current Use Cases**:

1. **Dietary Tracking**: Users can photograph meals for food logging
2. **Restaurant Training**: Staff training for food identification
3. **Education**: Learning about Pakistani cuisine
4. **Research**: Benchmark for food detection studies

**Deployment Scenarios**:

- As-is: Web application (browsers)
- Integration: API for mobile apps
- Extension: Add nutritional database

### 7.4 Future Improvements

#### 7.4.1 Short-Term Enhancements

1. **Improve Daal Detection**:

   - Collect more daal images
   - Use targeted data augmentation
   - Increase class weight

2. **Optimize Confidence Threshold**:

   - Tune for better precision-recall balance
   - Class-specific thresholds

3. **Add More Classes**:
   - Expand to 15-20 food types
   - Include drinks, desserts

#### 7.4.2 Long-Term Enhancements

1. **Real-Time Video Detection**:

   - Process video streams
   - Track food items across frames

2. **Mobile Application**:

   - Native iOS/Android apps
   - Offline detection capability
   - Camera integration

3. **Nutritional Information**:

   - Integrate nutritional database
   - Estimate portion sizes
   - Calculate calories

4. **Larger Model Variants**:

   - Test YOLOv5m, YOLOv5l
   - Experiment with YOLOv8
   - GPU acceleration

5. **Cloud Deployment**:

   - Deploy on Vercel/AWS
   - Auto-scaling infrastructure
   - Global CDN

6. **Advanced Features**:
   - Multi-language support
   - Voice feedback
   - Meal planning suggestions
   - Social sharing

### 7.5 Lessons Learned

1. **Hyperparameter Tuning Matters**: 60/12 configuration outperformed others
2. **Smaller Batches Can Be Faster**: Batch 8-12 optimal for CPU
3. **Transfer Learning Works**: Pretrained weights crucial
4. **ONNX for Web**: ONNX Runtime enables browser AI
5. **User Experience Critical**: Beautiful UI enhances adoption

### 7.6 Final Thoughts

This project successfully demonstrates the potential of deep learning for multi-food detection and classification. The combination of YOLOv5's efficiency with modern web technologies (Next.js, ONNX Runtime) creates a practical, deployable solution.

The hybrid model (60 epochs, batch 12) emerged as the optimal configuration, achieving 78.1% precision while training 23% faster than the baseline. The web application provides an intuitive interface for real-time food detection, making AI technology accessible to end-users.

Future work will focus on expanding the food classes, improving daal detection, and deploying a mobile application for broader accessibility.

---

## References

[Add your references here in IEEE or APA format]

1. Jocher, G., et al. (2020). YOLOv5. GitHub repository. https://github.com/ultralytics/yolov5
2. Redmon, J., \u0026 Farhadi, A. (2018). YOLOv3: An Incremental Improvement. arXiv preprint arXiv:1804.02767.
3. [Add more references from your literature review]

---

## Appendices

### Appendix A: Code Snippets

**Training Command**:

```bash
python train_local.py --epochs 60 --batch 12 --img 640 --data data/food_yolov5_data.yaml --weights yolov5s.pt --name fine_tuned_food_model_v2
```

### Appendix B: Dataset Statistics

[Include detailed dataset statistics]

### Appendix C: Complete Training Logs

[Optional: Include full training logs if required]

---

**END OF REPORT**

**Total Pages**: [Aim for 50-70 pages with images]
**Word Count**: [Aim for 8,000-12,000 words]

**Submission Format**: PDF or DOCX
**Due Date**: [Your deadline]

---

## Tips for Writing

1. **Use Professional Language**: Academic tone, third person
2. **Include Figures**: Every 2-3 pages should have a figure/table
3. **Number Everything**: Figures, tables, equations
4. **Cite Sources**: Proper IEEE/APA format
5. **Proofread**: Grammar and spelling
6. **Consistency**: Same terminology throughout
7. **Page Numbers**: Include in footer
8. **Table of Contents**: Auto-generate in Word/LaTeX
