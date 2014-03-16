db.products.insert({"_id" : "ac9", "name" : "AC9 Phone", "brand" : "ACME","type" : "phone", "price" : 333, "warranty_years" : 0.25, "available" : true})
obj = db.products.findOne( { _id : ObjectId("507d95d5719dbef170f15c00") } )
obj.term_years = 3
db.products.save(obj)
obj.limits.sms.over_rate = 0.01
db.products.save(obj)
// homework.b()