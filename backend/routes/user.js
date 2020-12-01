var express = require('express')
var router = express.Router()
const debug = require('debug')('debug:user')
const { signup, signin, search } = require('../controllers/user')
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/search', search)
module.exports = router
