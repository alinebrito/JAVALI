var moduleRankings = angular.module('moduleRankings', []);

//Factory para fazer requisições relacionadas à popularidade de APIs/bibliotecas.
moduleRankings.factory('factoryRankings', function($http) {
	return {
		//Retorna as N top APIs.
		findTopApi : function(data) {
			return $http.post('/javali/api/findTopApi', data);
		},

		//Retorna a popularidade das APIs desejadas. 
		findListApi : function(data) {
			return $http.post('/javali/api/findListApi', data);
		},
		
		//Retorna a popularidade das APIs que pertencem às bibliotecas informadas. 
		findListApiByLibrary : function(data) {
			return $http.post('/javali/api/findListApiByLibrary', data);
		},

		//Retorna a popularidade das bibliotecas informadas. 
		findListLibrary : function(data) {
			return $http.post('/javali/library/findListLibrary', data);
		},

		//Retorna a popularidade das bibliotecas informadas,
		//desde que possuam a String informada.
		findListLibraryByString : function(data) {
			return $http.post('/javali/library/findListLibraryByString', data);
		},

		//Retorna a popularidade das APIs que pertencem às bibliotecas informadas,
		//e contém a String informada. 
		findListApiByLibraryAndString : function(data) {
			return $http.post('/javali/api/findListApiByLibraryAndString', data);
		},

		//Informações do dataset e top APIS, para páginas default.
		getInfo : function() {
			return $http.post('/javali/javali/info');
		}
	}
});

//Funções utilitárias, comuns às páginas.
moduleRankings.service('utilTools', function() {

		//Mensagem de erro padrão.
		this.msgError = function(){
			return "An error occurred during the process, contact the system administrator.";
		}

		//Mensagem padrão, para consultas que não retornarem resultados.
		this.msgNotData = function(){
			return "No data found";
		}

});

