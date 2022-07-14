import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "index.css";
import App from "App";
import reportWebVitals from "reportWebVitals";
import PokemonDetails from "routes/PokemonDetails";

const pokedexGraphQL = new ApolloClient({
	uri: "https://beta.pokeapi.co/graphql/v1beta",
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ApolloProvider client={pokedexGraphQL}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/pokemon/:name" element={<PokemonDetails />} />
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
