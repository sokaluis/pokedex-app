import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext, ThemeProvider } from './src/context/themeContext';
import { BottomTabNavigator } from './src/navigator/BottomTabs';

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
        <BottomTabNavigator />
      </NavigationContainer>
    </AppState>
  );
};

export default App;
