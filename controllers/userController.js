var express = require('express');
var router = express.Router();



// Register
router.get('/register', function(req, res) {
    res.render('register');
});

router.post("/register", function(req, res) {
    console.log(req.body);
})

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
