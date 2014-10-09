(function (){
	angular.module('hackerNews')
	.controller('commentController', ['$scope', '$http', '$log', '$routeParams', 
	function ($scope, $http, $log, $routeParams){
		$scope.story = {};
		$scope.comments = [];

		$http.get('https://hacker-news.firebaseio.com/v0/item/'+$routeParams.sid+'.json')
		.success(function (data){
			$log.log(data);
			$scope.story = data;

			angular.forEach(data.kids, function (val, key){
				$http.get('https://hacker-news.firebaseio.com/v0/item/'+val+'.json')
				.success(function (items){
					$scope.comments.push(items);

				}).error(function (data, status, header, config){
					$log.log(data);
				});
			});

		}).error(function (data, status, header, config){
			$log.log(data);
		});
	}]);
})();