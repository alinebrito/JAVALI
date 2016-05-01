use JAVALI

print('Merge javaliLibraries_CALCULADO_JAVA... ')

db.getCollection('javaliLibraries_CALCULADO_JAVA').find({}).forEach(function(val){
    print(val.cod);
    db.getCollection('javaliLibraries').update(
    {"_id" : val._id},
    {$set: 
        {"value.OccurrenceProject" : val.value.OccurrenceProject,
        'percentage': val.percentage}
   });
})

