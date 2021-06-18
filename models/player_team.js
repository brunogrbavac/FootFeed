'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class player_team extends Model {
    static associate(models) {
      // u veznim modelima ne navodimo asocijacije
    }
  };

  player_team.init({
    AF_ID_player: { // u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    AF_ID_team: { // -||-
      type: DataTypes.BIGINT,
      primaryKey: true,
    },      
    start: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'player_team',
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    freezeTableName: true, // -||-
  });

  return player_team;
};