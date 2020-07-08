import React from 'react';

function List(props) {

	const { data } = props;

	return (
		<ul id={'deletion-data'}>
			{data.map((status, index) => {
				return <li key={index}>{status.tweetID + '\t' + status.statusText}</li>
			})}
		</ul>
	)
}

export default List;