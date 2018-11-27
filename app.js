 
/* Node.js is an open-source, cross-platform, runtime environment that allows developers to create server-side applications in JavaScript.
The runtime is intended for use outside of a browser context, so it omits browser-specific JavaScript APIs and adds support for more 
traditional OS APIs including HTTP and file system libraries. Node.js is used to create a web server.  Common web-development tasks are 
not directly supported by Node itself. In-order to add specific handling for different HTTP verbs (e.g. GET, POST, DELETE, etc.), for URL
paths ("routes"), serving static files, or using templates, you will need to write the code yourself. However, you can avoid reinventing
the wheel by using a web framework.  Express is the most popular Node web framework. It provides mechanisms to handel web requests and 
web responses, handel routes, and provides rendering engines that inserts data into html templates. In addition it provides mechanisms to
allow adding additional request processing "middleware" at any point within the request handling pipeline. While Express itself is fairly
minimalist, developers have created compatible middleware packages to address almost any web development problem. There are libraries to
work with cookies, sessions, user logins, URL parameters, POST data, security headers, and many more. Session-based authentication makes
use of a cookie stored in the user's browser in order to verify their identity. "express-session" is middleware that stores a session 
identifier on the client within a cookie and stores the session data on the server. Express apps can use any database that is supported 
by Node, such as MongoDB which is an open source NoSQL database. Mongoose is middleware that implements a Document-oriented Data Model
(ODM) and provides a front end to MongoDB. This ODM and database combination is extremely popular because the document storage and
query system looks very much like JavaScript Object Notation (JSON). */

//require() imports the nodejs modules and middleware
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
require('./models/users_model.js');

//uses mongoose to connect to a MongoDB database
//var db = mongoose.connect('mongodb://10.142.0.2:80/worklog');
var db = mongoose.connect('mongodb://jack.kenyon:6135Roky54!@ds233208.mlab.com:33208/worklog');

//creates an Express application
var app = express();

app.engine('.html', require('ejs').__express); //loads ejs engine to render HTML files (renders html like templates)
app.set('view engine', 'html'); // uses ejs engine to render HTML files
app.set('views', __dirname + '/views'); //sets the directory where the template files are located

app.use(bodyParser.urlencoded({ extended: true })); //tells the system to use deep parsing to deal with nested objects (extended: true)
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'SECRET',
   cookie: {maxAge: 60*60*1000},
   saveUninitialized: false,
   resave: false,
   url: 'mongodb://jack.kenyon:6135Roky54!@ds233208.mlab.com:33208/worklog',
   store: new mongoStore({
          url: 'mongodb://jack.kenyon:6135Roky54!@ds233208.mlab.com:33208/worklog',
         db: mongoose.connection.db,
         collection: 'sessions',
         touchAfter: 24 * 3600 
        })
  }));

require('./routes')(app);
app.listen(80);
