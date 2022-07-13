import React from "react";

export const ProgressBar = ({ value, max }) => {
	const toPercentage = (value, max) => {
		return ((value * 100) / max).toFixed(2) + "%";
	};

	return (
		<div className="grow relative h-7 w-60 flex-shrink-0">
			<span
				className="bg-white h-full inline-block absolute rounded-lg"
				style={{ width: toPercentage(value, max) }}
			></span>
		</div>
	);
};
