const {success, error} = require('../helpers/response')
const { sequelize } = require('../models')

// Registration
exports.register = async(req, res) => {
  const {name, email, password} = req.body
  try {
    await sequelize.query(`INSERT INTO "Users" (name, email, password)
    VALUES (:name, :email, :password)`, [name, email, password])
    return success(res, "Registration success", 201)
  }
  catch(err) {
    console.log(err)
    return error(res, err, 500)
  }
}

// Get all users
exports.getMe = async(req, res) => {
  try { 
    let [users] = await sequelize.query(`SELECT * FROM "Users"`)
    return success(res, users, 200)
  } 
  catch (err) {
    console.log(err)
    return error(res, err, 500)
  }
};