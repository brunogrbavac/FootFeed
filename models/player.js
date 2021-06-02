'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Player extends Model {
    static associate(models) {
      this.belongsToMany(models.Team,{through:'player_team',foreignKey:'AF_ID_player',as:'players_team'}); // objašnjeno u team modelu
      this.belongsToMany(models.Event,{through:'player_event',foreignKey:'AF_ID_player',as:'players_event'}); // -||-
    }
  };

  Player.init({
    AF_ID_player: { // u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type:DataTypes.BIGINT,
      primaryKey:true
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    number: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    modelName: 'Player',
    freezeTableName: true, // -||-

  });

  return Player;
};