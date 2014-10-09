(function (){
	angular.module('hackerNews')
	.controller('userController', ['$scope', '$http', '$log', '$routeParams', 
	function ($scope, $http, $log, $routeParams){
		$scope.user = {};
		$scope.stories = [];
		$scope.itemsPerPage = 12;
		$scope.currentPage = 0;
		//$scope.sortBy = '-time';
		$scope.hideShowAll = "active";

		$http.get('https://hacker-news.firebaseio.com/v0/user/'+$routeParams.uid+'.json').success(function (data){
			$log.log(data);

			$scope.user = data;

			if (data.submitted.length > 0){
				angular.forEach(data.submitted, function (val, key){
					$http.get('https://hacker-news.firebaseio.com/v0/item/'+val+'.json').success(function (story){
						if (story.type == 'story'){
							$scope.stories.push(story);
						}
						$scope.hideShowAll = ($scope.stories.length > $scope.itemsPerPage) ? "active" : "disabled";
					}).error(function (data, status, header, config){
						$log.log(data);
					});
				});
			}
		}).error(function (data, status, header, config){

		});

		// Sorting
		$scope.doSort = function(propName) {
           $scope.sortBy = propName;
           $scope.reverse = !$scope.reverse;
        };

        // Pagination
        $scope.range = function() {
			var rangeSize = 10;
			var ret = [];
			var start;
			start = $scope.currentPage;

			if ( start > $scope.pageCount()-rangeSize ) {
				start = $scope.pageCount()-rangeSize+1;
			}
			
			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0){
					ret.push(i);
				}
			}
			return ret;
		};
		
		$scope.prevPage = function() {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.prevPageDisabled = function() {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.pageCount = function() {
			return Math.ceil($scope.stories.length/$scope.itemsPerPage)-1;
		};

		$scope.nextPage = function() {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.nextPageDisabled = function() {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function(n) {
			$scope.currentPage = n;
		};

		$scope.showAll = function(){
			if ($scope.hideShowAll !== 'disabled'){
				$scope.itemsPerPage = $scope.stories.length + 1;
				$scope.hideShowAll = 'disabled';
			}
		};

	}]);
})();