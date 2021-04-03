const express = require('express');
const player = require('./routers/player');
const main_router = express.Router();

player(main_router); //pozivamo ugnježđene rutere - spajamo ih (nestamo) u main_router W

module.exports = {
    main_router: main_router //main_router exportamo za korištenje u loaderu - učitavanje servera
};