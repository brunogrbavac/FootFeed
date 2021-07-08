const express = require('express');
const playerRouter = express.Router();
const playerController = require('../../controllers/player-controller/http'); //kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove

// ruter samo navodi na koji request (HTTP_metoda, ruta) će server kako reagirat (koje funkcije vrši nad zahtjevom)
module.exports = function(main_router){
    main_router.use('/player', playerRouter); // nestamo ovaj "pod-ruter" playerRouter na glavni main_router - na rutu (adresu) /player => SVI ZAHTJEVI KOJI IMAJU PREFIKS /player prosljeduju se playerRouteru - ka IRL ruter => npr. /player/all je zahtjev za sve igrače
    playerRouter.get('/all/:id', playerController.getAllPlayersOfTeam); 
}