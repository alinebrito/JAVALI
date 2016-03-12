var moduleController = angular.module('moduleRankings', []);

//Controller para as telas relacionadas ao rankings de APIs/biblitecas.
moduleController.controller('controllerRankings', ['$scope','importDAO', function($scope, importDAO) {
	$scope.formData = {};
	$scope.loading = false;
	$scope.formData.limit = 5;
	$scope.formData.columns = 5; //Quantidade de colunas do gráfico de barras.

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

	//Informações do dataset e top APIS, para páginas default.
	$scope.getInfo = function(callback){
		importDAO.info()
		.success(function(data){
			if(data){
				$scope.allProjects 					= data.allProjects;
				$scope.importsDistincts 		= data.importsDistincts;
				$scope.allImports 					= data.allImports;
				$scope.allFiles 						= data.allFiles;
				$scope.listTopDefault 			= [data.top1, data.top2, data.top3, data.top4, data.top5];
				$scope.listCustomizeDefault = [data.top1, data.top3];
				$scope.formData.listFilter 	= data.top1._id + ", " + data.top3._id;
				if(callback){ //executa callback se existir.
					callback();
				}
			}
		});
	}

	$scope.getInfo();

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
