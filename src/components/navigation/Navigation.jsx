import React, { useRef } from "react";
import Button from "./Button";

const Navigation = (props) => {
	const { currentPage, totalPages, itemsPerPage, pokemonCount, totalCount, changePage } = props;
	const itemCount = useRef(0);

	const maxItems = 7;
	const itemOffset = Math.floor(maxItems / 2);

	return (
		<div className="w-3/4 p-4 rounded-2xl flex mx-auto justify-evenly items-center flex-wrap gap-1">
			<ul className="flex justify-around">
				<li>
					<Button
						className="font-semibold text-slate-700"
						onClick={() => changePage(currentPage - 1)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-chevron-left"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
							/>
						</svg>
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
									className={`font-semibold text-slate-700
										${page === currentPage ? "bg-red-400 shadow-lg shadow-red-400/50 text-white" : ""}`}
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
						className="font-semibold text-slate-700"
						onClick={() => changePage(currentPage + 1)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-chevron-right"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
							/>
						</svg>
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
