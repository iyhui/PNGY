/*this is where we define the routes*/

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql'); //connecting to mysql

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var infoRouter = require('./routes/info');
var postRouter = require('./routes/post');
var registerRouter = require('./routes/register');

var app = express();

//create connection
const db = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password:'password',
    database:'Eureka'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Database is connected!')
})


app.get('/createdb',(req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, results)=> {
        if(err){ 
            throw err;
        }
        console.log(result);
        res.send('Database created...')
    })
})

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