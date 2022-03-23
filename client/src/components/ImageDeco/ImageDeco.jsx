import React from 'react';

const ImageDeco = ({ image, className }) => {
	return (
		<div
			style={{ backgroundImage: `url(${image})` }}
			className={`imageDeco ${className}`}
		></div>
	);
};

export default ImageDeco;
