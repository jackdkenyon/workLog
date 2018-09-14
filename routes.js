var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
var users = require('./controllers/users_controller');
app.use('/static', express.static( './static')).
        use('/lib', express.static( '../lib')
        );
  
app.get('/', function(req, res){
    if (req.session.user) {
      res.render('index', {username: req.session.username,
                           msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });

app.get('/user', function(req, res){
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
      console.log("In get /user");
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });

app.get('/editLog', function(req, res){
     console.log("In get /editLog");
    if (req.session.user) {
      res.render('editLog', {msg:req.session.msg});
     } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });

 app.get('/search', function(req, res){
       console.log("In get /search");
    if (req.session.user) {
      res.render('search', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  
app.get('/signup', function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
  });
  
app.get('/login',  function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
  });
  
app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
  
  app.post('/', users.addDocToWorklog);
  app.post('/signup', users.signup);
  app.post('/user/update', users.updateUser);
  app.post('/user/delete', users.deleteUser);
  app.post('/login', users.login);
  app.get('/user/profile', users.getUserProfile);
  app.get('/user/search', users.searchUserLog);
  app.post('/user/postUpdateWorklog', users.updateWorklog);
}