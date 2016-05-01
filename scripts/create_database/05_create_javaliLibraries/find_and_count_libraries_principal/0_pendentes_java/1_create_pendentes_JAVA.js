use JAVALI

var i = 0;
//Busca entre as bibliotecas, as iniciadas com java.*, adiciona na coleção javaliLibraries_PENDENTE_JAVA.
db.getCollection('javaliLibraries').find({percentage: null,  "_id": /^java\./}).forEach(function(val){
	var library = {};
	library.import = val._id;
	library.index = i;
	i++;
	print(library.import)
    db.getCollection('javaliLibraries_PENDENTE_JAVA').insert(library);
});

