var moduleController = angular.module('moduleController', []);

moduleController.controller('mainController', ['$scope','$http','importDAO', function($scope, $http, importDAO) {
	$scope.formData = {};
	$scope.loading = false;
	$scope.formData.limit = 5;
	$scope.formData.listFilter = 'java.util.List, java.util.ArrayList';
	$scope.formData.columns = 5; //Quantidade de colunas do gráfico de barras.

	//Constantes
	$scope.allProjects = 263425; // quantidade de projetos java analisados.
	// $scope.allProjects = 4; // quantidade de projetos java analisados, base de teste.
	$scope.allImports = 4780469; // quantidade de imports distintos.
	$scope.importsRead = 131147733; // quantidade de imports lidos/analisados - job/12332
	$scope.filesRead = 16386193; // quantidade de arquivos lidos/analisados, com pelo menos um import - job/12332

	// Lista dos 5 top imports previamente processada.
	var top1 = { _id: 'java.util.ArrayList', value: {'OccurrenceProject': new Number(143454)} , pos: 1},
		top2 = { _id: 'java.io.IOException', value: {'OccurrenceProject': new Number(136058)}, pos: 2},
		top3 = { _id: 'java.util.List', value: {'OccurrenceProject': new Number(134053)}, pos: 3},
		top4 = { _id: 'java.util.HashMap',  value: {'OccurrenceProject': new Number(94220)}, pos: 4},
		top5 = { _id: 'java.io.File',  value: {'OccurrenceProject': new Number(88703)}, pos: 5};
	
	$scope.listTopDefault = [top1, top2, top3, top4, top5];

	$scope.listCustomizeDefault = [top1, top3];

	//Formata atributo 'msg' caso necessário.
	var formatMsg = function(list){
		var mgsError = "An error occurred during the process, contact the system administrator.";
		var msgDataNotFound = "No data found.";
		if(list.length > 0 ){
				$scope.msg = null;
		}
		else{
			$scope.msg = msgDataNotFound;
		}
	}

	$scope.plusPosition  = function(callback){
		$scope.formData.limit  += 5;
		$scope.findTopApi(callback);
	}
	
	$scope.minusPosition  = function(callback){
		if($scope.formData.limit > 5){
			$scope.formData.limit -= 5;
			$scope.findTopApi(callback);
		}
	}

	$scope.minusPosition  = function(callback){
			if($scope.formData.limit > 5){
				$scope.formData.limit -= 5;
				$scope.findTopApi(callback);
			}
	}

	$scope.setColumns = function(val){
			$scope.formData.columns = val;
	}

	$scope.findTopApi = function(callback) {
		if ($scope.formData.limit != undefined) {
			$scope.loading = true;
			importDAO.findTopApi($scope.formData)
				.success(function(data) {
					$scope.loading = false;
					$scope.imports = data; 
					formatMsg(data);
					callback();
				});
		}
	};

	$scope.findListApi = function(callback) {
		if ($scope.formData.listFilter != undefined) {
			$scope.loading = true;
			importDAO.findListApi($scope.formData)
				.success(function(data) {
					$scope.loading = false;
					$scope.imports = data; 
					formatMsg(data);
					callback();
				});
		}
	};

	$scope.findListApiByLibrary = function(callback) {
		if ($scope.formData.listFilter != undefined) {
			$scope.loading = true;
			importDAO.findListApiByLibrary($scope.formData)
				.success(function(data) {
					$scope.loading = false;
					$scope.imports = data; 
					formatMsg(data);
					callback();
				});
		}
	};

	$scope.findListLibrary = function(callback) {
		if ($scope.formData.listFilter != undefined) {
			$scope.loading = true;
			importDAO.findListLibrary($scope.formData)
				.success(function(data) {
					$scope.loading = false;
					$scope.imports = data; 
					formatMsg(data);
					callback();
				});
		}
	};

}]);
