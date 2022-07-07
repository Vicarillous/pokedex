import React from "react";

const Button = (props) => {
    const { onClick, children, className } = props;

	return (
		<button className={`bg-red-400 rounded-xl w-14 h-14 p-2 shadow-lg shadow-red-400/50 mx-3 shrink-0 ${className}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
