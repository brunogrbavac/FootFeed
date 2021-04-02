'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Team,{through:'player_team',foreignKey:'AF_ID_player',as:'players_team'}); //objašnjeno u team modelu
      this.belongsToMany(models.Event,{through:'player_event',foreignKey:'AF_ID_player',as:'players_event'}); // -||-
    }
  };
  Player.init({
    AF_ID_player: DataTypes.BIGINT,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false, //ručno dodato jer ne želimo dodatne stupce
    createdAt: false, //ručno dodato jer ne želimo dodatne stupce
    updatedAt: false, //ručno dodato jer ne želimo dodatne stupce
    modelName: 'Player',
    freezeTableName: true, //ručno dodato jer ne želimo da minja ime tablice

  });
  return Player;
};