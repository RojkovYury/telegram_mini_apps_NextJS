'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import i18next from 'i18next';
import init from './init';
import { Lang } from './enum';

export interface LocaleContextData {
  lang: Lang;
  setLang: (params: Lang) => void;
}

const defaultValue: LocaleContextData = {
  lang: Lang.ru,
  setLang: () => {},
};

const LocaleContext = createContext<LocaleContextData>(defaultValue);

interface LangProviderProps {
  lang: Lang;
  children: ReactNode;
}

export function LocaleProvider(props: LangProviderProps) {
  const [lang, setLang] = useState<Lang>(props.lang);
  init(lang);

  const value = useMemo(
    () => ({
      lang,
      setLang: (newLang: Lang) => {
        i18next.changeLanguage(newLang);
        setLang(newLang);
        // setServerLang(newLang);
        document.documentElement.lang = newLang;
      },
    }),
    [lang],
  );

  return (
    <LocaleContext.Provider value={value} key={lang}>
      {props.children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  return useContext(LocaleContext);
}
