import React from 'react';
import { Home, Leaf, Shield, Users, BookOpen, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  onNavigate: (page: 'home' | 'diseases' | 'pesticides' | 'community' | 'resources' | 'settings') => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const { t } = useTranslation();

  const menuItems = [
    { icon: Home, label: t('nav.home'), value: 'home' as const },
    { icon: Leaf, label: t('nav.diseases'), value: 'diseases' as const },
    { icon: Shield, label: t('nav.pesticides'), value: 'pesticides' as const },
    { icon: Users, label: t('nav.community'), value: 'community' as const },
    { icon: BookOpen, label: t('nav.resources'), value: 'resources' as const },
    { icon: Settings, label: t('nav.settings'), value: 'settings' as const }
  ];

  return (
    <aside className="w-64 bg-white h-screen shadow-md fixed left-0 top-16">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(({ icon: Icon, label, value }) => (
            <li key={label}>
              <button
                onClick={() => onNavigate(value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  text-gray-700 hover:bg-gray-50 hover:text-green-700`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}