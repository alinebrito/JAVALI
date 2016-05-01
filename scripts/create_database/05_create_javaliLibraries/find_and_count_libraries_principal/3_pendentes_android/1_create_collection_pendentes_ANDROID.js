//Percorre a lista de APIs e identifica as bibliotecas android.*

use JAVALI


db.getCollection('javaliApiGroup').find({"_id": /^android\./, "value.OccurrenceProject": {$gte: 2}}).forEach(function(interface){

    var listLibraries =  interface._id.split(".");
    
    //Ignora última posição (interface).
    var library = "";
    for(var i=0; i<listLibraries.length-1; i++){
       
        library += listLibraries[i];
        print(library)

        db.getCollection('javaliLibraries_PENDENTE_ANDROID').update({"_id" : library}, {"_id" : library}, {upsert:true});
        library += ".";
    }
});


print("Inserindo index");
var i = 0;
db.getCollection('javaliLibraries_PENDENTE_ANDROID').find({}).forEach(function(val){
    db.getCollection('javaliLibraries_PENDENTE_ANDROID').update({"_id" : val._id}, {"index" : i}, {upsert:true});
    i++;
}) 
