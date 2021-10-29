import React from 'react';
import 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/themeContext';
import StackNavigator from './src/navigator/StackNavigator';

interface AppStateProps {
  children: JSX.Element | JSX.Element[];
}

const AppState = ({ children }: AppStateProps) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const App = () => {
  return (
    <AppState>
      <StackNavigator />
    </AppState>
  );
};

export default App;
