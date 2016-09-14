(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', control);

control.$inject = ["$scope"];
function control($scope) {
	$scope.list = "";
	$scope.status = "";
	$scope.fontColor = "black";
	$scope.lunchCheck = function () {
		 check($scope, $scope.list); 
	};
	$scope.borderColor = "black";
};

function check($scope, list) {
	var parts = list.split(',');
	var count = 0;

	for (var i = 0; i < parts.length; i++) {
		if (parts[i].trim() != "") count++;
	}

	if (count == 0) {
		$scope.status = "Please enter data first";
		$scope.fontColor = "red";
		$scope.borderColor = "red";
	} else {
		$scope.fontColor = "green";
		$scope.borderColor = "green";

		if (count <= 3)
			$scope.status = "Enjoy!";
		else
			$scope.status = "Too much!";
	}
}

})();
