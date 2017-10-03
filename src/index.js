import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import store from './store'
import { Provider } from 'react-redux'
import {fetchMessages, setupComposeForm} from './actions'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

store.dispatch(fetchMessages())
store.dispatch(setupComposeForm())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
