//Módulo para manipulação das tabelas.
var moduleCharts =  angular.module('moduleTables', ['moduleRankings']);

moduleCharts.controller('controllerTopTables', function($scope, factoryRankings, utilTable, utilTools) {

		$scope.msg = null;
		$scope.allProjects = null;
		$scope.imports 	= [];
		$scope.formData = {};
		$scope.formData.limit = 5;
		$scope.show = {};
		$scope.show.loading = false;
		$scope.table = utilTable.getTable(); //Inicializa tabela.

		// Inicializa a página com o gráfico default.
		factoryRankings.getInfo() 
		.success(function(data){
			if(data){
				utilTable.clearTable($scope); //Limpa a tabela.
				$scope.allProjects = data.allProjects;
				$scope.imports = [data.top1, data.top2, data.top3, data.top4, data.top5];
				utilTable.createTable($scope);
			}
		});

		//Criar gráfico das N top APIs
		$scope.createTableTopApis = function(){
			$scope.show.loading = true;
			utilTable.clearTable($scope); //Limpa a tabela.
			factoryRankings.findTopApi($scope.formData) 
			.success(function(data){
				if(data && data.length > 0){
					$scope.imports = data; 
					utilTable.createTable($scope);
				}
				else{
					$scope.msg = utilTools.msgNotData();
					utilTable.showMsg();
				}
				$scope.show.loading = false;
			})
			.error(function(data, status) {
				$scope.show.loading = false;
				$scope.msg = utilTools.msgError();
				utilTable.showMsg();
			});
		}

		//Remove dados da tabela.
		$scope.clearTable = function(){
			utilTable.clearTable($scope);
		}

		//Download dos dados em CSV.
		$scope.dowloadTable = function(){
			utilTable.dowloadTable($scope);
		}

		//Adiciona 5 posições ao ranking.
		$scope.plusPosition  = function(){
			$scope.formData.limit += 5;
			$scope.createTableTopApis();
		}

		//Remove as 5 últimas posições do ranking.
		$scope.minusPosition  = function(){
			if($scope.formData.limit > 5){
				$scope.formData.limit -= 5;
				$scope.createTableTopApis();
			}
		}
});

moduleCharts.controller('controllerCustomizesTables', function($scope, factoryRankings, utilTable, utilTools) {

	$scope.formData = {};
	$scope.formData.listFilter = "";
	$scope.formData.type = "api";
	$scope.table = utilTable.getTable(); //Inicializa tabela.
	$scope.formData.contains = "";

	$scope.show = {};
	$scope.show.group = false;	//Exibe opção para agrupar bibliotecas.
	$scope.show.contains = false;	//Exibe opção para buscar string.
	$scope.show.menuLibraries = false; //Exibe campos para selecionar a quantidade de colunas.
	$scope.show.loading = false;	//Exibe ícone enquanto processamento é realizado.

	// Inicializa a página com o tabela default.
	factoryRankings.getInfo() 
	.success(function(data){
		if(data){
			utilTable.clearTable($scope); //Limpa a tabela.
			$scope.allProjects = data.allProjects;
			$scope.imports 	= [data.top1, data.top3];
			$scope.formData.listFilter = data.top1._id + ", " + data.top3._id;
			utilTable.createTable($scope);
		}
	});

	//Remove dados da tabela.
	$scope.clearTable = function(){
		utilTable.clearTable($scope);
	}

	//Download dos dados em CSV.
	$scope.dowloadTable = function(){
			utilTable.dowloadTable($scope);
	}

	//Exibe mensagem de erro na interface.
	$scope.processError = function(){
		utilTable.clearTable();
		$scope.show.loading = false;
		$scope.msg = utilTools.msgError();
		utilTable.showMsg();
	}

	//Criar gráfico conforme dados recebidos.
	//Se não possui dados, exibe mensagem na tela.
	$scope.processSuccess = function(data){
		if(data && data.length > 0){
			$scope.imports = data; 
			utilTable.createTable($scope);
		}
		else {
			$scope.clearTable();
			$scope.msg = utilTools.msgNotData();
			utilTable.showMsg();
		}
		$scope.show.loading = false;
	}

	//Cria tabela conforme parâmetros selecionados na interface.
	$scope.createCustomizesTable = function() {
		$scope.show.loading = true;
		$scope.clearTable();//Limpa tabela.
		if($scope.formData.type === "api"){ //Para opção "APIs".
				factoryRankings.findListApi($scope.formData)
				.success(function(data) {
					$scope.processSuccess(data);
				})
				.error(function(data, status) {
					$scope.processError();
				});
		}
		else { //Para opção "Libraries".
			if ($scope.show.group) { //Se opção "Group" assinalada.
				if ($scope.show.contains) { //Se opção "Contains" assinalada.
					 factoryRankings.findListLibraryByString($scope.formData)
					.success(function(data) {
						$scope.processSuccess(data);
					})
					.error(function(data, status) {
							$scope.processError();
					});
				}
				else{//Se opção "Contains" não está assinalada.
					factoryRankings.findListLibrary($scope.formData)
					.success(function(data) {
						$scope.processSuccess(data);
					})
					.error(function(data, status) {
						$scope.processError();
					});
				}
			} else { //Sem a opção "Group".
				if ($scope.show.contains) { //Se opção "Contains" assinalada.
					factoryRankings.findListApiByLibraryAndString($scope.formData)
					.success(function(data) {
						$scope.processSuccess(data);
					})
					.error(function(data, status) {
							$scope.processError();
					});
				}
				else{//Se opção "Contains" não está assinalada.
					factoryRankings.findListApiByLibrary($scope.formData)
					.success(function(data) {
						$scope.processSuccess(data);
					})
					.error(function(data, status) {
							$scope.processError();
					});
				}
			}
		}
	};
});

