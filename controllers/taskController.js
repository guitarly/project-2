var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/user.js');
var Task = require('./../models/task.js');
var path = require('path');


// Trigger from New page
router.post('/new', ensureAuthenticated, function(req, res) {

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
router.get('/new', ensureAuthenticated, function(req, res) {

    User.find({}, function(err, foundUsers) {
        res.render('./tasks/new.ejs', {
            users: foundUsers,
            currentUser: req.session.currentuser
        });
    });

});

// display the main page for Tasks
router.get('/', ensureAuthenticated, function(req, res) {

    Task.find({}, function(err, foundTasks) {
        User.find({}, function(err, foundUsers) {

            res.render('./tasks/index', {
                tasks: foundTasks,
                users: foundUsers,
                currentUser: req.session.currentuser
            });
        });
    });
});

// Testing .. display tasks which is not assigned yet
router.get('/nonassignedtask', ensureAuthenticated, function(req, res) {
    User.find({}, function(err, foundUsers) {
        var userArrayId = [];
        for (var i = 0; i < foundUsers.length; i++) {
            userArrayId.push(foundUsers[i].id);
        }
        Task.find({
            userid: {
                $nin: userArrayId
            }
        }, function(err, foundTasks) {
            res.render('./tasks/notassigned', {
                tasks: foundTasks,
                users: foundUsers,
                currentUser: req.session.currentuser
            });
        });
    });
});

// Show one record page
router.get('/show/:id', ensureAuthenticated, function(req, res) {
    // User.find({}, function(err, foundUsers) {

    Task.findById(req.params.id, function(err, foundTask) {
        User.findOne({
            'tasks._id': req.params.id
        }, function(err, foundUser) {
            res.render('./tasks/show', {
                // users: foundUsers,
                task: foundTask,
                user: foundUser,
                currentUser: req.session.currentuser
            });

        });
    });

    // });
});


// Delete
router.delete('/delete/:id', ensureAuthenticated, function(req, res) {
    Task.findByIdAndRemove(req.params.id, function() {
        User.findOne({
            'tasks._id': req.params.id
        }, function(err, foundUser) {
            foundUser.tasks.id(req.params.id).remove();
            foundUser.save(function(err, data) {
                res.redirect('/tasks');
            });
        });
    });
});

// Go to Edit page...
router.get('/edit/:id', ensureAuthenticated, function(req, res) {
    User.find({}, function(err, foundUsers) {
        Task.findById(req.params.id, function(err, foundTask) {
            User.findOne({
                'tasks._id': req.params.id
            }, function(err, foundUser) {
                res.render('./tasks/edit.ejs', {
                    task: foundTask,
                    user: foundUser,
                    users: foundUsers,
                    currentUser: req.session.currentuser
                });
            });
        });
    });
});

// back from edit page
router.put('/edit/:id', ensureAuthenticated, function(req, res) {
    Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function(err, updatedTask) {
        User.findOne({
            'tasks._id': req.params.id
        }, function(err, foundUser) {
            foundUser.tasks.id(req.params.id).remove();
            foundUser.tasks.push(updatedTask);
            foundUser.save(function(err, data) {
                res.redirect('/tasks');
            });
        });
    });

});

function ensureAuthenticated(req, res, next) {
    if (req.session.currentuser) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('login');
    }
}

module.exports = router;
