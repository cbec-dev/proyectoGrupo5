import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Registro from './Registro';
import registerServiceWorker from './registerServiceWorker';
 
ReactDOM.render(<App />, document.getElementById('root'));
 
 
 
registerServiceWorker();