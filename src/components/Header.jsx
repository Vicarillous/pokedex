import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
		<header className="container p-6 mx-auto flex justify-center">
			<h1 className="text-center inline-block font-bold text-7xl text-slate-600 transition-all duration-700 hover:text-red-200 select-none">
				<Link to="/">
					Pokedex
				</Link>
			</h1>
		</header>
  );
}

export const SmallHeader = () => {
	return (
		<header className="container p-6 mx-auto flex justify-center">
			<h1 className="text-center inline-block font-bold text-7xl text-slate-600 transition-all duration-700 hover:text-red-200 z-10 select-none">
				<Link to="/">Pokedex</Link>
			</h1>
		</header>
	);
}

export default Header