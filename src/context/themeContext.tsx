import React, { createContext, useEffect, useReducer } from 'react';
import { Appearance, AppState } from 'react-native';
import {
  lightTheme,
  ThemeReducer,
  ThemeState,
  darkTheme,
} from './themeReducer';

interface ThemeContextProps {
  theme: ThemeState;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}
interface ThemeProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, dispatch] = useReducer(
    ThemeReducer,
    Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme,
  );
  const setDarkTheme = () => {
    dispatch({ type: 'SET_DARK_THEME' });
  };
  const setLightTheme = () => {
    dispatch({ type: 'SET_LIGHT_THEME' });
  };

  useEffect(() => {
    AppState.addEventListener('change', status => {
      if (status === 'active') {
        Appearance.getColorScheme() === 'light'
          ? setLightTheme()
          : setDarkTheme();
      }
    });
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, setDarkTheme, setLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
