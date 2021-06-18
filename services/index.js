const models = require('../models');
const { nodeLogger } = require('../loaders/logger');
const player_class = require('./player'); 
const match_class = require('./match'); 
const event_class = require('./event'); 
const update_class = require('./update');
const user_class = require('./user');
const photo_class = require('./photo');
const competition_class = require('./competition');


let player_instance = new player_class(models.Player, nodeLogger); // stvaramo instance klasa za rad s pojedinim Sequelize MODELIMA
let match_instance = new match_class(models.Match, models.Team, models.Event, models.Photo, models.User, models.Competition, nodeLogger); // stvaramo instance klasa za rad s pojedinim Sequelize MODELIMA
let event_instance = new event_class(models.Event, models.Match, models.player_event, nodeLogger);
let update_instance = new update_class(models.Team, models.team_competition, models.Player, models.player_team, nodeLogger);
let user_instance = new user_class(models.User, nodeLogger);
let photo_instance = new photo_class(models.Photo, nodeLogger);
let competition_instance = new competition_class(models.Competition, models.team_competition, models.Team, nodeLogger);

module.exports = { // exportamo stvorene funkcionalne instance kako bi kontroler mogao s njima rdaiti kao odgovor na zahtjeve po rutama
    player_instance: player_instance,
    match_instance: match_instance,
    event_instance: event_instance,
    update_instance: update_instance,
    user_instance: user_instance,
    photo_instance: photo_instance,
    competition_instance: competition_instance,
};