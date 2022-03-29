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
			{showValue && <span style={{ marginLeft: '10px' }}>{value}</span>}
			{error && <span style={{ marginLeft: '10px' }}>{error}</span>}
		</div>
	);
};

export default Input;
