var express = require('express');
var router = express.Router();



// Register
router.get('/register', function(req, res) {
    res.render('register');
});

// Login
router.get('/login', function(req, res) {
    res.render('login');
});
// Dashboard
router.get('/index', function(req, res) {
    res.render('index');
});

module.exports = router;
