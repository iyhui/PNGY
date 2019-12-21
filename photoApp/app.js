/*this is where we define the routes*/

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql'); //connecting to mysql
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var infoRouter = require('./routes/info');
var postRouter = require('./routes/post');
var registerRouter = require('./routes/register');
var bodyParser = require('body-parser');
//var bcrypt = require('bcrypt');
var app = express();
//const session = require('express-session');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//some more stuff
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//var router = express.Router();
//router.post('/login',login.login);

//DATABASE CREATE CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Eureka',
    debug: true
});

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    else {
        return console.log('Database is ready!')
    }
    /*var sql = "INSERT INTO account (username, password, email) VALUES ('test', 'test', 'hi german')";

    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });*/
});


//db.end();

var engines = require('consolidate'); //something from stack overflow

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public/views')));

/*checks view folder*/
app.set('views', __dirname + '/public/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.engine('php', engines.mustache);
app.set('view engine', 'php');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/info', infoRouter);
app.use('/post', postRouter);
app.use('/register', registerRouter);


//POST DATA

app.post('/register', function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var pass = req.body.password;
    console.log(username);
    console.log(email);
    console.log(pass);

    var sql = "INSERT INTO account (username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, pass], function (err, data) {
        if (err) {
            throw err;
        }
        else {
            console.log("Account has been registered.");
        }
    });
    res.render('post.html');
});

// I think I'll create a session here...
/*app.use(session({
    cookie: {

    }
}))*/
//handler for login
/*exports.login = function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        if(results[0].password == password){
          res.send({
            "code":200,
            "success":"login sucessfull"
              });
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
              });
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
            });
      }
    }
    });
  }
*/
//var sess = req.session; 

//login and redirect
app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.pwd;
    console.log(username);
    console.log(password);

    db.query('SELECT * FROM account WHERE username = ?', [username], function (error, results, fields) {
        if (results.length > 0) {
            if (results[0].password == password) {
                console.log('login successful');
                res.render('post.html');
            }
            else {
                res.render('login.html');
            }
        }

    });
});

//post image...i tried...
/*app.post('/post', function (req, res) {
    var post = req.body;
    var title = req.body.title;
    var description = req.body.description;
    var file = req.files.uploaded_image;
    var img_name = file.name;

    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
        file.mv('public/images/upload_images/' + file.name, function (err) {
            if (err){
                return res.status(500).send(err);
            } 
                
            var sql = "INSERT INTO `users_image`(`title`,`image`,`desc`) VALUES ('" + title + "','" + file + "','" + description + "')";

            var query = db.query(sql, function (err, result) {
                res.redirect('profile/' + result.insertId);
            });

});*/


module.exports = app;