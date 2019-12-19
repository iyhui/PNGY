/*this is where we define the routes*/

var app = express();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql'); //connecting to mysql
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var infoRouter = require('./routes/info');
var postRouter = require('./routes/post');
var registerRouter = require('./routes/register');



//DATABASE
//create connection
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

    var sql = "INSERT INTO account (username, password, email) VALUES ('test', 'test', 'hi german')";

    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

//ROUTES
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

    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/info', infoRouter);
    app.use('/post', postRouter);
    app.use('/register', registerRouter);

    module.exports = app;