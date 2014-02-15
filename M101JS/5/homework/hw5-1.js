db.posts.aggregate([
	{$unwind: "$comments"},
	{$group: {
		_id:"$comments.author", 
		num_comments: {$sum:1}
	}},
	{$sort:{num_comments:-1}},
	{$limit:1}
])

