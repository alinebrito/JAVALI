db.getCollection('javaliLibraries_top_1000_ate_2000').find({}).forEach(function(val){ 
        var result = db.getCollection('javaliLibraries').find({"_id" : val._id}).toArray()
        if(!result[0].percentage)
            print(val._id)
        
})
