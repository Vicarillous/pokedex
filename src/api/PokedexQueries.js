import { gql } from "@apollo/client";

export const GET_POKEMONS_BY_NAME = gql`
	query Pokemons($name: String!) {
		pokemon_v2_pokemon(where: { name: { _regex: $name } }) {
			id
		}
	}
`;

export const GET_POKEMONS_BY_ID = gql`
	query Pokemons($id: Int!) {
		pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
			id
		}
	}
`;