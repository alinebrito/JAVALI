// Instância da tabela.
var tableTopImports = $('#dataTables-topImports').DataTable({
	responsive: true,
  "bProcessing": true
});

//Insere os registros retornados em scope.imports na tabela.
var insertImportsToTable = function(scope){
	
	clearTable(); //Limpa a tabela.

	var list = scope.imports;

	if(list.length > 0){
		for (i in list) {
			var registry = list[i];
			tableTopImports.row.add( [
				new Number(i)+1,
				registry._id,
				calcOccurrence(registry.value.OccurrenceProject, scope), // percentual de ocorrência
				registry.value.OccurrenceProject.toLocaleString(), //valor absoluto
			] ).draw( false );
		}	
		enabledButton('downloadTable');
	}
	
}

// Remove dados da tabela.
var clearTable = function(){
	disabledButton('downloadTable');
	tableTopImports.clear().draw();
}

// Cria tabela default, com as 5 top API's java.
var createTableTopDefault = function(scope){
	scope.imports = scope.listTopDefault;
	insertImportsToTable(scope);
}

// Cria tabela default, com as APIs informadas na lista (java.util.List, java.util.ArrayList).
var createTableCustomizeDefault = function(scope){
	scope.imports = scope.listCustomizeDefault;
	insertImportsToTable(scope);
}

//Exporta tabela para um arquivo CSV.
var dowloadTable = function(scope){

	var file = '';

	//Insere título das colunas.
	var title = ["Position", "Name", "Ocurrece by project (%)", "Number projects"];
 	file += title.join(",") + "\n";

 	//Insere conteúdo da tabela.
	var list = tableTopImports.data();
	for (i = 0; i< list.length; i++){
		file += list[i] + "\n";
	}

	//Exporta arquivo.
  var csvData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(file);
	var link = document.createElement('a');
	link.setAttribute('href', csvData);
	link.setAttribute('download', "popularityJavaApi.csv");
	link.click();
}
