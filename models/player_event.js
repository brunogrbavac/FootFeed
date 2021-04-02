'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player_event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  player_event.init({
    AF_ID_player: DataTypes.BIGINT,
    event_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'player_event',
    timestamps: false, //ručno dodato jer ne želimo dodatne stupce
    createdAt: false, //ručno dodato jer ne želimo dodatne stupce
    updatedAt: false, //ručno dodato jer ne želimo dodatne stupce
    freezeTableName: true, //ručno dodato jer ne želimo da minja ime tablice
  });
  return player_event;
};