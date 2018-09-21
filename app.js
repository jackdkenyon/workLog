var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
require('./models/users_model.js');
var argv = require('optimist').argv;

mongoose.connect('mongodb://10.142.0.2:80/worklog');

var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'SECRET',
    cookie: {maxAge: 60*60*1000},
    saveUninitialized: false,
     resave: false,
    url: 'mongodb://10.142.0.2:80/worklog',
    store: new mongoStore({
        url: 'mongodb://10.142.0.2:80/worklog',
        // db: mongoose.connection.db,
        touchAfter: 24 * 3600 
         })
     }));
require('./routes')(app);
var port = process.env.port || 80;
var port = 80;
app.listen(port, '10.142.0.3');
console.log("Listening on port 80");
