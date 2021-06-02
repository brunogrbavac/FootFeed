const express = require('express');
const eventRouter = express.Router();
const eventController = require('../../controllers/event-controller/http'); // kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove

// ruter samo navodi na koji request (HTTP_metoda, ruta) će server kako reagirat (koje funkcije vrši nad zahtjevom)
module.exports = function(main_router){
    main_router.use('/event', eventRouter); // nestamo ovaj "pod-ruter" matchRouter na glavni main_router - na rutu (adresu) /event => SVI ZAHTJEVI KOJI IMAJU PREFIKS /event prosljeduju se eventRouteru - ka IRL ruter 
    eventRouter.post('/create', eventController.createEvent);
}
