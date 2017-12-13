var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/activityDB', {useMongoClient:true});
require('../models/Activities');
var Activity = mongoose.model('Activity');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/activities', function(req, res, next) {
  var activity = new Activity(req.body);
  activity.save(function(err, activity) {
    if(err){ return next(err); }
    res.json(activity);
  });
});

router.get('/activities/:activity', function(req, res) {
  res.json(req.activity);
});


router.get('/activities', function(req,res) {
  Activity.find(function(err, activities) {
    if(err){ return next(err); }
    res.json(activities);
  })
})

router.delete('/activities', function(req, res, next) {
  console.log("in delete");
  Activity.find().remove(function(err) {
    console.log("it ran");
    if(err){return console.error(err)};
    res.sendStatus(200);
  });

});

module.exports = router;
