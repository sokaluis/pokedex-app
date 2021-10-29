// Generated by https://quicktype.io

export interface PokemonPaginatedResponse {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface SimplePokemon extends Pokemon {
  id: string;
  color?: string;
}
