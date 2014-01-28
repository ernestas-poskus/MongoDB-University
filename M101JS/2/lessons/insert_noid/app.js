var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://192.168.110.130:27017/course', function(err, db) {
    if(err) throw err;

    var doc = { 'student' : 'Calvin', 'age' : 6 };

    db.collection('students').insert(doc, function(err, inserted) {
        if(err) throw err;

        console.dir("Successfully inserted: " + JSON.stringify(inserted));

        return db.close();
    });
});
