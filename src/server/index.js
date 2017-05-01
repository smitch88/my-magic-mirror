const firebase = require('firebase');
const io = require('socket.io')(3001);

const socketHandlers = (socket) => {
  const errorHandler = (errorString) => {
    socket.emit('action', {
      type: 'CORE_ERROR',
      error: new Error(errorString)
    });
  };

  const configurationHandler = (snapshot) => {
    const configuration = snapshot.val();
    if (configuration) {
      socket.emit('action', {
        type: 'CORE_SET_CONFIGURATION',
        configuration
      });
    } else {
      errorHandler('No configuration found for the user');
    }
  };
  return {
    configurationHandler,
    errorHandler
  };
};

const start = () => {
  // Establish firebase app connection
  firebase.initializeApp({
    apiKey: 'AIzaSyB5D7JbC0bapnWGWUejJKiwR_jF2qyCDJc',
    authDomain: 'my-magic-mirror-5d1e2.firebaseapp.com',
    databaseURL: 'https://my-magic-mirror-5d1e2.firebaseio.com',
    projectId: 'my-magic-mirror-5d1e2',
    storageBucket: 'my-magic-mirror-5d1e2.appspot.com',
    messagingSenderId: '862599948469'
  });

  // Set up socket listener
  io.on('connection', (socket) => {
    console.info('Established a connection to the server socket');
    const handlers = socketHandlers(socket);
    socket.on('action', (action) => {
      switch (action.type) {
        case 'WS_WRITE_CONFIGURATION':
          firebase.database().ref()
            .update({
              [`users/${action.username}/configuration/${action.path}`]: action.data
            })
            .catch(error => {
              handlers.errorHandler(error.message);
            });
          return;

        case 'WS_SUBSCRIBE_CONFIGURATION':
          firebase.database().ref(`users/${action.username}/configuration`)
            .on('value', handlers.configurationHandler);
          return;

        default:
          handlers.errorHandler('No matching action found');
          return;
      }
    });
  });
};

start();
