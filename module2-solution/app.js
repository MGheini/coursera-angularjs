(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])

.controller('ToBuyShoppingController', toBuyController)
.controller('AlreadyBoughtShoppingController', boughtController)

.service('ShoppingListCheckOffService', listService);

toBuyController.$inject = ['ShoppingListCheckOffService'];
function toBuyController(ShoppingListCheckOffService) {
	var toBuyList = this;

	toBuyList.items = ShoppingListCheckOffService.getUnboughtItems();

	toBuyList.checkOff = function (index) {
		ShoppingListCheckOffService.checkOffItem(index);
	}
};

boughtController.$inject = ['ShoppingListCheckOffService'];
function boughtController(ShoppingListCheckOffService) {
	var boughtList = this;

	boughtList.items = ShoppingListCheckOffService.getBoughtItems();
};

function listService() {
	var service = this;

	var unboughtItems = [{ name: "cookies", quantity: 10 }, { name: "cookies", quantity: 20 },
						{ name: "cookies", quantity: 30 }, { name: "cookies", quantity: 40 },
						{ name: "cookies", quantity: 50 }];
	var boughtItems = [];

	service.checkOffItem = function (itemIndex) {
		boughtItems.push(unboughtItems[itemIndex]);
		unboughtItems.splice(itemIndex, 1);
	};

	service.getUnboughtItems = function () {
		return unboughtItems;
	};

	service.getBoughtItems = function () {
		return boughtItems;
	};
}

})();
