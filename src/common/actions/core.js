// Outgoing websocket actions
export const WS_PING = 'WS_PING';
export const WS_SUBSCRIBE_CONFIGURATION = 'WS_SUBSCRIBE_CONFIGURATION';

export const pinger = (data) => ({
  type: WS_PING,
  data
});

export const subscribeUserConfiguration = (username) => ({
  type: WS_SUBSCRIBE_CONFIGURATION,
  username
});

export const CORE_SET_SPLASH_SCREEN = 'CORE_SET_SPLASH_SCREEN';
export const CORE_SET_CONFIGURATION = 'CORE_SET_CONFIGURATION';
export const CORE_SET_WIDGET_LAYOUT = 'CORE_SET_WIDGET_LAYOUT';
export const CORE_ERROR = 'CORE_ERROR';

export const setConfiguration = (configuration) => ({
  type: CORE_SET_CONFIGURATION,
  configuration
});

export const setWidgetLayout = (widgetLayout) => ({
  type: CORE_SET_WIDGET_LAYOUT,
  widgetLayout
});

export const setSplashScreen = (showingSplashScreen) => ({
  type: CORE_SET_SPLASH_SCREEN,
  showingSplashScreen
});

export const disconnectedFromServer = () => (dispatch) => {
  dispatch(setSplashScreen(true));
};

export const connectToServer = (username) => (dispatch, getState, { socket }) => {
  // Set splash screen to display to user
  dispatch(setSplashScreen(true));
  // Connect to socket server and fetch a users profile
  socket.on('connect', () => {
    console.info('Client socket connected.');
    // We give the illusion of connection happening eventhough this is pretty much instant
    setTimeout(() => dispatch(subscribeUserConfiguration(username)), 5000);
    socket.on('disconnect', () => dispatch(disconnectedFromServer()));
  });
};
