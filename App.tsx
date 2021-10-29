import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import { ThemeProvider, ThemeContext } from './src/context/themeContext';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';

interface AppStateProps {
  children: JSX.Element | JSX.Element[];
}

const AppState = ({ children }: AppStateProps) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <AppState>
      <NavigationContainer theme={theme}>
        <StackNavigator />
      </NavigationContainer>
    </AppState>
  );
};

export default App;
