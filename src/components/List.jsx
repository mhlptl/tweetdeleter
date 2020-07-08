import React from 'react';

function ListItem(props) {

	const { tweetID, statusText } = props;

	return (
		<li>{tweetID + ': ' + statusText}</li>
	);
}

function List(props) {

	const { data } = props;

	return (
		<ul id={'deletion-data'}>
			{data.map((status, index) => {
				return <ListItem key={index} tweetID={status.tweetID} statusText={status.statusText} />
			})}
		</ul>
	)
}

export default List;