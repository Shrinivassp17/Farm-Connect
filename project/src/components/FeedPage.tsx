import React, { useState, useEffect } from 'react';
import { PostCard } from './PostCard';
import { ShareKnowledgeModal } from './ShareKnowledgeModal';
import { getAllPosts, addPost } from '../lib/db';
import { useTranslation } from 'react-i18next';
import type { Post } from '../lib/types';

export function FeedPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const loadedPosts = await getAllPosts();
      setPosts(loadedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleShare = async (newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments'>) => {
    try {
      await addPost(newPost);
      await loadPosts();
      setIsShareModalOpen(false);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('feed.title')}</h1>
            <p className="text-gray-600">
              {t('feed.subtitle')}
            </p>
          </div>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="btn btn-primary"
          >
            {t('feed.shareButton')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      {isShareModalOpen && (
        <ShareKnowledgeModal
          onClose={() => setIsShareModalOpen(false)}
          onShare={handleShare}
        />
      )}
    </div>
  );
}