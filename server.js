var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expresslayouts = require('express-ejs-layouts');
var session = require('express-session');
var bcrypt = require('bcrypt');
// -- testing...
// var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var localStrategy = require('passport-local').
Strategy;
// ---

var port = 3001;

var index = require('./controllers/index.js');
var userController = require('./controllers/userController.js');
var taskController = require('./controllers/taskController.js');
// use express ejs layout - should be above the router
app.set('view engine', 'ejs');
app.use(expresslayouts);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/ProjectTasks');
mongoose.connection.once('open', function() {
    console.log("connect to mongo");
    app.listen(port, function() {
        console.log('listening....', port);

    });
});

// Express session
app.use(session({
    secret: 'dsafadsfdsfewr2342sdfs',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
// connect flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



app.use('/', index);
app.use('/users', userController);
app.use('/tasks', taskController);

app.use(express.static(__dirname + '/public'));
