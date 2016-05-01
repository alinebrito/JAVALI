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
 * 				{_id: Api (string), value: Amount of Java projects (int), index: Ranking position (int)}
 */
info.top1 = { _id: 'java.util.ArrayList', value: {'OccurrenceProject': new Number(143454)}, index: 1, percentage: 54.457};
info.top2 = { _id: 'java.io.IOException', value: {'OccurrenceProject': new Number(136058)}, index: 2, percentage: 51.649};
info.top3 = { _id: 'java.util.List', 			value: {'OccurrenceProject': new Number(134053)}, index: 3, percentage: 50.888};
info.top4 = { _id: 'java.util.HashMap',  	value: {'OccurrenceProject': new Number(94220)},  index: 4, percentage: 35.767};
info.top5 = { _id: 'java.io.File',  			value: {'OccurrenceProject': new Number(88703)},  index: 5, percentage: 33.672};

info.library = {};
info.library.name = 'java.util';
info.library.group = { _id: 'java.util',  value: {'OccurrenceProject': new Number(216799)},  index: 1,  percentage: 82.300};
info.library.api1 = { _id: 'java.util.ArrayList',  value: {'OccurrenceProject': new Number(143454)},  index: 1,  percentage: 54.457};
info.library.api2 = { _id: 'java.util.List',  		 value: {'OccurrenceProject': new Number(134053)},  index: 2, percentage: 50.888};
info.library.api3 = { _id: 'java.util.HashMap',    value: {'OccurrenceProject': new Number(94220)}, 	index: 3,  percentage: 35.767};
info.library.api4 = { _id: 'java.util.Map',        value: {'OccurrenceProject': new Number(87417)}, 	index: 4, percentage: 33.185};
info.library.api5 = { _id: 'java.util.Date',       value: {'OccurrenceProject': new Number(64460)}, 	index: 5, percentage: 24.470};

//------------------------------------------------------------------------------------------------------
module.exports = {
	//Returns informations about the dataset.
	info : function(){
				return info;
		}
}
