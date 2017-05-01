import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from '../common/store/configureMobileStore';

const store = configureStore();

const MyMagicMirror = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

AppRegistry.registerComponent('MyMagicMirror', () => MyMagicMirror);
