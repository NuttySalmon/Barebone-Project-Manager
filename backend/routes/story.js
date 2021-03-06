var express = require('express')
const { getAll, create, updateStatus, getDetails, update, search } = require('../controllers/story')
const passport = require('passport')
var router = express.Router()

router.all('*', passport.authenticate('jwt', { session: false }))
router.post('/create', create)
router.get('/all', getAll)
router.get('/details', getDetails)
router.put('/status-update', updateStatus)
router.put('/update', update)
router.post('/search', search)

module.exports = router
