var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/*router.get('/login', function(req, res, next) {
  res.sendFile('login.html');
});
*/
module.exports = router;
