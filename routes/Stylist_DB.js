var express = require('express');
var router = express.Router();
var syncSql = require('sync-sql');
var path = require('path');
var fs = require('fs');
var connection = require('../database');
var moment = require('moment');

    // function to encode the image file
    function base64_encode(file) {
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    }

    //Storing all the names for search field filter
router.get('/stylist_details/names', function(req, res) {

    var stylistNames = [];
    var output = syncSql.mysql(
        connection,
        "select first_name, last_name from trn_stylist"
    );

    for (var i=0; i<output.data.rows.length; i++){
        stylistNames.push(output.data.rows[i].first_name + ' ' + output.data.rows[i].last_name);
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(stylistNames);
    // console.log(stylistNames);

});

//Storing all the locations for search field filter
router.get('/stylist_details/locations', function(req, res) {

    var stylistNames = [];
    var output = syncSql.mysql(
        connection,
        "select distinct address_line_1 from trn_stylist"
    );

    for (var i=0; i<output.data.rows.length; i++){
        stylistNames.push(output.data.rows[i].address_line_1);
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(stylistNames);
    // console.log(stylistNames);

});

//Storing all the skills for search field filter
router.get('/stylist_details/skills', function(req, res) {

    var stylistNames = [];
    var output = syncSql.mysql(
        connection,
        "select distinct skill from trn_skill"
    );

    for (var i=0; i<output.data.rows.length; i++){
        stylistNames.push(output.data.rows[i].skill);
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(stylistNames);
    // console.log(stylistNames);

});

//Retrieving all the details about the stylist from the db
// router.get('/stylist_details', function(req, res) {
//     var output = syncSql.mysql(
//         connection,
//         "select * from trn_stylist"
//     );
//
//     // console.log(output.data.rows);
//     // res.send(output.data.rows);
//
//     var stylistLists = [];
//
//     for (var i = 0; i < output.data.rows.length; i++){
//         var stylist = {};
//         stylist.id = output.data.rows[i].id;
//         stylist.first_name = output.data.rows[i].first_name;
//         stylist.last_name = output.data.rows[i].last_name;
//         stylist.profile_pic = base64_encode(path.resolve(output.data.rows[i].profile_pic));
//         stylist.address_line_1 = output.data.rows[i].address_line_1;
//         stylist.address_line_2 = output.data.rows[i].address_line_2;
//         stylist.city = output.data.rows[i].city;
//         stylist.state = output.data.rows[i].state;
//         stylist.mrng_cost = output.data.rows[i].mrng_cost;
//         stylist.evng_cost = output.data.rows[i].evng_cost;
//         stylist.telephone = output.data.rows[i].telephone;
//         stylist.description = output.data.rows[i].description;
//         stylist.rating = output.data.rows[i].rating;
//         stylist.terms_and_condotions = output.data.rows[i].terms_and_condotions;
//         stylist.skill = [];
//
//         var r = syncSql.mysql(
//             connection,
//             "select * from trn_skill where  stylist_id = "+stylist.id
//         );
//         for (var j =0 ; j<r.data.rows.length;j++){
//
//                 stylist.skill.push(r.data.rows[j].skill);
//         }
//         // console.log(r);
//
//         stylistLists.push(stylist);
//     }
//
//     stylistLists.sort(function (a, b) {
//       if (a.rating > b.rating){
//         return -1;
//       }
//       else if (a.rating === b.rating){
//         return 0;
//       }
//       return 1;
//     });
//
//     // console.log(stylistLists);
//     res.setHeader('Content-Type', 'application/json');
//     res.send(stylistLists);
// });


router.get('/stylist_details', function(req, res) {
    var output = syncSql.mysql(
        connection,
        "select * from trn_stylist"
    );

    // console.log(output.data.rows);
    // res.send(output.data.rows);

    var stylistLists = [];

    for (var i = 0; i < output.data.rows.length; i++){
        var stylist = {};
        stylist.id = output.data.rows[i].id;
        stylist.first_name = output.data.rows[i].first_name;
        stylist.last_name = output.data.rows[i].last_name;
        stylist.profile_pic = base64_encode(path.resolve(output.data.rows[i].profile_pic));
        stylist.address_line_1 = output.data.rows[i].address_line_1;
        stylist.address_line_2 = output.data.rows[i].address_line_2;
        stylist.city = output.data.rows[i].city;
        stylist.state = output.data.rows[i].state;
        stylist.mrng_cost = output.data.rows[i].mrng_cost;
        stylist.evng_cost = output.data.rows[i].evng_cost;
        stylist.telephone = output.data.rows[i].telephone;
        stylist.description = output.data.rows[i].description;
        stylist.rating = output.data.rows[i].rating;
        stylist.terms_and_condotions = output.data.rows[i].terms_and_condotions;
        stylist.skill = [];
        stylist.busy_date = [];

        var r = syncSql.mysql(
            connection,
            "select * from trn_skill where  stylist_id = "+stylist.id
        );
        for (var j =0 ; j<r.data.rows.length;j++){

            stylist.skill.push(r.data.rows[j].skill);
        }
        // console.log(r);

        var q = syncSql.mysql(
            connection,
            "select * from trn_busy_date_stylist where stylist_id = "+stylist.id
        );
        for (var k =0 ; k<q.data.rows.length;k++){

            stylist.busy_date.push(q.data.rows[k].busy_date);

        }
        // console.log(q);

        var s = syncSql.mysql(
            connection,
            "select type from trn_type, trn_stylist where trn_stylist.type_id = trn_type.id and trn_stylist.id = "+stylist.id
        );
        stylist.type = s.data.rows[0].type;



        stylistLists.push(stylist);
    }

    stylistLists.sort(function (a, b) {
        if (a.rating > b.rating){
            return -1;
        }
        else if (a.rating === b.rating){
            return 0;
        }
        return 1;
    });

    // console.log(stylistLists);
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistLists);
});

//Retrieving all the details about the stylist by id from the db
router.get('/stylist_details/:id', function(req, res) {
    var output = syncSql.mysql(
        connection,
        "select * from trn_stylist where id = "+req.params.id
    );

    // console.log(output.data.rows);
    // res.send(output.data.rows);

    var stylistLists = [];

    for (var i = 0; i < output.data.rows.length; i++){
        var stylist = {};
        stylist.id = output.data.rows[i].id;
        stylist.first_name = output.data.rows[i].first_name;
        stylist.last_name = output.data.rows[i].last_name;
        stylist.profile_pic = base64_encode(path.resolve(output.data.rows[i].profile_pic));
        stylist.address_line_1 = output.data.rows[i].address_line_1;
        stylist.address_line_2 = output.data.rows[i].address_line_2;
        stylist.city = output.data.rows[i].city;
        stylist.state = output.data.rows[i].state;
        stylist.mrng_cost = output.data.rows[i].mrng_cost;
        stylist.evng_cost = output.data.rows[i].evng_cost;
        stylist.telephone = output.data.rows[i].telephone;
        stylist.description = output.data.rows[i].description;
        stylist.rating = output.data.rows[i].rating;
        stylist.terms_and_condotions = output.data.rows[i].terms_and_condotions;
        stylist.skill = [];
        stylist.busy_date = [];

        var r = syncSql.mysql(
            connection,
            "select * from trn_skill where stylist_id = "+stylist.id
        );
        for (var j =0 ; j<r.data.rows.length;j++){

            stylist.skill.push(r.data.rows[j].skill);
        }
        // console.log(r);

        var q = syncSql.mysql(
            connection,
            "select * from trn_busy_date_stylist where stylist_id = "+stylist.id
        );
        for (var j =0 ; j<q.data.rows.length;j++){

            stylist.busy_date.push(q.data.rows[j].busy_date);

        }
        // console.log(q);

        var s = syncSql.mysql(
            connection,
            "select type from trn_type, trn_stylist where trn_stylist.type_id = trn_type.id and trn_stylist.id = "+stylist.id
        );
        stylist.type = s.data.rows[0].type;

        stylistLists.push(stylist);
    }

    stylistLists.sort(function (a, b) {
        if (a.rating > b.rating){
            return -1;
        }
        else if (a.rating === b.rating){
            return 0;
        }
        return 1;
    });

    // console.log(stylistLists);
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistLists);
});

//Retrieving all the details about the stylist by location from the db
router.get('/stylist_details/bylocation/:location', function(req, res) {
    var output = syncSql.mysql(
        connection,
        "select * from trn_stylist where address_line_1 = '" +req.params.location+"'"

    );
    // console.log(req.params.location);

    // console.log(output.data.rows);s
    // res.send(output.data.rows);

    var stylistLists = [];

    for (var i = 0; i < output.data.rows.length; i++){
        var stylist = {};
        stylist.id = output.data.rows[i].id;
        stylist.first_name = output.data.rows[i].first_name;
        stylist.last_name = output.data.rows[i].last_name;
        stylist.profile_pic = base64_encode(path.resolve(output.data.rows[i].profile_pic));
        stylist.address_line_1 = output.data.rows[i].address_line_1;
        stylist.address_line_2 = output.data.rows[i].address_line_2;
        stylist.city = output.data.rows[i].city;
        stylist.state = output.data.rows[i].state;
        stylist.mrng_cost = output.data.rows[i].mrng_cost;
        stylist.evng_cost = output.data.rows[i].evng_cost;
        stylist.telephone = output.data.rows[i].telephone;
        stylist.description = output.data.rows[i].description;
        stylist.rating = output.data.rows[i].rating;
        stylist.terms_and_condotions = output.data.rows[i].terms_and_condotions;
        stylist.skill = [];
        stylist.busy_date = [];

        var r = syncSql.mysql(
            connection,
            "select * from trn_skill where stylist_id = "+stylist.id
        );
        for (var j =0 ; j<r.data.rows.length;j++){

            stylist.skill.push(r.data.rows[j].skill);
        }
        // console.log(r);

        var q = syncSql.mysql(
            connection,
            "select * from trn_busy_date_stylist where stylist_id = "+stylist.id
        );
        for (var j =0 ; j<q.data.rows.length;j++){

            stylist.busy_date.push(q.data.rows[j].busy_date);

        }
        // console.log(q);

        var s = syncSql.mysql(
            connection,
            "select type from trn_type, trn_stylist where trn_stylist.type_id = trn_type.id and trn_stylist.id = "+stylist.id
        );
        stylist.type = s.data.rows[0].type;

        stylistLists.push(stylist);
    }

    stylistLists.sort(function (a, b) {
        if (a.rating > b.rating){
            return -1;
        }
        else if (a.rating === b.rating){
            return 0;
        }
        return 1;
    });

    // console.log(stylistLists);
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistLists);
});

