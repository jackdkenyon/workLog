var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
require('./models/users_model.js');

var db = mongoose.connect('mongodb://' + argv.be_ip + ':80/my_database');
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
   url: 'mongodb://localhost/worklog',
   store: new mongoStore({
          url: 'mongodb://localhost/worklog',
         //db: mongoose.connection.db,
         //collection: 'sessions'
         touchAfter: 24 * 3600 
        })
  }));


require('./routes')(app);
app.listen(80);
console.log("App listening on port 80");
