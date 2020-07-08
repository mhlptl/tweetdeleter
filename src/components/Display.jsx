import React from 'react';
import Form from './Form';
import List from './List';

function Display(props) {
	const { ids, error, data, handleChange, handleSubmit, deleteMore } = props;

	if(data.length === 0) {
		return (
			<Form 
			ids={ids} 
			error={error} 
			handleChange={handleChange}
			handleSubmit={handleSubmit} 
			/>
		)
	}
	else {
		return (
			<React.Fragment>
				<List data={data} />
				<input type={'button'}
				value={'Delete More'}
				id={'button'}
				onClick={deleteMore}
				/>
			</React.Fragment>
		)
	}
}

export default Display;