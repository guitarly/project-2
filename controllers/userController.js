var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/user.js');
var Task = require('./../models/task.js');
var path = require('path');


//
// // Register
// router.get('/register', function(req, res) {
//     res.render('register', {
//         errors: null,
//         currentUser: req.session.currentuser
//
//     });
// });
//
// router.post("/register", function(req, res) {
//     var name = req.body.name;
//     var role = req.body.role;
//     var username = req.body.username;
//     var password = req.body.password;
//     var password_confirm = req.body.password_confirm;
//
//     // Validation
//     req.checkBody('name', 'Name is required').notEmpty();
//     req.checkBody('username', 'Username is required.').notEmpty();
//     req.checkBody('password', 'Password is required').notEmpty();
//     req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);
//
//     var errors = req.validationErrors();
//     console.log(errors);
//
//     if (errors) {
//         res.render('./register', {
//             errors: errors
//         });
//     } else {
//
//         // Create new USER with bcrypt password
//         req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//         User.create(req.body, function(err, createdUser) {
//             if (err) throw err;
//             req.flash('success_msg', "You are registered anc can now login.");
//             res.redirect('./index', {
//                 currentUser: req.session.currentuser
//             });
//         });
//
//     }
//
// });
//
// // Login
// router.get('/login', function(req, res) {
//     res.render('login', {
//         currentUser: req.session.currentuser
//     });
// });
//
// router.post("/login", function(req, res) {
//     User.findOne({
//         username: req.body.username
//     }, function(err, foundUser) {
//         if (bcrypt.compareSync(req.body.password, foundUser.password, function(err, res) {
//                 if (err) {
//                     console.log('Comparison error: ', err);
//                 }
//             })) {
//             req.session.currentuser = foundUser;
//             res.render('./index', {
//                 currentUser: req.session.currentuser
//             });
//         } else {
//             req.flash('error_msg', 'Wrong password');
//             res.redirect('back');
//         }
//     });
// });


// // logout
// router.get('/logout', function(req, res) {
//     req.flash('success_msg', "You are logged out.");
//     req.logout();
//     req.session.destroy(function() {
//         res.redirect('./login');
//     });
// });
//
// // Dashboard
// router.get('/index', ensureAuthenticated, function(req, res) {
//     res.render('index', {
//         currentUser: req.session.currentuser
//     });
// });
//
//
// function ensureAuthenticated(req, res, next) {
//     if (req.session.currentuser) {
//         return next();
//     } else {
//         req.flash('error_msg', 'You are not logged in');
//         res.redirect('./login');
//     }
// }

module.exports = router;
