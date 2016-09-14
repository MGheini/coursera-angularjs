(function () {
'use strict'; // to avoid careless mistakes ;)

angular.module('myFirstApp', []) //[] --> no dependencies

.controller('myFirstController', function ($scope) {
	$scope.name = "Mozhdeh";
});

})();
