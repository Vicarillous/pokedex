import React from 'react'

const Header = () => {
  return (
		<header className="container p-6 mx-auto flex justify-center">
			<h1 className="text-center inline-block font-bold text-7xl text-slate-600 transition-all duration-700 hover:text-red-200">
				<a href="#">
					Pokedex
				</a>
			</h1>
		</header>
  );
}

export default Header