function topClass(sortDir){
    return db.grades.aggregate([
        { $unwind: "$scores" }
       ,{ $match: { "scores.type": { $in: ["homework", "exam"] } } }
       ,{ $group: { _id: { studentId: "$student_id", classId: "$class_id" }, averageScorePerStudentPerClass: { "$avg":"$scores.score" } }}
       ,{ $group: { _id: "$_id.classId", averageScorePerClass: { "$avg":"$averageScorePerStudentPerClass" } } }
       ,{ $sort: { averageScorePerClass: sortDir } }
       ,{ $limit: 1 }
    ])
}

// Hint: The hardest class is class_id=2. Those students achieved a class average of 37.6 

// topClass(-1);
// topClass(1);