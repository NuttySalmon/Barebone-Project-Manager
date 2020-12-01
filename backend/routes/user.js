var express = require('express')
var router = express.Router()
const { signup, signin, search } = require('../controllers/user')
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/search', search)
module.exports = router
