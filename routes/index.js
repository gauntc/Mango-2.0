var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/activityDB', {useMongoClient:true});
require('../models/Activities.js');
var Activity = mongoose.model('Activity');
var users = require('../controllers/users_controller');

/* GET home page. */
router.get('/', function(req, res) {
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
        res.sendFile('index.html', { root: 'public' });
    }
    else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});

router.post('/activities', function(req, res, next) {
  if (req.session.user) {
    var activity = new Activity(req.body);
    activity.save(function(err, activity) {
      if(err){ return next(err); }
      res.json(activity);
    });
  }
  else {
    res.redirect('/login');
  }
});

// router.get('/activities/:activity', function(req, res) {
//   res.json(req.activity);
// });

router.get('/activities', function(req,res) {
    if (req.session.user) {
      Activity.find({username : req.body.username}, function(err, activities) {
        if(err) { return next(err); }
        res.json(activities);
      })
    }
    else {
      res.redirect('/login');
    }
})

// router.delete('/:userId/activities', function(req, res, next) {
//   console.log("in delete");
//   Activity.find().remove(function(err) {
//     console.log("it ran");
//     if(err){return console.error(err)};
//     res.sendStatus(200);
//   });
//
// });

router.get('/signup', function(req, res) {
    console.log("/signup Route");
    if(req.session.user) {
      res.redirect('/');
    }
    res.sendFile('signup.html', { root: 'public' });
});

router.get('/login', function(req, res) {
    console.log("/login Route");
    if(req.session.user) {
      res.redirect('/');
    }
    res.sendFile('login.html', { root: 'public' });
});

router.get('/logout', function(req, res) {
    console.log("/logout Route");
    req.session.destroy(function() {
      res.redirect('/login');
    });
  });

router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);

module.exports = router;
