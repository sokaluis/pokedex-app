import { Theme } from '@react-navigation/native';

type ThemeActions = { type: 'SET_LIGHT_THEME' } | { type: 'SET_DARK_THEME' };

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
  dividerColor: string;
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dividerColor: 'rgba(0,0,0,0.4)',
  dark: false,
  colors: {
    primary: '#084F64',
    background: 'white',
    card: 'white',
    text: 'black',
    border: 'black',
    notification: 'teal',
  },
};

export const darkTheme: ThemeState = {
  currentTheme: 'dark',
  dividerColor: 'rgba(255,255,255,0.6)',
  dark: true,
  colors: {
    primary: '#75CEDB',
    background: 'black',
    card: 'black',
    text: 'white',
    border: 'white',
    notification: 'teal',
  },
};

export const ThemeReducer = (
  state: ThemeState,
  action: ThemeActions,
): ThemeState => {
  switch (action.type) {
    case 'SET_LIGHT_THEME':
      return { ...lightTheme };
    case 'SET_DARK_THEME':
      return { ...darkTheme };

    default:
      return { ...state };
  }
};
