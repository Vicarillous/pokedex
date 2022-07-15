import React, { useEffect, useState, useRef } from "react";
import { useLazyQuery } from "@apollo/client";

import "App.css";
import pokeball from "assets/poke_ball_icon.png";
import { GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_ID } from "api/PokedexQueries";
import PokedexApi from "api/PokedexApi";
import Pokedex from "components/pokedex/Pokedex";
import Header from "components/Header";
import SearchBar from "components/SearchBar";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(
		parseInt(sessionStorage.getItem("currentPage")) || 0
	);
	const [notFound, setNotFound] = useState(false);
	const itemsPerPage = 40;

	const [getPokemonsByName] = useLazyQuery(GET_POKEMONS_BY_NAME);
	const [getPokemonsById] = useLazyQuery(GET_POKEMONS_BY_ID);

	const totalCount = useRef(0);

	const fetchPokemons = async () => {
		if (isSearch) {
			return null;
		}

		try {
			setIsLoading(true);
			const data = await PokedexApi.getPokemons(
				itemsPerPage,
				itemsPerPage * currentPage
			).then((res) => res.data);
			totalCount.current = data.count;
			const promises = data.results.map(async (pokemon) => {
				return await PokedexApi.get(pokemon.url).then(
					(res) => res.data
				);
			});

			const results = await Promise.all(promises);
			setPokemons(results);
			setIsLoading(false);
			setTotalPages(Math.ceil(data.count / itemsPerPage));
		} catch (e) {
			console.log(e);
		}
	};

	const searchPokemon = async (search) => {
		setNotFound(false);
		setIsSearch(true);

		if (!search) {
			setIsSearch(false);
			return fetchPokemons();
		}

		setIsLoading(true);

		search = search.toLowerCase();
		let searchData;

		if (isNaN(search)) {
			searchData = await getPokemonsByName({
				variables: { name: search },
			}).then((res) => res.data.pokemon_v2_pokemon);
		} else {
			searchData = await getPokemonsById({
				variables: { id: search },
			}).then((res) => res.data.pokemon_v2_pokemon);
		}

		const promises = searchData.map(async (pokemon) => {
			return await PokedexApi.searchPokemon(pokemon.id).then(
				(res) => res.data
			);
		});

		const results = await Promise.all(promises);

		totalCount.current = searchData.length;
		setTotalPages(Math.ceil(totalCount.current / itemsPerPage));
		setCurrentPage(0);
		sessionStorage.setItem("currentPage", currentPage);
		setPokemons(results);
		setIsLoading(false);

		if (results.length === 0) {
			setNotFound(true);
		}
	};

	useEffect(() => {
		setNotFound(false);
		fetchPokemons();
		sessionStorage.setItem("currentPage", currentPage);
	}, [currentPage, isSearch]);

	return (
		<>
			<img
				className="absolute opacity-20 rotate-45 -translate-x-20 -translate-y-20 -z-10"
				src={pokeball}
				alt=""
			/>
			<div className="container p-8 mx-auto">
				<Header />
				<SearchBar searchPokemon={searchPokemon} />
				{notFound ? (
					<div className="border-2 border-red-400 rounded-lg max-w-lg mx-auto my-12 py-3 px-6 bg-white text-center">
						<p className="text-red-400 text-lg font-semibold">
							Nenhum Pokémon corresponde à sua pesquisa!
						</p>
						<p className="text-lg font-regular text-slate-700">Altere o termo de busca e tente novamente.</p>
					</div>
				) : (
					<Pokedex
						pokemons={pokemons}
						isLoading={isLoading}
						currentPage={currentPage}
						totalPages={totalPages}
						itemsPerPage={itemsPerPage}
						totalCount={totalCount.current}
						setCurrentPage={setCurrentPage}
					/>
				)}
			</div>
		</>
	);
}

export default App;
