'use strict';
//TREĆI SET SEEDOVA - ovisi o seedu iz drugog seta - match
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Event',
    [
      {type:"RED CARD",time:"30:45",match_id:4},
      {type:"YELLOW CARD",time:"30:45",match_id:5},
      {type:"GOAL",time:"30:45",match_id:4},
      {type:"RED CARD",time:"30:45",match_id:6},
      {type:"YELLOW CARD",time:"30:45",match_id:4},
      {type:"GOAL",time:"30:45",match_id:5}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Event',null,{}) //PRVI ČLAN: tablica s kojom radimo, DRUGI ČLAN: where -> ako hoćemo SVE IZBRISAT stavljamo NULL tj. bez uvjeta, TREĆI ČLAN: dodatne opcije -> nemamo, pa stavlajamo prazan objekt tj. {}
  }
};
