import React from 'react';

const ImageList = props => {
	const images = props.queryResult.map(({id, urls, description}) => {
		return <img key={id} src={urls.regular} alt={description} />
	});
	return(
		<div>{images}</div>
	);
};

export default ImageList;