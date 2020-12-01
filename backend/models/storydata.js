'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    member: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })

  Story.associate = models => {
    Story.hasMany(models.Task, {
      onDelete: 'cascade',
    })

    Story.belongsTo(models.User, {
      foreignKey: {
        name: 'assigned',
      },
    })

    /*Story.belongsToMany(models.User, {
      through: "User_Story"
    });*/
  }

  return Story
}
