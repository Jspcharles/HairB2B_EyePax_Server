var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/postHome', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send('Got a post request');
});

module.exports = router;
