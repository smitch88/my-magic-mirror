import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { routerMiddleware, push } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../../common/reducers';

const history = createBrowserHistory();

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Socket middleware
  const socket = io('http://localhost:3001');
  middleware.push(createSocketIoMiddleware(socket, 'WS_'));

  // Thunk Middleware
  middleware.push(thunk.withExtraArgument({ socket }));

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);

  // Router Middleware
  const router = routerMiddleware(hashHistory);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    push,
  };
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

  if (module.hot) {
    module.hot.accept('../../common/reducers', () =>
      store.replaceReducer(require('../../common/reducers')) // eslint-disable-line global-require
    );
  }

  return store;
};

export default { configureStore, history };
