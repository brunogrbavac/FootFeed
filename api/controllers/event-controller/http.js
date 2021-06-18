const { event_instance } = require('../../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Event iz servicea
const { nodeLogger } = require('../../../loaders/logger');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    createEvent: async (req,res,next) => {
        try{
            let event = await event_instance.createEvent(req.body); 
            res.status(200).json(event); // vraća dohvaćene podatke te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝createEvent˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    }
};