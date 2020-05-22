'use strict';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

import 'semantic-ui-css/semantic.min.css';
import './css/playground.css';

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>
  document.getElementById('app')
);
