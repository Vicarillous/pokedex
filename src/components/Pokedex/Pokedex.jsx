import React, { useEffect } from "react";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {
	const pokemons = props.pokemons;

	console.log(pokemons);

	useEffect(() => {

	}, []);

	return (
		<div>
			<hr className="m-3" />
			<section className={"flex justify-center flex-wrap gap-3"}>
				{pokemons &&
					pokemons.map((pokemon, index) => {
						return <Pokemon key={index} pokemon={pokemon} />;
					})}
			</section>
		</div>
	);
};

export default Pokedex;
