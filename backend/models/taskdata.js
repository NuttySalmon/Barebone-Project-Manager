'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    task_id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    complete: {
      type: DataTypes.BOOLEAN,
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