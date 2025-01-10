import React, { useState } from 'react';
import { Upload, Loader2, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
    }
  };

  const handleDetectDisease = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:5000/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Error detecting disease:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Disease Detection</h2>
      <p className="text-gray-600 mb-6">
        Upload a clear image of the affected plant leaf for AI-powered disease detection
      </p>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            {previewUrl ? (
              <div className="relative w-full">
                <img
                  src={previewUrl}
                  alt="Selected plant"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedImage(null);
                    setPreviewUrl(null);
                    setPrediction(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <span className="sr-only">Remove image</span>
                  ×
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            )}
          </label>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleDetectDisease}
          disabled={!selectedImage || isLoading}
          className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2
            ${
              !selectedImage
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5" />
              <span>Detect Disease</span>
            </>
          )}
        </button>

        {prediction && (
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900">Detection Result:</h3>
            <p className="mt-1 text-green-700">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}