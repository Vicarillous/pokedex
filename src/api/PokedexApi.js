import axios from "axios";

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
