'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Competition', { // ovdje automatski stavi ime kao množinu od modela, ručno minnjaš u jedninu
      AF_ID_competition: { // sequelize automatski stvara id stupac koji je po defaultu PK, pa ga minjamo ručno
        primaryKey: true, // ručno sve minjato
        allowNull: false,
        type: Sequelize.BIGINT      
      },
      name: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      country_flag: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Competition');
  }
};