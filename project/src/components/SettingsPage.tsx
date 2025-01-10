import React from 'react';
import { 
  Leaf, Globe, BellRing, Ruler, CloudRain, 
  Thermometer, MapPin, Scale, Calculator
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SettingsPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="container mx-auto px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
        <p className="text-gray-600 mb-6">
          Customize your farming preferences and app settings
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Measurement Units */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
              <Ruler className="h-5 w-5 mr-2 text-blue-500" />
              Measurement Units
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area Units
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500">
                  <option value="hectare">Hectares (ha)</option>
                  <option value="acre">Acres</option>
                  <option value="sqm">Square Meters (m²)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight Units
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500">
                  <option value="kg">Kilograms (kg)</option>
                  <option value="pound">Pounds (lb)</option>
                  <option value="quintal">Quintals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Weather Preferences */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
              <CloudRain className="h-5 w-5 mr-2 text-green-500" />
              Weather Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature Unit
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500">
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rainfall Unit
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500">
                  <option value="mm">Millimeters (mm)</option>
                  <option value="inch">Inches (in)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Crop Preferences */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
              <Leaf className="h-5 w-5 mr-2 text-emerald-500" />
              Crop Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Crop Type
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500">
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="corn">Corn</option>
                  <option value="cotton">Cotton</option>
                  <option value="vegetables">Vegetables</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Growing Season
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500">
                  <option value="kharif">Kharif (Monsoon)</option>
                  <option value="rabi">Rabi (Winter)</option>
                  <option value="zaid">Zaid (Summer)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Market Preferences */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
              <Scale className="h-5 w-5 mr-2 text-orange-500" />
              Market Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Updates
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500">
                  <option value="inr">Indian Rupee (₹)</option>
                  <option value="usd">US Dollar ($)</option>
                  <option value="eur">Euro (€)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
              <Globe className="h-5 w-5 mr-2 text-indigo-500" />
              Language
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Language
              </label>
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="te">తెలుగు</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
              <BellRing className="h-5 w-5 mr-2 text-yellow-500" />
              Notifications
            </h2>
            <div className="space-y-4">
              {[
                'Disease Alerts',
                'Weather Updates',
                'Market Price Alerts',
                'Community Updates',
                'Pest Warnings'
              ].map((notification) => (
                <div key={notification} className="flex items-center justify-between">
                  <span className="text-gray-700">{notification}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}