import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import core from './core';

const rootReducer = combineReducers({
  core,
  router
});

export default rootReducer;
