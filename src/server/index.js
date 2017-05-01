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
  firebase.initializeApp(require('../../env/firebase'));

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
