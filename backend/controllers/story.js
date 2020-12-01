const Sequelize = require('sequelize')
const { Story, Task, User } = require('../models')
const debug = require('debug')('debug:story-control')

exports.create = async (req, res) => {
  req.body.start_date = fixEmptyDates(req.body.start_date)
  req.body.end_date = fixEmptyDates(req.body.end_date)
  try {
    const result = await Story.create(req.body, {
      fields: ['name', 'start_date', 'end_date', 'progress', 'assigned'],
    })
    res.status(200).send(result.dataValues)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') res.status(400).send(error)
    res.status(500).send(error)
  }
}

exports.getAll = async (req, res) => {
  try {
    const result = await Story.findAll({
      include: [
        { model: User, attributes: ['username', 'firstname', 'lastname'] },
      ],
    })
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

exports.getDetails = async (req, res) => {
  let story = null
  let id = req.query.id
  if (!id) return res.sendStatus(400)
  try {
    story = await Story.findByPk(id, {
      include: [{ model: Task }],
    })
  } catch (error) {
    return res.status(404).send(error)
  }
  console.log(id)
  res.status(200).send(story)
}

const fixEmptyDates = dateStr => {
  if (!dateStr || dateStr === 'Invalid date') return null
  return dateStr
}

exports.update = async (req, res) => {
  const { id } = req.body
  req.body.start_date = fixEmptyDates(req.body.start_date)
  req.body.end_date = fixEmptyDates(req.body.end_date)
  console.log(req.body)

  try {
    const result = await Story.update(req.body, {
      fields: [
        'name',
        'start_date',
        'end_date',
        'progress',
        'details',
        'assigned',
      ],
      where: { id },
    })
    res.status(200).send({ affectedRows: result[0] })
  } catch (error) {
    if (error.name === 'SequelizeValidationError') res.status(400).send(error)
    res.status(500).send(error)
  }
}

exports.search = async (req, res) => {
  const { name } = req.body
  try {
    const result = await Story.findAll({
      limit: 20,
      where: {
        name: {
          [Sequelize.Op.like]: `%${name}%`,
        },
      },
    })
    res.send(result).status(200)
  } catch (error) {
    debug(error)
    console.log(name)
    res.status(500).send(error)
  }
}
