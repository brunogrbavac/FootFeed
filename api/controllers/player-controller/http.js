const { player_instance } = require('../../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Player iz servicea
const { nodeLogger } = require('../../../loaders/logger');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    getAllPlayersOfTeam: async (req, res, next) => {
        try{
            let players = await player_instance.getAllPlayersOfTeam(req); 
            res.status(200).send(players); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllPlayersOfTeam˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
};