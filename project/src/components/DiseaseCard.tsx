import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import type { Disease } from '../data/diseases';

interface DiseaseCardProps {
  disease: Disease;
  onClick: (disease: Disease) => void;
}

export function DiseaseCard({ disease, onClick }: DiseaseCardProps) {
  const riskColors = {
    low: 'bg-yellow-100 text-yellow-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      onClick={() => onClick(disease)}
    >
      <div className="relative h-48">
        <img 
          src={disease.image} 
          alt={disease.name}
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${riskColors[disease.riskLevel]}`}>
          {disease.riskLevel.charAt(0).toUpperCase() + disease.riskLevel.slice(1)} Risk
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">{disease.name}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {disease.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{disease.symptoms.length} Symptoms</span>
          <div className="flex items-center text-green-600 hover:text-green-700">
            <span>Learn More</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}