moduleCharts.service('utilTable', function() {

	//habilita botão
	this.enabledButton = function(id){
		$('#'+id).removeClass('disabled');
	}

	//desabilita botão
	this.disabledButton = function(id){
		$('#'+id).addClass('disabled');
	}

	//Calcula a porcentagem da ocorrência, 3 casas decimais.
	this.calcOccurrence = function(val, data){
			return parseFloat(val * 100 / data.allProjects).toFixed(3);
	}
	
	//Insere dados na tabela.
	this.createTable = function(data){
		var t = data.table;
		this.clearTable(data); //Limpa a tabela.
		var list = data.imports;
		if(list.length > 0){
			for (i in list) {
				var registry = list[i];
				t.row.add( [
					new Number(i)+1,
					registry._id,
					this.calcOccurrence(registry.value.OccurrenceProject, data), // percentual de ocorrência
					registry.value.OccurrenceProject.toLocaleString(), //valor absoluto
				] );
			}	
			t.draw(false);
			this.enabledButton('downloadTable');
		}
	}

	this.clearTable = function(data){
		this.disabledButton('downloadTable');
		data.table.clear().draw();
	}

	//Exibe mensagem no espaço da tabela.
	this.showMsg = function(msg){
		$("#msg").removeClass('remove');
	}

	//Inicializa tabela se não existir.
	this.getTable = function(table){
		if(table == null){
			table = $('#dataTables-topImports').DataTable({
				responsive: true,
			  "bProcessing": true,
			  "bDestroy": true
			});
		}
		return table;
	}

	//Exporta tabela para um arquivo CSV.
	this.dowloadTable = function(data){
		var file = '';
		//Insere título das colunas.
		var title = ["Position", "Name", "Ocurrece by project (%)", "Number projects"];
	 	file += title.join(",") + "\n";
	 	//Insere conteúdo da tabela.
		var list = data.imports;
		for (i = 0; i< list.length; i++){
			var val = eval(i+1) + "," + list[i]._id + "," + this.calcOccurrence(list[i].value.OccurrenceProject, data) + "," + list[i].value.OccurrenceProject;
			file += val + "\n";
		}
		//Exporta arquivo.
	  var csvData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(file);
		var link = document.createElement('a');
		link.setAttribute('href', csvData);
		link.setAttribute('download', "popularityJavaApi.csv");
		link.click();
	}
});