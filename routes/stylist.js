var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

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



// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


    var stylistList = [
        {
            id: 1,
            profile_id: 1,
            first_name: 'Joseph',
            last_name: 'Charles',
            profile_pic: base64_encode(path.resolve('public/images/pro_pic_2.jpg')),
            rate: 3,
            job_role: 'Educator',
            preferred_location: 'Sydney',
            cost1: 100,
            cost2: 200,
            telephone: '0770370315',
            skill: ['Advanced colouring', 'Colour correction' , 'Hair painting'],
            description: 'Claire Mason the colour Queen of Perth. Claire and her hand selected and exceptionally trained team have built a solid reputation and social media presence by the amazing colour trends.'
        },
        {
            id: 2,
            profile_id: 2,
            first_name: 'Hilary',
            last_name: 'Tanuya',
            profile_pic: base64_encode(path.resolve('public/images/pro_pic_3.jpg')),
            rate: 4,
            job_role: 'Hairstylist',
            preferred_location: 'Perth',
            cost1: 150,
            cost2: 220,
            telephone: '0771524452',
            skill: ['Colour correction' , 'Hair painting'],
            description: 'I\'ve spent 10 years further developing and growing my skill set in a busy and reputable organisation in Sydney. In this time I\'ve been awarded \'stylist of the year\', \'educator of the year\' and \'hall of fame\'. I left the organisation as Director of Education and continue my career as a freelance educator, stylist and salon owner.'
        },
        {
            id: 3,
            profile_id: 3,
            first_name: 'John',
            last_name: 'Maxwell',
            profile_pic: base64_encode(path.resolve('public/images/pro_pic_4.jpg')),
            rate: 2,
            job_role: 'Assistant',
            preferred_location: 'Melbourne',
            cost1: 400,
            cost2: 550,
            telephone: '0778220899',
            skill: ['Advanced colouring' , 'Hair painting'],
            description: 'From a young age I have always had a passion to be an educator. With now 17 years in the Hairdressing industry I think it is important even as an educator to keep up skilling myself. I love creating masterpieces and sharing my skills.'
        },
        {
            id: 4,
            profile_id: 4,
            first_name: 'Stephan',
            last_name: 'Croot',
            profile_pic: base64_encode(path.resolve('public/images/pro_pic_5.jpg')),
            rate: 4,
            job_role: 'Educator',
            preferred_location: 'Melbourne',
            cost1: 225,
            cost2: 325,
            telephone: '0770721234',
            skill: ['Advanced colouring' , 'Hair painting' , 'Colour correction', 'Bridal'],
            description: 'With 27 years experience, I have covered a lot of ground in our industry, and am passionate about handing this knowledge on.\n' +
            '\n' +
            'Technically, I believe in providing an attention to detail to every client whether its a set of foils or a zero fade.\n' +
            '\n' +
            'Being an award winning multi site Shop Owner, my skills are not just limited to just the technical side of our trade. Check out Mister Chop Shop and Bondi Beach Chop Shopy.'
        }

    ];
        // filtered stylist by melbourne
        router.get('/getStylist/loc', function(req, res) {

            var filterByLoc = [];

            for (var i=0 ; i<stylistList.length;i++){
                if(stylistList[i].preferred_location === 'Melbourne'){
                    filterByLoc.push(stylistList[i]);
                }

                // else if (stylistList[i].preferred_location === 'Sydney'){
                //     filterByLoc.push(stylistList[i]);
                // }
                //
                // else if (stylistList[i].preferred_location === 'Perth'){
                //     filterByLoc.push(stylistList[i]);
                // }
            }

            res.setHeader('Content-Type', 'application/json');
            res.send(filterByLoc);
        });

        stylistList.sort(function (a, b) {
            if (a.rate > b.rate){
                return -1;
            }
            else if (a.rate === b.rate){
                return 0;
            }
            return 1;
        });

        router.get('/getstylists/skill', function (req, res, next) {

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(result);
});

module.exports = router;
