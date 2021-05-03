import React from 'react';

const ImageList = props => {
	const images = props.queryResult.map(image => {
		return <img src={image.urls.regular} alt="search result" />
	});
	return(
		<div>{images}</div>
	);
};

export default ImageList;