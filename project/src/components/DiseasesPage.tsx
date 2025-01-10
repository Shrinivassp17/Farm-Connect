import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { commonDiseases, type Disease } from '../data/diseases';
import { DiseaseCard } from './DiseaseCard';
import { DiseaseModal } from './DiseaseModal';
import { DiseaseDetection } from './DiseaseDetection';

export function DiseasesPage() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetection, setShowDetection] = useState(false);

  const filteredDiseases = commonDiseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-8 py-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Common Crop Diseases</h1>
          <button
            onClick={() => setShowDetection(!showDetection)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            {showDetection ? 'View Disease Library' : 'AI Disease Detection'}
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          {showDetection 
            ? 'Upload a plant image for AI-powered disease detection'
            : 'Identify and learn about common diseases that affect crops'}
        </p>

        {!showDetection && (
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search diseases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5 text-gray-500" />
              <span>Filter</span>
            </button>
          </div>
        )}
      </div>

      {showDetection ? (
        <DiseaseDetection />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map(disease => (
            <DiseaseCard
              key={disease.id}
              disease={disease}
              onClick={setSelectedDisease}
            />
          ))}
        </div>
      )}

      {selectedDisease && (
        <DiseaseModal
          disease={selectedDisease}
          onClose={() => setSelectedDisease(null)}
        />
      )}
    </div>
  );
}