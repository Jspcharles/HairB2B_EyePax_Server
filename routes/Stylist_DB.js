var express = require('express');
var router = express.Router();
var syncSql = require('sync-sql');
var path = require('path');
var fs = require('fs');


    // function to encode file data to base64 encoded string
    function base64_encode(file) {
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    }


router.get('/stylist_details', function(req, res) {
    var output = syncSql.mysql(
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'hairb2b_db',
            port: '3306'
        },
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

        var r = syncSql.mysql(
            {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'hairb2b_db',
                port: '3306'
            },
            "select * from" +
            " trn_skill where  stylist_id = "+stylist.id
        );
        for (var j =0 ; j<r.data.rows.length;j++){

                stylist.skill.push(r.data.rows[j].skill);
        }
        console.log(r);

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

    console.log(stylistLists);
    res.setHeader('Content-Type', 'application/json');
    res.send(stylistLists);

});

    // router.get('/stylist_details/job_role', function(req, res) {
    //     var output = syncSql.mysql(
    //         {
    //             host: 'localhost',
    //             user: 'root',
    //             password: '',
    //             database: 'hairb2b_db',
    //             port: '3306'
    //         },
    //         "select * from trn_stylist, trn_job_role, trn_rate_review where (trn_stylist.job_role_id = trn_job_role.id) and (trn_stylist.id = trn_rate_review.stylist_id)"
    //     );
    //
    //     console.log(output.data.rows);
    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(output.data.rows);
    //
    //     // var stylistLists = [];
    //     //
    //     // for (var st in output.data.rows){
    //     //     var stylistList = {};
    //     //     stylistList.id = st.id;
    //     //     stylistList.
    //     // }
    //
    // });



module.exports = router;