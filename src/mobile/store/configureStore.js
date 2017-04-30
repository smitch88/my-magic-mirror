import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import rootReducer from '../../common/reducers';

// Ensure we are dealing with react native userAgent
window.navigator.userAgent = 'ReactNative';

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Socket middleware
  const socket = io('http://localhost:3001', {
    transports: ['websocket'] // you need to explicitly tell it to use websockets
  });
  middleware.push(createSocketIoMiddleware(socket, 'WS_'));

  // Thunk Middleware
  middleware.push(thunk.withExtraArgument({ socket }));

  /*
  // Router Middleware
  const router = routerMiddleware(hashHistory);
  middleware.push(router);
  */

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
