var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getLoginInfo', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({username: 'admin', password: 'admin'});
});

module.exports = router;


