var express = require('express');
var router = express.Router();
var syncSql = require('sync-sql');
var path = require('path');
var fs = require('fs');

router.get('/stylist_details', function(req, res) {
    var output = syncSql.mysql(
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'hairb2b_db',
            port: '3306'
        },
        "select * from trn_stylist, trn_job_role, trn_rate_review where (trn_stylist.job_role_id = trn_job_role.id) and (trn_stylist.id = trn_rate_review.stylist_id)"
    );

    console.log(output.data.rows);
    res.setHeader('Content-Type', 'application/json');
    res.send(output.data.rows);

    var pro_pic =

    // var stylistLists = [];
    //
    // // for (var st in output.data.rows){
    // //     var stylist = {};
    // //     stylist.
    // // }

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
//     // for (var st of output.data.rows){
//     //
//     // }
//
// });



module.exports = router;