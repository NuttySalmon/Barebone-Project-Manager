var express = require('express')
const { getAll, findOne, create, updateStatus, deleteTask} = require('../controllers/task')
const passport = require('passport')
var router = express.Router()

router.all('*', passport.authenticate('jwt', { session: false }))
router.post('/create', create)
router.get('/all', getAll)
router.get('/find', findOne)
router.put('/update', updateStatus)
router.delete('/delete', deleteTask)

module.exports = router