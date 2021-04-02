'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Event', { //ovdje automatski stavi ime kao množinu od modela, ručno minjaš u jedninu
      event_id: { //sequelize automatski stvara id stupac koji je po defaultu PK, pa ga minjamo ručno
        primaryKey: true, //ručno sve minjato
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.BIGINT      
      },
      type: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      match_id: {
        type: Sequelize.BIGINT,
        references: { //ovo polje je FK, koji se veže na tablicu modela Match, key je target stupac u tablici Match (njen PK), a as: je alias
          model: 'Match',
          key: 'match_id',
          as: 'match_id',
        },
        onUpdate: "CASCADE", //kada se promijeni vrijednost PK u tablici Match onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", //kada se izbirše redak u tablici Match sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
      },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Event'); //ovdje automatski stavi ime kao množinu od modela, ručno minjaš u jedninu
  }
};