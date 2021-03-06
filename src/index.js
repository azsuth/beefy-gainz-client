import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import Root from 'component/Root';
import App from 'component/App';
import * as serviceWorker from 'serviceWorker';

import 'index.css';

ReactDOM.render(
  <Root>
    <Route path="/" component={App} />
  </Root>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
