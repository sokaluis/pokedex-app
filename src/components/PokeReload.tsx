/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { usePokemon } from '../hooks/usePokemon';
import { globalStyles } from '../theme/appTheme';
import { ThemeContext } from '../context/themeContext';

export const PokeReload = () => {
  const { isLoading } = usePokemon();
  const { theme } = useContext(ThemeContext);
  const initialRage = useRef(new Animated.Value(0)).current;
  const animation = useRef(
    Animated.timing(initialRage, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).current;

  useEffect(() => {
    if (isLoading) {
      animation.start();
    } else {
      animation.stop();
      initialRage.setValue(0);
    }
    return () => animation.stop();
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