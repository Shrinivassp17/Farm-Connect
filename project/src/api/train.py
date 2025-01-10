import tensorflow as tf
import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Dataset path configuration
dataset_path = r"C:\Users\shrin\OneDrive\Desktop\bolt-with resource and settings\project\data\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)"


# Define training and validation directories
train_dir = r"C:\Users\shrin\OneDrive\Desktop\bolt-with resource and settings\project\data\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train"
valid_dir = r"C:\Users\shrin\OneDrive\Desktop\bolt-with resource and settings\project\data\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\valid"


# Check if dataset directories exist
if not os.path.exists(train_dir) or not os.path.exists(valid_dir):
    raise FileNotFoundError("Training or validation directory not found. Verify dataset path.")

# Data augmentation for training
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

# Only rescaling for validation
valid_datagen = ImageDataGenerator(rescale=1./255)

# Setup the generators
print("Initializing data generators...")
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

validation_generator = valid_datagen.flow_from_directory(
    valid_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

# Create model
print("Creating model...")
model = tf.keras.Sequential([
    tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    ),
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(512, activation='relu'),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(len(train_generator.class_indices), activation='softmax')
])

# Compile model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train model
print("Training model...")
history = model.fit(
    train_generator,
    epochs=10,
    validation_data=validation_generator,
    callbacks=[
        tf.keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=3,
            restore_best_weights=True
        )
    ]
)

# Save model
print("Saving model...")
model.save('plant_disease_model.h5')

# Save class names
print("Saving class names...")
class_names = list(train_generator.class_indices.keys())
np.save('class_names.npy', class_names)

print("Training complete!")
