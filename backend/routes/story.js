var express = require('express')
var router = express.Router()
const { StoryData } = require('../models')
const debug = require('debug')('debug:story')

router.post('/create', async (req, res) => {
  console.log(req.body)
  try {
    await StoryData.create(req.body.data, {
      fields: ['story_name', 'start_date', 'end_date'],
    })
    res.send(200)
  } catch (error) {
    debug(error)
    res.send(500)
  }
})

module.exports = router
