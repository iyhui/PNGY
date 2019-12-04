var express = require('express');
var router = express.Router();

/* GET Image Info page. */
router.get('/', function(req, res) {
  res.render('info.html');
});

module.exports = router;