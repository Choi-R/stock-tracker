'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StockActivity.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      StockActivity.belongsTo(models.Stock, {
        foreignKey: 'stockId',
        as: 'stock'
      })
    }
  }
  StockActivity.init({
    type: {
      type: DataTypes.ENUM('Credit', 'Debit'),
      allowNull: false
    },
    stockAmount: DataTypes.INTEGER,
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
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'StockActivity',
  });
  return StockActivity;
};