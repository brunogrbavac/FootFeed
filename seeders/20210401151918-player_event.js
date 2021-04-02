'use strict';
//ČETVRTI SET SEEDOVA - ovisi o seedu iz trećeg seta - event
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('player_events',
    [
      {AF_ID_player:23423423424,event_id:7},
      {AF_ID_player:3453465,event_id:7},
      {AF_ID_player:3456547687,event_id:11},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('player_events',null,{}) //PRVI ČLAN: tablica s kojom radimo, DRUGI ČLAN: where -> ako hoćemo SVE IZBRISAT stavljamo NULL tj. bez uvjeta, TREĆI ČLAN: dodatne opcije -> nemamo, pa stavlajamo prazan objekt tj. {}
  }
};
