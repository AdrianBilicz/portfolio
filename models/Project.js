var mongoose = require('mongoose')

var ProjectSchema = new mongoose.Schema({
	name: {type: String, default:''},
	url: {type: String, default:''},
	description: {type: String, default:''},
	thumb: {type: String, default:''},
	image: {type: String, default:''},
	tools: {type: Array, default:[]},
	timeStamp: {type: Date, default:Date.now}

})

module.exports = mongoose.model('ProjectSchema', ProjectSchema)