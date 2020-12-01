const { Task } = require('../models')
const debug = require('debug')('debug:user-control')

exports.create = async (req, res) => {
  const { storyId, name } = req.body
  if (!name) return res.status(400).send('Name cannot be empty')
  if (storyId === undefined)
    return res.status(400).send('Must include story id')

  try {
    const newTask = {
      name,
      StoryId: storyId,
      complete: false,
    }
    const result = await Task.create(newTask)
    res.status(200).send(result.dataValues)
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'TypeError')
      return res.status(400).send('Invalid name')
    res.status(500).send(error.message)
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.query
    const found = await Task.findOne({ where: { id } })
    if (!found) return res.status(404).send(`Task ${id} does not exist`)
    const result = await Task.destroy({
      where: { id },
    })
    return res.status(200).send(`Task ${id} deleted`)
  } catch (error) {
    debug(error)
    console.log(error)
    if (error.name === 'SequelizeValidationError')
      return res.status(400).send(error)
    else res.sendStatus(500)
  }
}
exports.findOne = async (req, res) => {
  const { id } = req.query
  if (id === undefined) return res.sendStatus(400)
  try {
    const result = await Task.findByPk(id)
    res.status(200).send(result)
  } catch (error) {
    debug(error)
    res.status(500).send(error)
  }
}

exports.getAll = async (req, res) => {
  try {
    const result = await Task.findAll()
    res.send(result).status(200)
  } catch (error) {
    debug(error)
    res.status(500).send(error)
  }
}

exports.updateStatus = async (req, res) => {
  try {
    const { id, complete } = req.body
    if (typeof complete !== 'boolean')
      return res.status(400).send('Invalid data type')
    const result = await Task.update({ complete }, { where: { id } })
    res.status(200).send({ affectedRows: result[0] })
  } catch (error) {
    debug(error)
    console.log(error)
    if (error.name === 'SequelizeValidationError') res.status(400).send(error)
    else res.sendStatus(500)
  }
}
