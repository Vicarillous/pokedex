import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import pokeball from "./assets/poke_ball_icon.png";
import PokedexApi from "./api/PokedexApi";
import Pokedex from "./components/pokedex/Pokedex";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 40;

	const totalCount = useRef(0);

	const fetchPokemons = async () => {
		if (isSearch) {
			return null
		}

		setLoading(true);
		const data = await PokedexApi.getPokemons(
			itemsPerPage,
			itemsPerPage * currentPage
		).then((res) => res.data);
		totalCount.current = data.count;
		const promises = data.results.map(async (pokemon) => {
			return await PokedexApi.get(pokemon.url).then((res) => res.data);
		});

		const results = await Promise.all(promises);
		setPokemons(results);
		setLoading(false);
		setTotalPages(Math.ceil(data.count / itemsPerPage));
	};

	const searchPokemon = async (search) => {
		setIsSearch(true);
		if (!search) {
			setIsSearch(false);
			return fetchPokemons();
		}
		setLoading(true);

		const result = await PokedexApi.searchPokemon(search).then((res) => {
			return res.data;
		});
		setPokemons([result]);
		setCurrentPage(0);
		setTotalPages(1);
		
		setLoading(false);
	};

	useEffect(() => {
		fetchPokemons();
	}, [currentPage, isSearch]);

	return (
		<>
			<img
				className="absolute opacity-20 rotate-45 -translate-x-20 -translate-y-20 -z-10"
				src={pokeball}
			/>
			<div className="container p-8 mx-auto">
				<Header />
				<SearchBar searchPokemon={searchPokemon} />
				<Pokedex pokemons={pokemons} loading={loading} currentPage={currentPage} totalPages={totalPages} itemsPerPage={itemsPerPage} totalCount={totalCount.current} setCurrentPage={setCurrentPage} />
			</div>
		</>
	);
}

export default App;
