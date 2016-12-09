function opportunitiesCtrl($scope,$state,$stateParams,$localStorage,OpportunitiesService,AuthService) {
	$scope.loading = false;
	$scope.token = null;
	$scope.list = [];
	$scope.error = false;
	$scope.filter = 'all';
	$scope.page = 1;
	$scope.filters = {};

	function init_params() {
		if ($state.current.name == 'index.portal_gv') {
			$scope.filters['programmes'] = 1;
		} else if ($state.current.name == 'index.portal_ge') {
			$scope.filters['programmes'] = 5;
		} else if ($state.current.name == 'index.portal_gt') {
			$scope.filters['programmes'] = 2;
		}
		$scope.filters['committee'] = ($stateParams.lc != undefined && $stateParams.lc != "") ? $stateParams.lc : undefined;
		$scope.filters['home_mcs'] = ($stateParams.lc == undefined || $stateParams.lc == "") ? 1606 : undefined;
		$scope.filters['work_fields'] = ($stateParams.background != undefined) ? map_background($stateParams.background) : undefined; 
		if ($stateParams.sdg != undefined) {
			$scope.filters['sdg_goals'] = $stateParams.sdg;
			$scope.filter = $stateParams.sdg;
		}
	}
	
	function get_opportunities(page) {
		init_params();
		$scope.loading = true;
		OpportunitiesService.list($localStorage.token,page,$scope.filters).then(
			function(response) {
				console.log('Rolou! '+response.status);
				console.log(response.data);
				$scope.list = $scope.list.concat(response.data.data);
				$scope.loading = false;
			},
			function(response) {
				console.log('Não rolou '+response.status);
				console.log('Não rolou '+response.data);
				$scope.loading = false;
				$scope.error = true;
				$localStorage.token = null;
				$state.transitionTo($state.current, $stateParams, {reload: true, inherit: true, notify: true});
		});
	};

	if ($localStorage.token==null) {
		AuthService.simple_token().then(function(token) {
			if (token == null){ 
				$localStorage.token = null;
				$state.transitionTo($state.current, $stateParams, {reload: true, inherit: true, notify: true});
			} else {
				$localStorage.token = token;
			}
			get_opportunities(1);
		});
	} else {
		get_opportunities(1);
	}

	$scope.more_opportunities = function() {
		$scope.error = false;
		$scope.page++;
		get_opportunities($scope.page);
				console.log($scope.list);
		mixpanel.track("more_opportunities", {"sdg": $scope.filter});
	};

	$scope.filterSDG = function(sdg) {
		mixpanel.track("filterSDG", {"sdg": sdg});
		$scope.filter = sdg;
		$state.go($state.current,{'sdg':sdg,'scrollTo':'portal'});
	};


	$scope.filterBackground = function(profile) {
		console.log(profile)
		mixpanel.track("filterSDG", {"background": profile});
		$scope.filter = profile;
		$state.go($state.current,{'background':profile,'scrollTo':'portal'});
	};

	function map_background(profile) {
		switch(profile) {
		    case 'it':
		        return [717,719,727,735,738];
		    case 'engineering':
		        return [720,724,735,736,738];
		    case 'marketing':
		        return [716,717,718,719,721,722,730,739,743];
		    case 'ba':
		        return [715,717,719,720,721,725,726,728,729,732,733,735,736,737,739,740,734,741];
		    case 'education':
		        return [742,718,723,743];
		    default:
		        return [];
		}
	}

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

	$scope.filter_map = function(filter) {
		switch(filter) {
			case 'all':
				return 'All';
				break;
			case 1104 || "1104":
				return "Quality Education";
				break;
			case 1110 || "1110":
				return "Reduced Inequalities";
				break;
			case 1113 || "1113":
				return "Climate Action";
				break;
			case 1117 || "1117":
				return "Partnership for the Goals";
				break;
			default:
				return filter;
		}
	}
};

