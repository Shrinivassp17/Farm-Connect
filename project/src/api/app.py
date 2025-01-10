from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = tf.keras.models.load_model('plant_disease_model.h5')

# Load class names dynamically
class_names = np.load('class_names.npy', allow_pickle=True)

def preprocess_image(image_bytes):
    """
    Preprocess the input image bytes for prediction.
    """
    # Convert bytes to PIL Image
    image = Image.open(io.BytesIO(image_bytes))
    
    # Resize to match model's expected input
    image = image.resize((224, 224))
    
    # Convert to array and preprocess
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = tf.expand_dims(img_array, 0)  # Add batch dimension
    
    return img_array

@app.route('/detect', methods=['POST'])
def detect_disease():
    try:
        # Check if an image is provided
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image_file = request.files['image']
        image_bytes = image_file.read()
        
        # Preprocess the image
        processed_image = preprocess_image(image_bytes)
        
        # Make prediction
        predictions = model.predict(processed_image)
        predicted_class = class_names[np.argmax(predictions[0])]  # Get class name
        confidence = float(np.max(predictions[0]))  # Get confidence
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
