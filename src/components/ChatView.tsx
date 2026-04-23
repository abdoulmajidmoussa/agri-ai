import React, { useState, useRef, useEffect } from 'react';
import { Camera, Send, X, Loader2, Leaf } from 'lucide-react';
import { askAgriIA } from '../lib/gemini';
import { Message, saveMessageToHistory } from '../lib/history';
import { getTranslation } from '../lib/i18n';

export default function ChatView({ language }: { language: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getBase64Data = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSend = async () => {
    if (!inputText.trim() && !imageFile) return;

    let currentInput = inputText;
    if (!currentInput.trim()) {
       if (language === 'Français') currentInput = "Regarde cette photo de ma culture, qu'est-ce qui ne va pas ?";
       else if (language === 'Hausa') currentInput = "Duba wannan hoton shuka ta, menene matsalar?";
       else if (language === 'Wolof') currentInput = "Xoolal nataalu tool bi, lan mooy jafe-jafe bi?";
       else currentInput = "I ka nin jiri foto lajɛ, gɛlɛya jumèn bɛ a la?";
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: currentInput,
      image: imagePreview || undefined,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);
    saveMessageToHistory(newMessage);
    setInputText('');
    setIsLoading(true);

    try {
      let base64Data;
      let mimeType;
      
      if (imageFile) {
        base64Data = await getBase64Data(imageFile);
        mimeType = imageFile.type;
      }

      const responseText = await askAgriIA(currentInput, base64Data, mimeType, language);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: responseText,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      saveMessageToHistory(aiMessage);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: getTranslation(language, 'error'),
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] p-4">
      
      {/* Intro Box if empty */}
      {messages.length === 0 && (
         <div className="bg-white rounded-3xl p-8 shadow-sm mb-4 border border-green-100 flex flex-col items-center text-center mt-auto md:mt-20">
            <div className="bg-green-100 p-5 rounded-full mb-6 text-green-700">
               <Leaf size={64} />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">{getTranslation(language, 'welcome_title')}</h2>
            <p className="text-green-700 text-lg leading-relaxed">
              {getTranslation(language, 'welcome_desc')}
            </p>
         </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-4 scroll-smooth">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
            <div className={`p-5 text-lg rounded-[28px] shadow-sm leading-relaxed ${msg.role === 'user' ? 'bg-green-600 text-white rounded-br-md block' : 'bg-white border border-green-200 text-gray-800 rounded-bl-md'}`}>
              {msg.image && (
                <img src={msg.image} alt="Upload" className="max-w-full h-auto rounded-xl mb-3 border border-green-100 shadow-sm" />
              )}
              {msg.text && (
                 <div className="whitespace-pre-wrap font-medium">
                    {msg.text}
                 </div>
              )}
            </div>
            <span className="text-sm font-bold text-green-700 mt-2 opacity-60 px-2">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="bg-white border border-green-200 text-green-700 p-5 rounded-[28px] rounded-bl-md max-w-[80%] flex items-center gap-4">
            <Loader2 className="animate-spin w-6 h-6" />
            <span className="font-bold text-lg animate-pulse">{getTranslation(language, 'analyzing')}</span>
          </div>
        )}
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="mt-2 relative">
        {imagePreview && (
           <div className="absolute -top-32 left-4 z-10 bg-white p-2 rounded-2xl shadow-lg border border-green-100">
             <div className="relative inline-block w-24">
               <img src={imagePreview} className="w-24 h-24 object-cover rounded-xl" />
               <button 
                 onClick={() => { setImageFile(null); setImagePreview(null); }}
                 className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
               >
                 <X size={18} />
               </button>
             </div>
           </div>
        )}

        <div className="bg-white rounded-[32px] shadow-lg border border-green-100 p-2 flex items-end gap-2 focus-within:ring-4 focus-within:ring-green-100 focus-within:border-green-400 transition-all">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-4 text-green-600 hover:bg-green-50 rounded-full transition-colors flex-shrink-0"
            title="Prendre une photo"
          >
            <Camera size={28} />
          </button>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={getTranslation(language, 'placeholder')}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 resize-none max-h-40 min-h-[56px] py-4 text-lg font-medium text-green-950 placeholder-green-700/50"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <button 
            onClick={handleSend}
            disabled={!inputText.trim() && !imageFile || isLoading}
            className="p-4 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-green-200 disabled:text-green-50/50 transition-colors flex-shrink-0 shadow-md"
            title="Envoyer"
          >
            <Send size={28} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
