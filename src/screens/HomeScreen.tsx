import React, { useContext } from 'react';
import { Text } from 'react-native';
import { globalStyles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemon } from '../hooks/usePokemon';
import { PokeReload } from '../components/PokeReload';
import { ThemeContext } from '../context/themeContext';

export const HomeScreen = () => {
  const { simplePokemonList } = usePokemon();
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  console.log('simplePokemonList', simplePokemonList);
  const { top } = useSafeAreaInsets();
  return (
    <>
      <PokeReload />
      <Text
        style={{
          ...globalStyles.title,
          ...globalStyles.globalMargin,
          color: colors.primary,
          top: top + 20,
        }}>
        Pokedex
      </Text>
    </>
  );
};
