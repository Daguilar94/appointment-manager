import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store.js';
import { Provider } from 'react-redux';
import { loadPacientes, loadCitas } from './actionCreators.js';

store.dispatch(loadCitas())
store.dispatch(loadPacientes())

ReactDOM.render(
  <Provider store={ store }>
  <App />
</Provider>
  , document.getElementById('root'));
registerServiceWorker();
