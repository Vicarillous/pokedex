import React from "react";

const Button = (props) => {
    const { onClick, children, className } = props;

	return (
		<button className={`rounded-xl w-12 h-12 p-2 shrink-0 ${className}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
