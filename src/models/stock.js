'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  Stock.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,6]
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    averagePrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    totalValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};