var app = angular.module('impactbrazil', []);
app.controller('opportunitiesCtrl', function($scope,$http,$timeout,$filter) {
	$scope.selected_sdg = 'all';
	$scope.loading = false;
	$scope.token = null;
	$scope.list = [];
	$scope.error = false;
	$http.get('https://opportunities.aiesec.org/js/1.0.0.op.js', {}).then(
		function(response) {
			console.log('Rolou! '+response.status);
			$scope.token = response.data.match(/access_token:"(.*)",expires_in/g)[0].replace('access_token:"','').replace('",expires_in','');
			console.log($scope.token);
			$scope.get_opportunities('all');
		}, 
		function(response) {
			console.log('Não rolou '+response.data);
			$scope.error = true;
	});

	$scope.get_opportunities = function(sdg) {
		var param = {
				'access_token':$scope.token,
				'per_page':20,'page':1,
				'filters[earliest_start_date]':$filter('date')(new Date(), 'yyyy-MM-dd'),
				'filters[programmes][]':1,
				'filters[home_mcs][]':1606
			};

		if (sdg != "all") { param['filters[sdg_goals][]'] = sdg; console.log(sdg);}

		$scope.loading = true;
		$http.get('https://gis-api.aiesec.org/v2/opportunities',{params:param}
			).then(
			function(response) {
				console.log('Rolou! '+response.status);
				console.log(response.data);
				$scope.list = response.data.data;
				$scope.loading = false;
			}, 
			function(response) {
				console.log('Não rolou '+response.status);
				console.log('Não rolou '+response.data);
				$scope.loading = false;
				$scope.error = true;
		});
	};

	$scope.filterSDG = function(sdg) {
		$scope.error = false;
		$scope.loading = true;
		$scope.list = [];
		$scope.get_opportunities(sdg);
	};

	$scope.sdg_color = function(sdg) {
		switch(sdg) {
			case 0:
				return 'danger';
				break;
			case 1:
				return 'pink';
				break;
			case 2:
				return 'invert';
				break;
			case 3:
				return 'success';
				break;
			default:
				return 'success';
		}
	};
	$scope.sdg_badge = function(sdg) {
		switch(sdg) {
			case 'sdg4':
				return 'book';
				break;
			case 'sdg10':
				return 'bars';
				break;
			case 'sdg13':
				return 'globe';
				break;
			case 'sdg17':
				return 'briefcase';
				break;
			default:
				return 'line-chart';
		}
	};
});