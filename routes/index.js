var express = require('express');
var router = express.Router();
var Project = require('../models/Project')
var Inquiry = require('../models/Inquiry')



/* GET home page. */
router.get('/', function(req, res, next) {

	Project.find(null, function(err,projects){
		if(err){
			res.render('error', err)
			return
		}
		projects.map(function(project,i){

			project.description = project.description.substring(0,180) + '...'
		})
		var data = {
			list: projects
		}
		res.render('index', data);
	})

	
});

router.get('/:page', function(req, res, next){
	//about, createproject, confirmation
	var page = req.params.page
	if(page == 'api'){
		next()
		return
	}
	
	var staticPages = {
		projects: 'projects',
		createproject: 'createproject',
		confirmation: 'confirmation'
	}
	var template = staticPages[page]
	
	if( page == 'inquiries'){
		Inquiry.find(null, function(err,inquiries){
			if(err){
				res.render('error', err)
				return
			}
			var data = {
				list: inquiries
			}
			res.render(page, data)

		})
		return
	}

	if(template == null){
		res.render('error', {message: "Invalid Page"})
		return
	}

	res.render( page , null)
	
})

router.get('/project/:id', function(req, res, next){
	var projectId = req.params.id
	Project.findById(projectId, function(err,project){
		if(err){
			res.render('error',err)
			return
		}
		res.render('project', project)
	})
	
	
})


router.get('/project/:name', function(req, res, next){
	var pages = ['perc','jukebox']
	var name = req.params.name
	if(pages.indexOf(name) == -1){
		res.render('error',{message: 'Page does not exist'})
	}
	res.render(name)
})

router.post('/:action', function(req, res, next){

	var action = req.params.action
	if(action == 'project'){
		var params = req.body
		var tools = params.tools
		list = tools.split(',')
		var toolsArray = []
		list.map(function(item,i){
			toolsArray.push(item.trim())
		})
		params['tools'] = toolsArray
		Project.create(params, function(err,project){
			if(err){
				res.render('error', err)
				return
			}
			res.json({
				project: project
			})
			return

		})

	}
	if(action == 'contact'){
		var body =  req.body
		Inquiry.create(req.body, function(err,inquiry){
			if(err){
				res.json({
					confirmation: 'failed',
					message: err
				})
				return
			}
			var helper = require('sendgrid').mail;
			var from_email = new helper.Email(body.reciepient);
			var to_email = new helper.Email('bilicz.adrian@gmail.com');
			var subject = body.subject
			var content = new helper.Content('text/plain', body.content);
			var mail = new helper.Mail(from_email, subject, to_email, content);

			var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
			var request = sg.emptyRequest({
				method: 'POST',
				path: '/v3/mail/send',
				body: mail.toJSON(),
			});
			console.log(mail)
			sg.API(request, function(error, response) {
				console.log(response.statusCode);
				console.log(response.body);
				console.log(response.headers);

				if(error){
					res.json({
						confirmation: 'failed',
						message: error
					})
					return
				}
				res.redirect('/confirmation')
				return
			});
		})




	}
})



module.exports = router;
