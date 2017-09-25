var express = require('express');
var router = express.Router();
require('dotenv').config()



/* GET users listing. */
router.get('/', function(req, res, next) {
	var body = req.body

	var helper = require('sendgrid').mail;
	
	var from_email = new helper.Email('bilicz.adrian@gmail.com');
	var to_email = new helper.Email(body.reciepient);
	var subject = body.subject;
	var content = new helper.Content(body.content);
	var mail = new helper.Mail(from_email, subject, to_email, content);

	var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
	var request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});

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

		res.json({
			confirmation: 'success',
			response: response.body

		})
		return
	});
});

module.exports = router;
