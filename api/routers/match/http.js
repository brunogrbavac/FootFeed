const express = require('express');
const matchRouter = express.Router();
const matchController = require('../../controllers/match-controller/http'); // kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
const { checkIfUser } = require('../../middleware/checkUser');

// ruter samo navodi na koji request (HTTP_metoda, ruta) će server kako reagirat (koje funkcije vrši nad zahtjevom)
module.exports = function(main_router){
    main_router.use('/', matchRouter); // nestamo ovaj "pod-ruter" matchRouter na glavni main_router - na rutu (adresu) /player => SVI ZAHTJEVI KOJI IMAJU PREFIKS /match prosljeduju se matchRouteru - ka IRL ruter => npr. /match/all je zahtjev za sve igrače
    matchRouter.get('/match/all', matchController.getAllMatches);
    matchRouter.post('/match/create', checkIfUser, matchController.createMatch);
    matchRouter.post('/match/events', matchController.getAllMatchEvents);
}