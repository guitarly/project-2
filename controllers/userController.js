var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/user.js');
var Task = require('./../models/task.js');
var path = require('path');



// display the main page for user
router.get('/', function(req, res) {
    console.log("in index... users");
    User.find({}, function(err, foundUsers) {
        res.render('./users/index', {
            users: foundUsers,
            currentUser: req.session.currentuser
        });
    });
});

// Show page
router.get('/show/:id', function(req, res) {
    console.log("Show User");
    User.findById(req.params.id, function(err, foundUser) {
        console.log(foundUser);
        res.render('./users/show.ejs', {
            user: foundUser,
            currentUser: req.session.currentuser
        });
    });
});


// Go to Edit page...
router.get('/edit/:id', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        res.render('./users/edit.ejs', {
            errors: null,
            user: foundUser,
            currentUser: req.session.currentuser
        });
    });
});

// back from edit page
router.put('/edit/:id', function(req, res) {
    var name = req.body.name;
    var role = req.body.role;

    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function functionName(err, foundComp) {
        res.redirect('/users');

    });

});


module.exports = router;
