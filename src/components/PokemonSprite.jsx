import React, { useState, useEffect } from "react";
import PokedexApi from "api/PokedexApi";

export const PokemonSprite = ({ pokemonData, className }) => {
	const sprite = pokemonData.sprites.other["official-artwork"].front_default;

	const [defaultImage, setDefaultImage] = useState(null);

	const getDefaultImage = async () => {
		const pokemonUrl = pokemonData.species.url;
		const specieData = await PokedexApi.get(pokemonUrl).then(
			(res) => res.data
		);
		setDefaultImage(
			`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${specieData.id
				.toString()
				.padStart(3, "0")}.png`
		);
	};

	useEffect(() => {
		if (sprite === null) {
			getDefaultImage();
		}
	}, [pokemonData]);

	return (
		<img
			className={`${className} ${
				sprite === null ? "brightness-0" : ""
			}`}
			src={sprite === null ? defaultImage : sprite}
			alt={pokemonData.name}
		/>
	);
};
