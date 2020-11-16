'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Story, {
        foreignKey: {
          allowNull: false
        }
      })
      // define association here
    }
  }
  Task.init(
    { 
      task_name:{
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'TaskData',
    }
  );
  return Task;
};