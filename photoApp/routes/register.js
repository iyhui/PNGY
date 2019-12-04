var express = require('express');
var router = express.Router();

/* GET Registration page. */
router.get('/', function(req, res) {
  res.render('register.html');
});

module.exports = router;