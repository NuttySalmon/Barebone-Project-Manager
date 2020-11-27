const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const fs = require('fs')

exports.signup = async (req, res) => {
  try {
    const newUser = req.body.data
    const existingUser = await User.findAll({
      where: { username: newUser.username },
    })
    if (existingUser.length)
      return res.status(400).json({ username: 'Username already exists!' })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err
        newUser.password = hash
        try {
          await User.create(newUser, {
            fields: ['username', 'firstname', 'lastname', 'password'],
          })
          delete newUser.password
          res.send(newUser)
        } catch (err) {
          res.status(500).send(err)
        }
      })
    })
  } catch (err) {
    return res.status(400).send(err)
  }
}

exports.signin = async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send('Username and password cannot be empty')

  const { username, password } = req.body
  const user = await User.findAll({ where: { username } })

  //check for user
  if (!user.length) return res.status(404).send('User not found')
  let passwordHash = user[0].dataValues.password

  //check for password
  try {
    const isMatch = await bcrypt.compare(password, passwordHash)
    if (isMatch) {
      // user matched
      console.log('matched!')
      const { id, username } = user[0].dataValues
      const payload = { id, username } //jwt payload
      // console.log(payload)
      jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: 3600, algorithm: 'RS256' }, (err, token) => {
        if (err)
          res.status(401).send({
            success: false,
            error: err,
          })
        else
          res.send({
            success: true,
            token,
          })
      })
    } else {
      return res.status(400).send('Incorrect password')
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}