'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
  });

  User.associate = models => {
    User.belongsToMany(models.Story, {
      through: "User_Story"
    });
  };

  return User;
};
