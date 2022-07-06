import React, { useEffect, useState } from "react";
import "./App.css";
import pokeball from "./assets/poke_ball_icon.png";
import PokedexApi from "./api/PokedexApi";
import Pokedex from "./components/Pokedex/Pokedex";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchPokemons = async () => {
		setLoading(true);
		const data = await PokedexApi.getPokemons().then((res) => res.data);
		console.log(data);
		const promises = data.results.map(async (pokemon) => {
			return await PokedexApi.get(pokemon.url).then((res) => res.data);
		});
		console.log(promises);

		const results = await Promise.all(promises);
		console.log(results);
		setPokemons(results);
		setLoading(false);
	};

	const searchPokemon = async (search) => {
		const result = await PokedexApi.searchPokemon(search).then((res) => {
			return res.data;
		});
		setPokemons([result]);
	};

	useEffect(() => {
		fetchPokemons();
	}, []);

	return (
		<>
			<img
				className="absolute opacity-20 rotate-45 -translate-x-20 -translate-y-20 -z-10"
				src={pokeball}
			/>
			<div className="container p-8 mx-auto">
				<Header />
				<SearchBar searchPokemon={searchPokemon} />
				<Pokedex pokemons={pokemons} />
			</div>
		</>
	);
}

export default App;
