var mongoose = require('mongoose');
var ActivitySchema = new mongoose.Schema({
  username: {type: String, unique: true },
  email: String,
  title: String,
  time: String,
  hashed_password: String
});
mongoose.model('Activity', ActivitySchema);
