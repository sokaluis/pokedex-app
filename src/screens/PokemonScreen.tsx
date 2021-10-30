import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Tab1Screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({
  route: {
    params: { color, pokemon },
  },
  navigation,
}: Props) => {
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const { name, id, url } = pokemon;
  const { pokemon: pokemonInfo, isLoading } = usePokemon({ id });
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
          height: height * 0.45,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ ...styles.backButton, top: top + 5 }}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>
        <Text style={{ ...styles.pokemonName, top: top + 40 }}>{name}</Text>
        <Text style={{ ...styles.pokemonName, top: top + 40 }}>#{id}</Text>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={{ ...styles.pokeball, bottom: height * 0.015 }}
        />
        <FadeInImage uri={url} style={{ ...styles.pokemonImage }} />
      </View>
      {isLoading ? (
        <View style={{ ...styles.loading }}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonInfo} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    textTransform: 'capitalize',
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
