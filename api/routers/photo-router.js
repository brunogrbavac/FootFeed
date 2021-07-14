const express = require('express');
const photoRouter = express.Router();
const photoController = require('../controllers/photo-controller'); //kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
let { upload } = require('../../services/multer'); 
const { checkIfUser } = require('../middleware/checkUser');

// ruter samo navodi na koji request (HTTP_metoda, ruta) će server kako reagirat (koje funkcije vrši nad zahtjevom)
module.exports = function(main_router){
    main_router.use('/photo', photoRouter); // nestamo ovaj "pod-ruter" photoRouter na glavni main_router - na rutu (adresu) /photo => SVI ZAHTJEVI KOJI IMAJU PREFIKS /photo prosljeduju se photoRouter - ka IRL ruter
    photoRouter.post('/add', checkIfUser, upload.array('photo',30), photoController.addMultiplePhotos); 
    photoRouter.get('/get/:id', photoController.getPhoto); 
}