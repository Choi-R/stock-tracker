const express = require('express')
const route = express.Router()
const userC = require('../controllers/userController')

route.get('/user', userC.getMe)

module.exports = route