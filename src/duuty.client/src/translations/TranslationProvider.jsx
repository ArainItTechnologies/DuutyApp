import { useState, useEffect, useCallback  } from "react";
import { TranslationContext } from "./TranslationContext";
import { getTranslations } from "./SupportedLanguages";
import { useAppState } from "../hooks/Hooks";

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "en";
  });

  const [translations, setTranslations] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);
  const {setIsLoading} = useAppState();
  
  const changeLanguage = useCallback(async (newLanguage) => {
    if (newLanguage === language && isInitialized) {
      return;
    }

    setIsLoading(true);
    
    try {
      const loadedTranslations = await getTranslations(newLanguage);
      
      // Update state in the correct order
      setTranslations(loadedTranslations);
      setLanguage(newLanguage);
      
      // Persist to localStorage
      localStorage.setItem("selectedLanguage", newLanguage);
      
      setIsLoading(false);
      setIsInitialized(true);
      
      // Optional: Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: newLanguage, translations: loadedTranslations }
      }));
      
    } catch (error) {
      console.error("Error loading translations:", error);
      setIsLoading(false);
    }
  }, [language, isInitialized]);

  // Load translations on mount and when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      
      try {
        const loadedTranslations = await getTranslations(language);
        setTranslations(loadedTranslations);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error loading translations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []); // Only run on mount

  // Enhanced translate function with better error handling
  const t = useCallback((key, placeholders = {}) => {
    if (!translations || Object.keys(translations).length === 0) {
      return key; // Return key if translations aren't loaded
    }

    const keys = key.split(".");
    let translation = keys.reduce((obj, k) => obj?.[k], translations);
    
    // If translation not found, return the key
    if (translation === undefined || translation === null) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    // Handle placeholders
    if (typeof translation === 'string') {
      Object.keys(placeholders).forEach((placeholder) => {
        translation = translation.replace(
          new RegExp(`{{${placeholder}}}`, 'g'),
          placeholders[placeholder]
        );
      });
    }

    return translation;
  }, [translations]);

  // Enhanced context value with additional utilities
  const contextValue = {
    t,
    language,
    setLanguage: changeLanguage, // Use the enhanced function
    isInitialized,
    translations, // Expose translations for debugging
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};