//Retrieving all the details about the stylist by skill from the db
router.get('/stylist_details/bySkill/:skill', function(req, res) {
    var output = syncSql.mysql(
        connection,

        "select ts.* from trn_stylist ts, trn_skill tsk where (ts.id = tsk.stylist_id) and (tsk.skill = '" +req.params.skill+"')"
    );
    // console.log(req.params.skill);

    // console.log(output.data.rows);s
    // res.send(output.data.rows);

    var stylistLists = [];

    for (var i = 0; i < output.data.rows.length; i++){
        var stylist = {};
        stylist.id = output.data.rows[i].id;
        stylist.first_name = output.data.rows[i].first_name;
        stylist.last_name = output.data.rows[i].last_name;
        stylist.profile_pic = base64_encode(path.resolve(output.data.rows[i].profile_pic));
        stylist.address_line_1 = output.data.rows[i].address_line_1;
        stylist.address_line_2 = output.data.rows[i].address_line_2;
        stylist.city = output.data.rows[i].city;
        stylist.state = output.data.rows[i].state;
        stylist.mrng_cost = output.data.rows[i].mrng_cost;
        stylist.evng_cost = output.data.rows[i].evng_cost;
        stylist.telephone = output.data.rows[i].telephone;
        stylist.description = output.data.rows[i].description;
        stylist.rating = output.data.rows[i].rating;
        stylist.terms_and_condotions = output.data.rows[i].terms_and_condotions;
        stylist.skill = [];
        stylist.busy_date = [];

        var r = syncSql.mysql(
            connection,
            "select * from trn_skill where stylist_id = "+stylist.id
        );

        for (var j =0 ; j<r.data.rows.length;j++){

            stylist.skill.push(r.data.rows[j].skill);
        }
        // console.log('-----------');
        // console.log(stylist.id);
        // console.log(stylist.skill);
        // console.log('-----------');

        var q = syncSql.mysql(
            connection,
            "select * from trn_busy_date_stylist where stylist_id = "+stylist.id
        );
        for (var j =0 ; j<q.data.rows.length;j++){

            stylist.busy_date.push(q.data.rows[j].busy_date);

        }
        // console.log(q);

        var s = syncSql.mysql(
            connection,
            "select type from trn_type, trn_stylist where trn_stylist.type_id = trn_type.id and trn_stylist.id = "+stylist.id
        );
        stylist.type = s.data.rows[0].type;

        stylistLists.push(stylist);
    }

    stylistLists.sort(function (a, b) {
        if (a.rating > b.rating){
            return -1;
        }
        else if (a.rating === b.rating){
            return 0;
        }
        return 1;
    });

    // console.log(stylistLists);
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistLists);
});

