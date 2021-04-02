'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team_competition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  team_competition.init({
    AF_ID_competition: DataTypes.BIGINT,
    AF_ID_team: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'team_competition',
    timestamps: false, //ručno dodato jer ne želimo dodatne stupce
    createdAt: false, //ručno dodato jer ne želimo dodatne stupce
    updatedAt: false, //ručno dodato jer ne želimo dodatne stupce
    freezeTableName: true, //ručno dodato jer ne želimo da minja ime tablice
  });
  return team_competition;
};