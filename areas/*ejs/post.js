const { Sequelize, DataTypes } = require("sequelize");
const databaseConnectionString = require("../config/databaseConnectionSequelize.js");
const sequelize = new Sequelize(databaseConnectionString);
const likeModelFunc = require("./like.js");
const likeModel = likeModelFunc(sequelize, DataTypes);

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    message: DataTypes.STRING,
    reposts: DataTypes.INTEGER,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false,
  });

  Post.hasMany(likeModel, {foreignKey: 'post_id', timestamps: false})
  likeModel.belongsTo(Post, {foreignKey: 'post_id', timestamps: false})

  return Post;
};


