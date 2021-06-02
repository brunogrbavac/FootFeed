'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Photos', {
      uri: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,      },
      match_id: {
        type: Sequelize.BIGINT,
        references:{ // ovo polje je FK, koji se veže na tablicu modela Match, key je target stupac u tablici Match (njen PK), a as: je alias
          model:'Match',
          key:'match_id',
          as:'match_id'
        },
        onUpdate: "CASCADE", // kada se promijeni vrijednost PK u tablici Match onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", // kada se izbirše redak u tablici Match sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Photos');
  }
};