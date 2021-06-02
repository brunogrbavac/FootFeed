'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // RELACIJE U SEQUELIZEU - moraju biti navedene u oba MODELA, i u migraciji one tablice koja ima FK - za FK se navodi što referencira
      this.hasMany(models.Match,{foreignKey:'home_team',as:'Home_team'}); // hasMany je druga strana relacije 1:N, ovdje je to relacija Team-Match, foreigKey je ime ključa u tablici Match na kojeg se vežemo, dok je Home_tean alias, alias u Sequeliezu govori kako da nazove razne metode modela Match na koji se vezemo, inace bi ih nazva po modelu tj. Team, a mi imamo HOM i AWAY pa nam ne odgovara
      this.hasMany(models.Match,{foreignKey:'guest_team',as:'Guest_team'}); // -||-
      this.belongsToMany(models.Player,{through:'player_team',as:'teams_player',foreignKey:'AF_ID_team'}); // jedan kraj relacije N:N. THROUGH je ime tablice (modela) koji je VEZNA TABLICA te veze, ovo as je isto ALIAS za neke funkcije automatske, foreignKey: KLJUČ KOJEG REFERENCIRAMO U VEZNOJ TABLICI?
      this.belongsToMany(models.Competition,{through:'team_competition',as:'teams_competition',foreignKey:'AF_ID_team'}); // -||-
    }
  };
  Team.init({
    AF_ID_team: { // u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    coach: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    modelName: 'Team',
    freezeTableName: true, // -||-
  });
  return Team;
};