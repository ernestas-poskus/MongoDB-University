db.grades.aggregate([
	{$unwind: "$scores"},
	{$match: {"scores.type": {$nin: ["quiz"]}}},
	{$group: {_id: {class:"$class_id", student:"$student_id"}, avg_student_score: {$avg: "$scores.score"}}},
	{$group: {_id: "$_id.class", class_avg: {$avg: "$avg_student_score"}}},
	{$sort: {class_avg:-1}},
	{$limit:1}
])