function OpportunityDetailCtrl($scope,$state,$stateParams,$localStorage,OpportunitiesService,AuthService) {
	$scope.opportunity = null;
	$scope.loading = false;

	if($localStorage.login_token != null) {
		load_opportunity($localStorage.login_token);
	} else if ($localStorage.token != null) {
		load_opportunity($localStorage.token);
	} else {
		AuthService.simple_token().then(function(token) {
			if (token == null){
				$localStorage.token = null;
				$state.reload();
			} else {
				$localStorage.token = token;
			}
			load_opportunity($localStorage.token);
		});
	}

	$scope.apply = function () {
		$scope.loading = true;
		if($localStorage.login_token != null) {
			OpportunitiesService.apply($localStorage.login_token,$localStorage.my.id,$stateParams.id).then(
				function(response) {
					console.log(response);
					$scope.opportunity.applied_to = true;
					$scope.loading = false;
				},function(response) {
					console.log(response);
					$scope.loading = false;
				});
		} else {
			$state.go('sign_in',{'applyTo':$stateParams.id});
		}
	};

	$scope.can_apply = function() {
		return $localStorage.missing_profile_fields == null || $localStorage.missing_profile_fields.length == 0;
	}

	function load_opportunity(token) {
		OpportunitiesService.find(token,$stateParams.id).then(
			function(response) {
				console.log(response);
				$scope.opportunity = response.data;
			},function(response) {
				console.log(response);
				$localStorage.$reset();
				$state.transitionTo($state.current, $stateParams, {reload: true, inherit: true, notify: true});
			});
	}
};

function AuthCtrl($scope,$state,$location,$stateParams,$localStorage,OpportunitiesService,AuthService) {
	$scope.storage = $localStorage;
	$scope.loading = false;
	$scope.message = '';

	$scope.login = function() {
		$scope.loading = true;
		if ($scope.email != undefined && $scope.password != undefined) {
			AuthService.sign_in($scope.email,$scope.password).then(
				function successCallback(response) {
					if (response.data['token'] == null) {
						$scope.message = 'Email or Password incorrect';
					} else {
						$localStorage.login_token = response.data['token'].match(/access_token:.*,token/)[0].replace('access_token:','').replace(',token','');

						AuthService.my($localStorage.login_token).then(
							function(response){
								console.log(response);
								$localStorage.my = response.data.person;
								$localStorage.missing_profile_fields = response.data.missing_profile_fields;
							},function(response){
								console.log(response);
							}).then(function() {
								console.log($localStorage.token);
								if ($stateParams.applyTo) {
									console.log($stateParams);
									OpportunitiesService.apply($localStorage.login_token,$localStorage.my.id,parseInt($stateParams.applyTo)).then(
										function(response) {
											console.log(response);
										},function(response) {
											console.log(response);
										}).then(function() {
											$state.go('index.opportunity',{'id':parseInt($stateParams.applyTo)});
										});
								} else {
									$state.go('index.main');
								}
							});
					}
					$scope.loading = false;
				}, function errorCallback(response) {
					$scope.message = 'Something is incorrect, try again';
					$scope.loading = false;
				});
		} else {
			$scope.loading = false;
			$scope.message = 'You need to fill your email and password';
		}
	}

	$scope.sign_out = function() {
		$localStorage.$reset();
	}

    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
};

function ApplicationsCtrl($scope,$state,$stateParams,$localStorage,ApplicationService) {
	$scope.list = [];
	$scope.loading = true;

	if($localStorage.login_token != null) {
		load_applications($localStorage.login_token);
	} else {
		$state.go('sign_in',{'redirectTo':'index.profile.applications'});
	}

	function load_applications(token) {
		ApplicationService.my_applications(token,$localStorage.my.id).then(
			function(response) {
				console.log(response);
				$scope.list = response.data.data;
				$scope.loading = false;
			},function(response) {
				console.log(response);
				$localStorage.$reset();
				$state.go('sign_in',{'redirectTo':'index.profile.applications'});
			});
	}

	$scope.accept = function(application) {
		application.loading = true;
		ApplicationService.accept($localStorage.login_token,application.id).then(
			function(response) {
				console.log(response);
				$state.go('index.profile.applications');
			},function(response) {
				console.log(response);
				$scope.application.loading = false;
			});
	}

	$scope.withdrawn = function(application) {
		console.log(application);
		application.loading = true;
		ApplicationService.withdrawn($localStorage.login_token,application.id).then(
			function(response) {
				console.log(response);
				$scope.loading = true;
				load_applications($localStorage.login_token);
			},function(response) {
				console.log(response);
				$scope.application.loading = false;
			});
	}

	//matched accepted approved withdrawn realized completed rejected declined
	$scope.is_open = function(status) {
		return status == 'open' ||  status == 'matched' || status == 'accepted' ||
			status == 'approved' || status == 'realized' || status == 'completed'; 
	}

	$scope.is_accepted = function(status) {
		return status == 'matched' || status == 'accepted' ||
			status == 'approved' || status == 'realized' || status == 'completed'; 
	}

	$scope.is_in_progress = function(status) {
		return status == 'accepted' || status == 'approved' || 
			status == 'realized' || status == 'completed'; 
	}

	$scope.is_approved = function(status) {
		return status == 'approved' || status == 'realized' || status == 'completed'; 
	}

	$scope.is_realized = function(status) {
		return status == 'realized' || status == 'completed'; 
	}

	$scope.is_completed = function(status) {
		return status == 'completed';
	}

	$scope.is_withdrawn = function(status) {
		return status == 'withdrawn';
	}

	$scope.is_rejected = function(status) {
		return status == 'rejected';
	}

	$scope.is_declined = function(status) {
		return status == 'declined';
	}

	$scope.no_action = function(permissions) {
		return !permissions.can_be_matched && !permissions.can_sign_an && !permissions.can_be_withdrawn &&
			!permissions.should_complete_ldm && !permissions.should_complete_nps;
	}
}

