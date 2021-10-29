/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { usePokemonList } from '../hooks/usePokemonList';
import { globalStyles } from '../theme/appTheme';
import { ThemeContext } from '../context/themeContext';

export const PokeReload = () => {
  const { isLoading } = usePokemonList();
  const { theme } = useContext(ThemeContext);
  const initialRage = useRef(new Animated.Value(0)).current;
  const animTime = useRef(5000).current;
  const animation = useRef(
    Animated.timing(initialRage, {
      toValue: 1,
      duration: animTime,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).current;

  useEffect(() => {
    if (isLoading) {
      animation.start();
    } else {
      setTimeout(() => {
        animation.stop();
        initialRage.setValue(0);
      }, animTime);
    }
    // return () => animation.stop();
  }, [isLoading, animation]);

  const spin = initialRage.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <Animated.Image
      source={
        theme.dark
          ? require('../assets/pokebola-blanca.png')
          : require('../assets/pokebola.png')
      }
      style={{
        ...globalStyles.pokeballBG,
        transform: [{ rotate: spin }, { perspective: 1000 }],
      }}
    />
  );
};
