import React from 'react';

function Form(props) {

	const { ids, error, handleChange, handleSubmit } = props;

	return (
		<form onSubmit={handleSubmit}>
			<textarea 
			placeholder={'Tweet Ids (Separated by a new line)'} 
			value={ids} 
			name={'ids'} 
			onChange={handleChange}
			id={'id-input'}
			/><br/>
			{error && <p id={'error'}>{error}</p>}
			<input
			type={'submit'} 
			value={'Delete'}
			id={'button'}
			/>
		</form>
	)
}

export default Form;