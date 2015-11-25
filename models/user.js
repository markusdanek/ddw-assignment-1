var mongoose = require('mongoose');

// Definde User Model
module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});
