import os
import cv2
import albumentations as A
import numpy as np

input_folder = './01_Raw_Dataset'
output_folder = './04_Preprocessed_Dataset'
os.makedirs(output_folder, exist_ok=True)

# Blurriness detection function
def is_blurry(image, threshold=100):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    lap_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    return lap_var < threshold

# Albumentations augmentation pipeline
transform = A.Compose([
    A.Rotate(limit=15, p=0.5),
    A.HorizontalFlip(p=0.5),
    A.RandomBrightnessContrast(p=0.5),
])

for file in os.listdir(input_folder):
    path = os.path.join(input_folder, file)
    img = cv2.imread(path)

    if img is None:
        print(f'Failed to load {file}, skipping.')
        continue

    # Check blurriness
    if is_blurry(img):
        print(f'Blurry image skipped: {file}')
        continue

    # Resize to 416x416
    resized = cv2.resize(img, (416, 416))

    # Normalize pixels (optional to save normalized or do it in training)
    normalized = resized / 255.0

    # Save preprocessed image as uint8
    cv2.imwrite(os.path.join(output_folder, file), (normalized * 255).astype(np.uint8))

    # Data augmentation
    augmented = transform(image=resized)['image']
    aug_name = os.path.splitext(file)[0] + '_aug.jpg'
    cv2.imwrite(os.path.join(output_folder, aug_name), augmented)
