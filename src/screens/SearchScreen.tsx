import React, { useContext } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/themeContext';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SearchInput } from '../components/SearchInput';
import { globalStyles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';
import { Dimensions, Platform } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
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
    <View style={{ ...styles.container }}>
      <SearchInput
        styles={{
          width: screenWidth - 40,
          position: 'absolute',
          zIndex: 999,
          top: top + 20,
        }}
      />
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
              paddingBottom: Platform.OS === 'ios' ? top : top + 20,
              marginTop: Platform.OS === 'ios' ? top + 40 : top + 60,
            }}>
            Pokedex
          </Text>
        )}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
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
