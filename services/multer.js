const config = require('../config');
const multer = require('multer'); // W
const { nodeLogger } = require('../loaders/logger');

const storage = multer.diskStorage({ // storage opcija dopušta bolju kontrolu nad pokranom na disk od samo parametra dest W
    
    destination: (req,file,callback) => { // gdje spremamo
        callback(null, config.multer.images_storage);
    },
    filename: (req,file,callback) => { // pod kojim imenom spremamo
        nodeLogger.info( Date.now() + '-' + file.originalname);
        callback(null, Date.now() + '-' + file.originalname); // način na koji imenujemo slike (multer automatski unique imenuje BEZ EKSTENZIJE - mi ovdi preuzimamo ime od uploadera pa ima ekstenziju)
    }
});


const fileFilter = (req,file,callback) => { // filter definira MIME tipove koje prihvaćamo na upload

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') // dopuštamo upload samo ova 3 formata slika
    {
        callback(null,true); // pozvat ce se middleware s porukom o uspjehu
    }
    else callback(new Error(file.mimetype + ' is not supported for upload to this server.'),false); // pozvat ce se middleware s porukom o neuspjehu - nepodržavanje tog MIME tipa
};

const upload = multer({ // konfiguriramo parametre multera-> upload objekt? je zapravo middleware od multera
    storage: storage,
    limits: {fileSize:config.multer.maxSize },
    fileFilter: fileFilter,
});

module.exports = {
    upload: upload,
}

// callback je callback funkcija od multera koju pozivamo preko ove reference