import React, { useState } from 'react';
import { Bug, Droplets, Sun, ChevronDown, ChevronUp, Droplet } from 'lucide-react';
import { getTranslation } from '../lib/i18n';

const COMMON_PROBLEMS = [
  {
    id: 1,
    title: "Chenille Légionnaire (Maïs, Sorgho)",
    icon: <Bug className="text-red-500" size={36} />,
    symptoms: "Feuilles trouées, présence d'excréments (comme de la sciure) au cœur de la plante. Les jeunes plants sont très vite détruits.",
    action: "Verser un mélange d'eau, de savon noir et de piment dans le cornet du maïs. La cendre de bois dans le cornet marche aussi très bien.",
    prevention: "Plantez tôt. Sarclez régulièrement pour enlever les mauvaises herbes qui attirent les insectes."
  },
  {
    id: 2,
    title: "Mildiou ou Champignon (Tomates, Oignons)",
    icon: <Droplets className="text-blue-500" size={36} />,
    symptoms: "Grandes taches brunes ou noires sur les feuilles et les fruits. Pourriture rapide pendant la saison des pluies.",
    action: "Arrachez et brûlez très loin du champ les plantes malades. N'utilisez pas ces plantes pour le compost.",
    prevention: "Espacez bien les plantes pour que le vent passe. Arrosez le matin au pied, ne mouillez JAMAIS les feuilles."
  },
  {
    id: 3,
    title: "Sécheresse et Coup de chaleur",
    icon: <Sun className="text-yellow-600" size={36} />,
    symptoms: "Les feuilles s'enroulent sur elles-mêmes l'après-midi. La plante jaunit et ne grandit plus.",
    action: "Arrosez beaucoup très tôt le matin ou très tard le soir (quand le soleil est couché).",
    prevention: "Mettez de la paille ou des herbes sèches (paillage) autour du pied des plantes. Cela garde la terre humide plus longtemps."
  },
  {
    id: 4,
    title: "Nématodes (Racines pourries)",
    icon: <Droplet className="text-orange-500" size={36} />,
    symptoms: "La plante est naine, les feuilles sont jaunes. Si on l'arrache, les racines ont des boules (galles).",
    action: "Il faut arracher et détruire les racines. Ne plus replanter la même chose à cet endroit.",
    prevention: "Faites la rotation des cultures (changez ce que vous plantez chaque année). Le coton ou l'arachide résistent bien."
  }
];

export default function ProblemsView({ language }: { language: string }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="p-4 pb-24 md:pb-4 h-full overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 border border-green-100 mt-2">
        <h2 className="text-2xl font-bold text-green-800 mb-2">{getTranslation(language, 'problems_title')}</h2>
        <p className="text-green-700 text-lg font-medium">{getTranslation(language, 'problems_desc')}</p>
      </div>

      <div className="space-y-4">
        {COMMON_PROBLEMS.map(prob => (
          <div key={prob.id} className="bg-white border text-left border-green-200 rounded-3xl overflow-hidden shadow-sm transition-all">
            <button 
              className="w-full flex items-center justify-between p-5 focus:outline-none hover:bg-green-50/50"
              onClick={() => setExpandedId(expandedId === prob.id ? null : prob.id)}
            >
              <div className="flex items-center gap-5">
                <div className="bg-green-50 p-4 rounded-2xl border border-green-100 shadow-sm shrink-0">
                  {prob.icon}
                </div>
                <h3 className="font-bold text-xl md:text-2xl text-green-900 text-left leading-tight">{prob.title}</h3>
              </div>
              {expandedId === prob.id ? <ChevronUp className="text-green-600 shrink-0 ml-2" size={32} /> : <ChevronDown className="text-green-600 shrink-0 ml-2" size={32} />}
            </button>
            
            {expandedId === prob.id && (
              <div className="px-5 pb-6 pt-4 border-t border-green-100 bg-green-50/30 text-lg leading-relaxed space-y-5">
                <div className="bg-white p-4 rounded-2xl border border-gray-100">
                  <span className="font-bold text-gray-900 block mb-2 text-xl flex items-center gap-2">{getTranslation(language, 'symptoms')}</span>
                  <p className="text-gray-700 font-medium">{prob.symptoms}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-green-100">
                  <span className="font-bold text-green-800 block mb-2 text-xl flex items-center gap-2">{getTranslation(language, 'todo')}</span>
                  <p className="text-green-800 font-medium">{prob.action}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-blue-100">
                  <span className="font-bold text-blue-800 block mb-2 text-xl flex items-center gap-2">{getTranslation(language, 'prevention')}</span>
                  <p className="text-blue-800 font-medium">{prob.prevention}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
