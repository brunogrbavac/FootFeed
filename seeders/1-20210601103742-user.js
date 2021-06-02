'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('User',
    [
      {username:"admin",name:"Admino",name:"Administri",email:"admin@footfeed.com",bio:"",photo:"https://media.api-sports.io/football/teams/608.png",password:"$2b$12$gCGPSmCpj9qxSyfaDOaXjeqHw25mZoh.JZ2NmavaKPuOo9IxnX3s6"},
      {username:"user1",name:"Useriyan",name:"Oneovich",email:"user1@footfeed.com",bio:"",photo:'',password:"$2b$12$gCGPSmCpj9qxSyfaDOaXjeqHw25mZoh.JZ2NmavaKPuOo9IxnX3s6"},
      {username:"user2",name:"Useros",name:"Duedi",email:"user2@footfeed.com",bio:"",photo:"https://logos-world.net/wp-content/uploads/2020/06/Atletico-Madrid-Logo-2016-2017.jpg",password:"$2b$12$gCGPSmCpj9qxSyfaDOaXjeqHw25mZoh.JZ2NmavaKPuOo9IxnX3s6"},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User',null,{}) //PRVI ČLAN: tablica s kojom radimo, DRUGI ČLAN: where -> ako hoćemo SVE IZBRISAT stavljamo NULL tj. bez uvjeta, TREĆI ČLAN: dodatne opcije -> nemamo, pa stavlajamo prazan objekt tj. {}
  }
};
