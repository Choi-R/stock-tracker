const express = require('express')
const route = express.Router()
const stockC = require('../controllers/stockController')
const { authenticate } = require('../middlewares/auth')

route.get('/stock')

module.exports = route