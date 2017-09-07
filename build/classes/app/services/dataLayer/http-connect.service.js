(function () {
    'use strict';

    angular
        .module('norseApp')
        .factory('connectionService', connectionService);

    connectionService.$inject = ['$http', '$q', 'blockUI'];
    function connectionService($http, $q, blockUI) {
    	var base_url = 'https://byvczdmkmi.execute-api.us-east-1.amazonaws.com/dev/';
    //	var base_url = 'http://107.22.238.22:8090/';
        function _parse(resp) {
			var _resp = resp;
			var _result = {
				resp: _resp.data,
				respMsg: resp.data.responseMessage,
				responseCode: _resp.data.responseCode,
				isSuccess: false
			};
			if (_resp && _resp.data.responseCode != undefined) {
				switch (_resp.data.responseCode) {
					case 0:
						// Success response
						_result.isSuccess = true;
						break;
					case 1:
						_result.isSuccess = false;
						break;
					case 2:
						// Session timeout
						_result.isSuccess = false;
						break;
					default:
						_result.isSuccess = false;
				}
			} else {
				_result.isSuccess = false;
			}
			return _result;
		}

		function _parseError(resp, status) {
			return {
				resp: resp,
				respMsg: resp.responseMessage,
				isSuccess: false
			}
		}
        
        function __http(method, url, paramsData, data, optionsData) {
			var _deferred = $q.defer()
				, options = optionsData || {}
				, params = angular.isDefined(paramsData) ? params : {}
				, data = angular.isDefined(data) ? data : {}
				, parentDefer = options.parentDefer || null;

			
			var _default_headers = {
				'X-Api-Key' : 'kxIm3k0cjv8ZuIaOeaK2W9Q4mWDqW9kJ2tsrrfxU',
				'Content-type': 'application/json'
			};

			var args = {
				method: method,
				url: url,
				params: params,
				data: data,
				options: options
			};
			

			function addSessionInfo() {
				if (method == 'GET') {
					//params.userSessionId = Session.id;
				}
				if (method == 'POST' || method=='PUT' && URL.REGISTER != url && URL.SUPPORT_FEEDBACK != url) {
					//data.userSessionId = Session.id;
				}
			}

			function sendReq() {
				blockUI.start("Loading...", {
					status: 'isLoading'
				});
				$http({
					method: method,
					url: base_url+url,
					params: params,
					data: data,
					headers: _default_headers,
					//withCredentials: true,
					//timeout: HTTP.DEFAULT_TIMEOUT
				})
					.then(function onGetSuccess(data, status, headers, config) {
						var _result = _parse(data, status, headers, config);
						if (_result.isSuccess) {
							_deferred.resolve(_result);
							if (parentDefer) {
								parentDefer.resolve(_result);
							}
						} else {

							if (_result.responseCode == 2) {
								// Session expired
							//	_notifyOnSessionExpireListeners();
							} else {
								_deferred.reject(_result);
								if (parentDefer) {
									parentDefer.reject(_result);
								}
							}
						}
						blockUI.stop();
					},function onGetError(data, status, headers, config) {
						var _result = _parseError(data, status);
						_deferred.reject(_result);
						if (parentDefer) {
							parentDefer.reject(_result);
						}
						blockUI.stop();
					});
			}
			addSessionInfo();
			sendReq();

			return _deferred.promise;
		}
        function _get(url, params, options) {
			return __http('GET', url, params, null, options);
		}

		function _post(url, data, parentDefer) {
			return __http('POST', url, null, data, {
				parentDefer: parentDefer
			});
		}
		
		function _put(url, data, parentDefer) {
			return __http('PUT', url, null, data, {
				parentDefer: parentDefer
			});
		}
		
		function _delete(url, params, options) {
			return __http('DELETE', url, params, null, options);
		}
		
		var service = {};

        service.post = _post;
        service.get = _get;
        service.put = _put;
        service.parse = _parse;
        service._parseError = _parseError;
        service.toDelete = _delete;
        
        //service.uploadFile = uploadFile;
        //service.fail = fail;
        //service.isUploadingFile = isUploadingFile;
        
        return service;

        
    }

})();