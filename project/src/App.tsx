import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DiseasesPage } from './components/DiseasesPage';
import { FeedPage } from './components/FeedPage';
import { PesticidesPage } from './components/PesticidesPage';
import { CommunityPage } from './components/CommunityPage';
import { ResourcesPage } from './components/ResourcesPage';
import { SettingsPage } from './components/SettingsPage';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'diseases' | 'pesticides' | 'community' | 'resources' | 'settings'>('home');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Sidebar onNavigate={setCurrentPage} />
        
        <main className="ml-64 pt-16">
          {currentPage === 'home' && <FeedPage />}
          {currentPage === 'diseases' && <DiseasesPage />}
          {currentPage === 'pesticides' && <PesticidesPage />}
          {currentPage === 'community' && <CommunityPage />}
          {currentPage === 'resources' && <ResourcesPage />}
          {currentPage === 'settings' && <SettingsPage />}
        </main>
      </div>
    </ThemeProvider>
  );
}