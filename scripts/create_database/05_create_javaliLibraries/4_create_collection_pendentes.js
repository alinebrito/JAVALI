//Percorre a lista de APIs e identifica as bibliotecas conforme id especificado.

use JAVALI


db.getCollection('javaliApiGroup').find({"_id": /^com.android\./, "value.OccurrenceProject": {$gte: 50}}).forEach(function(interface){

    var listLibraries =  interface._id.split(".");
    
    //Ignora última posição (interface).
    var library = "";
    for(var i=0; i<listLibraries.length-1; i++){
       
        library += listLibraries[i];

        if(library != "org"){
            print(library)
            db.getCollection('javaliLibraries_PENDENTE_COM_ANDROID').update({"_id" : library}, {"_id" : library}, {upsert:true});
        }
        library += ".";
    }
});


