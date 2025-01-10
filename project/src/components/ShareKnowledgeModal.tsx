import React, { useState, useRef } from 'react';
import { X, Image, Loader2 } from 'lucide-react';

interface ShareKnowledgeModalProps {
  onClose: () => void;
  onShare: (post: any) => void;
}

export function ShareKnowledgeModal({ onClose, onShare }: ShareKnowledgeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    content: '',
    type: 'disease',
    cropType: '',
    treatment: '',
    effectiveness: 'high',
    image: null as string | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setFormData(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload an image');
      return;
    }
    
    setIsSubmitting(true);
    
    onShare({
      ...formData,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.author)}&background=random`,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
    });
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Share Your Experience</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="author"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your name"
              value={formData.author}
              onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="E.g., Successfully treated wheat rust"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="type"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="disease">Disease</option>
                <option value="pesticide">Pesticide</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="cropType" className="block text-sm font-medium text-gray-700">
                Crop Type
              </label>
              <input
                type="text"
                id="cropType"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="E.g., Wheat, Rice, Cotton"
                value={formData.cropType}
                onChange={e => setFormData(prev => ({ ...prev, cropType: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="content"
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Share your experience in detail..."
              value={formData.content}
              onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="treatment" className="block text-sm font-medium text-gray-700">
              Treatment Used
            </label>
            <input
              type="text"
              id="treatment"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="E.g., Organic fungicide, Chemical pesticide"
              value={formData.treatment}
              onChange={e => setFormData(prev => ({ ...prev, treatment: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="effectiveness" className="block text-sm font-medium text-gray-700">
              Treatment Effectiveness
            </label>
            <select
              id="effectiveness"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.effectiveness}
              onChange={e => setFormData(prev => ({ ...prev, effectiveness: e.target.value }))}
            >
              <option value="high">Highly Effective</option>
              <option value="medium">Moderately Effective</option>
              <option value="low">Less Effective</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="mx-auto h-48 w-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setFormData(prev => ({ ...prev, image: null }));
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer"
                  >
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex items-center space-x-2"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Share Experience</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}