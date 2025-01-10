import React, { useState } from 'react';
import { Search, Star, ShoppingCart, Filter, ExternalLink } from 'lucide-react';
import { pesticides, type Pesticide } from '../data/pesticides';

export function PesticidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Insecticide', 'Fungicide', 'Herbicide'];

  const filteredPesticides = pesticides.filter(pesticide => {
    const matchesSearch = pesticide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pesticide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pesticide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Agricultural Pesticides</h1>
        <p className="text-gray-600 mb-6">
          Find and purchase high-quality pesticides for your farming needs
        </p>

        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search pesticides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPesticides.map(pesticide => (
          <PesticideCard key={pesticide.id} pesticide={pesticide} />
        ))}
      </div>
    </div>
  );
}

function PesticideCard({ pesticide }: { pesticide: Pesticide }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <img 
          src={pesticide.image}
          alt={pesticide.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {pesticide.category}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{pesticide.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{pesticide.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pesticide.description}
        </p>

        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            <strong>Key Uses:</strong>
            <ul className="list-disc pl-5 mt-1">
              {pesticide.usage.slice(0, 2).map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-600">{pesticide.price}</span>
            <div className="flex space-x-2">
              <a
                href={pesticide.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-300 ${
                  isHovered
                    ? 'bg-[#FF9900] text-white shadow-md scale-105'
                    : 'bg-[#232F3E] text-white hover:bg-[#374151]'
                }`}
              >
                {isHovered ? (
                  <>
                    <ExternalLink className="h-4 w-4" />
                    <span>View on Amazon</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    <span>Buy Now</span>
                  </>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}