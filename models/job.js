var mongoose = require('mongoose');

// Definde Job Model
module.exports = mongoose.model('jobs',{
	_id: String,
	name: String,
	email: String,
	number: String
});
