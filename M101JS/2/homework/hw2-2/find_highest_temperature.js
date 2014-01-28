var client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/weather', function(err, db) {
	if (err) throw err;

	var cursor = db.collection('data').find(query, projection);
	var projection = {'State':1, 'Temperature':1};
	var operator = {'$set':{'month_high':true}};
	var query = {};
	var state = '';

	cursor.sort([['State',1], ['Temperature',-1]]);

	cursor.each(function(err, doc) {
		if (err) throw err;

		if (doc == null) 
		{
			return db.close();
		} 
		else if (doc.State !== state) 
		{	
			state = doc.State; // Answer

			db.collection('data').update({'_id':doc._id}, operator, function(err, updated) {
				if (err) throw err;
			});
		}
	});
});
