import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import PokedexApi from "../api/PokedexApi";
import "../styles/pokemons.scss";

const Pokemon = () => {
	let params = useParams();

    const [pokemon, setPokemon] = useState(null);

    const fetchPokemon = async () => {
        const result = await PokedexApi.searchPokemon(params.name).then((res) => {
			return res.data;
		});
        //console.log(result);
        setPokemon(result);
    }

    useEffect(() => {
        fetchPokemon();
    }, [])


	return (
		<>
			{pokemon && (
				<div
					className={`bg-${pokemon.types[0].type.name} min-h-screen h-full`}
				>
					<div className={"container p-8 mx-auto"}>
						<section className={"relative"}>
							<p className="absolute right-0 top-0 text-white font-bold opacity-50 text-9xl z-10">
								#{pokemon.id.toString().padStart(3, "0")}
							</p>
							<img
								src={
									pokemon.sprites.other[
										"official-artwork"
									].front_default
								}
								alt={pokemon.name}
							/>
							Top
						</section>
						<section>Bottom</section>
					</div>
				</div>
			)}
		</>
	);
};

export default Pokemon;
