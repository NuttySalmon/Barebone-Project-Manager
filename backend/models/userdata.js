'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Story, {
        through: "User_Story"
      })
      // define association here
    }
  }
  User.init(
    { 
      user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false,
        unique: false,
      },
    },
    {
      sequelize,
      modelName: 'UserData',
    }
  );
  return User;
};
