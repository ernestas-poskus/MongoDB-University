var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://192.168.110.130:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'assignment' : 'hw3' };

    db.collection('grades').remove(query, function(err, removed) {
        if(err) throw err;

        console.dir("Successfully updated " + removed + " documents!");

        return db.close();
    });
});
