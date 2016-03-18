/**
 * Constants.
 */

var info = {};

info.allProjects = 263425; 							// Amount of Java projects.
info.distinctsImports = 4780469; 				// Amount of Java imports (distincts).
info.allImports = 131147733; 						// Amount of Java imports (all).
info.allFiles = 16386193; 							// Amount of Java files.

/**
 * Format: 
 * 				{_id: Api (string), value: Amount of Java projects (int), pos: Ranking position (int)}
 */
info.top1 = { _id: 'java.util.ArrayList', value: {'OccurrenceProject': new Number(143454)} , 	pos: 1};
info.top2 = { _id: 'java.io.IOException', value: {'OccurrenceProject': new Number(136058)}, 	pos: 2};
info.top3 = { _id: 'java.util.List', 			value: {'OccurrenceProject': new Number(134053)}, 	pos: 3};
info.top4 = { _id: 'java.util.HashMap',  	value: {'OccurrenceProject': new Number(94220)}, 		pos: 4};
info.top5 = { _id: 'java.io.File',  			value: {'OccurrenceProject': new Number(88703)}, 		pos: 5};

//------------------------------------------------------------------------------------------------------
module.exports = {
	//Returns informations about the dataset.
	info : function(){
				return info;
		}
}
