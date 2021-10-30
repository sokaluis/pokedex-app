import React from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { PokemonFull } from '../interfaces/pokemon';
import { FadeInImage } from './FadeImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {
  const { height } = useWindowDimensions();
  return (
    <ScrollView
      style={{ ...StyleSheet.absoluteFillObject }}
      showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.container, marginTop: height * 0.5 }}>
        <Text style={{ ...styles.title }}>Types</Text>
        <View style={styles.regularTextContainer}>
          {!!pokemon.types &&
            pokemon.types.map(({ type }) => (
              <Text key={type.name} style={{ ...styles.regularText }}>
                {type.name}
              </Text>
            ))}
        </View>
        <Text style={{ ...styles.title }}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight} lb</Text>
        <Text />
      </View>
      <View style={{ ...styles.container }}>
        <Text style={styles.title}>Sprites</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {!!pokemon.sprites && (
            <FadeInImage
              uri={pokemon.sprites.front_default}
              style={styles.basicSprite}
            />
          )}
          {!!pokemon.sprites && (
            <FadeInImage
              uri={pokemon.sprites.back_default}
              style={styles.basicSprite}
            />
          )}
          {!!pokemon.sprites && (
            <FadeInImage
              uri={pokemon.sprites.front_shiny}
              style={styles.basicSprite}
            />
          )}
          {!!pokemon.sprites && (
            <FadeInImage
              uri={pokemon.sprites.back_shiny}
              style={styles.basicSprite}
            />
          )}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={{ ...styles.title }}>Abilities</Text>
        <View style={styles.regularTextContainer}>
          {!!pokemon.abilities &&
            pokemon.abilities.map(({ ability }) => (
              <Text key={ability.name} style={{ ...styles.regularText }}>
                {ability.name}
              </Text>
            ))}
        </View>
      </View>
      <View style={styles.container}>
        <Text style={{ ...styles.title }}>Moves</Text>
        <View
          style={{ ...styles.regularTextContainer, ...styles.regularMoves }}>
          {!!pokemon.moves &&
            pokemon.moves.map(({ move }) => (
              <Text key={move.name} style={{ ...styles.regularText }}>
                {move.name}
              </Text>
            ))}
        </View>
      </View>
      <View style={styles.container}>
        <Text style={{ ...styles.title }}>Moves</Text>
        <View
          style={{ ...styles.regularTextContainer, ...styles.regularStats }}>
          {!!pokemon.stats &&
            pokemon.stats.map((item, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  key={item.stat.name + index}
                  style={{ ...styles.regularText }}>
                  {item.stat.name}
                </Text>
                <Text
                  key={item.base_stat + index}
                  style={{ ...styles.regularText }}>
                  {item.base_stat}
                </Text>
              </View>
            ))}
        </View>
      </View>
      <View style={{ marginBottom: 80, alignItems: 'center' }}>
        {!!pokemon.sprites && (
          <FadeInImage
            uri={pokemon.sprites.front_female}
            style={styles.basicSprite}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  regularTextContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  regularText: {
    fontSize: 19,
    marginRight: 10,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
  regularMoves: {
    flexWrap: 'wrap',
  },
  regularStats: {
    flexDirection: 'column',
  },
});
