const socketio = require('socket.io');
const { socket_router } = require('../api');
const { nodeLogger } = require('../loaders/logger');

module.exports = (server) => {
    const io = socketio(server);
    io.on('connection',(socket) => { 
        nodeLogger.info('New socket connection has been established.');
        socket_router(socket);
    });
};
