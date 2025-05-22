import os
import cv2
import random
import shutil

# Define your folders
images_folder = './01_Raw_Dataset'
annotations_folder = './02_ Annotations'
output_folder = './03_Visualization/sample_outputs_bounding_boxes'

# Define your class names in the order of their class IDs
class_names = [
    'chicken', 'daal', 'mixsweet', 'naan', 'rice', 'roti',
    'salad', 'yogurt',
]

def load_labels(label_path):
    """
    Load YOLO labels from a txt file.
    Each line: class_id x_center y_center width height (all normalized)
    """
    boxes = []
    with open(label_path, 'r') as f:
        for line in f.readlines():
            parts = line.strip().split()
            if len(parts) != 5:
                continue
            class_id, x_center, y_center, width, height = parts
            boxes.append({
                'class_id': int(class_id),
                'x_center': float(x_center),
                'y_center': float(y_center),
                'width': float(width),
                'height': float(height)
            })
    return boxes

def draw_boxes(image, boxes):
    """
    Draw bounding boxes on image.
    YOLO coords are normalized, so convert to pixel values.
    """
    h, w = image.shape[:2]

    for box in boxes:
        class_id = box['class_id']
        x_c = box['x_center'] * w
        y_c = box['y_center'] * h
        bw = box['width'] * w
        bh = box['height'] * h

        # Calculate top-left and bottom-right corners
        x1 = int(x_c - bw / 2)
        y1 = int(y_c - bh / 2)
        x2 = int(x_c + bw / 2)
        y2 = int(y_c + bh / 2)

        # Draw rectangle
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Put class label text
        label = class_names[class_id] if class_id < len(class_names) else str(class_id)
        cv2.putText(image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 
                    0.6, (0, 255, 0), 2)

    return image

def main():
    # Clear output folder if it exists
    if os.path.exists(output_folder):
        shutil.rmtree(output_folder)
    os.makedirs(output_folder, exist_ok=True)

    image_files = sorted(os.listdir(images_folder))
    
    # Select 10 random images
    random.seed(42)  # for reproducibility
    selected_images = random.sample(image_files, 7)

    for img_file in selected_images:
        img_path = os.path.join(images_folder, img_file)
        base_name = os.path.splitext(img_file)[0]
        label_path = os.path.join(annotations_folder, base_name + '.txt')

        # Check if label file exists
        if not os.path.isfile(label_path):
            print(f'No label for {img_file}, skipping.')
            continue

        # Load image
        image = cv2.imread(img_path)
        if image is None:
            print(f'Failed to load image {img_file}, skipping.')
            continue

        # Load labels
        boxes = load_labels(label_path)

        # Draw boxes
        image_with_boxes = draw_boxes(image.copy(), boxes)

        # Save image with annotations
        output_path = os.path.join(output_folder, img_file)
        cv2.imwrite(output_path, image_with_boxes)
        print(f'Saved annotated image: {output_path}')

if __name__ == '__main__':
    main()
