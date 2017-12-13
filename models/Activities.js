var mongoose = require('mongoose');
var ActivitySchema = new mongoose.Schema({
  title: String,
  time: String
});
ActivitySchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Activity', ActivitySchema);
