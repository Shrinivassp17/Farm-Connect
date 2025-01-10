import React, { useState } from 'react';
import { Users, Award, BookOpen, MapPin, Phone, Mail, Calendar, X, Filter, Search } from 'lucide-react';
import { getAllUsers, getUserPosts, type User, type Post } from '../lib/db';
import { UserProfileModal } from './UserProfileModal';

export function CommunityPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'expert' | 'new'>('all');

  React.useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const allUsers = await getAllUsers();
    setUsers(allUsers.sort((a, b) => b.experienceCount - a.experienceCount));
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'expert' ? user.experienceCount > 10 :
      user.experienceCount <= 10;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Farming Community</h1>
        <p className="text-gray-600 mb-6">
          Connect with experienced farmers and learn from their shared knowledge
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Farmers
            </button>
            <button
              onClick={() => setFilter('expert')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'expert' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expert Farmers
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'new' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              New Members
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.name} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>{user.experienceCount} experiences shared</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location || 'Location not specified'}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="text-sm text-gray-600">
                  <p className="line-clamp-2">{user.bio || 'No bio provided'}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Award className="h-5 w-5" />
                    <span className="font-medium">
                      {user.experienceCount > 10 ? 'Expert Farmer' : 'Community Member'}
                    </span>
                  </div>
                  {user.specialties && (
                    <div className="flex flex-wrap gap-2">
                      {user.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setSelectedUser(user.name)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Profile
                  </button>
                  <button className="text-green-600 hover:text-green-700">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedUser && (
        <UserProfileModal
          userName={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}