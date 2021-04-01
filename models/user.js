const { Sequelize, DataTypes, Model } = require('sequelize');
const databaseConnectionString = include("../databaseConnectionSequelize");
const sequelize = new Sequelize(databaseConnectionString);

'use strict';
export class User extends Model {

  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
