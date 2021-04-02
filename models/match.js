'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Team,{foreignKey:"home_team",as:'Home_team'/*,onDelete:'CASCADE'*/}); // N strana 1:N relacije gdje navodimo stupac VLASTITE TABLICE/MODELA i alias po kojem Sequelize radi funkcije modela
      this.belongsTo(models.Team,{foreignKey:"guest_team",as:'Guest_team'/*,onDelete:'CASCADE'*/}); // -||-
      this.hasMany(models.Event,{foreignKey:'match_id'}); // 1 strana 1:N relacije, gdje navodimo da Model Match jest u relaciji s više instanci modela Event, preko STUPCA match_id U TABLICI Event!!! - koji sttupac tablice Match je TARGET se navodi u migraciji Eventa
    }
  };
  Match.init({
    match_id: DataTypes.BIGINT,
    date_time: DataTypes.DATE,
    article: DataTypes.STRING,
    stadium: DataTypes.STRING,
    home_team: DataTypes.BIGINT,
    guest_team: DataTypes.BIGINT
  }, {
    sequelize,
    timestamps: false, //ručno dodato jer ne želimo dodatne stupce
    createdAt: false, //ručno dodato jer ne želimo dodatne stupce
    updatedAt: false, //ručno dodato jer ne želimo dodatne stupce
    modelName: 'Match',
    freezeTableName: true, //ručno dodato jer ne želimo da minja ime tablice
  });
  return Match;
};