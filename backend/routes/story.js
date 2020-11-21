var express = require('express')
var router = express.Router()
const { Story } = require('../models')
const debug = require('debug')('debug:story')

router.post('/create', async (req, res) => {
  try {
    const result = await Story.create(req.body.data, {
      fields: ['name', 'start_date', 'end_date', 'progress'],
    })
    res.status(200).send(result.dataValues)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') res.status(400).send(error)
    res.status(500).send(error)
  }
})

router.get('/all', async (req, res) => {
  try {
    const result = await Story.findAll()
    res.send(result).status(200)
  } catch (error) {
    debug(error)
    res.status(500).send(error)
  }
})

router.put('/status-update', async (req, res) => {
  const { data } = req.body
  try {
    const newStatus = data.status
    if (typeof newStatus !== 'number') res.status(400).send('Invalid data type')
    if (newStatus > 3 || newStatus < 0) res.status(400).send('Invalid status')
    const result = await Story.update(
      { status: Math.floor(data.status) },
      { where: { id: data.id } }
    )
    res.status(200).send({ affectedRows: result[0] })
  } catch (error) {
    debug(error)
    console.log(error)
    if (error.name === 'SequelizeValidationError') res.status(400).send(error)
    else res.sendStatus(500)
  }
})

module.exports = router
