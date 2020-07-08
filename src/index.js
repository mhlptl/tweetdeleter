import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';

ReactDOM.render(
  	<React.StrictMode>
		<div className={'container'}>
			<App />
		</div>
	</React.StrictMode>,
  	document.getElementById('root')
);