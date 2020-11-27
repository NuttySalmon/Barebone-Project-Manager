var express = require('express')
var router = express.Router(); 

router.post('/signup', (req, res) => {
  res.send("signed up"); 
}); 

module.exports = router; 