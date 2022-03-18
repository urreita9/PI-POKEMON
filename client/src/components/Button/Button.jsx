import React from 'react';

const Button = ({ text, type, className }) => {
	return (
		<button type={type ? type : ''} className={className}>
			{text}
		</button>
	);
};

export default Button;
