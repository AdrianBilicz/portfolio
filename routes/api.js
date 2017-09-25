var express = require('express');
var router = express.Router();
var controllers = require('../controllers/')



router.get('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Resource not found'
		})
	}

	controller.find(req.query,function(err,results){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
		}
		res.json({
			confirmation: 'succes',
			rescource: results
		})
	})
})

router.get('/:resource/:id', function(req,res, next){
	var resource = req.params.resource
	var id  =  req.params.id
	var controller = controllers[resource]
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Resource not found'
		})
	}
	controller.findById(id,function(err,result){
		if(err){
			res.json({
				confirmation: 'fail',
				message: 'Not Found'
			})
			return
		}
		res.json({
			confirmation: 'success',
			rescource: result
		})
	})
})

router.post(':/resource', function (req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Resource not found'
		})
	}
	controller.create(req.body, function(err, result){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
			return
		}
		res.json({
			confirmation: 'succes',
			rescource: result
		})
		return
	})
})

router.put('/:resource/:id', function(req, res, next){
	var resource =  req.parrams.resource
	var id = req.params.id
	var controller = controllers[resource]
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Resource not found'
		})
	}
	controller.updtade(id, req.body, function(err,result){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
			return
		}
		res.json({
			confirmation: 'succes',
			rescource: result
		})
		return
	})
})

router.delete('/:resource/:id', function(req,res, next){
	var resource =  req.parrams.resource
	var id = req.params.id
	var controller = controllers[resource]
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Resource not found'
		})
	}
	controller.delete(id, req.body, function(err,project){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
			return
		}
		res.json({
			confirmation: 'succes'
		})
		return
	})
})

module.exports = router;