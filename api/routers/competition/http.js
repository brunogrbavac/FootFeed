const express = require('express');
const competitionRouter = express.Router();
const competitionController = require('../../controllers/competition-controller/http'); // kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove

// ruter samo navodi na koji request (HTTP_metoda, ruta) će server kako reagirat (koje funkcije vrši nad zahtjevom)
module.exports = function(main_router){
    main_router.use('/competition', competitionRouter); // nestamo ovaj "pod-ruter" matchRouter na glavni main_router - na rutu (adresu) /event => SVI ZAHTJEVI KOJI IMAJU PREFIKS /event prosljeduju se eventRouteru - ka IRL ruter 
    competitionRouter.get('/everything', competitionController.getAllCompetitionsAndTeams);
}
