'use strict';
//PRVI SET SEEDOVA - ne ovisi o drugim tablicama
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Competition',
    [
      {AF_ID_competition:210,name:"Prva HNL",logo:"https://media.api-sports.io/football/leagues/210.png",country:'Croatia',country_flag:'https://media.api-sports.io/flags/hr.svg'},
      // {AF_ID_competition:2,name:"UEFA Champions League",logo:"http://ekrik.petagimnazija.hr/wp-content/uploads/2018/01/hnl.jpg",country:'EU',country_flag:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/800px-Flag_of_Europe.svg.png'},
      {AF_ID_competition:78,name:"Bundesliga 1",logo:"https://media.api-sports.io/football/leagues/78.png",country:'Germany',country_flag:'https://media.api-sports.io/flags/de.svg'},
      {AF_ID_competition:39,name:"Premier League",logo:"https://media.api-sports.io/football/leagues/39.png",country:'England',country_flag:'https://media.api-sports.io/flags/gb.svg'},   
      {AF_ID_competition:140,name:"Primera Division",logo:"https://media.api-sports.io/football/leagues/140.png",country:'Spain',country_flag:'https://media.api-sports.io/flags/es.svg'},   
      {AF_ID_competition:135,name:"Serie A",logo:"https://media.api-sports.io/football/leagues/135.png",country:'Italy',country_flag:'https://media.api-sports.io/flags/it.svg'},   
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Competition',null,{}) //PRVI ČLAN: tablica s kojom radimo, DRUGI ČLAN: where -> ako hoćemo SVE IZBRISAT stavljamo NULL tj. bez uvjeta, TREĆI ČLAN: dodatne opcije -> nemamo, pa stavlajamo prazan objekt tj. {}
  }
};
