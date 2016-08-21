use JAVALI

var allProject = 263425;
var skip = 326;
var limit = 10;

for(var i = 0; i < 23; i++){
    print(limit + "--" + skip);
    db.getCollection('javaliLibraries_PENDENTE_COM_ANDROID').find({'percentage': null}).sort({"index": 1}).limit(limit).skip(skip).forEach(function(val){
            var library = val._id;
            library = library.split("$").join("\\$");
            print(val.index);

            var resp = db.getCollection('javaliApi').distinct("Project", {"Import" : eval("/^" + library + "\\./") }).length
            var p = Number(resp/allProject*100);

            var resultado = {};
            resultado.cod = val.index;
            resultado._id = val._id;
            resultado.value = {};
            resultado.value.OccurrenceProject = resp;
            resultado.percentage = p;

            db.getCollection('javaliLibraries_CALCULADO_COM_ANDROID').insert(resultado);
    });

    skip += 10;
}
