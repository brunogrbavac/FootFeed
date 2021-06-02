const playerController = require('../../controllers/player-controller/socket');

module.exports = (socket) => {
    socket.on('/player/all', ({msg}) => playerController.getAllPlayers(msg,socket)); // kako proslijedit i poruku i socket (inace proslijedi po defaultu ovoj callback funkciji samo primljeno od klijenta)
};