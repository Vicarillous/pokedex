import React, {useEffect, useState} from 'react';
import './App.css';
import pokeball from './assets/poke_ball_icon.png';
import PokedexApi from './api/PokedexApi';
import Pokedex from './components/Pokedex/Pokedex';
import Header from './components/Header';

function App() {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = () => {
    PokedexApi.getPokemons().then((res) => {
      setPokemons(res.data);
    })
  }

  const changePage = (event, page) => {
    PokedexApi.get(page).then((res) => {
      setPokemons(res.data);
    }
    )
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
		<>
			<img
				className="absolute opacity-20 rotate-45 -translate-x-20 -translate-y-20 -z-10"
				src={pokeball}
			/>
			<div className="container p-8 mx-auto">
				<Header />
			  <Pokedex pokemons={pokemons} changePage={changePage} />
			</div>
		</>
  );
}

export default App;
