export interface Message {
  id: string;
  role: 'user' | 'ai';
  text?: string;
  image?: string;
  timestamp: number;
}

const STORAGE_KEY = 'agri_ia_history';

export function saveMessageToHistory(msg: Message) {
  try {
    const existing = getHistory();
    existing.push(msg);
    // Keep only last 50 messages to avoid localstorage quota issues
    const trimmed = existing.slice(-50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch(e) {
    console.error("Local storage error:", e);
  }
}

export function getHistory(): Message[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch(e) {
    return [];
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch(e) {
    console.error("Local storage error:", e);
  }
}
