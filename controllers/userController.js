var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/user.js');
var Task = require('./../models/task.js');
var path = require('path');



// display the main page for user
router.get('/', ensureAuthenticated, function(req, res) {
    User.find({}, function(err, foundUsers) {
        res.render('./users/index', {
            users: foundUsers,
            currentUser: req.session.currentuser
        });
    });
});

// Show page
router.get('/show/:id', ensureAuthenticated, function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        res.render('./users/show.ejs', {
            user: foundUser,
            currentUser: req.session.currentuser
        });
    });
});


// Delete
// router.delete('/delete/:id', ensureAuthenticated, function(req, res) {
//     User.findByIdAndRemove(req.params.id, function(err, foundUser) {
//         var taskArrayId = [];
//         for (var i = 0; i < foundUser.tasks.length; i++) {
//             taskArrayId.push(foundUser.tasks[i]._id);
//         }
//         Task.remove({
//             _id: {
//                 $in: taskArrayId
//             }
//         }, function(err, data) {
//             res.redirect('/users');
//         });
//
//     });
// });

// Can delete user - but not any task that belong to the user.
router.delete('/delete/:id', ensureAuthenticated, function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, foundUser) {
        res.redirect('/users');
    });

});



// Go to Edit page...
router.get('/edit/:id', ensureAuthenticated, function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        res.render('./users/edit.ejs', {
            errors: null,
            user: foundUser,
            currentUser: req.session.currentuser
        });
    });
});

// back from edit page
router.put('/edit/:id', ensureAuthenticated, function(req, res) {
    var name = req.body.name;
    var role = req.body.role;

    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function functionName(err, foundComp) {
        res.redirect('/users');

    });

});

// if session is time out.. user need to login again
function ensureAuthenticated(req, res, next) {
    if (req.session.currentuser) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/login');
    }
}


module.exports = router;
