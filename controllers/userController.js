var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/user.js');
var Task = require('./../models/task.js');
var path = require('path');



// Register
router.get('/register', function(req, res) {
    res.render('register', {
        errors: null
    });
});

router.post("/register", function(req, res) {
    var name = req.body.name;
    var role = req.body.role;
    var username = req.body.username;
    var password = req.body.password;
    var password_confirm = req.body.password_confirm;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('username', 'Username is required.').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    console.log(errors);

    if (errors) {
        res.render('./register', {
            errors: errors
        });
    } else {
        // Create new USER
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        User.create(req.body, function(err, createdUser) {
            res.redirect('./index');
        });

    }

});

// Login
router.get('/login', function(req, res) {
    res.render('login');
});


router.post("/login", function(req, res) {
    console.log("I am here.. just submit login");
});

// Dashboard
router.get('/index', function(req, res) {
    res.render('index');
});

module.exports = router;
