var app = angular.module('impactbrazil', []);
console.log('oi')
app.controller('opportunitiesCtrl', function($scope,$http) {
	$scope.firstName= "John";
	$scope.lastName= "Doe";

	$scope.filterSDG = function(sdg) {
		console.log(sdg)
		$scope.list = $scope.database.filter(function(x) {return x['sdg'] == sdg;});
	};

	$scope.database = [
		{
			'name':'Speak With Me Yalova',
			'committee':'Cuiabá',
			'sdg':'sdg1',
			'duration':'6 weeks',
			'starts_on':'November 27, 2016',
		},
		{
			'name':'Startaê',
			'committee':'Aracaju',
			'sdg':'sdg2',
			'duration':'6 weeks',
			'starts_on':'November 27, 2016',
		},
		{
			'name':'Talk Project',
			'committee':'Recife',
			'sdg':'sdg3',	
			'duration':'6 weeks',
			'starts_on':'November 27, 2016',
		},
		{
			'name':'X4Change',
			'committee':'Rio de Janeiro',
			'sdg':'sdg4',	
			'duration':'6 weeks',
			'starts_on':'November 27, 2016',
		},
		{
			'name':'Project Heros',
			'committee':'Teresina',
			'sdg':'sdg5',	
			'duration':'6 weeks',
			'starts_on':'January 20, 2017',
		},
		{
			'name':'Shift',
			'committee':'Fortaleza',
			'sdg':'sdg6',	
			'duration':'6 weeks',
			'starts_on':'November 27, 2016',
		},
		{
			'name':'Nós',
			'committee':'Campo Grande',
			'sdg':'sdg7',	
			'duration':'6 weeks',
			'starts_on':'February 13, 2017',
		},
		{
			'name':'Gira Mundo',
			'committee':'Volta Redonda',
			'sdg':'sdg7',	
			'duration':'6 weeks',
			'starts_on':'January 20, 2017',
		},
		{
			'name':'Smarketing',
			'committee':'Vitória',
			'sdg':'sdg8',	
			'duration':'6 weeks',
			'starts_on':'November 27, 2016',
		},
		{
			'name':'Shift',
			'committee':'Vitória',
			'sdg':'sdg9',	
			'duration':'6 weeks',
			'starts_on':'November 27, 2016',
		},
		{
			'name':'Gira Mundo',
			'committee':'Porto Alegre',
			'sdg':'sdg10',	
			'duration':'6 weeks',
			'starts_on':'February 13, 2017',
		},
		{
			'name':'Gira Mundo',
			'committee':'Porto Alegre',
			'sdg':'sdg10',	
			'duration':'6 weeks',
			'starts_on':'November 21, 2016',
		},
		{
			'name':'Gira Mundo',
			'committee':'Belo Horizonte',
			'sdg':'sdg11',
			'duration':'6 weeks',
			'starts_on':'December 27, 2016',
		},
	];
});