'use strict';
//DRUGI SET SEEDOVA - ovisi samo o seedu iz prvog seta - team
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Match',
    [
      {date_time:'2004-10-19 10:00:00+02',article:"Vernajs1",stadium:'Gospin Dolac',home_team:123123, guest_team:123123},
      {date_time:'2004-10-19 10:00:00+02',article:"Vernajs2",stadium:'Nou Camp',home_team:4536, guest_team:9867},
      {date_time:'2004-10-19 10:00:00+02',article:"Vernajs3",stadium:'San Siro',home_team:9867, guest_team:4536},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Match',null,{}) //PRVI ČLAN: tablica s kojom radimo, DRUGI ČLAN: where -> ako hoćemo SVE IZBRISAT stavljamo NULL tj. bez uvjeta, TREĆI ČLAN: dodatne opcije -> nemamo, pa stavlajamo prazan objekt tj. {}
  }
};