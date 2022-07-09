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
        console.log(result);
        setPokemon(result);
    }

    useEffect(() => {
        fetchPokemon();
    }, [])


	return (
		<>
			{pokemon && (
				<div className={`bg-${pokemon.types[0].type.name} min-h-screen h-full`}>
					{JSON.stringify(pokemon)}
				</div>
			)}
		</>
	);
};

export default Pokemon;
