const express = require('express');
const main_router = express.Router();
const eventSocket = require('./routers/event-router-socket');
const matchHttp = require('./routers/match-router');
const updateHttp = require('./routers/update-router');
const loginHttp = require('./routers/login-router');
const photoHttp = require('./routers/photo-router');
const competitionHttp = require('./routers/competition-router');
const userHttp = require('./routers/user-router');
const playerHttp = require('./routers/player-router');

// pozivamo ugnježđene rutere - spajamo ih (nestamo) u main_router W
matchHttp(main_router);
updateHttp(main_router);
loginHttp(main_router);
photoHttp(main_router);
competitionHttp(main_router);
userHttp(main_router);
playerHttp(main_router);

const socket_router = (socket, io) => { // otvaramo sve potrebne sockete
    eventSocket(socket, io);
};

module.exports = {
    main_router: main_router, // main_router exportamo za korištenje u loaderu - učitavanje servera
    socket_router: socket_router, // "ruter" za sockete - isto govori na koji keyWord kako reagira
};