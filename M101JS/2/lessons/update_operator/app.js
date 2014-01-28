var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://192.168.110.130:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'assignment' : 'hw1' };
    var operator = { '$set' : { 'date_returned' : new Date() } };

    db.collection('grades').update(query, operator, function(err, updated) {
        if(err) throw err;

        console.dir("Successfully updated " + updated + " document!");

        return db.close();
    });
});
