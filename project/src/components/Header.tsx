import React, { useState } from 'react';
import { Sprout, Users, Search } from 'lucide-react';
import { ShareKnowledgeModal } from './ShareKnowledgeModal';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export function Header() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed w-full top-0 bg-green-700 text-white shadow-lg z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8" />
            <h1 className="text-2xl font-bold">FarmersConnect</h1>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('header.search')}
                className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <LanguageSwitcher />
            <a href="#" className="flex items-center space-x-1 hover:text-green-200">
              <Users className="h-5 w-5" />
              <span>{t('header.community')}</span>
            </a>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="bg-white text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-50"
            >
              {t('header.shareKnowledge')}
            </button>
          </nav>
        </div>
      </div>

      {isShareModalOpen && (
        <ShareKnowledgeModal
          onClose={() => setIsShareModalOpen(false)}
          onShare={(post) => {
            console.log('New post:', post);
            setIsShareModalOpen(false);
          }}
        />
      )}
    </header>
  );
}