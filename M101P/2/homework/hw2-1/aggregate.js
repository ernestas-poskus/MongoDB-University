//db.grades.aggregate({'$group':{'_id':'$student_id', 'average':{$avg:'$score'}}}, {'$sort':{'average':-1}}, {'$limit':1})

db.grades.find({"score": {$gte: 65}}).sort({"score": 1}).limit(1)