//Retrieving all the details about the stylist by name from the db
router.get('/stylist_details/byName/:name', function(req, res) {
    var name = req.params.name;
    var first_name = name.split(' ')[0];
    var last_name = name.split(' ')[1];

    var output = syncSql.mysql(
        connection,
        // "select * from trn_stylist where address_line_1 = '" +req.params.skill+"'"

        "select * from trn_stylist where first_name like '%"+first_name+"%' or last_name like '%"+last_name+"%'"
    );
    // console.log(req.params.skill);

    // console.log(output.data.rows);s
    // res.send(output.data.rows);

    var stylistLists = [];

    for (var i = 0; i < output.data.rows.length; i++){
        var stylist = {};
        stylist.id = output.data.rows[i].id;
        stylist.first_name = output.data.rows[i].first_name;
        stylist.last_name = output.data.rows[i].last_name;
        stylist.profile_pic = base64_encode(path.resolve(output.data.rows[i].profile_pic));
        stylist.address_line_1 = output.data.rows[i].address_line_1;
        stylist.address_line_2 = output.data.rows[i].address_line_2;
        stylist.city = output.data.rows[i].city;
        stylist.state = output.data.rows[i].state;
        stylist.mrng_cost = output.data.rows[i].mrng_cost;
        stylist.evng_cost = output.data.rows[i].evng_cost;
        stylist.telephone = output.data.rows[i].telephone;
        stylist.description = output.data.rows[i].description;
        stylist.rating = output.data.rows[i].rating;
        stylist.terms_and_condotions = output.data.rows[i].terms_and_condotions;
        stylist.skill = [];
        stylist.busy_date = [];

        var r = syncSql.mysql(
            connection,
            "select * from trn_skill where stylist_id = "+stylist.id
        );

        for (var j =0 ; j<r.data.rows.length;j++){

            stylist.skill.push(r.data.rows[j].skill);
        }
        // console.log('-----------');
        // console.log(stylist.id);
        // console.log(stylist.skill);
        // console.log('-----------');

        var q = syncSql.mysql(
            connection,
            "select * from trn_busy_date_stylist where stylist_id = "+stylist.id
        );
        for (var j =0 ; j<q.data.rows.length;j++){

            stylist.busy_date.push(q.data.rows[j].busy_date);

        }
        // console.log(q);

        var s = syncSql.mysql(
            connection,
            "select type from trn_type, trn_stylist where trn_stylist.type_id = trn_type.id and trn_stylist.id = "+stylist.id
        );
        stylist.type = s.data.rows[0].type;

        stylistLists.push(stylist);
    }

    stylistLists.sort(function (a, b) {
        if (a.rating > b.rating){
            return -1;
        }
        else if (a.rating === b.rating){
            return 0;
        }
        return 1;
    });

    // console.log(stylistLists);
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistLists);
});

