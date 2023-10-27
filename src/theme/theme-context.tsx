'use client';

import { createContext, Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import ThemeEnum from '@/theme/theme-enum';
import light from '@/theme/light';
import dark from '@/theme/dark';

export interface ThemeContextData {
  themeName: ThemeEnum;
  setThemeName: Dispatch<SetStateAction<ThemeEnum>>;
}

const defaultValue: ThemeContextData = {
  themeName: ThemeEnum.light,
  setThemeName: () => {},
};

export const ThemeContext = createContext<ThemeContextData>(defaultValue);

interface ThemeProviderProps {
  themeName: ThemeEnum;
  children: ReactElement | ReactElement[];
}

export function ThemeProvider(props: ThemeProviderProps) {
  const [themeName, setThemeName] = useState(props.themeName);
  const themes = { light, dark };
  const theme = themes[themeName];

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <MuiThemeProvider theme={theme}>
        {props.children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
