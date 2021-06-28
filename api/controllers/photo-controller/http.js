const { photo_instance } = require('../../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Photo iz servicea
const { nodeLogger } = require('../../../loaders/logger');
const path = require('path');
const config = require('../../../config');


// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {

    addMultiplePhotos: async (req,res,next) => {
        try{
            await photo_instance.addMultiplePhotos(req); // cili request radi req.file
            res.sendStatus(200); // vraća 200 OK da je uspješno uploadano
        }catch(error){
            nodeLogger.error('Error occured in ˝addPhoto˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },

    getPhoto: async (req,res,next)=>{
        try {
            const photo = await photo_instance.getPhoto(req.params.id);
            nodeLogger.info(__dirname);
            if(!photo.uri) // null => nema slike
            {
                res.sendStatus(201); // 201 = No Content
            }
            else {
                let options = { headers: { 'Content-Type': photo.MIME, 'Content-Length': photo.size }};
                res.sendFile( path.join(config.multer.images_storage_root_path,photo.uri), options);
            }
        } catch (error) {
            nodeLogger.error('Error occured in ˝getPhoto˝  HTTP function (controller) ' + error);
            next(error);
        }
    },
};