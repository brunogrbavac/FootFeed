const express = require('express');
const main_router = express.Router();
const playerSocket = require('./routers/player/socket');
const playerHttp = require('./routers/player/http');
const matchHttp = require('./routers/match/http');
const eventHttp = require('./routers/event/http');
const updateHttp = require('./routers/update/http');
const loginHttp = require('./routers/login/http');
const photoHttp = require('./routers/photo/http');
const competitionHttp = require('./routers/competition/http');


playerHttp(main_router); // pozivamo ugnježđene rutere - spajamo ih (nestamo) u main_router W
matchHttp(main_router);
eventHttp(main_router);
updateHttp(main_router);
loginHttp(main_router);
photoHttp(main_router);
competitionHttp(main_router);

const socket_router = (socket) => { // otvaramo sve potrebne sockete
    playerSocket(socket);
};

module.exports = {
    main_router: main_router, // main_router exportamo za korištenje u loaderu - učitavanje servera
    socket_router: socket_router, // "ruter" za sockete - isto govori na koji keyWord kako reagira
};