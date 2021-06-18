'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', { // ovdje automatski stavi ime kao množinu od modela, ručno minnjaš u jedninu
      user_id: { // sequelize automatski stvara id stupac koji je po defaultu PK, pa ga minjamo ručno
        type: Sequelize.BIGINT, // ručno sve minjato
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};