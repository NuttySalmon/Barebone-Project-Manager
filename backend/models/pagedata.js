'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Page.init(
    { 
      start_date: {
        type: DataTypes.DataTypes,
        primaryKey: false,
        allowNull: false,
        unique: false,
      },
      end_date: {
        type: DataTypes.DataTypes,
        primaryKey: false,
        allowNull: false,
        unique: false,
      },
      project_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      completion_status: {
        type: DataTypes.init,
        primaryKey: false,
        allowNull: false,
        unique: false,
      },
    },
    
    {
      sequelize,
      modelName: 'PageData',
    }
  );
  return Page;
};
