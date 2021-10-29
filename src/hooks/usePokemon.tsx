/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { PokemonFull } from '../interfaces/pokemon';
import { pokemonApi } from '../api/pokeApi';

interface Props {
  id: string;
}

export const usePokemon = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}/`,
    );

    setPokemon(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};
