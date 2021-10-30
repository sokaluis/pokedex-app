/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/themeContext';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SearchInput } from '../components/SearchInput';
import { globalStyles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';
import { Dimensions, Platform } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemon';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  if (isFetching) {
    return (
      <View style={{ ...styles.fetchingComponent }}>
        <ActivityIndicator size={50} color="grey" />
        <Text>Fetching...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...styles.container }}>
        <SearchInput
          onDebounce={setTerm}
          styles={{
            width: screenWidth - 40,
            position: 'absolute',
            zIndex: 999,
            top: top + 20,
          }}
        />
        <FlatList
          data={pokemonFiltered}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={() => (
            <Text
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                color: colors.primary,
                paddingBottom: Platform.OS === 'ios' ? top : top + 20,
                marginTop: top + 80,
              }}>
              {term}
            </Text>
          )}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  fetchingComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
