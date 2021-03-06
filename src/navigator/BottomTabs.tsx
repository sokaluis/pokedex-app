import React, { useContext } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeContext } from '../context/themeContext';
import { Tab1Screen } from './Tab1Screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Tab2Screen } from './Tab2Screen';

export type RootTabParams = {
  Pokedex: undefined;
  SearchScreen: undefined;
};

const Tab = createBottomTabNavigator<RootTabParams>();

export const BottomTabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: {
          marginBottom: 5,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: theme.colors.card,
          height: Platform.OS === 'android' ? 60 : 50,
          borderWidth: 0,
          elevation: 0,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: theme.colors.background,
      }}>
      <Tab.Screen
        name="Pokedex"
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({ color }) => (
            <Icon name="list-outline" size={25} color={color} />
          ),
        }}
        component={Tab1Screen}
      />
      <Tab.Screen
        name="SearchScreen"
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Icon name="search-outline" size={25} color={color} />
          ),
        }}
        component={Tab2Screen}
      />
    </Tab.Navigator>
  );
};
