use JAVALI

// Insere campo 'percentage' nos registros da collection javaliApiGroup.


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

