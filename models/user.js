'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) { 
      this.hasMany(models.Match,{foreignKey:'user'}) // foreignKey se odnosi na stupac u Match koji je referenca na PK ove tablice
    }
  };

  User.init({
    username:{ // u Sequelize modelu također treba naznačiti PK, inače pri queryjanju odgovarajuće tablice baze preko Sequelize MODELA on za redak traži DEFAULT PK STUPAC "id" i javlja ERR:"column 'id' does not exist"
      type:DataTypes.STRING,
      primaryKey:true
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.TEXT,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false, // ručno dodato jer ne želimo dodatne stupce
    createdAt: false, // -||-
    updatedAt: false, // -||-
    freezeTableName: true, // -||-
  });

  return User;
};