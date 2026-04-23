export const translations = {
  Français: {
    tab_chat: "Conseil",
    tab_problems: "Maladies",
    tab_history: "Historique",
    welcome_title: "Bienvenue sur AGRI-IA",
    welcome_desc: "Votre conseiller agricole gratuit. Décrivez votre problème ou envoyez une photo de votre plante.",
    placeholder: "Quel est le problème avec votre culture ?",
    analyzing: "AGRI-IA analyse...",
    problems_title: "Problèmes Courants",
    problems_desc: "Découvrez comment soigner rapidement les maladies les plus fréquentes de vos champs.",
    history_title: "Historique Hors Ligne",
    history_desc: "Relisez vos derniers échanges.",
    no_history: "Aucun historique",
    no_history_desc: "Vos anciennes conversations avec AGRI-IA s'afficheront ici. Idéal pour relire les conseils sans internet !",
    clear: "Effacer",
    are_you_sure: "Êtes-vous sûr ?",
    symptoms: "🌿 Symptômes",
    todo: "✅ Quoi faire",
    prevention: "💧 Prévention",
    error: "❌ Une erreur s'est produite. Veuillez réessayer ou vérifier votre connexion internet."
  },
  Hausa: {
    tab_chat: "Shawara",
    tab_problems: "Cututtuka",
    tab_history: "Tarihi",
    welcome_title: "Barka da zuwa AGRI-IA",
    welcome_desc: "Malamin aikin gonarku na kyauta. Kwatanta matsalar ku, ba sai da hoto ba, ko aika hoto in kuna so.",
    placeholder: "Kwatanta matsalar ku a gona...",
    analyzing: "AGRI-IA na dubawa...",
    problems_title: "Matsaloli gama gari",
    problems_desc: "Koyi yadda ake magance yawan cututtukan amfanin gona da gaggawa.",
    history_title: "Tarihin Tambayoyi",
    history_desc: "Sake karanta tattaunawar ku na karshe.",
    no_history: "Babu tarihi",
    no_history_desc: "Tsoffin tattaunawarku za su bayyana a nan don karantawa ba tare da intanet ba!",
    clear: "Share",
    are_you_sure: "Ka tabbata?",
    symptoms: "🌿 Alamomi",
    todo: "✅ Abin da za a yi",
    prevention: "💧 Kariya",
    error: "❌ An sami kuskure. Da fatan za a sake gwadawa..."
  },
  Wolof: {
    tab_chat: "Ndimbal",
    tab_problems: "Feebar yi",
    tab_history: "Li weesu",
    welcome_title: "Dalal jamm ci AGRI-IA",
    welcome_desc: "Sa ndimbal ci mbay mi. Waxal sa jafe-jafe, doo soxla nataal(photo) ci doole, walla yónnee ko bu neexee.",
    placeholder: "Léral sa jafe-jafe tool bi...",
    analyzing: "AGRI-IA mungiy xool...",
    problems_title: "Jafe-jafe yi bari",
    problems_desc: "Xam nan lay faje feebari mbay yi bu gaaw.",
    history_title: "Li weesu ba tày",
    history_desc: "Jàngaat li nga laajoon.",
    no_history: "Amul dara li weesu",
    no_history_desc: "Sa waxtaan yàgg dinañu feeñ fii. Ngir nga mën leen jàngaat te amul internet!",
    clear: "Dindi",
    are_you_sure: "Wóor na la?",
    symptoms: "🌿 Mandarga yi",
    todo: "✅ Li nga wara def",
    prevention: "💧 Aar sa tool",
    error: "❌ Amna lu jàdd. Jëmaatal waat..."
  },
  Bambara: {
    tab_chat: "Ladili",
    tab_problems: "Banaw",
    tab_history: "Tariku",
    welcome_title: "I ni cɛ AGRI-IA la",
    welcome_desc: "I ka sɛnɛkɛladilila gansan. I ka gɛlɛya ɲɛfɔ, foto wajibiyalen tɛ, walima i ka jiri foto ci.",
    placeholder: "I ka sɛnɛ gɛlɛya ɲɛfɔ yan...",
    analyzing: "AGRI-IA bɛ kɔrɔbɔliw kɛ...",
    problems_title: "Gɛlɛya teliya",
    problems_desc: "Aw bɛ se ka banaw furakɛ cogo min na joona.",
    history_title: "Kuma kɔrɔw",
    history_desc: "I ka kuma kɔrɔw kalan.",
    no_history: "Tariku tɛ",
    no_history_desc: "kuma kɔrɔw bɛna yira yan k'a kalan internet tɛ.",
    clear: "A jɔshi",
    are_you_sure: "I la dalen bɛ a la wa?",
    symptoms: "🌿 Tɔgɔw",
    todo: "✅ Mun bɛ kɛ",
    prevention: "💧 Tangali",
    error: "❌ Fili dɔ kɛra. Aw ye a nini ka lajɛ tugun..."
  }
};

export type Language = 'Français' | 'Hausa' | 'Wolof' | 'Bambara';

export function getTranslation(lang: string, key: keyof typeof translations['Français']): string {
  const dict = translations[lang as Language] || translations['Français'];
  return dict[key] || translations['Français'][key] || "";
}
