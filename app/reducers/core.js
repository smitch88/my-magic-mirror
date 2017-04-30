import { Map, Record } from 'immutable';
import * as actions from '../actions/core';

const State = Record({
  showingSplashScreen: false,
  error: undefined,
  configuration: Map({
    welcomeMessage: 'Welcome!',
    layout: []
  })
}, 'core');

const core = (state = new State(), action) => {
  switch (action.type) {

    case actions.CORE_SET_SPLASH_SCREEN:
      return state.set('showingSplashScreen', action.showingSplashScreen);

    case actions.CORE_SET_CONFIGURATION:
      return state.set('error', undefined)
                  .set('showingSplashScreen', false)
                  .mergeDeepIn(['configuration'], action.configuration);

    case actions.CORE_SET_WIDGET_LAYOUT:
      return state.setIn(['configuration', 'widgetLayout'], action.widgetLayout);

    case actions.CORE_ERROR:
      return state.set('error', action.error);

    default:
      return state;
  }
};

export default core;
