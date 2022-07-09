import React, { useEffect, useState, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import "./App.css";
import pokeball from "./assets/poke_ball_icon.png";
import PokedexApi, {GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_ID} from "./api/PokedexApi";
import Pokedex from "./components/pokedex/Pokedex";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
	let params = useParams();

	const [pokemons, setPokemons] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(Number(params.page) - 1 <= 0 ? 0 : Number(params.page) - 1);
	const itemsPerPage = 40;

	const [getPokemonsByName] = useLazyQuery(GET_POKEMONS_BY_NAME);
	const [getPokemonsById] = useLazyQuery(GET_POKEMONS_BY_ID);

	const totalCount = useRef(0);

	const fetchPokemons = async () => {
		if (isSearch) {
			return null;
		}

		setIsLoading(true);
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
		setIsLoading(false);
		setTotalPages(Math.ceil(data.count / itemsPerPage));
	};

	const searchPokemon = async (search) => {
		setIsSearch(true);
		if (!search) {
			setIsSearch(false);
			return fetchPokemons();
		}
		setIsLoading(true);

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

		console.log(searchData);

		const promises = searchData.map(async (pokemon) => {
			return await PokedexApi.searchPokemon(pokemon.id).then((res) => res.data);
		})

		const results = await Promise.all(promises);

		setPokemons(results);
		setIsLoading(false);
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
				<Pokedex
					pokemons={pokemons}
					isLoading={isLoading}
					currentPage={currentPage}
					totalPages={totalPages}
					itemsPerPage={itemsPerPage}
					totalCount={totalCount.current}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</>
	);
}

export default App;
