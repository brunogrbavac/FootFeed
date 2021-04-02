'use strict';
//PRVI SET SEEDOVA - ne ovisi o drugim tablicama
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Competition',
    [
      {AF_ID_competition:23423423424,name:"UCL",logo:"https://upload.wikimedia.org/wikipedia/sh/thumb/b/bf/UEFA_Champions_League_logo_2.svg/1200px-UEFA_Champions_League_logo_2.svg.png",country:'EU'},
      {AF_ID_competition:3453465,name:"HNL",logo:"http://ekrik.petagimnazija.hr/wp-content/uploads/2018/01/hnl.jpg",country:'Croatia'},
      {AF_ID_competition:3456547687,name:"WC",logo:"https://twenty10soccerworldcup.files.wordpress.com/2009/11/south-africa-2010-world-cup-logo-1.png?w=584",country:'World'},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Competition',null,{}) //PRVI ČLAN: tablica s kojom radimo, DRUGI ČLAN: where -> ako hoćemo SVE IZBRISAT stavljamo NULL tj. bez uvjeta, TREĆI ČLAN: dodatne opcije -> nemamo, pa stavlajamo prazan objekt tj. {}
  }
};
