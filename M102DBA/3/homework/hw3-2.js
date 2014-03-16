db.zips.aggregate([{ $project: { _id: { $substr: ["$_id", 0, 1] } } },{ $group: { _id: "$_id", n: { $sum: 1 } } }])
db.zips.aggregate([{ $project: { _id: { $substr: ["$city", 0, 1] } } }, { $group: { _id: "$_id", n: { $sum: 1 }}}])
db.zips.remove({ city: /^[0-9]/})
db.zips.count()