import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './redux/reducers/index';
import './index.css';
import App from './App';

const store = createStore(combineReducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
const rootContainer = createRoot(rootElement);

rootContainer.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
