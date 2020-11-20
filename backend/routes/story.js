var express = require('express')
var router = express.Router()
const { Story } = require('../models')
const debug = require('debug')('debug:story')

router.post('/create', async (req, res) => {
  console.log(req.body)
  try {
    await Story.create(req.body.data, {
      fields: ['name', 'start_date', 'end_date', 'progress'],
    })
    res.sendStatus(200)
  } catch (error) {
    debug(error)
    res.sendStatus(500)
  }
})

router.get('/all', async (req, res) => {
  console.log(req.body)
  try {
    const result = await Story.findAll()
    res.send(result).status(200)
  } catch (error) {
    debug(error)
    res.sendStatus(500)
  }
})

module.exports = router
