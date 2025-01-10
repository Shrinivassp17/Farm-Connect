import type { Post } from './types';

export const samplePosts: Post[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    title: 'Effective Treatment for Rice Blast Disease',
    content: 'I successfully treated rice blast using a combination of organic fungicides and improved drainage. Here\'s my experience...',
    timestamp: new Date('2024-02-20T10:00:00'),
    likes: 24,
    comments: 8,
    type: 'disease',
    cropType: 'Rice',
    treatment: 'Organic Fungicide',
    effectiveness: 'high'
  }
];

export async function initializeDBIfEmpty(getAllPosts: () => Promise<Post[]>, addPost: (post: Post) => Promise<string>) {
  const posts = await getAllPosts();
  if (posts.length === 0) {
    for (const post of samplePosts) {
      await addPost(post);
    }
  }
}