import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from '../context/themeContext';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemon';
import { Color } from '../hooks/useImageColor';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: { pokemon: SimplePokemon; color: Color };
};

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
