import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Widgets from './containers/Widgets';

export default () => (
  <Router>
    <App>
      <Switch>
        <Route path="/" component={Widgets} />
      </Switch>
    </App>
  </Router>
);
