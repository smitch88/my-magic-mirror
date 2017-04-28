import { Map, Record } from 'immutable';
import * as actions from '../actions/core';

const State = Record({
  showingSplashScreen: false,
  configuration: undefined
}, 'core');

const core = (state = new State(), action) => {
  switch (action.type) {

    case actions.CORE_SET_SPLASH_SCREEN:
      return state.set('showingSplashScreen', action.showingSplashScreen);

    case actions.CORE_SET_CONFIGURATION:
      return state.set('configuration', Map(action.configuration));

    case actions.CORE_SET_WIDGET_LAYOUT:
      return state.setIn(['configuration', 'widgetLayout'], action.widgetLayout);

    default:
      return state;
  }
};

export default core;
