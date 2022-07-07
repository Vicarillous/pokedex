import React, { useRef } from "react";
import Button from "./Button";

const Navigation = (props) => {
	const { currentPage, totalPages, changePage } = props;
	const itemCount = useRef(0);

	const maxItems = 7;
	const itemOffset = Math.floor(maxItems / 2);

	return (
		<div className="flex">
			<Button onClick={() => changePage(currentPage - 1)}>◀️</Button>
			<ul>
				{[...Array(maxItems + itemOffset)].map((_, index) => {
					if (index === 0) {
						itemCount.current = 0;
					}
					const page = currentPage + index - itemOffset;
					if (page >= 0) {
						itemCount.current = itemCount.current + 1;
					}
					if (
						page >= 0 &&
						page < totalPages &&
						itemCount.current <= maxItems
					) {
						return (
							<li key={page} className="float-left">
								<Button
									className={
										page === currentPage ? "bg-red-800" : ""
									}
									onClick={() => changePage(page)}
								>
									{page + 1}
								</Button>
							</li>
						);
					}
					return null;
				})}
			</ul>
			<Button onClick={() => changePage(currentPage + 1)}>▶️</Button>
		</div>
	);
};

export default Navigation;
