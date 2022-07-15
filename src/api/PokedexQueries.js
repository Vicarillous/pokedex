import { gql } from "@apollo/client";

export const GET_POKEMONS_BY_NAME = gql`
	query Pokemons($name: String!, $limit: Int, $offset: Int) {
		pokemon_v2_pokemon_aggregate(where: { name: { _regex: $name } }) {
			aggregate {
				count
			}
		}
		pokemon_v2_pokemon(
			where: { name: { _regex: $name } }
			limit: $limit
			offset: $offset
		) {
			id
		}
	}
`;

export const GET_POKEMONS_BY_ID = gql`
	query Pokemons($id: Int!, $limit: Int, $offset: Int) {
		pokemon_v2_pokemon_aggregate(where: { id: { _eq: $id } }) {
			aggregate {
				count
			}
		}
		pokemon_v2_pokemon(
			where: { id: { _eq: $id } }
			limit: $limit
			offset: $offset
		) {
			id
		}
	}
`;