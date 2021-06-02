const { update_instance } = require('../../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Event iz servicea
const { nodeLogger } = require('../../../loaders/logger');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    updateFromAPIFOOTBALL: async ( req, res, next) => {
        try{
            let event = await update_instance.updateFromAPIFOOTBALL(req.body); 
            res.status(200).json(event); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝updateFromAPIFOOTBALL˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    }
};