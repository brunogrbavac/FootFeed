const express = require('express');
const updateRouter = express.Router();
const updateController = require('../controllers/update-controller'); // kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove

// ruter samo navodi na koji request (HTTP_metoda, ruta) će server kako reagirat (koje funkcije vrši nad zahtjevom)
module.exports = function(main_router){
    main_router.use('/update', updateRouter); // nestamo ovaj "pod-ruter" updateRouter na glavni main_router - na rutu (adresu) /update => SVI ZAHTJEVI KOJI IMAJU PREFIKS /update prosljeduju se updateRouteru - ka IRL ruter 
    updateRouter.post('/', updateController.updateFromAPIFOOTBALL);
}
