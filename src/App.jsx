import React, { useEffect, useState } from "react";
import "./App.css";
import pokeball from "./assets/poke_ball_icon.png";
import PokedexApi from "./api/PokedexApi";
import Pokedex from "./components/pokedex/Pokedex";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const itensPerPage = 40;

	const fetchPokemons = async () => {
		setLoading(true);
		const data = await PokedexApi.getPokemons(
			itensPerPage,
			itensPerPage * currentPage
		).then((res) => res.data);
		const promises = data.results.map(async (pokemon) => {
			return await PokedexApi.get(pokemon.url).then((res) => res.data);
		});

		const results = await Promise.all(promises);
		setPokemons(results);
		setLoading(false);
		setTotalPages(Math.ceil(data.count / itensPerPage));
	};

	const searchPokemon = async (search) => {
		if (!search) {
			return fetchPokemons();
		}

		const result = await PokedexApi.searchPokemon(search).then((res) => {
			return res.data;
		});
		setPokemons([result]);
		setTotalPages(1);
		setCurrentPage(0);
	};

	useEffect(() => {
		fetchPokemons();
	}, [currentPage]);

	return (
		<>
			<img
				className="absolute opacity-20 rotate-45 -translate-x-20 -translate-y-20 -z-10"
				src={pokeball}
			/>
			<div className="container p-8 mx-auto">
				<Header />
				<SearchBar searchPokemon={searchPokemon} />
				<Pokedex pokemons={pokemons} loading={loading} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
			</div>
		</>
	);
}

export default App;
