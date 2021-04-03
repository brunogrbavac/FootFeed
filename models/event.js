'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Match,{foreignKey:'match_id'}); //N strana 1:N relacije, navodi stupac VLASTITE TABLICE u kojem je referenciran PK modela Match
      this.belongsToMany(models.Player,{through:'player_event',foreignKey:'event_id',as:'events_player'}); //komentirano u team.js modelu
    }
  };
  Event.init({
    event_id: { //u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    type: DataTypes.STRING,
    time: DataTypes.STRING,
    match_id: DataTypes.BIGINT
  }, {
    sequelize,
    timestamps: false, //ručno dodato jer ne želimo dodatne stupce
    createdAt: false, //ručno dodato jer ne želimo dodatne stupce
    updatedAt: false, //ručno dodato jer ne želimo dodatne stupce
    modelName: 'Event',
    freezeTableName: true, //ručno dodato jer ne želimo da minja ime tablice
  });
  return Event;
};