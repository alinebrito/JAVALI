//Percorre a lista de APIs e identifica as bibliotecas android.*

use JAVALI


db.getCollection('javaliApiGroup').find({"_id": /^com.google\./, "value.OccurrenceProject": {$gte: 50}}).forEach(function(interface){

    var listLibraries =  interface._id.split(".");
    
    //Ignora última posição (interface).
    var library = "";
	var size = listLibraries.length;
	if(size > 3){
		for(var i=0; i<3; i++){
		   
		    library += listLibraries[i];

		    if((library != "com") && (library != "com.google")){
		        print(library)
		        db.getCollection('javaliLibraries_PENDENTE_COM_GOOGLE').update({"_id" : library}, {"_id" : library}, {upsert:true});
		    }
		    library += ".";
		}
	}

});

