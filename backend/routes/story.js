var express = require('express')
const { getAll, create, updateStatus } = require('../controllers/story')
var router = express.Router()

router.post('/create', create)
router.get('/all', getAll)
router.put('/status-update', updateStatus)

module.exports = router
