use JAVALI

db.getCollection('javaliLibraries_CALCULADO_ANDROID').find({}).forEach(function(val){
    print(val.cod);
    db.getCollection('javaliLibraries').update(
    {"_id" : val._id},
    {$set: 
        {"value.OccurrenceProject" : val.value.OccurrenceProject,
        'percentage': val.percentage}
   });
})

