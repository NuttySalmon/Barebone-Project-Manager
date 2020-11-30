const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Task } = require('../models')
const debug = require('debug')('debug:user-control')

exports.create = async (req, res) => {
    try {
        const result = await Task.create(req.body, {
          fields: ['name', 'complete'],
        })
        res.status(200).send(result.dataValues)
      } catch (error) {
        if (error.name === 'SequelizeValidationError') res.status(400).send(error)
        res.status(500).send(error)
      }
}

exports.deleteTask = async (req, res) => {
    try {
        const {id} = req.body
        const exitance = id =>
            Task.findOne({ where: { id} })
                .then(token => token !== null)
                .then(isUnique => isUnique);
        if (existance == false) res.status(400).send('Task does not exist')
        const result = await Task.destroy({
            where: { id }
        })
        res.status(200).send({affectedRows: result[0]})
    } catch (error) {
        debug(error)
        console.log(error) 
        if (error.name === 'SequelizeValidationError') res.status(400).send(error)
        else res.sendStatus(500)
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
    try{
        const {name, id, complete} = req.body
        const newName = name
        const newComplete = complete
        if (typeof newName !== 'string') res.status(400).send('Invalid data type')
        if (typeof newComplete !== 'boolean') res.status(400).send('Invalid data type')
        const result = await Task.update(
            { complete: newComplete },
            { name: newName},
            { where: { id } }
        )
        res.status(200).send({ affectedRows: result[0] }) 
    } catch (error){
        debug(error)
        console.log(error) 
        if (error.name === 'SequelizeValidationError') res.status(400).send(error)
        else res.sendStatus(500)
    }
}