(function () {
'use strict';

angular.module('NarrowItDownApp', [])

.controller('NarrowItDownController', narrowerController)

.service('MenuSearchService', searchService)

.directive('foundItems', foundItemsDirective);

narrowerController.$inject = ['MenuSearchService'];
function narrowerController(MenuSearchService) {
	var narrower = this;

	narrower.searchTerm = "";
	narrower.found = [];
	narrower.status = "";

	narrower.getMatchedMenuItems = function() {
		if(narrower.searchTerm === "")
			narrower.found = [];
			narrower.status = "noResult";
		else {
			MenuSearchService.getMatchedMenuItems(narrower.searchTerm).then(function(result) {
				narrower.found = result;

				if (narrower.found.length == 0)
				narrower.status = "noResult";
				else {
					narrower.status = "someResult";
				}
			});
		}
	};

	narrower.remove = function(index) {
		narrower.found.splice(index, 1);
	};
}

searchService.$inject = ['$http'];
function searchService($http) {
	var service = this;

	service.getMatchedMenuItems = function (searchTerm) {
		return $http({
			method: "GET",
			url: "https://davids-restaurant.herokuapp.com/menu_items.json"
		}).then(function (result) {
	    // process result and only keep items that match
	    var foundItems = [];

	    for (var i = 0; i < result.data.menu_items.length; i++) {
	    	var item = result.data.menu_items[i];
	    	if (item.description.includes(searchTerm))
	    		foundItems.push(item);
	    }

	    // return processed items
	    return foundItems;
		});
	};
}

function foundItemsDirective() {
	var ddo = {
		templateUrl: 'foundItems.html',
		scope: {
			items: '<',
			status: '@',
			onRemove: '&'
		}
	};

	return ddo;
}

})();
