
use JAVALI

print("Inserindo index");
var i = 0;
db.getCollection('javaliLibraries_PENDENTE_ORG_JUNIT').find({}).forEach(function(val){
     db.getCollection('javaliLibraries_PENDENTE_ORG_JUNIT').update({"_id" : val._id}, {"index" : i}, {upsert:true});
     i++;
}) 

