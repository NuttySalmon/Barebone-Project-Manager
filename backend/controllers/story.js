const { Story } = require('../models')
const debug = require('debug')('debug:story-control')

exports.create = async (req, res) => {
  try {
    const result = await Story.create(req.body, {
      fields: ['name', 'start_date', 'end_date', 'progress'],
    })
    res.status(200).send(result.dataValues)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') res.status(400).send(error)
    res.status(500).send(error)
  }
}

exports.getAll = async (req, res) => {
  try {
    const result = await Story.findAll()
    res.send(result).status(200)
  } catch (error) {
    debug(error)
    res.status(500).send(error)
  }
}

exports.updateStatus = async (req, res) => {
  try {
    const { status, id } = req.body
    const newStatus = status
    if (typeof newStatus !== 'number') res.status(400).send('Invalid data type')
    if (newStatus > 3 || newStatus < 0) res.status(400).send('Invalid status')
    const result = await Story.update(
      { status: Math.floor(status) },
      { where: { id } }
    )
    res.status(200).send({ affectedRows: result[0] })
  } catch (error) {
    debug(error)
    console.log(error)
    if (error.name === 'SequelizeValidationError') res.status(400).send(error)
    else res.sendStatus(500)
  }
}