function EditProfileCtrl($scope,$state,$stateParams,$localStorage,AuthService,ListsService,ProfileService) {
	$scope.my = null;
	$scope.loading = true;
	$scope.lists = null;
	$scope.people = [{name:'Luan',email:'luan@',id:1},{name:'hahhaha',email:'djnaskjndj',id:2}];
	$scope.selected = null;
	$scope.selected_skill = {selectedItems : []};
	$scope.selected_skill_level = '0';
	$scope.skills = [];
	$scope.selected_language = [];
	$scope.selected_language_level = '0';
	$scope.languages = [];
	$scope.selected_background = [];
	$scope.backgrounds = [];
	$scope.selected_work_field = [];
	$scope.work_fields = [];
	$scope.academic_xp = {backgrounds:[]};
	$scope.academic_backgrounds = [];
	$scope.academic_experiences = [];
	$scope.professional_xp = {industries:[],skills:[],backgrounds:[],work_fields:[]};
	$scope.professional_experiences = [];

	if($localStorage.login_token != null) {
		load_profile($localStorage.login_token);
		load_lists($localStorage.login_token);
	} else {
		$state.go('sign_in',{'redirectTo':'index.profile.edit'});
	}

	function resolve_date(str) {
		date = str.slice(0, 10).split('-');
		return new Date(date[0],date[1]-1,date[2]);
	}

	function load_profile(token) {
		AuthService.profile(token,$localStorage.my.id).then(
			function(response) {
				console.log(response);
				$scope.my = response.data;
				$scope.my.dob = resolve_date($scope.my.dob);
				$scope.my.profile.earliest_start_date = resolve_date($scope.my.profile.earliest_start_date);
				$scope.my.profile.latest_end_date = resolve_date($scope.my.profile.latest_end_date);
				$scope.loading = false;
			},function(response) {
				console.log(response);
				$localStorage.$reset();
				$state.go('sign_in',{'redirectTo':'index.profile.edit'});
			});
	}

	function load_lists(token) {
		ListsService.get_lists(token).then(
			function (response) {
				console.log(response);
				$scope.lists = response.data;
			},function (response) {
				console.log(response);
			});
	}

	$scope.edit = function() {
		$scope.loading = true;
		profile = populte($scope.my);
		ProfileService.edit($localStorage.login_token,$scope.my.id,profile).then(
			function (response) {
				console.log(response);
				load_profile($localStorage.login_token);
				$scope.loading = false;
			},function (response) {
				console.log(response);
				$scope.loading = false;
			});
	}

	$scope.add_with_level = function(item,level,list) {
		if(list.find(function(i){return i.id == item.id}) == undefined){
			temp = {};
			temp.name = item.name;
			temp.id = item.id;
			temp.level = level;
			list.push(temp);
		}
	}

	$scope.add_to_list = function(item,list) {
		if(list.find(function(i){return i.id == item.id}) == undefined){
			temp = {};
			temp.name = item.name;
			temp.id = item.id;
			list.push(temp);
		}
	}

	$scope.remove_from_list = function(element,list) {
		list.splice(list.indexOf(element),1);
	}

	$scope.save_academic_xp = function(xp,xp_list) {
		xp.start_date = convert_string(xp.start_date);
		xp.end_date = convert_string(xp.end_date);
		att_xp(xp,xp_list);

		xp.study_level = xp.experience_level.id;
		xp.backgrounds = objects2ids(xp.backgrounds);
		ProfileService.create_academic_xp($localStorage.login_token,xp,$scope.my.id).then(
			function(response) {
				console.log(response);
				xp.id = response.data.id;
			},function(response) {
				console.log(response);
			});
		$scope.cancel_academic_xp();
	}

	$scope.save_professional_xp = function(xp,xp_list) {
		xp.start_date = convert_string(xp.start_date);
		xp.end_date = convert_string(xp.end_date);
		att_xp(xp,xp_list);

		xp.work_type = xp.experience_level.id;
		xp.industries = objects2ids(xp.industries);
		xp.skills = objects2ids(xp.skills);
		xp.work_fields = objects2ids(xp.work_fields);
		ProfileService.create_professional_xp($localStorage.login_token,xp,$scope.my.id).then(
			function(response) {
				console.log(response);
				xp.id = response.data.id;
			},function(response) {
				console.log(response);
			});
		$scope.cancel_professional_xp();
	}

	$scope.edit_professional_xp = function(element) {
		$scope.professional_xp = element;
		$scope.professional_xp.start_date = resolve_date($scope.professional_xp.start_date);
		$scope.professional_xp.end_date = resolve_date($scope.professional_xp.end_date);
	}

	$scope.edit_academic_xp = function(element) {
		$scope.academic_xp = element;
		$scope.academic_xp.start_date = resolve_date($scope.academic_xp.start_date);
		$scope.academic_xp.end_date = resolve_date($scope.academic_xp.end_date);
	}

	$scope.cancel_academic_xp = function() {
		$scope.academic_xp = {backgrounds:[]};
	}

	$scope.cancel_professional_xp = function() {
		$scope.professional_xp = {industries:[],skills:[],backgrounds:[],work_fields:[]};;
	}

	$scope.remove_academic_xp = function(xp,list) {
		list.splice(list.indexOf(xp),1);
		ProfileService.remove_academic_xp($localStorage.login_token,xp,$scope.my.id).then(
			function(response) {
				console.log(response);
			},function(response) {
				console.log(response);
			});
	}

	$scope.remove_professional_xp = function(xp,list) {
		list.splice(list.indexOf(xp),1);
		ProfileService.remove_professional_xp($localStorage.login_token,xp,$scope.my.id).then(
			function(response) {
				console.log(response);
			},function(response) {
				console.log(response);
			});
	}

	$scope.translate_level = function(level) {
		switch(parseInt(level)){
			case 0:
				return 'Beginner';
			case 1:
				return 'Intermediate';
			case 2:
				return 'Advanced';
			case 3:
				return 'Expert';
		}
	}

	function objects2ids(objs) {
		list = [];
		for (var i = 0;i < objs.length;i++) {
			list.push(objs[i].id);
		}
		return list;
	}

	function convert_string(element) {
		if (typeof element === 'string' || element instanceof String) {
			return element;
		}
		return element.toISOString();
	}

	function att_xp(xp,xp_list) {
		if(xp.id != null) {
			id = null;
			for (var i = 0; i < xp_list.length; i++) {
			    if (xp.id == xp_list[i].id) {xp_list[i] = xp;}
			}
		} else {
			xp_list.push(xp);
		}
	}

	function populte(my){
		profile = {};
		profile.address_info = my.address_info;
		profile.contact_info = my.contact_info;
		profile.dob = my.dob;
		profile.email = my.email;
		profile.first_name = my.first_name;
		profile.last_name = my.last_name;
		profile.gender = my.gender;
		profile.profile = {};
		profile.profile.duration_min = $scope.my.profile.duration_min;
		profile.profile.duration_max = $scope.my.profile.duration_max;
		profile.profile.dura = $scope.my.profile.earliest_start_date;
		profile.profile.latest_end_date = $scope.my.profile.latest_end_date;
		profile.profile.issues = objects2ids(my.profile.issues);
		profile.profile.backgrounds = objects2ids(my.profile.backgrounds);
		profile.profile.nationalities = objects2ids(my.profile.nationalities);
		profile.profile.preferred_locations = objects2ids(my.profile.preferred_locations_info);
		profile.profile.preferred_organisations = objects2ids(my.profile.preferred_organisations);
		profile.profile.work_fields = objects2ids(my.profile.work_fields);
		profile.profile.languages = my.profile.languages;
		profile.profile.skills = my.profile.skills
		return profile;
	}
}

angular
    .module('impactbrazil')
    .controller('opportunitiesCtrl', opportunitiesCtrl)
    .controller('OpportunityDetailCtrl', OpportunityDetailCtrl)
    .controller('ApplicationsCtrl', ApplicationsCtrl)
    .controller('EditProfileCtrl', EditProfileCtrl)
    .controller('AuthCtrl', AuthCtrl);