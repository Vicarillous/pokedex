import React from "react";
import Navigation from "../navigation/Navigation";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {
	const { pokemons, loading, currentPage, totalPages, setCurrentPage } = props;

	const changePage = (page) => {
		console.log(page);
		if (page >= 0 && page < totalPages) {
			setCurrentPage(page);
		}		
	}

	return (
		<div>
			<hr className="m-3" />
			<Navigation
				currentPage={currentPage}
				changePage={changePage}
				totalPages={totalPages}
			/>
			<hr className="m-3" />
			<section className={"flex justify-center flex-wrap gap-3"}>
				{loading ? (
					<div>eae</div>
				) : (
					pokemons &&
					pokemons.map((pokemon, index) => {
						return <Pokemon key={index} pokemon={pokemon} />;
					})
				)}
			</section>
		</div>
	);
};

export default Pokedex;
