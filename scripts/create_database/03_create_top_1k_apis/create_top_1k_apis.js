use JAVALI

//Recupera as mil interfaces mais usadas, ordenadas pelo número de projetos, e 
//insere na collection javaliTopApis.

//var allProject = db.getCollection('javaliApi').distinct("Project").length
var allProject = 263425; // total projetos.
var i = 1;
db.getCollection('javaliApiGroup').find({"_id" : {'$not': /\.\*$/}}).limit(1000).sort({"value.OccurrenceProject": -1}).forEach(function(val){
	var interface = val;
	interface.index = i;
	i++;
	var percentage = interface.value.OccurrenceProject/allProject*100;
	interface.percentage = Number(percentage)
	db.getCollection('javaliTopApis').insert(interface)
})

