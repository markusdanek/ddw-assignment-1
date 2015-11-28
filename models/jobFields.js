var mongoose = require('mongoose');

// Definde Job Model
module.exports = mongoose.model('jobFields',{
	_id: String,
  name: String,
	formFields: Mixed
});
