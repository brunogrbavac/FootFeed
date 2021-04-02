'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('player_event', { //ovdje automatski stavi ime kao množinu od modela, ručno minjaš u jedninu
      AF_ID_player: { //sequelize automatski stvara id stupac koji je po defaultu PK, pa ga minjamo ručno
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references:{ //ovo polje je FK, koji se veže na tablicu modela Player, key je target stupac u tablici Player (njen PK), a as: je alias
          model: 'Player',
          key: 'AF_ID_player',
        },
        onUpdate: "CASCADE", //kada se promijeni vrijednost PK u tablici Player onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", //kada se izbirše redak u tablici Player sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
      },
      event_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references:{ //ovo polje je FK, koji se veže na tablicu modela Event, key je target stupac u tablici Event (njen PK), a as: je alias
          model: 'Event',
          key: 'event_id',
        },
        onUpdate: "CASCADE", //kada se promijeni vrijednost PK u tablici Event onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", //kada se izbirše redak u tablici Event sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
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
    await queryInterface.dropTable('player_event');
  }
};