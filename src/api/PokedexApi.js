import axios from "axios";

const pokedex = axios.create({
	baseURL: "https://pokeapi.co/api/v2/",
});

const PokedexApi = {
	getPokemons() {
		return pokedex.get("pokemon?limit=50&offset=0");
	},

	getPokemon(name) {
		return pokedex.get(`pokemon/${name}`);
	},

	get(url) {
		return axios.get(url);
	},
};

export default PokedexApi;
