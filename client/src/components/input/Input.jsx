import React from 'react';

const Input = ({
	label,
	type,
	name,
	min,
	max,
	value,
	handleInputChange,
	placeholder,
	error,
	showValue,
}) => {
	return (
		<div className='input_container'>
			<label>{label} </label>
			<input
				type={type}
				name={name}
				min={min}
				max={max}
				value={value || ''}
				onChange={handleInputChange}
				placeholder={placeholder}
				autoComplete='off'
			/>
			{showValue && <span>{value}</span>}
			{error && <span>{error}</span>}
		</div>
	);
};

export default Input;
