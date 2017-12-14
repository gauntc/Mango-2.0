var mongoose = require('mongoose');
var UserSchema= new mongoose.Schema({
	username: {type: String, unique: true },
	email: String;
	hashed_password: String;
});

mongoose.model('User', UserSchema);
