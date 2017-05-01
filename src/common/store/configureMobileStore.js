import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
import { createLogger } from 'redux-logger';
import reduxSocketMiddleware from '../middleware/reduxSocketMiddleware';
import rootReducer from '../reducers';

// Ensure we are dealing with react native userAgent
window.navigator.userAgent = 'ReactNative';

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Socket middleware
  const socket = io('ws://9d798218.ngrok.io', {
    transports: ['websocket'] // you need to explicitly tell it to use websockets
  });
  middleware.push(reduxSocketMiddleware(socket, 'WS_'));

  // Thunk Middleware
  middleware.push(thunk.withExtraArgument({ socket }));

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);

  // Redux DevTools Configuration
  const actionCreators = {};

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
};

export default configureStore;