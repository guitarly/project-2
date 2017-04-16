var express = require('express');
var router = express.Router();

// new task
router.get('/new', function(req, res) {
    res.render('./tasks/new');
});

// edit task
router.get('/edit', function(req, res) {
    res.render('./tasks/edit');
});

module.exports = router;
