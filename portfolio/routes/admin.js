const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: './public/images/portfolio' });
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'portfolio'
});


router.get('/', (req, res, next) => {
    connection.query("SELECT * FROM projects", function(err, rows, fields) {
        if (err) throw err;
        res.render('admin/index', {
            "projects": rows
        });
    });
});


router.get('/add', (req, res, next) => {
    res.render('admin/add');
});

router.post('/add', upload.single('projectimage'), (req, res, next) => {
    //Get form values
    let title = req.body.title;
    let description = req.body.description;
    let service = req.body.service;
    let url = req.body.url;
    let client = req.body.client;
    let projectdate = req.body.projectdate;

    //file upload validation
    if (req.file) {
        let projectImageName = req.file.filename;
    } else {
        let projectImageName = 'noimage.jpg';
    }

    //form field validation
    check('title', 'Title field is required').not().isEmpty();
    check('service', 'Service field is required').not().isEmpty();

    let errors = validationResult(req);

    if (errors) {
        res.render('admin/add', {
            errors: errors,
            title: title,
            description: description,
            service: service,
            client: client,
            url: url
        });
    } else {
        var project = {
            title: title,
            description: description,
            service: service,
            client: client,
            date: projectdate,
            url: url,
            image: projectImageName
        };
    }

    var query = connection.query('INSERT INTO projects SET ? ', project, (err, result) => {
        console.log('Error: ' + err);
        console.log('Success: ' + result);
    });

    //send message
    req.flash('success_msg', 'Project Added');
    //redirect
    res.redirect('/admin');

});

module.exports = router;