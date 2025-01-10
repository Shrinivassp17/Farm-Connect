import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface FarmersConnectDB extends DBSchema {
  posts: {
    key: string;
    value: {
      id: string;
      title: string;
      content: string;
      author: string;
      authorAvatar: string;
      imageUrl: string;
      createdAt: Date;
      type: 'disease' | 'pesticide';
      likes: number;
      comments: number;
    };
    indexes: {
      'by-date': Date;
      'by-author': string;
      'by-type': string;
    };
  };
  comments: {
    key: string;
    value: {
      id: string;
      postId: string;
      author: string;
      content: string;
      createdAt: Date;
    };
    indexes: {
      'by-post': string;
      'by-date': Date;
    };
  };
  users: {
    key: string;
    value: {
      id: string;
      name: string;
      avatar: string;
      bio?: string;
      location?: string;
      joinedAt: Date;
      experienceCount: number;
      specialties: string[];
    };
    indexes: {
      'by-experience': number;
    };
  };
}

let db: IDBPDatabase<FarmersConnectDB>;

export async function initDB() {
  db = await openDB<FarmersConnectDB>('farmers-connect', 3, {
    upgrade(db) {
      // Posts store
      const postStore = db.createObjectStore('posts', { keyPath: 'id' });
      postStore.createIndex('by-date', 'createdAt');
      postStore.createIndex('by-author', 'author');
      postStore.createIndex('by-type', 'type');

      // Comments store
      const commentStore = db.createObjectStore('comments', { keyPath: 'id' });
      commentStore.createIndex('by-post', 'postId');
      commentStore.createIndex('by-date', 'createdAt');

      // Users store
      const userStore = db.createObjectStore('users', { keyPath: 'id' });
      userStore.createIndex('by-experience', 'experienceCount');
    }
  });
}

// Posts
export async function getAllPosts() {
  await initDB();
  return db.getAllFromIndex('posts', 'by-date');
}

export async function addPost(post: Omit<FarmersConnectDB['posts']['value'], 'id' | 'createdAt' | 'likes' | 'comments'>) {
  await initDB();
  const id = crypto.randomUUID();
  const newPost = {
    ...post,
    id,
    createdAt: new Date(),
    likes: 0,
    comments: 0
  };
  await db.add('posts', newPost);
  return id;
}

// Comments
export async function getPostComments(postId: string) {
  await initDB();
  return db.getAllFromIndex('comments', 'by-post', postId);
}

export async function addComment(comment: Omit<FarmersConnectDB['comments']['value'], 'id' | 'createdAt'>) {
  await initDB();
  const id = crypto.randomUUID();
  const newComment = {
    ...comment,
    id,
    createdAt: new Date()
  };
  await db.add('comments', newComment);

  // Update post comment count
  const post = await db.get('posts', comment.postId);
  if (post) {
    await db.put('posts', {
      ...post,
      comments: post.comments + 1
    });
  }
  return id;
}

// Users
export async function getUser(userId: string) {
  await initDB();
  return db.get('users', userId);
}

export async function getAllUsers() {
  await initDB();
  return db.getAllFromIndex('users', 'by-experience');
}

export async function createOrUpdateUser(user: Omit<FarmersConnectDB['users']['value'], 'joinedAt' | 'experienceCount'>) {
  await initDB();
  const existingUser = await db.get('users', user.id);
  if (existingUser) {
    await db.put('users', {
      ...existingUser,
      ...user,
      experienceCount: existingUser.experienceCount + 1
    });
  } else {
    await db.add('users', {
      ...user,
      joinedAt: new Date(),
      experienceCount: 1
    });
  }
}