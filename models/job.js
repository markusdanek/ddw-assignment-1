var mongoose = require('mongoose');
var mongojs = require('mongojs');
// Definde Job Model
module.exports = mongoose.model('jobs',{
	name: String,
	email: String,
	salary: String,
	place: String,
	formFieldsId: mongoose.Schema.Types.ObjectId
});
