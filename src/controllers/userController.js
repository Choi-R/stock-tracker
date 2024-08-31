const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { success, error, serverError } = require('../helpers/response')
const { emptyBody } = require('../helpers/validation')
const { sequelize } = require('../models')

// Registration
exports.register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    // Check body empty
    const emptyMessage = emptyBody({ name, email, password })
    if (emptyMessage) { return error(res, emptyMessage, 400) }

    // Check user exist
    const [users] = await sequelize.query(`SELECT email from "Users" WHERE email = :email`, {
      replacements: { email }
    })
    if (users[0]) { return error(res, `This email is already used`, 400) }

    // Registration process
    const hashed = await bcrypt.hash(password, 10)
    await sequelize.query(`INSERT INTO "Users" (name, email, password, "createdAt", "updatedAt")
              VALUES (:name, :email, :hashed, :createdAt, :updatedAt)`, {
      replacements: { name, email, hashed, createdAt: new Date(), updatedAt: new Date() }
    })
    return success(res, "Registration success", 201)
  }
  catch (err) { return serverError(res, err) }
}

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    // Check input
    const emptyMessage = emptyBody({ email, password })
    if (emptyMessage) { return error(res, emptyMessage, 400) }

    const [users] = await sequelize.query(`SELECT id, password from "Users" WHERE email = :email AND isDeleted = :isDeleted`, {
      replacements: { email, isDeleted: false }
    })
    if (!users[0]) { return error(res, `Account doesn't exist`, 400) }

    const isValid = await bcrypt.compare(password, users[0].password)
    if (!isValid) { return error(res, `Incorrect email or password`, 400) }

    // Login
    const token = jwt.sign({ id: users[0].id, email }, process.env.SECRET_KEY, { expiresIn: '24h' })
    return success(res, token, 200)
  }
  catch (err) { return serverError(res, err) }
}

// Get profile
exports.getMe = async (req, res) => {
  const { id } = req.user
  try {
    let [users] = await sequelize.query(`SELECT name, email, "createdAt" FROM "Users" WHERE id = :id`, {
      replacements: { id }
    })
    return success(res, users[0], 200)
  }
  catch (err) { return serverError(res, err) }
};

// Edit profile
exports.editMe = async (req, res) => {
  const { id } = req.user
  const { name, email, password } = req.body
  try {
    let updated = { id }
    let updateQuery = []
    if (name) {
      if (name.length < 1) { return error(res, "Name cannot be blank", 400) }
      else {
        updated.name = name
        updateQuery.push(`name = :name`)
      }
    }
    if (email) {
      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) { return error(res, "Incorrect email format", 400) }
      else {
        updated.email = email
        updateQuery.push(`email = :email`)
      }
    }
    if (password) {
      if (password.length < 1) { return error(res, "Password cannot be blank", 400) }
      else {
        const hashed = await bcrypt.hash(password, 10)
        updated.password = hashed
        updateQuery.push(`password = :password`)
      }
    }

    if (Object.keys(updated).length == 0) { return error(res, "No information updated", 400) }
    else {
      updated.id = id
      await sequelize.query(`UPDATE "Users" SET ${updateQuery.join(', ')} WHERE id = :id`, {
        replacements: updated
      })
      return success(res, "Information updated", 200)
    }
  }
  catch (err) { return serverError(res, err) }
}

// Delete my account, not actually delete, just set isDelete to true
exports.deleteMe = async (req, res) => {
  const { id } = req.user
  try {
    await sequelize.query(`UPDATE "Users" SET isDeleted = :isDeleted WHERE id = :id`, {
      replacements: { id, isDeleted: true }
    })
    return success(res, "Your account has been deleted", 200)
  }
  catch (err) { return serverError(res, err) }
}