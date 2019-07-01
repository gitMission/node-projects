const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');
const upload = multer({ dest: './public/images/portfolio' });

//Route files
const routes = require('./routes/index');
const admin = require('./routes/admin');

//Init App
const app = express();

//Middlewares below

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//handle sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//validator
// app.use(expressValidator({
//     errorFormatter: (param, msg, value) => {
//         let namespace = param.split('.'),
//             root = namespace,
//             formParam = root;

//         while (namespace.length) {
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return {
//             param: formParam,
//             msg: msg,
//             value: value
//         };
//     }
// }));

//public folder
app.use(express.static(path.join(__dirname, 'public')));

//views engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//connect flash
app.use(flash());

app.use('/', routes);
app.use('/admin', admin);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
    console.log('Server started on port: ' + app.get('port'));
});