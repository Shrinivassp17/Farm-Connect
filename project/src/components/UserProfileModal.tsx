import React, { useState, useEffect } from 'react';
import { X, MapPin, Mail, Phone, Calendar, BookOpen, Award, Leaf, Shield } from 'lucide-react';
import { getUser, getUserPosts, type User, type Post } from '../lib/db';
import { formatDistanceToNow } from 'date-fns';

interface UserProfileModalProps {
  userName: string;
  onClose: () => void;
}

export function UserProfileModal({ userName, onClose }: UserProfileModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');

  useEffect(() => {
    loadUserData();
  }, [userName]);

  async function loadUserData() {
    try {
      const userData = await getUser(userName);
      if (userData) {
        setUser(userData);
        const userPosts = await getUserPosts(userName);
        setPosts(userPosts);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}'s Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-6 mb-8">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">
                      {user.experienceCount > 10 ? 'Expert Farmer' : 'Community Member'}
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Follow
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{user.location || 'Location not specified'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>Joined {formatDistanceToNow(user.joinedAt, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-1 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'posts'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'about'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </button>
          </div>

          {activeTab === 'posts' ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    {post.type === 'disease' ? (
                      <Leaf className="h-5 w-5 text-red-500" />
                    ) : (
                      <Shield className="h-5 w-5 text-green-500" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      post.type === 'disease'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {post.type === 'disease' ? 'Disease Alert' : 'Pesticide Info'}
                    </span>
                    <span className="text-gray-500">
                      {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
                  <p className="text-gray-600 mb-4">{post.content}</p>

                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Bio</h4>
                <p className="text-gray-600">{user.bio || 'No bio provided'}</p>
              </div>

              {user.specialties && user.specialties.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                <div className="flex items-center space-x-2 text-gray-600">
                  <BookOpen className="h-5 w-5" />
                  <span>{user.experienceCount} farming experiences shared</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}