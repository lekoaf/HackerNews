(function (){
	angular.module('hackerNews').filter('paginationFilter', function() {
	return function(input, start) {
			start = parseInt(start, 10);
			return input.slice(start);
		};
	});
})();