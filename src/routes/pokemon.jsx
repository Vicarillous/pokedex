import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PokedexApi from "api/PokedexApi";
import { Info } from "components/Info";
import "styles/pokemons.scss";
import { ProgressBar } from "components/ProgressBar";

import { gradients } from "styles/types-gradients";
import { PokemonSprite } from "components/PokemonSprite";

//https://www.thegamer.com/best-pokemon-of-each-stat-ranked/
const MAX_STATS = {
	hp: 255,
	attack: 190,
	defense: 230,
	"special-attack": 194,
	"special-defense": 230,
	speed: 200,
};

const Pokemon = () => {
	let params = useParams();

	const [pokemon, setPokemon] = useState(null);

	const fetchPokemon = async () => {
		try {
			const result = await PokedexApi.searchPokemon(params.name).then(
				(res) => {
					return res.data;
				}
			);
			setPokemon(result);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchPokemon();
	}, [params]);

	if (!pokemon) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div
				className={`bg-gradient-to-b ${
					gradients[pokemon.types[0].type.name]
				} min-h-screen h-full`}
			>
				<div className="container py-8 max-w-5xl mx-auto">
					<section className="flex items-end relative flex-wrap-reverse justify-evenly lg:flex-nowrap pt-40 gap-3 mb-6">
						<p className="absolute right-0 top-0 text-white font-bold opacity-50 text-9xl bg-id">
							#{pokemon.id.toString().padStart(3, "0")}
						</p>
						<div className="mb-16 lg:grow mx-16 lg:mx-4">
							<ul>
								{pokemon.types.map((type, index) => {
									return (
										<li
											key={index}
											className="py-1 px-1 mx-1 bg-slate-200 bg-opacity-50 rounded-full w-16 inline-block text-center text-sm text-white font-semibold capitalize"
										>
											{type.type.name}
										</li>
									);
								})}
							</ul>
							<div className="flex items-baseline justify-start gap-4">
								<img
									src={require(`assets/icons-types/${pokemon.types[0].type.name}.svg`)}
									alt={pokemon.types[0].type.name}
									className="w-16 h-16"
								></img>
								<h2 className="text-8xl capitalize text-white">
									{pokemon.name}
								</h2>
							</div>
							<div className="mt-4">
								<Info value={pokemon.height / 10} sufix="M">
									Height
								</Info>
								<Info value={pokemon.weight / 10} sufix="Kg">
									Weight
								</Info>
								<Info value={pokemon.abilities[0].ability.name}>
									Abilities
								</Info>
							</div>
						</div>
						<PokemonSprite className="z-10" pokemonData={pokemon} />
					</section>
					<section className="flex items-center flex-col justify-center md:flex-row gap-10 mx-16 lg:mx-6 xl:mx-0">
						<h2 className="text-white text-6xl font-bold h-fit">
							Stats
						</h2>
						<ul className="grow">
							{pokemon.stats.map((stat, index) => {
								return (
									<li
										key={index}
										className="flex justify-between items-center text-lg text-white gap-3 py-1 first:pt-0 last:pb-0"
									>
										<span className="capitalize basis-40">
											{stat.stat.name}
										</span>
										<ProgressBar
											value={stat.base_stat}
											max={MAX_STATS[stat.stat.name]}
										/>
										<span className="basis-8 text-end">
											{stat.base_stat}
										</span>
									</li>
								);
							})}
						</ul>
					</section>
				</div>
			</div>
		</>
	);
};

export default Pokemon;
