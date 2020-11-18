'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    task_name:{
      type: DataTypes.STRING,
      primaryKey: true,
    }
  });

  Task.associate = models => {
    Task.belongsTo(models.Story, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};