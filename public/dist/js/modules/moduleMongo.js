var moduleMongo =  angular.module('moduleMongo', []);

moduleMongo.factory('importDAO', ['$http',function($http) {
	return {
		findTopApi : function(data) {
			return $http.post('/import/top/api', data);
		},

		findListApi : function(data) {
			return $http.post('/import/list/api', data);
		},
		
		findListApiByLibrary : function(data) {
			return $http.post('/import/list/api/byLibrary', data);
		},

		findListLibrary : function(data) {
			return $http.post('/import/list/library', data);
		}
	}
}]);
