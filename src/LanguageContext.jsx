import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage first, then browser language, then default to English
    const savedLanguage = localStorage.getItem('bossfiredme-language')
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0]
    if (translations[browserLang]) {
      return browserLang
    }
    
    return 'en'
  })

  const t = (key, params = {}) => {
    let translation = translations[language][key] || translations['en'][key] || key
    
    // Replace parameters like {year}
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param])
    })
    
    return translation
  }

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage)
      localStorage.setItem('bossfiredme-language', newLanguage)
    }
  }

  useEffect(() => {
    // Update document language attribute
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
