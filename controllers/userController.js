var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/user.js');
var Task = require('./../models/task.js');
var path = require('path');



// display the main page for user
router.get('/', function(req, res) {
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


module.exports = router;
