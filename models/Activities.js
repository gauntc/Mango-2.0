var mongoose = require('mongoose');
var ActivitySchema = new mongoose.Schema({
  username: {type: String, unique: true },
  email: String,
  title: String,
  time: String,
  hashed_password: String
});
ActivitySchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Activity', ActivitySchema);
