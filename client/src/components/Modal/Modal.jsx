import React from 'react';

const Modal = ({ text, handleError, loading }) => {
	return (
		<div
			className='modal_container'
			onClick={() => {
				if (!loading) {
					handleError();
				}
			}}
		>
			<div className='modal_wrapper'>
				<div
					className='modal_gif'
					style={{ backgroundImage: 'url(/assets/gif.png)' }}
				></div>
				<div>
					<p style={{ color: '#24d84c' }}>{text}</p>
				</div>
			</div>
		</div>
	);
};

export default Modal;
