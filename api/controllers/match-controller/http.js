const { match_instance } = require('../../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Match iz servicea
const { nodeLogger } = require('../../../loaders/logger');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    getAllMatches: async (req,res,next) => {
        try{
            let matches = await match_instance.getAllMatches(); 
            res.status(200).json(matches); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllMatches˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
    createMatch: async (req,res,next) => {
        try{
            let match = await match_instance.createMatch(req); 
            res.status(200).json(match); // status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝createMatch˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
    getAllMatchEvents: async (req,res,next) => {
        try{
            let matches = await match_instance.getAllMatchEvents(req.params.id); 
            res.status(200).json(matches); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllMatchEvents˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
    getAllUserMatches: async (req,res,next) => {
        try{
            let matches = await match_instance.getAllUserMatches(req); 
            res.status(200).json(matches); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllMatchEvents˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
    editMatch: async (req,res,next) => {
        try{
            let status = await match_instance.editMatch(req); 
            res.sendStatus(status); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllMatchEvents˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
    goLiveMatch: async (req,res,next) => {
        try{
            await match_instance.goLiveMatch(req.params.id); 
            res.sendStatus(200); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllMatchEvents˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
    goLiveHalf: async (req,res,next) => {
        try{
            await match_instance.goLiveHalf(req.params.id); 
            res.sendStatus(200); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllMatchEvents˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
};