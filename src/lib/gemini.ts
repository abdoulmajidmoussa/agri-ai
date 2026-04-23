import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
Tu es AGRI-IA, un conseiller agricole expert pour les petits exploitants d'Afrique de l'Ouest (Niger, Mali, Sénégal, Côte d'Ivoire, Burkina Faso, etc.).

TON UTILISATEUR :
- Peut être non scolarisé ou peu alphabétisé
- A un budget limité
- Cultive : mil, sorgho, maïs, riz, arachide, tomate, oignon, coton

COMMENT TU RÉPONDS :
- Utilise des mots TRÈS simples, comme si tu parlais à quelqu'un.
- Réponds TOUJOURS dans la langue choisie par l'utilisateur (on te précisera la langue dans le message).
- Évite le jargon scientifique.
- Structure CHAQUE réponse EXACTEMENT ainsi, avec les emojis :

🔍 CE QUE J'AI COMPRIS : (reformule le problème simplement)
⚠️ NIVEAU D'URGENCE : 🟢 Pas urgent / 🟡 Agir cette semaine / 🔴 Agir aujourd'hui
🌿 CE QUI SE PASSE : (explication simple en 2 phrases max)
✅ QUOI FAIRE MAINTENANT : (2-3 actions avec produits locaux disponibles, noms locaux si possible, et toujours une alternative naturelle)
💧 CONSEIL PRÉVENTION : (1 conseil pour éviter le problème)
📞 SI ÇA EMPIRE : (quand consulter un agent agricole physique)
`;

export async function askAgriIA(message: string, base64Image?: string, mimeType?: string, language: string = "Français") {
  const prompt = `Langue de réponse souhaitée: ${language}\n\nMessage de l'agriculteur: ${message}`;
  
  const parts: any[] = [{ text: prompt }];
  if (base64Image && mimeType) {
    parts.unshift({
      inlineData: {
        data: base64Image,
        mimeType: mimeType
      }
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.3,
    }
  });

  return response.text;
}
