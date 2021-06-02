'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Competition extends Model {
    static associate(models) { // through - koja je vezna; as - alias kojeg Sequelize koristi za izradu funkcija za upravljanje modelom; foreignKey - stupac koji u veznoj predstavlja ovaj PK (osim u belongsTo - tu predstavlja tuđi PK koji je dio ove tablice)
      this.belongsToMany(models.Team,{through:'team_competition',as:'teams_competition',foreignKey:'AF_ID_competition'}); //N:N pogledaj team.js model - ovo je samo druga strana relacije: kao alias smo naveli teams_competititon ilitiga Teams Of Competition pa će tako izgledati Sequelize funkcije za rad s bazom
    }
  };

  Competition.init({
    AF_ID_competition: { // u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    country: DataTypes.STRING,
    country_flag: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    modelName: 'Competition',
    freezeTableName: true, // -||-
  });

  return Competition;
};