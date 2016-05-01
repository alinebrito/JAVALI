//Percorre as bibliotecas e conta quantos projetos distintos estão usando elas.

use JAVALI

var allProject = 263425;
//var allLibraries = db.getCollection('javaliLibraries').find({}).count();
var allLibraries = 1609851;

var skip = 0;
var limit = 10;

for(var i = 0; i < allLibraries/10; i++){
    print(limit + "--" + skip);
    db.getCollection('javaliLibraries').find({'percentage': null}).limit(limit).skip(skip).forEach(function(val){
        if(!val.percentage){
            var library = val._id;
            library = library.split("$").join("\\$")
            print(library);

            var resp = db.getCollection('javaliApi').distinct("Project", {"Import" : eval("/^" + library + "\\./") }).length
            var p = Number(resp/allProject*100);

            db.getCollection('javaliLibraries').update(
                 {"_id" : val._id}, 
                 {$set: {'value.OccurrenceProject' : resp, 'percentage': p}}
             )
        }
    });
    skip += 10;
}


