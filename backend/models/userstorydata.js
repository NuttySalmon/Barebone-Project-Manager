'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User_Story = sequelize.define("User_Story", {
  });

  return User_Story;
};
