var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/user.js');
var Task = require('./../models/task.js');
var path = require('path');


// Trigger from New page
router.post('/new', function(req, res) {
    console.log("im in the NEW task");

    console.log(req.body);

    User.findById(req.body.userid, function(err, foundUser) {
        Task.create(req.body, function(err, createTask) {
            foundUser.tasks.push(createTask);
            foundUser.save(function(err, data) {
                res.redirect('/tasks');
            });

        });
    });
});


// upload new task
router.get('/new', function(req, res) {

    User.find({}, function(err, foundUsers) {
        res.render('./tasks/new.ejs', {
            users: foundUsers,
            currentUser: req.session.currentuser
        });
    });
});

// display the main page for Photo
router.get('/', function(req, res) {
    Task.find({}, function(err, foundTasks) {
        res.render('./tasks/index', {
            tasks: foundTasks,
            currentUser: req.session.currentuser
        });

    });
});


module.exports = router;
