/**
 * Constants.
 */

var info = {};

info.allProjects = 263425; 			// All projects.
info.allImports = 4780469; 			// APIs distincts.
info.importsRead = 131147733; 	// All APIs.
info.filesRead = 16386193; 			// All files.

// _id: name (string), OccurrenceProject: number projects (integer), pos: position (integer)
info.top1 = { _id: 'java.util.ArrayList', value: {'OccurrenceProject': new Number(143454)} , pos: 1};
info.top2 = { _id: 'java.io.IOException', value: {'OccurrenceProject': new Number(136058)}, pos: 2};
info.top3 = { _id: 'java.util.List', value: {'OccurrenceProject': new Number(134053)}, pos: 3};
info.top4 = { _id: 'java.util.HashMap',  value: {'OccurrenceProject': new Number(94220)}, pos: 4};
info.top5 = { _id: 'java.io.File',  value: {'OccurrenceProject': new Number(88703)}, pos: 5};

//------------------------------------------------------------------------------------------------------

module.exports = {
	//Returns informations about the dataset.
	info : function(){
				return info;
		}
}
