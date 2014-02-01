var client = require('mongodb').MongoClient,
	_under = require('underscore');


	var dropLow = function(arr)
	{


		var min = Number.MAX_VALUE,
		min_index = -1,
		tmp_array = [];

		for(i=0 ; i < arr.length; i++)
		{
			var val = arr[i]['score'],
				type = arr[i]['type'];

			if (type === 'homework' && val < min) 
			{
				min = val;
				min_index = i;
			}
		}
		
		for(i=0 ; i < arr.length ; i++) 
		{

			if(i !== min_index)
			{
				tmp_array.push(arr[i]);
			}
		}	

		console.log('Before filter');
		console.log(arr);
		console.log();
		console.log('After filering');
		console.log(tmp_array);

		return tmp_array;
	}	


	var db = client.connect('mongodb://localhost:27017/school', function(err,db)
	{
		if(err) throw err;
		
		var students = db.collection('students');
		
		students.find({}).toArray(function(err, docs) 
		{
			if(err) throw err;
			
			_under.each(docs, function(doc)
			{
				doc.scores = dropLow(doc.scores);

				console.log('Updating after filer');
				console.log(doc);

				students.update({'_id':doc._id}, doc, {}, function(err, results)
				{
					if(err) throw err;	
				});	
			});

			db.close();
		});	
	});
