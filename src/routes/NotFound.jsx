import React from "react";

import ErrorImage from "assets/sad_luxio.png";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="container max-w-3xl px-6 md:px-0 mx-auto h-screen flex justify-center items-center flex-col text-slate-600 text-center">
			<img src={ErrorImage} />
			<h1 className="text-9xl font-bold">#404</h1>
			<p className="text-6xl font-light leading-normal">
				Opps! Página não encontrada
			</p>
			<p className="text-2xl font-light leading-normal">
                A página que você estava procurando não existe. Você pode ter digitado o endereço errado ou a página foi removida.
			</p>
			<Link
				to="/"
				className="rounded-xl primary-button text-lg font-normal p-3 px-6 m-6"
			>
				Voltar para o início
			</Link>
		</div>
	);
};

export default NotFound;
