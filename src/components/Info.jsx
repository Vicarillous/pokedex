import React from "react";

export const Info = ({ value, sufix, children }) => {
	return (
		<div className="text-white text-lg flex justify-between">
			<p className="font-bold">{children}</p>
			<p className="capitalize">
				{value}
				{sufix}
			</p>
		</div>
	);
};
