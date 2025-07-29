import os
import shutil
from sklearn.model_selection import train_test_split

# ----- CONFIG -----
# Paths
image_folder = './04_Preprocessed_Dataset'      
label_folder = './02_ Annotations'              

# Output directories
train_image_out = './Train_Set/images'
train_label_out = './Train_Set/labels'
test_image_out = './Test_Set/images'
test_label_out = './Test_Set/labels'

# ----- SETUP OUTPUT FOLDERS -----
for d in [train_image_out, train_label_out, test_image_out, test_label_out]:
    os.makedirs(d, exist_ok=True)

image_files = [
    f for f in os.listdir(image_folder)
    if f.endswith(('.jpg', '.jpeg', '.png')) and '_aug' not in f
]

# ----- VERIFY EXAMPLE MATCH -----
print("✅ Total original images found:", len(image_files))
if image_files:
    base = os.path.splitext(image_files[0])[0]
    label_name = base + '.txt'
    label_path = os.path.join(label_folder, label_name)
    print(f"🔍 Example check:\n - Image: {image_files[0]}\n - Label: {label_name}\n - Exists: {os.path.exists(label_path)}")

# ----- SPLIT -----
train_imgs, test_imgs = train_test_split(image_files, test_size=0.2, random_state=42)

def copy_pairs(img_list, img_out, label_out):
    skipped = 0
    for img_file in img_list:
        base = os.path.splitext(img_file)[0]
        label_file = base + '.txt'
        
        src_img = os.path.join(image_folder, img_file)
        src_label = os.path.join(label_folder, label_file)

        if not os.path.exists(src_label):
            print(f"⚠️ Missing label for {img_file}, skipping.")
            skipped += 1
            continue

        shutil.copy(src_img, os.path.join(img_out, img_file))
        shutil.copy(src_label, os.path.join(label_out, label_file))
    
    return skipped

# ----- COPY FILES -----
print("\n📂 Copying training data...")
train_skipped = copy_pairs(train_imgs, train_image_out, train_label_out)

print("\n📂 Copying testing data...")
test_skipped = copy_pairs(test_imgs, test_image_out, test_label_out)

# ----- SUMMARY -----
print("\n✅ Dataset splitting complete!")
print(f"🧠 Training images: {len(train_imgs) - train_skipped}")
print(f"🧪 Testing images:  {len(test_imgs) - test_skipped}")
print(f"❌ Skipped due to missing labels: {train_skipped + test_skipped}")
