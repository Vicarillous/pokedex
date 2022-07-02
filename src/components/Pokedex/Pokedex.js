import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import SearchBar from "../SearchBar";
import PokedexApi from "../../api/PokedexApi";

const Pokedex = (props) => {
	const { next, previous, results } = props.pokemons;

	const [search, setSearch] = useState("");
	const [pokemons, setPokemons] = useState();

	console.log(pokemons);

	const fetchPokemon = (event, search) => {
		setSearch(search.toLowerCase());
	};

	const RefreshPokedex = () => {
		return (
			pokemons &&
			(search == "" ? (
				pokemons.map((pokemon, index) => {
					return <Pokemon key={index} pokemon={pokemon.name} />;
				})
			) : (
				<Pokemon pokemon={search} />
			))
		);
	};

	useEffect(() => {
		setPokemons(results);
		RefreshPokedex();
	}, [SearchBar, next]);

	return (
		<div>
			<SearchBar fetchPokemon={fetchPokemon} />
			<hr className="my-3"></hr>
			{previous && (
				<button
					onClick={(event) => props.changePage(event, previous)}
					className="bg-white p-3 shadow-lg rounded-xl font-semibold text-slate-800 mx-3 w-24"
				>
					Previous
				</button>
			)}
			{next && (
				<button
					onClick={(event) => props.changePage(event, next)}
					className="bg-white p-3 shadow-lg rounded-xl font-semibold text-slate-800 mx-3 w-24"
				>
					Next
				</button>
			)}
			<hr className="my-3"></hr>
			<section className={"flex justify-center flex-wrap gap-3"}>
				<RefreshPokedex />
			</section>
		</div>
	);
};

export default Pokedex;
