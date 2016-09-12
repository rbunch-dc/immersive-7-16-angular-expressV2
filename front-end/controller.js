var searchApp = angular.module("searchApp", []);
searchApp.controller('searchController', function($scope, $http){
	$scope.test = "I am sane.";

	//Someoen clicked on the submit button...
	$scope.addStudent = function(){
		console.log($scope.newStudent);
		//Make an http post request to localhost:3000/addStudent
		// Express happens to be listening there
		$http.post('http://localhost:3000/addStudent',{
			//Pass it an object with two properties
			// These properties coorespond to req.body.XXX in express
			name: $scope.newStudent,
			gender: "Unknown"
		}).then(function successCallback(response){
			//As soon as AJAX is bac, run the following Code:
			// If successful..
			console.log(response.data);
		}, function errroCallback(response){
			// If unsuccessful..
			console.log('ERROR!!');
			console.log(response.data);
		});
		console.log("Test");
	}

});