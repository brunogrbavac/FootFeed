const { match_instance } = require('../../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Match iz servicea
const { nodeLogger } = require('../../../loaders/logger');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    getAllMatches: async ( req, res, next) => {
        try{
            let matches = await match_instance.getAllMatches(); 
            res.status(200).json(matches); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllMatches˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
    createMatch: async ( req, res, next) => {
        try{
            await match_instance.createMatch(req.body); 
            res.status(200); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝createMatch˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
    getAllMatchEvents: async ( req, res, next) => {
        try{
            let matches = await match_instance.getAllMatchEvents(req.body); 
            res.status(200).json(matches); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllMatchEvents˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
};