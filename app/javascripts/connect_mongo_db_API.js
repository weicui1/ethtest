var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/mydb";
var qs = require('querystring');
var TABLE_USERS = 'table_gp_users'

var http = require('http');

http.createServer(function(req, res) {

    if (req.headers.origin) {
        console.log("req.headers.origin = " + req.headers.origin);
        var postBody = '';
        if (req.method == 'POST') {
            req.on('data', function(data) {
                postBody += data;
            });
            req.on('end', function() {
                console.log("post body: " + postBody);
            });
        }

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            console.log("Database created!");


            db.createCollection(TABLE_USERS, function(err, createRes) {
                if (err) throw err;
                console.log("Collection " + TABLE_USERS + " created!");

                db.listCollections({ name: TABLE_USERS })
                    .next(function(err, collinfo) {
                        if (err) {
                            console.log('table ' + TABLE_USERS + ' not exists: ' + err);
                            res.writeHead(200, {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                                'Access-Control-Allow-Headers': 'Origin,Content-Type',
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.write(postBody+"\n");
                            res.end('table ' + TABLE_USERS + ' not exists');
                            db.close();
                        } else {
                            console.log('table Exists:' + collinfo);
                            res.writeHead(200, {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                                'Access-Control-Allow-Headers': 'Origin,Content-Type',
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.write(postBody+"\n");
                            res.end('Table ' + TABLE_USERS + ' created!');
                        }
                    });

            });



        });
    }
}).listen(8088,"0.0.0.0");