const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user-controller'); // kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove

// ruter samo navodi na koji request (HTTP_metoda, ruta) će server kako reagirat (koje funkcije vrši nad zahtjevom)
module.exports = function(main_router){
    main_router.use('/user', userRouter); // nestamo ovaj "pod-ruter" loginRouter na glavni main_router - na rutu (adresu) /player => SVI ZAHTJEVI KOJI IMAJU PREFIKS / prosljeduju se loginRouter - ka IRL ruter
    userRouter.post('/create', userController.createUser);
};
