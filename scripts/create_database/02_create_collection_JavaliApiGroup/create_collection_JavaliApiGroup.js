//  Cria a coleção javaliApiGroup, onde os registros de popularidade são agrupados.
//   Exemplo da estrutura criada:
// {
//       "_id" : "java.util.List",
//       "value" : {
//           "OccurrenceFile" : 1.0000000000000000,
//           "OccurrenceProject" : 1.0000000000000000
//        }
// }
//
//   Onde:
//       _id: nome da API;
//       value.OccurrenceFile: quantidade de vezes que a api foi importada.
//       value.OccurrenceProject: quantidade de projetos distintos onde a API foi encontrada.
//   
//   Para executar o script: mongo < create_collection_JavaliApiGroup.js

use JAVALI;

var outCollection = "javaliApiGroup";
var inCollection =  "javaliApi";

var SOURCE = db.getCollection(inCollection);

var map = function() { 
	emit( this.Import, {OccurrenceFile: this.Occurrence, OccurrenceProject: 1 }); 
}

var reduce = function(key, values) {

	var result = { OccurrenceFile: 0, OccurrenceProject: 0 };

	values.forEach(function( value ) {
        result.OccurrenceFile += value.OccurrenceFile;
        result.OccurrenceProject += value.OccurrenceProject;
    });
    
    return result;

};
   
res = SOURCE.mapReduce( 
        map, 
        reduce, 
        {   
            out: outCollection, 
        }
); 

