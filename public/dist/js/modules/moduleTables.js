//Módulo para manipulação das tabelas.
var moduleCharts =  angular.module('moduleTables', ['moduleRankings']);

moduleCharts.controller('controllerTopTables', function($scope, factoryRankings, utilTable, utilTools) {

		$scope.msg = null;
		$scope.allProjects = null;
		$scope.imports 	= [];
		$scope.formData = {};
		$scope.formData.limit = 0;
		$scope.formData.size = 5;
		$scope.show = {};
		$scope.show.loading = false;
		$scope.table = utilTable.getTable(); //Inicializa tabela.

		// Inicializa a página com o gráfico default.
		factoryRankings.getInfo() 
		.success(function(data){
			if(data){
				//utilTable.clearTable($scope); //Limpa a tabela.
				$scope.allProjects = data.allProjects;
				$scope.imports = [data.top1, data.top2, data.top3, data.top4, data.top5];
				utilTable.createTableTop($scope);
			}
		});

		//Criar gráfico das N top APIs
		$scope.createTableTopApis = function(){
			$scope.show.loading = true;
			//utilTable.clearTable($scope); //Limpa a tabela.
			factoryRankings.findTopApi($scope.formData) 
			.success(function(data){
				if(data && data.length > 0){
					$scope.imports = data; 
					utilTable.createTableTop($scope);
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
			$scope.formData.size = 0;
			$scope.formData.limit = -5;
			utilTable.clearTable($scope);
		}

		//Download dos dados em CSV.
		$scope.dowloadTable = function(){
			utilTable.dowloadTable($scope);
		}

		//Adiciona 5 posições ao ranking.
		$scope.plusPosition  = function(){
			$scope.formData.limit += 5;
			$scope.formData.size += 5;
			$scope.createTableTopApis();
		}

});

moduleCharts.controller('controllerCustomizesTables', function($scope, factoryRankings, utilTable, utilTools) {

	$scope.info = {};
	$scope.formData = {};
	$scope.formData.limit = 0;
	$scope.formData.listFilter = "";
	$scope.formData.listFilterOld = "";

	$scope.formData.type = "api";
	$scope.table = utilTable.getTable(); //Inicializa tabela.
	$scope.formData.contains = "";
	$scope.formData.containsOld = "";

	$scope.show = {};
	$scope.show.group = false;	//Exibe opção para agrupar bibliotecas.
	$scope.show.contains = false;	//Exibe opção para buscar string.
	$scope.show.menuLibraries = false; //Exibe campos para selecionar a quantidade de colunas.
	$scope.show.loading = false;	//Exibe ícone enquanto processamento é realizado.

	// Inicializa a página com o tabela default.
	factoryRankings.getInfo() 
	.success(function(data){
		if(data){
			$scope.info = data;
			$scope.allProjects = data.allProjects;
			//$scope.imports 	= [data.top1, data.top3];
			//$scope.formData.listFilter = data.top1._id + ", " + data.top3._id;
			//utilTable.createTableCustomize($scope);
		}
	});

	$scope.createDefaultTableLibraryGroup = function(){
		if($scope.show.group){
			$scope.formData.listFilter = $scope.info.library.name;
		  utilTable.clearTable($scope);
		  $scope.imports 	= [$scope.info.library.group];
		  utilTable.createTableCustomize($scope);
		}
		else{
			$scope.createDefaultTableLibrary();
		}
		 
	}

	$scope.createDefaultTableContains = function () {
		if ($scope.show.contains) { //Se opção "Contains" assinalada.
			$scope.formData.listFilter = "";
			utilTable.clearTable($scope);
		}
		else{
			$scope.createDefaultTableLibraryGroup();
		}
	}
	

	$scope.createDefaultTableLibrary = function () {
		 $scope.formData.listFilter = $scope.info.library.name;
		 utilTable.clearTable($scope);
		 $scope.imports 	= [$scope.info.library.api1,
		 										 $scope.info.library.api2,
		 										 $scope.info.library.api3,
		 										 $scope.info.library.api4,
		 										 $scope.info.library.api5];
		 utilTable.createTableCustomize($scope);
	}

	$scope.createDefaultTableInterfaces = function () {
		 utilTable.clearTable($scope);
		 $scope.imports 	= [$scope.info.top1, $scope.info.top3];
		 $scope.formData.listFilter = $scope.info.top1._id + ", " + $scope.info.top3._id;
		 utilTable.createTableCustomize($scope);
	}

	//Remove dados da tabela.
	$scope.clearTableAndParameters = function(){
		$scope.formData.listFilter = "";
		$scope.imports = [];
		utilTable.clearTable($scope);
	}

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
		//utilTable.clearTable();
		$scope.show.loading = false;
		$scope.msg = utilTools.msgError();
		utilTable.showMsg();
	}

	//Criar gráfico conforme dados recebidos.
	//Se não possui dados, exibe mensagem na tela.
	$scope.processSuccess = function(data){
		if(data && data.length > 0){
			$scope.imports = data; 
			utilTable.createTableCustomize($scope);
		}
		else {
			//$scope.clearTable();
			$scope.msg = utilTools.msgNotData();
			utilTable.showMsg();
		}
		$scope.show.loading = false;
	}

	//Cria tabela conforme parâmetros selecionados na interface.
	$scope.createCustomizesTable = function() {
		$scope.show.loading = true;
		
		if($scope.formData.type === "api"){ //Para opção "APIs".
			$scope.clearTable();//Limpa tabela.
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
				$scope.clearTable();//Limpa tabela.
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
					//Limpa a tabela somente se as opções de busca mudaram.
					if($scope.formData.listFilter != $scope.formData.listFilterOld){
							$scope.clearTable();//Limpa tabela.
					}
					$scope.formData.listFilterOld = $scope.formData.listFilter;
					$scope.formData.limit = utilTable.sizeTable($scope);
				
					if ($scope.show.contains) { //Se opção "Contains" assinalada.
					
						//Limpa a tabela se string de busca foi modificada.
						if($scope.formData.contains != $scope.formData.containsOld){
								$scope.clearTable();//Limpa tabela.
						}
						$scope.formData.containsOld = $scope.formData.contains;
						$scope.formData.limit = utilTable.sizeTable($scope);

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
	this.createTableTop = function(data){
		var t = data.table;
		var list = data.imports;
		if(list.length > 0){
			for (i in list) {
				var registry = list[i];
				//console.log(registry)
				t.row.add( [
					registry.index,
					registry._id,
					registry.percentage.toFixed(3),
					registry.value.OccurrenceProject.toLocaleString(), //valor absoluto
				]);
			}	
			t.draw(false);
			this.enabledButton('downloadTable');
		}
	}

		//Insere dados na tabela.
	this.createTableCustomize = function(data){
		var t = data.table;
		var list = data.imports;
		var index = this.sizeTable(data);
		if(list.length > 0){
			for (i in list) {
				index++;
				var registry = list[i];
				var occurrenceProject = registry.value ? registry.value.OccurrenceProject : 0;
				var p = registry.percentage ? registry.percentage.toFixed(3) : this.calcOccurrence(occurrenceProject, data);
				//console.log(registry)
				t.row.add( [
					index,
					registry._id,
					p,
					occurrenceProject.toLocaleString(), //valor absoluto
				]);
			}	
			t.draw(false);
			this.enabledButton('downloadTable');
		}
	}

	this.clearTable = function(data){
		this.disabledButton('downloadTable');
		data.table.clear().draw();
	}

	//Retorna quantidade de linhas da tabela.
	this.sizeTable = function(scope){
		return scope.table.data().length;
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
	 	//Recupera conteúdo da tabela.
		var list = data.table.data();

		for (i = 0; i< list.length; i++){
			var val = eval(i+1) + "," + list[i][1] + "," + list[i][2] + "," + (list[i][3].split(".").join(""));
			file += val + "\n";
		}

		//Exporta arquivo.
		var blob = new Blob([file], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "popularityApis.csv");

	}

});