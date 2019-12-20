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
var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

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
    else{
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
        if (err){
            throw err;
        } 
        else{
            console.log("Account has been registered.");
        }
    });
    res.render('index.html');
});
//db.end();

module.exports = app;