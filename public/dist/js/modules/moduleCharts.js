//Módulo para manipulação dos gráficos.
var moduleCharts =  angular.module('moduleCharts', ['moduleRankings']);

/*
	Controlador para os gráficos de top APIs.
*/
moduleCharts.controller('controllerCustomizesCharts', function($scope, factoryRankings, utilTools, utilChart) {
    
	$scope.msg = null;
	$scope.allProjects = null;
	$scope.imports = [];
	
	$scope.formData = {};
	$scope.formData.listFilter = "";
	$scope.formData.type = "api";
	$scope.formData.columns = 5;
	$scope.formData.limit = 0;
	$scope.formData.listFilterOld = "";

	$scope.show = {};
	$scope.show.group = false;	//Exibe opção para agrupar bibliotecas.
	$scope.show.loading = false;	//Exibe ícone enquanto processamento é realizado.
		
	// Inicializa a página com o gráfico default.
	factoryRankings.getInfo() 
	.success(function(data){
		if(data){
			$scope.allProjects = data.allProjects;
			//$scope.imports 	= [data.top1, data.top3];
			//$scope.formData.listFilter = data.top1._id + ", " + data.top3._id;
			//utilChart.createChart($scope);
		}
	}); 

	//Remove gráfico.
  $scope.removeChart = function(){
  	$scope.formData.size = 0;
  	$scope.formData.limit = 0;
  	$scope.imports 	= [];
		utilChart.removeChart();
	}

	$scope.clearChartAndParameters = function(){
		$scope.formData.listFilter = "";
		utilChart.removeChart();
	}

	//Exibe mensagem de erro na interface.
	$scope.processError = function(){
		utilChart.removeChart();
		$scope.show.loading = false;
		$scope.msg = utilTools.msgError();
		utilChart.showMsg();
	}

	//Criar gráfico conforme dados recebidos.
	//Se não possui dados, exibe mensagem na tela.
	$scope.processSuccess = function(data){
		$scope.show.loading = false;
		if(data && data.length > 0){
			data.forEach(function(val, i) {
					$scope.imports.push(val); 
			});
			//$scope.imports = data; 
			utilChart.createChart($scope);
		}
		else {
			utilChart.removeChart();
			$scope.msg = utilTools.msgNotData();
			utilChart.showMsg();
		}
	}

	//Cria gráfico conforme parâmetros selecionados na interface.
	$scope.createCustomizesChart = function() {
		$scope.show.loading = true;
		
		if($scope.formData.type === "api"){ //Para opção "APIs".
				factoryRankings.findListApi($scope.formData)
				.success(function(data) {
					$scope.imports = [];
					$scope.processSuccess(data);
				})
				.error(function(data, status) {
					$scope.processError();
				});
		}
		else { //Para opção "Libraries".
			if ($scope.show.group) { //Se opção "Group" assinalada.
				$scope.imports = [];
				factoryRankings.findListLibrary($scope.formData)
				.success(function(data) {
					$scope.processSuccess(data);
				})
				.error(function(data, status) {
					$scope.processError();
				});
			} else { //Sem a opçõa "Group".
					//Se as opções de busca mudaram, ranking é zerado.
					if($scope.formData.listFilter != $scope.formData.listFilterOld){
							$scope.imports = [];
					}
					$scope.formData.limit = $scope.imports.length;
					$scope.formData.listFilterOld = $scope.formData.listFilter;
				
				factoryRankings.findListApiByLibrary($scope.formData)
				.success(function(data) {
					$scope.processSuccess(data);
				})
				.error(function(data, status) {
						$scope.processError();
				});
			}
		}
	};

	//Download do gráfico.
	$scope.saveChart = function(){
			utilChart.saveChart();
	}

});

