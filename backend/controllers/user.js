const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

exports.create = async (req, res) => {
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
