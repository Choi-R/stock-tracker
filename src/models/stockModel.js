const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Trade model
const Trade = sequelize.define('Trade', {
  ticker: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shares: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tradeType: {
    type: DataTypes.ENUM('BUY', 'SELL'),
    allowNull: false,
  },
  tradeDate: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

sequelize.sync()
  .then(() => {
    console.log('Trade table created successfully.');
  })
  .catch((error) => {
    console.error('Unable to create table:', error);
  });

module.exports = Trade;
