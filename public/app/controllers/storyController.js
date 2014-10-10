(function (){

	angular.module('hackerNews')
	.controller('storyController', ['$scope', '$http', '$log', '$timeout', 
	function ($scope, $http, $log, $timeout){
		$scope.stories = [];
		$scope.itemsPerPage = 12;
		$scope.currentPage = 0;
		//$scope.sortBy = '-time';
		$scope.hideShowAll = "active";
		$scope.refreshSpin = false;

		function init(){
			$scope.stories = JSON.parse(sessionStorage.getItem('hnStories')) || [];
			if (!$scope.stories.length){
				$scope.refreshSpin = true;
				$http.get('https://hacker-news.firebaseio.com/v0/topstories.json').success(function (stories){
					angular.forEach(stories, function (val, key){
						$http.get('https://hacker-news.firebaseio.com/v0/item/'+val+'.json').success(function (story){
							if (story.type == 'story' && story.url != undefined && story.url){
								$scope.stories.push(story);
								sessionStorage.setItem('hnStories', JSON.stringify($scope.stories));
								$timeout(function(){
									$scope.refreshSpin = false;
								}, 3000);
							}
							$scope.hideShowAll = ($scope.stories.length > $scope.itemsPerPage) ? "active" : "disabled";
						}).error(function (data, status, header, config){
							$log.log(data);
							$scope.refreshSpin = false;
						});
					});
				}).error(function (data, status, header, config){
					$log.log(data);
					$scope.refreshSpin = false;
				});		
			}
		}
		init();

		$scope.refresh = function(){
			sessionStorage.removeItem('hnStories');
			init();
		};

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