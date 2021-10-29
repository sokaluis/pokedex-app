/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokeApi';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
  Pokemon,
} from '../interfaces/pokemon';

export const usePokemon = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const nexPageUrl = useRef('https://pokeapi.co/api/v2/pokemon/?limit=40');

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nexPageUrl.current,
    );
    nexPageUrl.current = resp.data.next;
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

    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    simplePokemonList,
    isLoading,
    loadPokemons,
  };
};
