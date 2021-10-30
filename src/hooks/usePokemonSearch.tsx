/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/pokeApi';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
  Pokemon,
} from '../interfaces/pokemon';

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const loadPokemons = async () => {
    setIsFetching(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon/?limit=1200',
    );
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Pokemon[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        url: picture,
        name,
      };
    });

    setSimplePokemonList([...newPokemonList]);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    simplePokemonList,
    isFetching,
    loadPokemons,
  };
};
