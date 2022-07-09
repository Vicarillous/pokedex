import React, { useRef, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {
	const { pokemons, loading, currentPage, totalPages, itemsPerPage, totalCount, setCurrentPage } = props;
	const pokemonCount = useRef(0);

	const changePage = (page) => {
		//console.log(page);
		if (page >= 0 && page < totalPages) {
			setCurrentPage(page);
		}		
	}

	return (
		<div>
			<Navigation
				currentPage={currentPage}
				changePage={changePage}
				totalPages={totalPages}
				itemsPerPage={itemsPerPage}
				pokemonCount={pokemonCount.current}
				totalCount={totalCount}
			/>
			<hr className="m-3" />
			<section className={"flex justify-center flex-wrap gap-4"}>
				{loading ? (
					<div>eae</div>
				) : (
					pokemons &&
					pokemons.map((pokemon, index) => {
						if (index === 0) {
							pokemonCount.current = 0;
						}

						pokemonCount.current++;
						return <Pokemon key={index} pokemon={pokemon} />;
					})
				)}
			</section>
			<hr className="m-3" />
			<Navigation
				currentPage={currentPage}
				changePage={changePage}
				totalPages={totalPages}
				itemsPerPage={itemsPerPage}
				pokemonCount={pokemonCount.current}
				totalCount={totalCount}
			/>
		</div>
	);
};

export default Pokedex;
