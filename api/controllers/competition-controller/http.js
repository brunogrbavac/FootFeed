const { competition_instance } = require('../../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Match iz servicea
const { nodeLogger } = require('../../../loaders/logger');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    getAllCompetitionsAndTeams: async (req,res,next) => {
        try{
            let competitions = await competition_instance.getAllCompetitionsAndTeams(); 
            res.status(200).json(competitions); // vraća dohvaćene podatke kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllCompetitionsAndTeams˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
};