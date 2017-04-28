export const CORE_SET_SPLASH_SCREEN = 'CORE_SET_SPLASH_SCREEN';
export const CORE_SET_CONFIGURATION = 'CORE_SET_CONFIGURATION';
export const CORE_SET_WIDGET_LAYOUT = 'CORE_SET_WIDGET_LAYOUT';

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

export const fetchConfiguration = () => (dispatch, getState) => {
  console.log('fetching configuration');
  setTimeout(() => {
    console.log('setting configuration');
    dispatch(setConfiguration({
      widgetLayout: [{
        id: 'analog-clock-widget',
        module: 'analog-clock',
        h: 4,
        w: 4,
        x: 0,
        y: 0,
        static: true
      }]
    }));
  }, 1000);
};
