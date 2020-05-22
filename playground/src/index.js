import regeneratorRuntime from 'regenerator-runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSageMiddleware from 'redux-saga';

import './css/playground.css';

ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById('app')
);
