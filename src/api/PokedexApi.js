import axios from "axios";
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

const pokedex = axios.create({
	baseURL: "https://pokeapi.co/api/v2/",
});

const PokedexApi = {
	getPokemons(limit, offset) {
		return pokedex.get(`pokemon?limit=${limit}&offset=${offset}`);
	},

	searchPokemon(name) {
		return pokedex.get(`pokemon/${name}`);
	},

	get(url) {
		return axios.get(url);
	}
};

export default PokedexApi;
