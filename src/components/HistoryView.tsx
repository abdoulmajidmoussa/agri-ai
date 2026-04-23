import React, { useState, useEffect } from 'react';
import { getHistory, clearHistory, Message } from '../lib/history';
import { Trash2, AlertCircle, Clock } from 'lucide-react';
import { getTranslation } from '../lib/i18n';

export default function HistoryView({ language }: { language: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setMessages(getHistory());
  }, []);

  const handleClear = () => {
    if (confirmDelete) {
      clearHistory();
      setMessages([]);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000); // reset after 3s
    }
  };

  if (messages.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-[calc(100vh-120px)] text-center">
        <div className="bg-green-100 p-8 rounded-[40px] text-green-600 mb-6 shadow-sm border border-green-200">
          <Clock size={80} />
        </div>
        <h2 className="text-3xl font-bold text-green-900 mb-3 block">{getTranslation(language, 'no_history')}</h2>
        <p className="text-green-700/80 text-xl font-medium max-w-sm">{getTranslation(language, 'no_history_desc')}</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 md:pb-4 h-full overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-3xl p-6 shadow-sm mb-6 border border-green-100 mt-2 gap-4">
        <div>
           <h2 className="text-2xl font-bold text-green-800 mb-1 block">{getTranslation(language, 'history_title')}</h2>
           <p className="text-green-700 text-lg font-medium">{getTranslation(language, 'history_desc')}</p>
        </div>
        <button 
          onClick={handleClear}
          className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${confirmDelete ? 'bg-red-600 text-white shadow-lg scale-105' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
        >
          <Trash2 size={24} />
          <span className="text-lg">{confirmDelete ? getTranslation(language, 'are_you_sure') : getTranslation(language, 'clear')}</span>
        </button>
      </div>

      <div className="space-y-8">
        {messages.map(msg => (
          <div key={msg.id} className={`p-6 rounded-[32px] shadow-sm border ${msg.role === 'user' ? 'bg-green-50/50 border-green-200 ml-4 sm:ml-12 rounded-tr-xl' : 'bg-white border-green-100 mr-4 sm:mr-12 rounded-tl-xl'}`}>
            <div className="flex items-center gap-2 font-bold mb-4 pb-3 border-b border-green-100 text-green-800/60 uppercase tracking-widest text-sm">
              {msg.role === 'user' ? '🗣️ VOUS' : '🤖 AGRI-IA'}
              <span className="text-xs font-semibold opacity-70 ml-auto">
                {new Date(msg.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
              </span>
            </div>
            {msg.image && (
              <img src={msg.image} className="max-h-64 rounded-2xl mb-4 border border-green-200 object-cover shadow-sm" />
            )}
            {msg.text && (
              <div className={`whitespace-pre-wrap font-medium text-xl leading-relaxed ${msg.role === 'ai' ? 'text-gray-800' : 'text-green-900'}`}>
                {msg.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
