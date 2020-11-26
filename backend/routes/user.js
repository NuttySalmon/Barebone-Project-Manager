var express = require('express')
var router = express.Router()
const debug = require('debug')('debug:user')
const { create } = require('../controllers/users')
router.post('/create', create)
module.exports = router
