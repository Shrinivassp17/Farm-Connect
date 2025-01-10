import { openDB } from 'idb';
import type { User, Post, Comment } from './types';
import { v4 as uuidv4 } from 'uuid';

const DB_NAME = 'farmers-connect-db';
const DB_VERSION = 3;

export const db = await openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // Posts store
    const postStore = db.createObjectStore('posts', { keyPath: 'id' });
    postStore.createIndex('timestamp', 'timestamp');
    postStore.createIndex('type', 'type');
    postStore.createIndex('author', 'author');

    // Users store
    const userStore = db.createObjectStore('users', { keyPath: 'name' });
    userStore.createIndex('experienceCount', 'experienceCount');
    userStore.createIndex('joinedAt', 'joinedAt');

    // Comments store
    const commentStore = db.createObjectStore('comments', { keyPath: 'id' });
    commentStore.createIndex('postId', 'postId');
    commentStore.createIndex('timestamp', 'timestamp');
    commentStore.createIndex('author', 'author');
  },
});

// Posts CRUD operations
export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await db.getAllFromIndex('posts', 'timestamp');
    return posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
}

export async function getUserPosts(userName: string): Promise<Post[]> {
  try {
    return db.getAllFromIndex('posts', 'author', userName);
  } catch (error) {
    console.error('Error getting user posts:', error);
    return [];
  }
}

export async function addPost(post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments'>): Promise<string> {
  try {
    const id = uuidv4();
    const newPost = {
      ...post,
      id,
      timestamp: new Date(),
      likes: 0,
      comments: 0
    };
    await db.add('posts', newPost);
    
    // Update user experience count
    const user = await db.get('users', post.author);
    if (user) {
      await db.put('users', {
        ...user,
        experienceCount: (user.experienceCount || 0) + 1
      });
    } else {
      await db.put('users', {
        name: post.author,
        experienceCount: 1,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=random`,
        joinedAt: new Date(),
        specialties: [],
        bio: ''
      });
    }
    return id;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
}

// Comments operations
export async function getPostComments(postId: string): Promise<Comment[]> {
  try {
    const comments = await db.getAllFromIndex('comments', 'postId', postId);
    return comments.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  } catch (error) {
    console.error('Error getting comments:', error);
    return [];
  }
}

export async function addComment(comment: Omit<Comment, 'id' | 'timestamp'>): Promise<string> {
  try {
    const id = uuidv4();
    const newComment = {
      ...comment,
      id,
      timestamp: new Date()
    };
    await db.add('comments', newComment);

    // Update post comment count
    const post = await db.get('posts', comment.postId);
    if (post) {
      await db.put('posts', {
        ...post,
        comments: (post.comments || 0) + 1
      });
    }
    return id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

// User operations
export async function getUser(name: string): Promise<User | undefined> {
  try {
    return db.get('users', name);
  } catch (error) {
    console.error('Error getting user:', error);
    return undefined;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await db.getAllFromIndex('users', 'experienceCount');
    return users.sort((a, b) => (b.experienceCount || 0) - (a.experienceCount || 0));
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}