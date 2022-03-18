import React from 'react';

const Card = ({ imgDesktop, name, types }) => {
	const capitalName = name.charAt(0).toUpperCase() + name.slice(1);

	return (
		<div className='card_container '>
			<div className='card_img_container'>
				<img className='card_img' src={imgDesktop} alt='' />
			</div>

			<div className='card_name'>{capitalName}</div>
			<div className='card_types'>
				<ul className='card_types_list'>
					{types.map((type, i) => {
						const capitalType = type.charAt(0).toUpperCase() + type.slice(1);
						return <li key={i}>{capitalType}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};

export default Card;
