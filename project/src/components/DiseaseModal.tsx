import React from 'react';
import { X, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Disease } from '../data/diseases';

interface DiseaseModalProps {
  disease: Disease;
  onClose: () => void;
}

export function DiseaseModal({ disease, onClose }: DiseaseModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">{disease.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <img
            src={disease.image}
            alt={disease.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">{disease.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-3">
                <h3 className="flex items-center space-x-2 font-semibold text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span>Symptoms</span>
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {disease.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="flex items-center space-x-2 font-semibold text-orange-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Causes</span>
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {disease.causes.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="flex items-center space-x-2 font-semibold text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Solutions</span>
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {disease.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}