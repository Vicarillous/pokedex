import React, { useRef } from "react";
import Button from "components/navigation/Button";
import { LeftArrow, RightArrow } from "components/Arrows";

const Navigation = (props) => {
	const { currentPage, totalPages, itemsPerPage, pokemonCount, totalCount, changePage } = props;
	const itemCount = useRef(0);

	const maxItems = 7;
	const itemOffset = Math.floor(maxItems / 2);

	return (
		<div className="w-3/4 p-4 rounded-2xl flex mx-auto justify-evenly items-center flex-wrap gap-1">
			<ul className="flex justify-around gap-1">
				<li>
					<Button
						className="text-slate-700 hover:border-slate-300 hover:border-2 transition-all"
						onClick={() => changePage(currentPage - 1)}
					>
						<LeftArrow className="hover:stroke-current hover:stroke-1" />
					</Button>
				</li>
				{[...Array(maxItems + itemOffset)].map((_, index) => {
					if (index === 0) {
						itemCount.current = 0;
					}
					const page = currentPage + index - itemOffset;
					if (page >= 0) {
						itemCount.current++;
					}
					if (
						page >= 0 &&
						page < totalPages &&
						itemCount.current <= maxItems
					) {
						return (
							<li key={page}>
								<Button
									className={`font-semibold 
										${
											page === currentPage
												? "primary-button"
												: "text-slate-700 hover:font-bold hover:border-slate-300 hover:border-2 transition-all"
										}`}
									onClick={() => changePage(page)}
								>
									{page + 1}
								</Button>
							</li>
						);
					}
					return null;
				})}
				<li>
					<Button
						className="text-slate-700 hover:border-slate-300 hover:border-2 transition-all"
						onClick={() => changePage(currentPage + 1)}
					>
						<RightArrow className="hover:stroke-current hover:stroke-1" />
					</Button>
				</li>
			</ul>
			<span className="font-semibold text-slate-700">
				Resultados: {currentPage * itemsPerPage + 1} -{" "}
				{currentPage * itemsPerPage + pokemonCount} de {totalCount}
			</span>
		</div>
	);
};

export default Navigation;
