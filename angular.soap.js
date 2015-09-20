/* global SOAPClient, SOAPClientParameters */
angular.module('angularSoap', [])

.factory("$soap",['$q',function($q){
	return {
		post: function(url, service, action, subaction, params){

			var deferred = $q.defer();

			//Create SOAPClientParameters
			var soapParams = new SOAPClientParameters();
			for(var param in params){
				soapParams.add(param, params[param]);
			}

			//Create Callback
			var soapCallback = function(e){
				if(e !== null && e.constructor.toString().indexOf("function Error()") == -1){
					deferred.resolve(e);
				} else {
                    deferred.reject("An error has occurred.");

				}
			};

			SOAPClient.invoke(url, service, action, subaction, soapParams, true, soapCallback);

			return deferred.promise;
		},
		setCredentials: function(username, password){
			SOAPClient.username = username;
			SOAPClient.password = password;
		}
	};
}]);
