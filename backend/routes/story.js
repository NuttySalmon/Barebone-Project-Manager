var express = require('express')
var router = express.Router()
const { Story } = require('../models')
const debug = require('debug')('debug:story')

router.post('/create', async (req, res) => {
  try {
    const result = await Story.create(req.body.data, {
      fields: ['name', 'start_date', 'end_date', 'progress'],
    })
    res.status(200).send({ data: result.dataValues})
  } catch (error) {
    if (error.name === 'SequelizeValidationError') res.status(400).send(error)
    res.status(500).send(error)
  }
})

router.get('/all', async (req, res) => {
  try {
    const result = await Story.findAll()
    res.send({ data: result }).status(200)
  } catch (error) {
    debug(error)
    res.status(500).send(error)
  }
})

module.exports = router
