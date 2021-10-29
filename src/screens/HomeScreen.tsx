import React, { useContext } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { globalStyles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokeReload } from '../components/PokeReload';
import { ThemeContext } from '../context/themeContext';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {
  const { simplePokemonList, loadPokemons } = usePokemonList();
  const {
    theme: { dividerColor, colors },
  } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  return (
    <>
      <PokeReload />
      <View style={{ ...styles.cardsContainer }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={() => (
            <Text
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                color: colors.primary,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: top,
              }}>
              Pokedex
            </Text>
          )}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          // Inifinite Scroll
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            <ActivityIndicator
              style={{ ...styles.activityIndicator }}
              size={20}
              color={dividerColor}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    height: 200,
  },
  cardsContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