//Retrieve stylist by type wise
router.get('/stylist_details/byType/:type', function(req, res) {

    var output = syncSql.mysql(
        connection,
        // "select * from trn_stylist where address_line_1 = '" +req.params.skill+"'"

        "select * from trn_stylist, trn_type where trn_stylist.type_id = trn_type.id and trn_type.type = '" +req.params.type+"'"
    );
    // console.log(req.params.skill);

    // console.log(output.data.rows);s
    // res.send(output.data.rows);

    var stylistLists = [];

    for (var i = 0; i < output.data.rows.length; i++){
        var stylist = {};
        stylist.id = output.data.rows[i].id;
        stylist.first_name = output.data.rows[i].first_name;
        stylist.last_name = output.data.rows[i].last_name;
        stylist.profile_pic = base64_encode(path.resolve(output.data.rows[i].profile_pic));
        stylist.address_line_1 = output.data.rows[i].address_line_1;
        stylist.address_line_2 = output.data.rows[i].address_line_2;
        stylist.city = output.data.rows[i].city;
        stylist.state = output.data.rows[i].state;
        stylist.mrng_cost = output.data.rows[i].mrng_cost;
        stylist.evng_cost = output.data.rows[i].evng_cost;
        stylist.telephone = output.data.rows[i].telephone;
        stylist.description = output.data.rows[i].description;
        stylist.rating = output.data.rows[i].rating;
        stylist.terms_and_condotions = output.data.rows[i].terms_and_condotions;
        stylist.skill = [];
        stylist.busy_date = [];

        var r = syncSql.mysql(
            connection,
            "select * from trn_skill where stylist_id = "+stylist.id
        );

        for (var j =0 ; j<r.data.rows.length;j++){

            stylist.skill.push(r.data.rows[j].skill);
        }
        // console.log('-----------');
        // console.log(stylist.id);
        // console.log(stylist.skill);
        // console.log('-----------');

        var q = syncSql.mysql(
            connection,
            "select * from trn_busy_date_stylist where stylist_id = "+stylist.id
        );
        for (var j =0 ; j<q.data.rows.length;j++){

            stylist.busy_date.push(q.data.rows[j].busy_date);

        }
        // console.log(q);

        var s = syncSql.mysql(
            connection,
            "select type from trn_type, trn_stylist where trn_stylist.type_id = trn_type.id and trn_stylist.id = "+stylist.id
        );
        stylist.type = s.data.rows[0].type;

        stylistLists.push(stylist);
    }

    stylistLists.sort(function (a, b) {
        if (a.rating > b.rating){
            return -1;
        }
        else if (a.rating === b.rating){
            return 0;
        }
        return 1;
    });

    // console.log(stylistLists);
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistLists);
});

