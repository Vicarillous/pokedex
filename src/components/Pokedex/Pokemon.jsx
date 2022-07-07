import React from "react";
import "./Pokemon.style.scss";
import pokeball from "../../assets/poke_ball_icon.png";

const Pokemon = (props) => {
	const pokemonData = props.pokemon;

	return (
		<>
			{pokemonData && (
				<div
					className={`bg-${pokemonData.types[0].type.name} px-3 py-3 bg-white rounded-xl shadow-lg shadow-slate-400/50 flex relative overflow-hidden`}
				>
					<div className="relative">
						<div className="w-auto h-40 flex-none flex mt-3">
							<div className="w-40">
								<p className="text-3xl font-semibold text-white capitalize mb-3">
									{pokemonData.name}
								</p>
								<ul>
									{pokemonData.types.map((type, index) => {
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
							</div>
							<img
								className={"z-20"}
								src={
									pokemonData.sprites.other[
										"official-artwork"
									].front_default
								}
								alt={pokemonData.name}
							/>
						</div>
						<p className="absolute right-0 top-0 text-white font-semibold opacity-50 text-3xl z-10">
							#{pokemonData.id.toString().padStart(3, "0")}
						</p>
					</div>
					<img
						className="opacity-20 absolute right-0 bottom-0 w-52 -rotate-45 translate-x-10 translate-y-10 z-0"
						src={pokeball}
						alt=""
					/>
				</div>
			)}
		</>
	);
};

export default Pokemon;
