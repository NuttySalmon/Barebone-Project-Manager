'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define("Story", {
    story_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    story_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    story_creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    story_status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    story_progress:{
      type: DataTypes.INTEGER
    }
  });

  Story.associate = models => {
    Story.hasMany(models.Task, {
      onDelete: "cascade"
    });

    Story.belongsToMany(models.User, {
      through: "User_Story"
    });
  };

  return Story
};
