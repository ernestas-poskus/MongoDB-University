db.zips.aggregate([
	{$project: {_id:0, zipcode: "$_id", first_char: {$substr: ["$city",0,1]}, pop: "$pop"}},
	{$match: {first_char: {$gte: "0", $lte: "9"}}},
	{$group: {_id:null, total_pop: {$sum: "$pop"}}}
])
