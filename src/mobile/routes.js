import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import App from './containers/App';
import Home from './containers/Home';

export default () => (
  <NativeRouter>
    <App>
      <Route path="/" component={Home} />
    </App>
  </NativeRouter>
);
