const config = require('../config');

module.exports = class Player{ //ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(player,logger){
        this.Player = player;
        this.Logger = logger;
    };
    
    async getAllPlayers(){
        try{
            const players = await this.Player.findAll(); //dohvaća sve redke iz tablice u bazi koja odgovara Sequelize modelu Player
            for(let everyPlayer in players){this.Logger.info(JSON.stringify(everyPlayer));}; //loggamo odgovor querryja kao JSON u konzolu servera
            return players;
        }catch(error){
            this.Logger.error('Error occured in ˝getAllPlayers˝ function (service)' + error);
            throw(error);
        }
    };
};