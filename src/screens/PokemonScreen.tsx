import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/StackNavigator';
import { FadeInImage } from '../components/FadeImage';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({
  route: {
    params: { color, pokemon },
  },
}: Props) => {
  const { name, url } = pokemon;
  return (
    <View style={{ backgroundColor: color, flex: 1 }}>
      <Text>{name}</Text>
      <FadeInImage uri={url} style={{ width: 100, height: 100 }} />
    </View>
  );
};
