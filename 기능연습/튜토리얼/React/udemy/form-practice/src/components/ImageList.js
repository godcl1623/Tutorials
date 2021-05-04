import React from 'react';
import ImageCard from './ImageCard';
import './ImageList.css';

const ImageList = props => {
	const images = props.queryResult.map(image => {
		return <ImageCard key={image.id} image={image}/>
	});
	return(
		<div className="image-list">{images}</div>
	);
};

export default ImageList;