/*
	Controlador para os gráficos customizados.
*/
moduleCharts.controller('controllerTopCharts', function($scope, factoryRankings, utilTools, utilChart) {
		
		$scope.msg = null;
		$scope.allProjects = null;
		$scope.imports 	= [];
		$scope.formData = {};
		$scope.formData.limit = 0;
		$scope.formData.size = 5;
		$scope.show = {};
		$scope.show.loading = false;
		
		// Inicializa a página com o gráfico default.
		factoryRankings.getInfo() 
		.success(function(data){
			if(data){
				$scope.allProjects = data.allProjects;
				$scope.imports = [data.top1, data.top2, data.top3, data.top4, data.top5];
				utilChart.createChart($scope);
			}
		})

		//Remove gráfico.
    $scope.removeChart = function(){
    	$scope.formData.size = 0;
    	$scope.formData.limit = 0;
    	$scope.imports 	= [];
			utilChart.removeChart();
		}

		//Criar gráfico das N top APIs
		$scope.createChartTopApis = function(){
			$scope.show.loading = true;
			utilChart.removeChart(); //Limpa o gráfico existente.
			factoryRankings.findTopApi($scope.formData) 
			.success(function(data){
				if(data && data.length > 0){
					data.forEach(function(val, i) {
						 $scope.imports.push(val); 
					});
					
					utilChart.createChart($scope);
				}
				else{
					$scope.msg = utilTools.msgNotData();
					utilChart.showMsg();
				}
				$scope.show.loading = false;
			})
			.error(function(data, status) {
				$scope.show.loading = false;
				$scope.msg = utilTools.msgError();
				utilChart.showMsg();
			});
		}

		//Adiciona 5 posições ao ranking.
		$scope.plusPosition  = function(){
			$scope.formData.limit += 5;
			$scope.formData.size += 5;
			$scope.createChartTopApis();
		}

		//Download do gráfico.
		$scope.saveChart = function(){
				utilChart.saveChart();
		}
		
});

/*
	Controlador para a página principal.
*/
moduleCharts.controller('controllerPrincipal', function($scope, utilChart, factoryRankings) {

		$scope.allProjects = null;
		$scope.distinctsImports = null;
		$scope.allFiles = null;
		$scope.allImports = null;
		$scope.imports 	= [];

		// Inicializa a página com informações do dataset.
		factoryRankings.getInfo() 
		.success(function(data){
			if(data){
				$scope.allProjects = data.allProjects;
				$scope.distinctsImports = data.distinctsImports;
				$scope.allFiles = data.allFiles;
				$scope.allImports = data.allImports;
				$scope.imports = [data.top1, data.top2, data.top3, data.top4, data.top5];
				utilChart.createChart($scope);
			}
		});
});

/*
	Service com funções utilitárias, para manipulação dos gráficos.
*/
moduleCharts.service('utilChart', function() {

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
			return parseFloat(val * 100 / data.allProjects).toFixed(2);
	}

	// Criar uma gráfico de barras conforme a lista de APIs recebida.
	this.createChart = function (data) {

		this.removeChart(); //Limpa o gráfico existente.
		var list = data.imports;

		if((list != null) && (list.length > 0)){
			this.createAreaChart();
			var allProjects = data.allProjects;
			var labelDefault = "Projects";
			var yKeyDefault = "ocurrence";
			var	xKeyDefault = "import";
			var listGraph = [];
			var listLabel = [];
			var listYkeys = [];
			var ocurrence = 0;

			for (i in list){

					var registry = list[i];

					//Calcula a porcentagem da ocorrência, 3 casas decimais.
					//ocurrence = this.calcOccurrence(registry.value.OccurrenceProject, data); // percentual de ocorrência
					var p = registry.percentage ? registry.percentage.toFixed(2) : this.calcOccurrence(registry.value.OccurrenceProject, data);

					var value = {};
					value.import = registry._id;
					value.ocurrence = p;


					listGraph.push(value);
					listLabel.push(labelDefault);
			}	
			var angleX = 45;
			var paddingX = 100;
			if(list.length <= 5){
				angleX = 0;
				paddingX = 40;
			}
			//Cria o gráfico.
			var graphBar = Morris.Bar({
				element: 'morris-bar-chart',
				data: listGraph,
				xkey: [xKeyDefault],
				ykeys:  [yKeyDefault],
				labels: listLabel,
				resize: true,
				postUnits: "%",
				xLabelAngle: angleX,
				padding: paddingX,
			});

			this.enabledButton('saveChart');
		}
				
	}

	//Remove o gráfico exibido e/ou mensagens.
	this.removeChart = function () {
		$("#panel-default-chart").addClass('remove');
		$("#msg").addClass('remove');
		$("#morris-bar-chart").empty(); //Limpa área do gráfico.
		this.disabledButton('saveChart');
	}

	//Exibe area do gráfico.
	this.createAreaChart = function(){
		$("#panel-default-chart").removeClass('remove');
	};

	//Exibe mensagem no espaço do gráfico.
	this.showMsg = function(msg){
		$("#msg").removeClass('remove');
	}

	//Dowload do gráfico em PDF.
	this.saveChart = function(){
		xepOnline.Formatter.Format('area-graph',{ cssStyle:[{width: '120%'}], render:'download'});
	}
});