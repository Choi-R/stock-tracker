const Trade = require('../models/stockModel');

// Get all trades
exports.getAll = async (req, res) => {
  try {
    const trades = await Trade.findAll();
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve trades' });
  }
};
