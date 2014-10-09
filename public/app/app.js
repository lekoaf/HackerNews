(function (){

	var app = angular.module('hackerNews', ['ngRoute']);

	app.config(function ($routeProvider){
		$routeProvider
		.when('/', {
			controller: 'storyController',
			templateUrl: 'app/views/story.html'
		})
		.when('/story/:sid', {
			controller: 'commentController',
			templateUrl: 'app/views/comment.html'
		})
		.when('/user/:uid', {
			controller: 'userController',
			templateUrl: 'app/views/user.html'

		})
		.otherwise({redirectTo: '/'});
	});
})();