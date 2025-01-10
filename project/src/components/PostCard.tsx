import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, AlertCircle, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { getPostComments, addComment } from '../lib/db';
import type { Post, Comment } from '../lib/types';

interface PostCardProps extends Post {}

export function PostCard({
  id,
  author,
  avatar,
  image,
  title,
  content,
  timestamp,
  likes,
  comments: commentCount,
  type
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  const loadComments = async () => {
    const loadedComments = await getPostComments(id);
    setComments(loadedComments);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    try {
      await addComment({
        postId: id,
        author: userName,
        content: newComment
      });
      await loadComments();
      setNewComment('');
      setUserName('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-medium text-gray-900">{author}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </p>
          </div>
          <span className={`ml-auto px-3 py-1 rounded-full text-sm ${
            type === 'disease' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {type === 'disease' ? 'Disease Alert' : 'Pesticide Info'}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{content}</p>

        {image && (
          <div className="relative h-64 mb-4">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex items-center justify-between text-gray-500 mb-4">
          <button className="flex items-center space-x-2 hover:text-green-600">
            <Heart className="h-5 w-5" />
            <span>{likes}</span>
          </button>
          <button 
            onClick={() => {
              setShowComments(!showComments);
              if (!showComments) loadComments();
            }}
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{commentCount}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-600">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>Report</span>
          </button>
        </div>

        {showComments && (
          <div className="border-t pt-4">
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=random`}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg px-4 py-2">
                      <p className="font-medium text-sm">{comment.author}</p>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Post</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </article>
  );
}