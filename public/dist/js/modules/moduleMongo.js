var moduleMongo =  angular.module('moduleMongo', []);

moduleMongo.factory('importsMongoDAO', function($http) {
	return {
		findTopApi : function(data) {
			return $http.post('/api/findTopApi', data);
		},

		findListApi : function(data) {
			return $http.post('/api/findListApi', data);
		},
		
		findListApiByLibrary : function(data) {
			return $http.post('/api/findListApiByLibrary', data);
		},

		findListLibrary : function(data) {
			return $http.post('/library/findListLibrary', data);
		},

		info : function() {
			return $http.post('/javali/info');
		}
	}
});
