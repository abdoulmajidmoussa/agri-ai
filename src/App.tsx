import React, { useState } from 'react';
import ChatView from './components/ChatView';
import ProblemsView from './components/ProblemsView';
import HistoryView from './components/HistoryView';
import { Leaf, MessageCircle, BookOpen, History } from 'lucide-react';
import { getTranslation } from './lib/i18n';

type Tab = 'chat' | 'problems' | 'history';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [language, setLanguage] = useState<string>('Français');

  // Load theme colors
  return (
    <div className="min-h-[100dvh] bg-[#F4F9F1] text-green-950 font-sans md:flex md:flex-row-reverse pb-20 md:pb-0 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-green-200 flex items-center justify-between px-4 z-50 shadow-sm md:left-[100px]">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-1.5 rounded-xl shadow-sm text-white">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-green-800">AGRI-IA</h1>
        </div>
        <select 
          className="bg-green-50 border-2 border-green-200 rounded-xl px-2 py-1.5 text-sm md:text-base font-bold text-green-800 focus:outline-none focus:border-green-500 shadow-sm transition-colors"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="Français">🇫🇷 Français</option>
          <option value="Hausa">🇳🇬 Hausa</option>
          <option value="Wolof">🇸🇳 Wolof</option>
          <option value="Bambara">🇲🇱 Bambara</option>
        </select>
      </header>

      {/* Main Content Areas */}
      <main className="flex-1 max-w-4xl mx-auto w-full h-[100dvh] pt-16 md:pt-20 md:px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F9F1] to-white pointer-events-none -z-10" />
        
        {activeTab === 'chat' && <ChatView language={language} />}
        {activeTab === 'problems' && <ProblemsView language={language} />}
        {activeTab === 'history' && <HistoryView language={language} />}
      </main>

      {/* Bottom Navigation for Mobile / Side Nav for Desktop */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-100 flex justify-around p-2 md:bottom-auto md:top-0 md:flex-col md:w-[100px] md:border-t-0 md:border-r-2 md:h-full md:justify-start md:gap-4 md:pt-6 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,100,0,0.05)] md:shadow-[4px_0_20px_rgba(0,100,0,0.05)]">
        
        <div className="hidden md:flex flex-col items-center mb-8">
           <div className="bg-green-600 p-3 rounded-2xl shadow-md text-white mb-2">
             <Leaf className="w-8 h-8" />
           </div>
        </div>

        <NavButton 
          active={activeTab === 'chat'} 
          onClick={() => setActiveTab('chat')} 
          icon={<MessageCircle size={28} />} 
          label={getTranslation(language, 'tab_chat')} 
        />
        <NavButton 
          active={activeTab === 'problems'} 
          onClick={() => setActiveTab('problems')} 
          icon={<BookOpen size={28} />} 
          label={getTranslation(language, 'tab_problems')} 
        />
        <NavButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')} 
          icon={<History size={28} />} 
          label={getTranslation(language, 'tab_history')} 
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center p-3 rounded-2xl transition-all md:mx-3 ${active ? 'text-green-700 font-extrabold bg-green-100/80 scale-105' : 'text-green-600/60 hover:bg-green-50 font-bold hover:text-green-600'}`}
    >
      <div className={`mb-1.5 transition-transform ${active ? 'transform -translate-y-1' : ''}`}>
        {icon}
      </div>
      <span className="text-[11px] uppercase tracking-widest">{label}</span>
    </button>
  );
}
