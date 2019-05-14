import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from 'reducer';

const Root = ({ children }) => {
  let store;

  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    store = createStore(reducers, {}, applyMiddleware(thunk));
  } else {
    store = createStore(reducers, {}, applyMiddleware(thunk, logger));
  }

  return (
    <Provider store={store}>
      <Router>
        {children}
      </Router>
    </Provider>
  );
};

export default Root;
