'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Match extends Model {
    static associate(models) {
      this.belongsTo(models.Team,{foreignKey:"home_team",as:'Home_team'/*,onDelete:'CASCADE'*/}); // N strana 1:N relacije gdje navodimo stupac VLASTITE TABLICE/MODELA i alias po kojem Sequelize radi funkcije modela
      this.belongsTo(models.Team,{foreignKey:"guest_team",as:'Guest_team'/*,onDelete:'CASCADE'*/}); // -||-
      this.hasMany(models.Event,{foreignKey:'match_id'}); // 1 strana 1:N relacije, gdje navodimo da Model Match jest u relaciji s više instanci modela Event, preko STUPCA match_id U TABLICI Event!!! - koji sttupac tablice Match je TARGET se navodi u migraciji Eventa
      this.hasMany(models.Photo,{foreignKey:'match_id'}); // -||-
      this.belongsTo(models.User,{foreignKey:'user'}); // N strana 1:N relacije gdje navodimo stupac VLASTITE TABLICE/MODELA i alias po kojem Sequelize radi funkcije modela
      this.belongsTo(models.Competition,{foreignKey:'competition'}); // N strana 1:N relacije gdje navodimo stupac VLASTITE TABLICE/MODELA i alias po kojem Sequelize radi funkcije modela
    }
  };

  Match.init({
    match_id: {// u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement:true,
    },
    date_time: DataTypes.STRING,
    article: DataTypes.TEXT,
    stadium: DataTypes.STRING,
    home_team: DataTypes.BIGINT,
    guest_team: DataTypes.BIGINT,
    user: DataTypes.BIGINT,
    competition: DataTypes.BIGINT,
    result: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    modelName: 'Match',
    freezeTableName: true, // -||-
  });

  return Match;
};