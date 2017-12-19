var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getsamplestylist', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({name: 'Joseph Charles', skills: ['bridal', 'rebonding'], address: 'Sydney', cost: 120});
});

module.exports = router;
