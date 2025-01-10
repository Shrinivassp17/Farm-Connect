import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import { samplePosts } from './lib/sample-data';
import { getAllPosts, addPost } from './lib/db';

// Initialize database with sample data
async function initializeApp() {
  try {
    const posts = await getAllPosts();
    if (posts.length === 0) {
      for (const post of samplePosts) {
        const { id, ...postData } = post;
        await addPost(postData);
      }
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

initializeApp().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});