var express = require('express')
const { getAll, create, updateStatus, deleteTask} = require('../controllers/task')
const passport = require('passport')
var router = express.Router()

router.all('*', passport.authenticate('jwt', { session: false }))
router.post('/create', create)
router.get('/all', getAll)
router.put('/status-update', updateStatus)
router.delete('/delete-task', deleteTask)

module.exports = router