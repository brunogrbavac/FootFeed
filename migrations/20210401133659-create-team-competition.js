'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('team_competition', { // ovdje automatski stavi ime kao množinu od modela, ručno minjaš u jedninu
      AF_ID_competition: { // sequelize automatski stvara id stupac koji je po defaultu PK, pa ga minjamo ručno
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references:{ // ovo polje je FK, koji se veže na tablicu modela Competition, key je target stupac u tablici Competition (njen PK), a as: je alias
          model: 'Competition',
          key: 'AF_ID_competition',
        },
        onUpdate: "CASCADE", // kada se promijeni vrijednost PK u tablici Competition onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", // kada se izbirše redak u tablici Competition sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
      },
      AF_ID_team: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references:{ // ovo polje je FK, koji se veže na tablicu modela Team, key je target stupac u tablici Team (njen PK), a as: je alias
          model: 'Team',
          key: 'AF_ID_team',
        },
        onUpdate: "CASCADE", // kada se promijeni vrijednost PK u tablici Team onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", // kada se izbirše redak u tablici Team sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('team_competition'); // ovdje automatski stavi ime kao množinu od modela, ručno minjaš u jedninu
  }
};