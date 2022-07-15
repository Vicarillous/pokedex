import React, { useState, useEffect, useRef } from "react";
import { useKeyPress } from "hooks/customHooks";
import pokeball from "../assets/poke_ball_icon.png";


const SearchBar = ({searchPokemon}) => {
    const [search, setSearch] = useState("");
	const searchInput = useRef(null);
	const enter = useKeyPress("Enter");

    const handleChange = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		if (enter && document.activeElement === searchInput.current) {
			searchPokemon(search);
		}
	}, [enter]);

	return (
		<div className="w-96 md:w-7/12 mx-auto bg-white p-4 rounded-2xl shadow-lg flex">
			<input
				className="grow w-full text-xl mx-3"
				placeholder="Ditto"
				onChange={handleChange}
				value={search}
				ref={searchInput}
			/>
			<button
				className="bg-red-400 rounded-xl w-14 h-14 p-2 shadow-lg shadow-red-400/50 mx-3 shrink-0"
				onClick={() => searchPokemon(search)}
			>
				<img
					className="brightness-0 invert"
					src={pokeball}
					alt=""
					draggable="false"
				/>
			</button>
		</div>
	);
};

export default SearchBar;
