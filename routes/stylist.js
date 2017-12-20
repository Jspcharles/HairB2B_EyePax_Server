var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getsamplestylist', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({name: 'Joseph Charles',
        skills: ['bridal', 'rebonding'], address: 'Sydney', cost: 120});
});

var stylistList = [
    {
        id: 1,
        profile_id: 1,
        name: 'Joseph Charles',
        address: 'Sydney',
        telephone: '0770370315',
        skill: ['Advanced colouring', 'Colour correction' , 'Hair painting'],
        description: 'Claire Mason the colour Queen of Perth. Claire and her hand selected and exceptionally trained team have built a solid reputation and social media presence by the amazing colour trends.'
    },
    {
        id: 2,
        profile_id: 2,
        name: 'Christina Joy',
        address: 'Piloroo',
        telephone: '0771524452',
        skill: ['Colour correction' , 'Hair painting'],
        description: 'Claire Mason the colour Queen of Perth. Claire and her hand selected and exceptionally trained team have built a solid reputation and social media presence by the amazing colour trends.'
    }

];

router.get('/getstylists/skill', function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(result);

});

module.exports = router;
