function OpportunitiesService($filter,$http) {
	var url = 'https://gis-api.aiesec.org/v2/opportunities/'

	this.list = function(token,page,filters) {
		var param = {
			'filters[earliest_start_date]':$filter('date')(new Date(), 'yyyy-MM-dd'),
			'filters[programmes][]':filters['programmes'],
			'filters[committee]':filters['committee'],
			'filters[home_mcs][]':filters['home_mcs'],
			'filters[is_ge]':filters['is_ge'],
			'filters[work_fields][]':filters['work_fields'],
			'filters[sdg_goals][]':filters['sdg_goals'],
			'access_token':token,
			'per_page':20,
			'page':page,
			'sort':'applications_closing',
		};
		return $http.get(url,{params:param});
	};

	this.find = function(token,id) {
		console.log(id);
		console.log(url+id);
		return $http.get(url+id,{params:{'access_token':token}});
	}

	this.apply = function(token,person_id,opportunity_id,gt_answer) {
		param = {
			'access_token':token,
			'application[opportunity_id]':opportunity_id,
			'application[person_id]':person_id,
			'application[gt_answer]':gt_answer,
		}
		apply_url = 'https://gis-api.aiesec.org/v2/applications.json?access_token=' + token 
					+'&application[opportunity_id]='+opportunity_id
		return $http.post(apply_url,param);
	}
}

function AuthService($http) {
	this.simple_token = function () {
		return $http.get('https://opportunities.aiesec.org/js/1.0.0.op.js', {}).then(
			function(response) {
				return response.data.match(/access_token:"(.*)",expires_in/g)[0].replace('access_token:"','').replace('",expires_in','');
			},
			function(response) {
				console.log('Não rolou Auth '+response.data);
				return null;
		});
	}

	this.sign_up = function () {

	}

	this.sign_in = function (email,password) {
		return $http.post('http://bazicon.aiesec.org.br/login_opportunities',{'email':email,'password':password},{})
	}

	this.my = function(token) {
		return $http.get('https://gis-api.aiesec.org/v2/current_person.json',{params:{'access_token':token,'with':'missing_profile_fields'}},{})
	}

	this.profile = function(token,person_id) {
		return $http.get('https://gis-api.aiesec.org/v2/people/'+person_id,{params:{'access_token':token}})
	}
}

function ApplicationService($http) {
	var url = 'https://gis-api.aiesec.org/v2/';

	this.my_applications = function(token,person_id) {
		param = {
			'access_token':token,
			'per_page':100,
		}
		return $http.get(url+'people/'+person_id+'/applications',{params:param},{})
	}

	this.withdrawn = function(token,application_id) {
		param = {
			'access_token':token,
			'application_id':application_id,
		}
		withdrawn_url = url + 'applications/'+application_id+'/withdraw?access_token=' + token 
					+'&application_id='+application_id
		return $http.post(withdrawn_url,param,{});
	}

	this.accept = function(token,application_id) {
		param = {
			'access_token':token,
			'application_id':application_id,
		}
		accept_url = url + 'applications/'+application_id+'/match?access_token=' + token 
					+'&application_id='+application_id+''
		return $http.post(accept_url,param,{})
	}
}

function ProfileService($http) {
	var url = 'https://gis-api.aiesec.org/v2/people/';

	this.profile = function(token,person_id) {
		return $http.get(url+person_id,{params:{'access_token':token}})
	}

	this.edit = function(token,person_id,profile) {
		edit_url = url+person_id+'?access_token='+token;
		return $http.patch(edit_url,{person:profile});
	}

	this.create = function(data) {
		return $http.post('http://bazicon.aiesec.org.br/new_person',data);
	}

	this.create_academic_xp = function(token,xp,person_id) {
		edit_url = url+person_id+'/academic_experiences?access_token='+token;
		return $http.post(edit_url,{experience:xp});
	}


	this.edit_academic_xp = function(token,xp,person_id) {
		edit_url = url+person_id+'/academic_experiences/'+ xp.id +'?access_token=' + token;
		return $http.patch(edit_url,{experience:xp});
	}

	this.remove_academic_xp = function(token,xp,person_id) {
		edit_url = url+person_id+'/academic_experiences/'+ xp.id +'?access_token='+token;
		return $http.delete(edit_url,{'person_id':person_id,'academic_exp_id':xp.id});
	}

	this.create_professional_xp = function(token,xp,person_id) {
		edit_url = url+person_id+'/professional_experiences?access_token='+token;
		return $http.post(edit_url,{experience:xp});
	}

	this.edit_professional_xp = function(token,xp,person_id) {
		edit_url = url+person_id+'/professional_experiences/'+ xp.id +'?access_token=' + token;
		return $http.patch(edit_url,{experience:xp});
	}

	this.remove_professional_xp = function(token,xp,person_id) {
		edit_url = url+person_id+'/professional_experiences/'+ xp.id +'?access_token='+token;
		return $http.delete(edit_url,{'person_id':person_id,'professional_exp_id':xp.id});
	}
}

function ListsService($http) {
	this.get_lists = function(token) {
		return $http.get('https://gis-api.aiesec.org/v2/lists/',{params:{'access_token':token,'lists[]':['backgrounds','languages','issues','skills','work_fields','work_types','nationalities','industries','study_levels','home_mcs']}})
	}
}

angular.module('impactbrazil')
	.service('OpportunitiesService',OpportunitiesService)
	.service('ApplicationService',ApplicationService)
	.service('ProfileService',ProfileService)
	.service('ListsService',ListsService)
	.service('AuthService',AuthService);