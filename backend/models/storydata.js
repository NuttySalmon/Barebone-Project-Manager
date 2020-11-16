'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Story.hasMany(models.Task, {
        onDelete: "cascade"
      })
      Story.belongsToMany(models.User, {
        through: "User_Story"
      })
      // define association here
    }
  }
  Story.init(
    {
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
    },
    {
      sequelize,
      modelName: 'StoryData',
    }
  )
  return Story
}