//Retrieving all the calendar details from the db
// router.get('/stylist_details/calendar/:id', function(req, res) {
//
//     var r = syncSql.mysql(
//         connection,
//         "SELECT * FROM trn_busy_date WHERE trn_busy_date.stylist_id =" +req.params.id
//     );
//
//     var stylistLists = [];
//
//     for (var i = 0; i < r.data.rows.length; i++){
//         var stylist = {};
//         stylist.id = r.data.rows[i].id;
//         stylist.stylist_id = r.data.rows[i].stylist_id;
//         stylist.time_slot_busy_date_1 = r.data.rows[i].time_slot_busy_date_1;
//         stylist.time_slot_busy_date_2 = r.data.rows[i].time_slot_busy_date_2;
//         stylist.busy_date_1 = r.data.rows[i].busy_date_1;
//         stylist.busy_date_2 = r.data.rows[i].busy_date_2;
//         stylist.day_busy = r.data.rows[i].day_busy;
//         stylistLists.push(stylist);
//     }
//
//     // console.log(r);
//
//
//     res.setHeader('Content-Type', 'application/json');
//     res.send(stylistLists);
//
//     // console.log(stylistLists);
// });

//Retrieving all the gallery details about the stylist by id from the db
router.get('/stylist_details/gallery/:id', function(req, res) {
    var output = syncSql.mysql(
        connection,
        "select * from trn_stylist where id = "+req.params.id
    );

    // console.log(output.data.rows);
    // res.send(output.data.rows);

    var stylistLists = [];

    for (var i = 0; i < output.data.rows.length; i++){
        var stylist = {};
        stylist.id = output.data.rows[i].id;
        stylist.first_name = output.data.rows[i].first_name;
        stylist.last_name = output.data.rows[i].last_name;
        stylist.profile_pic = base64_encode(path.resolve(output.data.rows[i].profile_pic));
        stylist.address_line_1 = output.data.rows[i].address_line_1;
        stylist.address_line_2 = output.data.rows[i].address_line_2;
        stylist.city = output.data.rows[i].city;
        stylist.state = output.data.rows[i].state;
        stylist.mrng_cost = output.data.rows[i].mrng_cost;
        stylist.evng_cost = output.data.rows[i].evng_cost;
        stylist.telephone = output.data.rows[i].telephone;
        stylist.description = output.data.rows[i].description;
        stylist.rating = output.data.rows[i].rating;
        stylist.terms_and_condotions = output.data.rows[i].terms_and_condotions;
        stylist.gallery = [];

        var r = syncSql.mysql(
            connection
            ,
            "select * from trn_gallery where stylist_id = "+stylist.id
        );
        for (var j =0 ; j<r.data.rows.length;j++){

            stylist.gallery.push(base64_encode(path.resolve(r.data.rows[j].image_path)));
        }
        // console.log(r);

        var s = syncSql.mysql(
            connection,
            "select type from trn_type, trn_stylist where trn_stylist.type_id = trn_type.id and trn_stylist.id = "+stylist.id
        );
        stylist.type = s.data.rows[0].type;

        stylistLists.push(stylist);
    }

    // console.log(stylistLists);
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistLists);
});

router.get('/stylist_details/busy_date/:id', function(req, res) {
    var output = syncSql.mysql(
        connection,
        "SELECT stylist_id,busy_date,time_slot from trn_time_slot, trn_busy_date_stylist where (trn_busy_date_stylist.time_slot_id = trn_time_slot.id) and trn_busy_date_stylist.stylist_id = " +req.params.id
    );

    // console.log(output.data.rows);
    // res.send(output.data.rows[0].busy_date);

    var stylistLists = [];

    for (var i = 0; i < output.data.rows.length; i++){
        var stylist = {};
        stylist.stylist_id = output.data.rows[i].stylist_id;
        stylist.busy_date = moment(output.data.rows[i].busy_date).format('YYYY-MM-DD');
        stylist.time_slot = output.data.rows[i].time_slot;

        // console.log(r);

        stylistLists.push(stylist);
        console.log(stylistLists);
    }

    // console.log(stylistLists);
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistLists);
});

module.exports = router;