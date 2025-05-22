import os
from collections import Counter
import matplotlib.pyplot as plt
import seaborn as sns

# Path to annotations folder
annotations_folder = './02_ Annotations'
output_folder = './03_Visualization/sample_outputs_class_distribution'
os.makedirs(output_folder, exist_ok=True)

# Define your class names in order (same as before)
class_names = [
    'chicken', 'daal', 'mixsweet', 'naan', 'rice', 'roti',
    'salad', 'yogurt',
]

def count_classes(annotations_folder):
    counts = Counter()
    for label_file in os.listdir(annotations_folder):
        if not label_file.endswith('.txt'):
            continue
        path = os.path.join(annotations_folder, label_file)
        with open(path, 'r') as f:
            for line in f:
                if line.strip():
                    class_id = int(line.strip().split()[0])
                    counts[class_id] += 1
    return counts

counts = count_classes(annotations_folder)

# Prepare data for plotting
labels = [class_names[i] for i in sorted(counts.keys())]
values = [counts[i] for i in sorted(counts.keys())]

# ---------- Bar Plot (Countplot) ----------
plt.figure(figsize=(10, 6))
sns.barplot(x=labels, y=values)
plt.xlabel('Food Classes')
plt.ylabel('Number of Bounding Boxes')
plt.title('Distribution of Food Items in Dataset')
plt.xticks(rotation=45)
plt.tight_layout()
barplot_path = os.path.join(output_folder, 'class_distribution_barplot.png')
plt.savefig(barplot_path)
plt.close()
print(f'Bar plot saved as {barplot_path}')

# ---------- Pie Chart ----------
plt.figure(figsize=(8, 8))
plt.pie(values, labels=labels, autopct='%1.1f%%', startangle=140)
plt.title('Proportion of Food Items in Dataset')
plt.tight_layout()
piechart_path = os.path.join(output_folder, 'class_distribution_piechart.png')
plt.savefig(piechart_path)
plt.close()
print(f'Pie chart saved as {piechart_path}')
