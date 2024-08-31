const express = require('express')
const route = express.Router()
const userC = require('../controllers/userController')
const { authenticate } = require('../middlewares/auth')

route.post('/user', userC.register)
route.post('/user/login', userC.login)
route.get('/user', authenticate, userC.getMe)
route.put('/user', authenticate, userC.editMe)

module.exports = route