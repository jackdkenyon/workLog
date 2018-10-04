var crypto = require('crypto');
var mongoose = require('mongoose'),
User = mongoose.model('User');
WorkLog = mongoose.model('WorkLog');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}


exports.addDocToWorklog = function(req, res){
var worklog = new WorkLog({creator_id : req.session.user, 
date: req.body.date, ship: req.body.ship, tech: req.body.tech,
jsn: req.body.jsn, comments: req.body.comments });
 
  worklog.save(function(err) {
    if (err){
      res.session.error = err;
       res.redirect('/');
    } else {
        res.redirect('/');
    }
  });  
  
  };  

exports.signup = function(req, res){
  var user = new User({username:req.body.username});
  user.set('hashed_password', hashPW(req.body.password));
  user.save(function(err) {
    if (err){
      res.session.error = err;
      res.redirect('/signup');
    } else {
      req.session.user = user.id;
      req.session.username = user.username;
      req.session.msg = 'Authenticated as ' + user.username;
      res.redirect('/');
    }
  });
};

exports.login = function(req, res){
  User.findOne({ username: req.body.username })
  .exec(function(err, user) {
    if (!user){
      err = 'User Not Found.';
    } else if (user.hashed_password === 
               hashPW(req.body.password.toString())) {
      req.session.regenerate(function(){
        req.session.user = user.id;
        req.session.username = user.username;
        req.session.msg = 'Authenticated as ' + user.username;
        res.redirect('/');
      });
    }else{
      err = 'Authentication failed.';
    }
    if(err){
      req.session.regenerate(function(){
        req.session.msg = err;
        res.redirect('/login');
      });
    }
  });
};

exports.searchUserLog = function(req, res) {
 WorkLog.find({creator_id: req.session.user}).exec(function(err, user) {
   worklogList = user;
   res.json(user);
    });  
};


exports.updateWorklog = function(req, res){
 WorkLog.findOne({ _id: req.body._id })  
   .exec(function(err, user) {   
    user.set('date', req.body.date);
    user.set('ship', req.body.ship);
    user.set('date', req.body.date);
    user.set('tech', req.body.tech);
    user.set('jsn', req.body.jsn);
    user.set('comments', req.body.comments);
    user.save(function(err) {
      if (err){
        res.sessor.error = err;
      } else {
        req.session.msg = 'User Updated.';
      }
     });
   });
 };

exports.getUserProfile = function(req, res) {
    User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if (!user){
      res.json(404, {err: 'User Not Found.'});
    } else {
      res.json(user);
    }
  });
};

exports.updateUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    user.save(function(err) {
      if (err){
        res.sessor.error = err;
      } else {
        req.session.msg = 'User Updated.';
      }
      res.redirect('/user');
    });
  });
};

exports.deleteUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if(user){
      user.remove(function(err){
        if (err){
          req.session.msg = err;
        }
        req.session.destroy(function(){
          res.redirect('/login');
        });
      });
    } else{
      req.session.msg = "User Not Found!";
      req.session.destroy(function(){
        res.redirect('/login');
      });
    }
  });
};
