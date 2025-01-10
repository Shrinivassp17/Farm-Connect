import React, { useState } from 'react';
import { Newspaper, BookOpen, Video, Calendar, ExternalLink, ThumbsUp, Share2, BookmarkPlus } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  source: string;
  date: string;
  category: 'news' | 'guide' | 'video';
  image: string;
  url: string;
  likes: number;
  description: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Sustainable Farming Practices for 2024',
    source: 'Agriculture Today',
    date: '2024-03-15',
    category: 'news',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    url: '#',
    likes: 245,
    description: 'Learn about the latest sustainable farming practices that are revolutionizing agriculture...'
  },
  {
    id: '2',
    title: 'Complete Guide to Organic Pest Control',
    source: 'Farming Experts',
    date: '2024-03-14',
    category: 'guide',
    image: 'https://wp.prod.ex.hydrobuilder.com/wp-content/uploads/organic-garden-pest-control.jpg',
    url: '#',
    likes: 189,
    description: 'A comprehensive guide to managing pests naturally without harmful chemicals...'
  },
  {
    id: '3',
    title: 'Modern Irrigation Techniques Explained',
    source: 'FarmTech Weekly',
    date: '2024-03-13',
    category: 'video',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWgMVrCyTrFzqN-6vk4owi1sCO3u12gmMQkw&s',
    url: '#',
    likes: 156,
    description: 'Watch this comprehensive video guide on modern irrigation systems and water management...'
  },
  {
    "id": "4",
    "title": "Crop Rotation for Sustainable Farming",
    "source": "AgroWorld News",
    "date": "2024-03-18",
    "category": "article",
    "image": "https://kaybeebio.com/wp-content/uploads/2023/08/Crop-Rotation.webp",
    "url": "#",
    "likes": 245,
    "description": "Learn how crop rotation techniques improve soil health and maximize yields in this detailed article."
  },
  {
    "id": "5",
    "title": "Top 5 Pesticides for Organic Farming",
    "source": "FarmSafe Magazine",
    "date": "2024-03-20",
    "category": "video",
    "image": "https://www.tractorjunction.com/blog/wp-content/uploads/2022/09/Types-of-Organic-Pesticides-or-Bio-Pesticides.jpg",
    "url": "#",
    "likes": 310,
    "description": "Explore the top organic pesticides that ensure effective pest control without harming the environment."
  },
  {
    "id": "6",
    "title": "Understanding Soil pH and Fertility",
    "source": "GreenGrowers Blog",
    "date": "2024-03-22",
    "category": "blog",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbJDG-jZzuY_Yjb9HbO4zbxOGOJAlgnxFdw&s",
    "url": "#",
    "likes": 198,
    "description": "This blog post dives into soil pH management and its role in growing healthy crops."
  },
  {
    "id": "7",
    "title": "Automation in Farming: A Beginner’s Guide",
    "source": "TechAgri Weekly",
    "date": "2024-03-25",
    "category": "video",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZdDhFmS4zDFaBVCkopuof511eF5Pvbx-j2Q&s",
    "url": "#",
    "likes": 325,
    "description": "Watch this introductory video on how automation is revolutionizing agricultural practices."
  },
  {
    "id": "8",
    "title": "Organic Farming Success Stories",
    "source": "EcoFarms Journal",
    "date": "2024-03-27",
    "category": "podcast",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PO0p8AtcDScUqkTgRZDcuKPEijmLRngFNw&s",
    "url": "#",
    "likes": 176,
    "description": "Tune into this inspiring podcast featuring successful organic farmers sharing their experiences."
  },
  {
    "id": "9",
    "title": "Using Drones for Precision Agriculture",
    "source": "FutureFarmers Network",
    "date": "2024-03-30",
    "category": "article",
    "image": "https://iotechworld.com/wp-content/uploads/2024/08/green-field-tree-blue-skygreat-as-backgroundweb-banner-generative-ai-2.webp",
    "url": "#",
    "likes": 289,
    "description": "Discover how drones are being used for precision agriculture in this informative article."
  }
];

export function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'news' | 'guide' | 'video'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'news':
        return <Newspaper className="h-5 w-5" />;
      case 'guide':
        return <BookOpen className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Farming Resources</h1>
        <p className="text-gray-600 mb-6">
          Stay updated with the latest farming news, guides, and educational content
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'news', 'guide', 'video'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <div key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium 
                  ${article.category === 'news' ? 'bg-blue-100 text-blue-800' :
                    article.category === 'guide' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'}`}>
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  {getCategoryIcon(article.category)}
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{article.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                      <BookmarkPlus className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                  >
                    <span>Read More</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}