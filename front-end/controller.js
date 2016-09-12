var searchApp = angular.module("searchApp", []);
searchApp.controller('searchController', function($scope, $http){
	$scope.test = "I am sane.";

	$http({
		method: "GET",
		//Go make a get reques to localhost:3000/getStudetns
		//Express will be waiting!!!
		url: 'http://localhost:3000/getStudents'
	}).then(
		//when the request is done, call success of failure
		function successCallback(response){
			// /If successful, set studentArray = the json we got back (from Express!)
			$scope.studentArray = response.data
		}, function failureCallback(response){
			$scope.result = "ERROR!";
			console.log("Could not get students...");
		}
	);

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
			if(response.data.message == 'added'){
				$scope.studentArray.push(response.data);
			}
			console.log(response.data);
		}, function errroCallback(response){
			// If unsuccessful..
			console.log('ERROR!!');
			console.log(response.data);
		});
		console.log("Test");
	}

	$scope.removeStudent = function(index, student){
		$http({
			method: "POST",
			url: "http://localhost:3000/removeStudent?student=" + student.name
		}).then(function successCallback(response){
			//As soon as AJAX is bac, run the following Code:
			// If successful..
			if(response.data.message == 'removed'){
				$scope.studentArray.splice(index, 1);
				$scope.message = "Student Removed";
			}
			console.log(response.data);
		}, function errroCallback(response){
			// If unsuccessful..
			console.log('ERROR!!');
			console.log(response.data);
		});

	}


});