'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Event extends Model {
    static associate(models) { // through - koja je vezna; as - alias kojeg Sequelize koristi za izradu funkcija za upravljanje modelom; foreignKey - stupac koji u veznoj predstavlja ovaj PK (osim u belongsTo - tu predstavlja tuđi PK koji je dio ove tablice)
      this.belongsTo(models.Match,{foreignKey:'match_id'}); //N strana 1:N relacije, navodi stupac VLASTITE TABLICE u kojem je referenciran PK modela Match
      this.belongsToMany(models.Player,{through:'player_event',foreignKey:'event_id',as:'events_player'}); //komentirano u team.js modelu
    }
  };

  Event.init({
    event_id: { // u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement:true
    },
    type: DataTypes.STRING,
    time: DataTypes.STRING,
    match_id: DataTypes.BIGINT,
    article: DataTypes.TEXT,
  }, {
    sequelize,
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    modelName: 'Event',
    freezeTableName: true, // -||-
  });

  return Event;
};