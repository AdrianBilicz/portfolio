var Inquiry = require('../models/Inquiry')

module.exports = {
	find: function(params,callback){
		Inquiry.find(params, function(err,inquirys){
			if(err){
				callback(err,null)
				return
			}
			callback(null,inquirys)

		})

	},
	findById: function(id,callback){
		Inquiry.findById(id,function(err,inquiry){
			if(err){
				callback(err,null)
				return
			}
			callback(null, inquiry)
		})
	},
	create: function(params,callback){
		Inquiry.create(params,function(err,inquiry){
			if(err){
				callback(err,null)
				return
			}
			callback(null, inquiry)
		})
	},
	update: function(id,params,callback){
		Inquiry.findByIdAndUpdate(id, params, {new:true}, function(err,inquiry){
			if(err){
				callback(err,null)
				return
			}
			callback(null, inquiry)
		})
	},
	delete: function(params,callback){
		Inquiry.findByIdAndRemove(id,function(err,inquiry){
			if(err){
				callback(err,null)
				return
			}
			callback(null, null)
		})
	}


}