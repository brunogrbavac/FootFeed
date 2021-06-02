const { player_instance } = require('../../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Player iz servicea
const { nodeLogger } = require('../../../loaders/logger');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    getAllPlayers: async (msg, socket) => {
        try{
            let players = await player_instance.getAllPlayers();
            nodeLogger.info('Message has been recieved: '+ msg);
            socket.emit('/player/all', JSON.stringify(players)); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
        }catch(error){
            nodeLogger.error('Error occured in ˝getAllPlayers˝ SOCKET function (controller)' + error);
            // next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
};