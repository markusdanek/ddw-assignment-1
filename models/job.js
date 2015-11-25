var mongoose = require('mongoose');

// Definde Job Model
module.exports = mongoose.model('Job',{
	id: String
});
