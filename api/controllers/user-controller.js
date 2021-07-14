const { user_instance } = require('../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Event iz servicea
const { nodeLogger } = require('../../loaders/logger');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    createUser: async (req,res,next) => {
        try{
            let result = await user_instance.createUser(req); 
            res.sendStatus(result);
        }catch(error){
            nodeLogger.error('Error occured in ˝createUser˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    }
};