/*
	Módulo com funções utilitárias.
*/
module.exports = {
	//Ordena registro pelo número de ocorrências por projeto.
	sortByOccurrenceProject : function(list){
		return list.sort(function(a, b){
			return b.value.OccurrenceProject - a.value.OccurrenceProject;
		});
	},
	// Retorna uma lista com os dados separados por vírgula e espaços removidos.
	formartList: function(text){
		return text.replace(/ /g, '').split(",");
	},
	//Imprime log de erro.
	logError: function(msg){
		console.log("\n" + new Date() + " ERROR: " + msg);
	},
	//Imprime log de informação.
	logInfo: function(msg){
		console.log("\n" + new Date() + " INFO: " + msg);
	}
}