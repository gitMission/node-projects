const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome'});
});
//about us page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us'});
});
//contact page
app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact Us'});
});

//contact post
app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'your@gmail.com',
			pass: 'emailPassword'
		}
	});

	var mailOptions = {
		from: 'Ren Mission <missionrenjr@gmail.com>',
		to: 'info@cabrinimed.com.ph',
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});



app.listen(3000, () => {
    console.log('Server listen on port 3000');
});
