'use strict';

angular.module('mApp')
.constant('constants',(constants)());

function constants(){
	var constant = {
		loanPurpose : {
			'Agriculture' : [
				'Agriculture'
			],
			'Cottege Industries & Small Enterpenour': [
				'Zari Work',
				'Murti Making',
				'Chips Making',
				'Agarbatti making',
				'chiken work',
				'Bag making',
				'sewing Machine',
				'Furniture',
				'Leather work',
				'Pickle Making'
			],
			'Dairy & Animal Husbandry': [
				'Milk selling',
				'Goat Farming',
				'Poultry form',
				'Pigries',
				'Fisheries',
			],
			'Horticulture & Flowriculture' : [
				'Flowers selling',
				'Vegetable selling',
				'Fruit Shop',
			],
			'Small Business' : [
				'Tea Shop',
				'Cloth Shop',
				'Grocery Shop',
				'Hotel',
				'Electronics & Mobile shop',
				'Saree Shop',
				'Gift Shop',
				'Meat Shop',
				'Cosmatic shop',
				'Sweet Shop',
				'Cyber Café',
				'Shoe Shop',
				'Pan shop',
				'Scrap shop',
				'Medical store',
				'Stone Cutting'
			],
			'Small Services' : [
				'Parlour',
				'Auto Repair',
				'Hair Cutting',
				'Gas Veilding',
				'Cycle Repairing',
				'Auto Rikshwa',
			]
		}
	};

	return constant;
}