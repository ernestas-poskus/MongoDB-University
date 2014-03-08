function avgCityPop(states, minPop){
    return db.zips.aggregate([
        { $match: { state: { $in: states } } }
       ,{ $group: { _id: { city: "$city", state: "$state" }, totalCityPopulation: { "$sum":"$pop" } }}
       ,{ $match: { totalCityPopulation: { $gt: minPop } } }
       ,{ $group: { _id: "1", averagePopulation: { "$avg":"$totalCityPopulation" } }}
    ])
}

// Hint: The answer for CT and NJ (using this data set) is 38177. 

// avgCityPop(['CT', 'NJ'], 25000); - must be 38177
// avgCityPop(['CA', 'NY'], 25000);