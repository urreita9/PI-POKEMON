import React from 'react';

const Modal = ({ text, setError }) => {
	return (
		<div
			className='modal_container'
			onClick={() => {
				setError(false);
			}}
		>
			<div className='modal_wrapper'>
				<div
					className='modal_gif'
					style={{ backgroundImage: 'url(/assets/gif.png)' }}
				></div>
				<div>
					<p>{text}</p>
				</div>
			</div>
		</div>
	);
};

export default Modal;
