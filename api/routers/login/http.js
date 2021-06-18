const express = require('express');
const loginRouter = express.Router();
const loginController = require('../../controllers/login-controller/http'); // kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove

// ruter samo navodi na koji request (HTTP_metoda, ruta) će server kako reagirat (koje funkcije vrši nad zahtjevom)
module.exports = function(main_router){
    main_router.use('/log', loginRouter); // nestamo ovaj "pod-ruter" loginRouter na glavni main_router - na rutu (adresu) /player => SVI ZAHTJEVI KOJI IMAJU PREFIKS / prosljeduju se loginRouter - ka IRL ruter
    loginRouter.post('/in', loginController.login);
    loginRouter.get('/out', loginController.logout);
    loginRouter.get('/check', loginController.checkLogin);
}
