import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { translations, type UILanguage, type Translations } from '../i18n/translations';

interface LanguageContextType {
  uiLanguage: UILanguage;
  setUILanguage: (lang: UILanguage) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [uiLanguage, setUILanguage] = useLocalStorage<UILanguage>('uiLanguage', 'mg');

  const t = translations[uiLanguage] || translations.en;

  return (
    <LanguageContext.Provider value={{ uiLanguage, setUILanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
