var express = require('express');
var router = express.Router();

// open the first homepage .. with user login
router.get('/', function(req, res) {
    res.render('./login', {
        currentUser: req.session.currentuser
    });
});

module.exports = router;
