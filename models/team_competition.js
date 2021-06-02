'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class team_competition extends Model {
    static associate(models) {
      // u veznim modelima ne navodimo asocijacije
    }
  };

  team_competition.init({
    AF_ID_competition:  {  // u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    AF_ID_team: {  //-||-
      type: DataTypes.BIGINT,
      primaryKey: true,
      }
  }, {
    sequelize,
    modelName: 'team_competition',
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    freezeTableName: true, // -||-
  });

  return team_competition;
};