'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player_team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  player_team.init({
    AF_ID_player: { //u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    AF_ID_team: { //u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'player_team',
    timestamps: false, //ručno dodato jer ne želimo dodatne stupce
    createdAt: false, //ručno dodato jer ne želimo dodatne stupce
    updatedAt: false, //ručno dodato jer ne želimo dodatne stupce
    freezeTableName: true, //ručno dodato jer ne želimo da minja ime tablice
  });
  return player_team;
};