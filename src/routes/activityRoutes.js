const express = require('express')
const route = express.Router()
const activityC = require('../controllers/activityController')

route.get('/activity', activityC.getAll)

module.exports = route