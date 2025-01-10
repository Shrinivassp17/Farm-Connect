export interface User {
  name: string;
  experienceCount: number;
  avatar: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  specialties?: string[];
  joinedAt?: Date;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  timestamp: Date;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  image: string;
  title: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  type: 'disease' | 'pesticide';
  cropType?: string;
  treatment?: string;
  effectiveness?: 'high' | 'medium' | 'low';
}