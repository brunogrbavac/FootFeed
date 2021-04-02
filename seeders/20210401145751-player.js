'use strict';
//PRVI SET SEEDOVA - ne ovisi o drugim tablicama
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Player',
    [
      {AF_ID_player:23423423424,name:"Bruno",surname:"Grbavac",number:10},
      {AF_ID_player:3453465,name:"Ivan",surname:"Lukšić",number:9},
      {AF_ID_player:3456547687,name:"Mislav",surname:"Ivanda",number:7},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Player',null,{}) //PRVI ČLAN: tablica s kojom radimo, DRUGI ČLAN: where -> ako hoćemo SVE IZBRISAT stavljamo NULL tj. bez uvjeta, TREĆI ČLAN: dodatne opcije -> nemamo, pa stavlajamo prazan objekt tj. {}
  }
};
