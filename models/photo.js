'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Photo extends Model {
    static associate(models) {// through - koja je vezna; as - alias kojeg Sequelize koristi za izradu funkcija za upravljanje modelom; foreignKey - stupac koji u veznoj predstavlja ovaj PK (osim u belongsTo - tu predstavlja tuđi PK koji je dio ove tablice)
      this.belongsTo(models.Match,{foreignKey:'match_id'}); // N strana 1:N relacije - navodimo koji stupac naše tablice referira primary key povezane
    }
  };

  Photo.init({
    uri: {// u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type:DataTypes.STRING,
      primaryKey:true
    },
    match_id: DataTypes.BIGINT,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photo',
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    freezeTableName: true, // -||-
  });

  return Photo;
};