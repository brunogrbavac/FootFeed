'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Team,{through:'team_competition',as:'teams_competition',foreignKey:'AF_ID_competition'}); //N:N pogledaj team.js model - ovo je samo druga strana relacije: kao alias smo naveli teams_competititon ilitiga Teams Of Competition pa će tako izgledati Sequelize funkcije za rad s bazom
    }
  };
  Competition.init({
    AF_ID_competition: DataTypes.BIGINT,
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false, //ručno dodato jer ne želimo dodatne stupce
    createdAt: false, //ručno dodato jer ne želimo dodatne stupce
    updatedAt: false, //ručno dodato jer ne želimo dodatne stupce
    modelName: 'Competition',
    freezeTableName: true, //ručno dodato jer ne želimo da minja ime tablice
  });
  return Competition;
};