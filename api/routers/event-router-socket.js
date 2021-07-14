const eventController = require('../controllers/event-controller-socket');

module.exports = (socket, io) => {
    socket.on('/event/create',({msg, room}) => eventController.createEvent(msg, room, socket, io)); 
}; // kako proslijedit i poruku i socket (inace proslijedi po defaultu ovoj callback funkciji samo primljeno od klijenta)
