var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  console.log(res.body); 
})

module.exports = router;