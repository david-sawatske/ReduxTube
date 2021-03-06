import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store.js';
import style from '../style/main.scss';

import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  const root = document.getElementById('container');
  ReactDOM.render(<Root store={ store }/>, root);
});
