const models = require('../models');
const { nodeLogger } = require('../loaders/logger');
const player_class = require('./player'); 

let player_instance = new player_class(models.Player, nodeLogger); //stvaramo instance klasa za rad s pojedinim Sequelize MODELIMA

module.exports = { //exportamo stvorene funkcionalne instance kako bi kontroler mogao s njima rdaiti kao odgovor na zahtjeve po rutama
    player_instance: player_instance,
};