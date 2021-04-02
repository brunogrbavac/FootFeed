'use strict';
//PRVI SET SEEDOVA - ne ovisi o drugim tablicama
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Team',
    [
      {AF_ID_team:123123,name:"FC Barcelona",coach:'Ronald Koeman',logo:"https://logos-world.net/wp-content/uploads/2020/04/Barcelona-Logo.png"},
      {AF_ID_team:4536,name:"FC Inter Milan",coach:'Antonio Conte',logo:"https://e7.pngegg.com/pngimages/516/160/png-clipart-inter-milan-a-c-milan-uefa-champions-league-fc-internazionale-milano-inter-store-milano-inter-milan-sport-logo.png"},
      {AF_ID_team:9867,name:"Atletico Madrid",coach:'Diego Simeone',logo:"https://logos-world.net/wp-content/uploads/2020/06/Atletico-Madrid-Logo-2016-2017.jpg"},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Team',null,{}) //PRVI ČLAN: tablica s kojom radimo, DRUGI ČLAN: where -> ako hoćemo SVE IZBRISAT stavljamo NULL tj. bez uvjeta, TREĆI ČLAN: dodatne opcije -> nemamo, pa stavlajamo prazan objekt tj. {}
  }
};
