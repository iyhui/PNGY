var express = require('express');
var router = express.Router();

/* GET Post Image page. */
router.get('/', function(req, res) {
  res.render('post.html');
});

module.exports = router;