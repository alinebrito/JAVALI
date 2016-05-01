use JAVALI

//Recupera as mil interfaces mais usadas dentre as encontradas, ordenadas pelo número de projetos, e 
//insere na collection javaliTopApis.

//var allProject = db.getCollection('javaliApi').distinct("Project").length
var allProject = 263425;

db.getCollection('javaliApiGroup').find({}).forEach(function(interface){
   
	var p = Number(interface.value.OccurrenceProject/allProject*100);

	db.getCollection('javaliApiGroup').update(
		{"_id" : interface._id},
		{$set: {'percentage': p}}
	)
	print(interface._id)
})

