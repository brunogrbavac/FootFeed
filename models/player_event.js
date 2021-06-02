'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class player_event extends Model {
    static associate(models) {
      // u veznim modelima ne navodimo asocijacije
    }
  };

  player_event.init({
    AF_ID_player: { // u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    event_id: { // -||-
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    order: DataTypes.SMALLINT,
  }, {
    sequelize,
    modelName: 'player_event',
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    freezeTableName: true, // -||-
  });

  return player_event;
};