var mongoose = require('mongoose');

// Definde jobFields Model
module.exports = mongoose.model('jobFields',{
	_id: String,
  name: String,
	formFields: Mixed
});
