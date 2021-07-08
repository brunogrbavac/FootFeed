const socketio = require('socket.io');
const { socket_router } = require('../api');
const { nodeLogger } = require('../loaders/logger');

module.exports = (server) => {
    const io = socketio(server);
    io.on('connection',(socket) => { 
        nodeLogger.info('New socket connection has been established.');
        
        socket.on('join', room => {
            socket.join(room);
            nodeLogger.info(`Socket ${socket.id} joined match room number ${room}.`);
        });

        socket.on('disconnect', () => {
           nodeLogger.info(`Socket ${socket.id} has left.`);
        });

        socket_router(socket, io);
    });
};
