import { useState, useEffect } from "react";
import { TranslationContext } from "./TranslationContext";
import { getTranslations } from "./SupportedLanguages";

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); 
  const [translations, setTranslations] = useState({});
  const [languageLoading, setLanguageLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setLanguageLoading(true);
      const loadedTranslations = await getTranslations(language);
      setTranslations(loadedTranslations);
      setLanguageLoading(false);
    };

    loadTranslations();
  }, [language]);

  // Translate function
  const t = (key, placeholders = {}) => {
    const keys = key.split(".");
    let translation = keys.reduce((obj, k) => obj?.[k], translations) || key;

    Object.keys(placeholders).forEach((placeholder) => {
      translation = translation.replace(
        `{{${placeholder}}}`,
        placeholders[placeholder]
      );
    });
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage, languageLoading }}>
      {children}
    </TranslationContext.Provider>
  );
};