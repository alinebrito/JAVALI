use outputBOA;

var outCollection = "outputBOA_api_group";
var inCollection =  "outputBOA_api";

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

