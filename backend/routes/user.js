var express = require('express')
var router = express.Router()
const debug = require('debug')('debug:user')
const { signup, signin } = require('../controllers/user')
router.post('/signup', signup)
router.post('/signin', signin)
module.exports = router
