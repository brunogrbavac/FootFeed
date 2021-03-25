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
      // define association here
    }
  };
  Team.init({
    AF_ID_team: DataTypes.BIGINT,
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    coach: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false, //ručno dodato jer ne želimo dodatne stupce
    createdAt: false,
    updatedAt: false,
    modelName: 'Team',
    freezeTableName: true,
  });
  return Team;
};