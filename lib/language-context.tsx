'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Lang = 'en' | 'ru' | 'es'

type LanguageContextType = {
  language: Lang
  setLanguage: (l: Lang) => void
  t: (key: string, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const TRANSLATIONS: Record<
  Lang,
  Record<string, string>
> = {
  en: {
    'search.placeholder': 'Search topics, skills, and more',
    'auth.signIn': 'Sign in',
    'auth.signUp': 'Sign Up',
    'auth.signedInAs': 'Signed in as',
    'auth.signOut': 'Sign out',
    'nav.games': 'Games',
    'nav.proxies': 'Proxies',
    'nav.apps': 'Apps',
    'mobile.searchPlaceholder': 'Search...',
  },
  ru: {
    'search.placeholder': 'Искать темы, навыки и другое',
    'auth.signIn': 'Войти',
    'auth.signUp': 'Регистрация',
    'auth.signedInAs': 'Вошёл как',
    'auth.signOut': 'Выйти',
    'nav.games': 'Игры',
    'nav.proxies': 'Прокси',
    'nav.apps': 'Приложения',
    'mobile.searchPlaceholder': 'Поиск...',
  },
  es: {
    'search.placeholder': 'Buscar temas, habilidades y más',
    'auth.signIn': 'Iniciar sesión',
    'auth.signUp': 'Regístrate',
    'auth.signedInAs': 'Conectado como',
    'auth.signOut': 'Cerrar sesión',
    'nav.games': 'Juegos',
    'nav.proxies': 'Proxies',
    'nav.apps': 'Aplicaciones',
    'mobile.searchPlaceholder': 'Buscar...',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('lang')
      if (stored === 'ru' || stored === 'es' || stored === 'en') return stored
      // fallback from browser
      const nav = navigator.language || navigator.userLanguage || 'en'
      if (nav.startsWith('ru')) return 'ru'
      if (nav.startsWith('es')) return 'es'
      return 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', language)
    } catch {}
  }, [language])

  const t = useMemo(
    () => (key: string, fallback?: string) => {
      const dict = TRANSLATIONS[language] || TRANSLATIONS.en
      return dict[key] ?? fallback ?? key
    },
    [language],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
