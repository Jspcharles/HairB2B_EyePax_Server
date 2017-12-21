var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/getsamplestylist', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({name: 'Joseph Charles',
        skills: ['bridal', 'rebonding'], address: 'Sydney', cost: 120});
});

router.get('/getStylistName', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistList);
});

var stylistList = [
    {
        id: 1,
        profile_id: 1,
        name: 'Joseph Charles',
        address: 'Sydney',
        cost1: 100,
        cost2: 200,
        telephone: '0770370315',
        skill: ['Advanced colouring', 'Colour correction' , 'Hair painting'],
        description: 'Claire Mason the colour Queen of Perth. Claire and her hand selected and exceptionally trained team have built a solid reputation and social media presence by the amazing colour trends.'
    },
    {
        id: 2,
        profile_id: 2,
        name: 'Christina Joy',
        address: 'Perth',
        cost1: 150,
        cost2: 220,
        telephone: '0771524452',
        skill: ['Colour correction' , 'Hair painting'],
        description: 'I\'ve spent 10 years further developing and growing my skill set in a busy and reputable organisation in Sydney. In this time I\'ve been awarded \'stylist of the year\', \'educator of the year\' and \'hall of fame\'. I left the organisation as Director of Education and continue my career as a freelance educator, stylist and salon owner.'
    },
    {
        id: 3,
        profile_id: 3,
        name: 'John Maxwell',
        address: 'Melbourne',
        cost1: 400,
        cost2: 550,
        telephone: '0778220899',
        skill: ['Advanced colouring' , 'Hair painting'],
        description: 'From a young age I have always had a passion to be an educator. With now 17 years in the Hairdressing industry I think it is important even as an educator to keep up skilling myself. I love creating masterpieces and sharing my skills.'
    }

];

router.get('/getstylists/skill', function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(result);
});

module.exports = router;
