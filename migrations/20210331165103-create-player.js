'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Player', { // ovdje automatski stavi ime kao množinu od modela, ručno minnjaš u jedninu
      AF_ID_player: { // sequelize automatski stvara id stupac koji je po defaultu PK, pa ga minjamo ručno
        primaryKey: true,
        type: Sequelize.BIGINT,// ručno sve minjato
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Player'); // ovdje automatski stavi ime kao množinu od modela, ručno minnjaš u jedninu
  }
};