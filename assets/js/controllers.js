function opportunitiesCtrl($scope,$http,$timeout,$filter) {
	$scope.selected_sdg = 'all';
	$scope.loading = false;
	$scope.token = null;
	$scope.list = [];
	$scope.error = false;
	$scope.filter = 'all';
	$scope.page = 1;
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

	$scope.get_opportunities = function(sdg,page,program,ge,backgrounds) {
		var param = {
			'access_token':$scope.token,
			'per_page':20,'page':page,
			'filters[earliest_start_date]':$filter('date')(new Date(), 'yyyy-MM-dd'),
			'filters[programmes][]':program,
			'filters[home_mcs][]':1606
		};

		if (program == 2) {
			param['filters[is_ge]'] = ge;
			param['filters[work_fields][]']=backgrounds;
		}
		if (sdg != "all") { param['filters[sdg_goals][]'] = sdg; console.log(sdg);}

		$scope.loading = true;
		$http.get('https://gis-api.aiesec.org/v2/opportunities',{params:param}
			).then(
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
		});
	};

	$scope.filterSDG = function(sdg) {
		$scope.error = false;
		$scope.list = [];
		$scope.page = 1;
		$scope.get_opportunities(sdg,$scope.page,1,false,null);
		$scope.filter = sdg;
		mixpanel.track("filterSDG", {"sdg": sdg});
	};


	$scope.filterBackground = function(ge,profile) {
		backgrounds = []
		switch(profile) {
		    case 'I.T.':
		        $scope.backgrounds = [717,719,727,735,738];
		        break;
		    case 'Engineering':
		        $scope.backgrounds = [720,724,735,736,738];
		        break;
		    case 'Marketing':
		        $scope.backgrounds = [716,717,718,719,721,722,730,739,743];
		    case 'Business Administration':
		        $scope.backgrounds = [715,717,719,720,721,725,726,728,729,732,733,735,736,737,739,740,734,741];
		        break;
		    case 'Education':
		        $scope.backgrounds = [742,718,723,743];
		        break;
		    default:
		        $scope.backgrounds = [];
		}
		$scope.error = false;
		$scope.list = [];
		$scope.page = 1;
		$scope.filter = profile;
		$scope.ge = ge;
		$scope.program = 2;
		$scope.get_opportunities('all',$scope.page,$scope.program,$scope.ge,$scope.backgrounds);
		mixpanel.track("filterSDG", {"backgrounds": profile});
	};

	$scope.more_opportunities = function() {
		console.log('jnsdcjknskdjn');
		$scope.error = false;
		$scope.page++;
		filter = ($scope.program == 1) ? $scope.filter : 'all'
		$scope.get_opportunities(filter,$scope.page,$scope.program,$scope.ge,$scope.backgrounds);
		mixpanel.track("more_opportunities", {"sdg": $scope.filter});
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
	$scope.filter_map = function(filter) {
		switch(filter) {
			case 'all':
				return 'All';
				break;
			case 1104:
				return 'Quality Education';
				break;
			case 1110:
				return 'Reduced Inequalities';
				break;
			case 1113:
				return 'Climate Action';
				break;
			case 1117:
				return 'Partnership for the Goals';
				break;
			default:
				return filter;
		}
	}


	function fn_siteBgVideoYoutube() {
	  	var $body = $('body');
	    var $video = $('.site-bg-video');
	    var $audio = $('.audio-toggle');

	    $body.addClass('is-site-bg-video-youtube');
	    if (_bg_style_desktop == 11 || _bg_style_desktop == 13) {
	      $video.attr('data-property', '{videoURL: _bg_video_youtube_url, autoPlay: true, loop: _bg_video_youtube_loop, startAt: _bg_video_youtube_start, stopAt: _bg_video_youtube_end, mute: true, quality: _bg_video_youtube_quality, realfullscreen: true, optimizeDisplay: true, addRaster: false, showYTLogo: false, showControls: false, stopMovieOnBlur: false, containment: "self"}');
	      $video.YTPlayer();
	    } else {
	      $video.attr('data-property', '{videoURL: _bg_video_youtube_url, autoPlay: true, loop: _bg_video_youtube_loop, startAt: _bg_video_youtube_start, stopAt: _bg_video_youtube_end, mute: false, quality: _bg_video_youtube_quality, realfullscreen: true, optimizeDisplay: true, addRaster: false, showYTLogo: false, showControls: false, stopMovieOnBlur: false, containment: "self"}');
	      $video.YTPlayer();

	      $body.addClass('is-audio-on');

	      $audio.on('click', function() {
	        if ($body.hasClass('is-audio-on')) {
	          $video.YTPMute()
	          $body.removeClass('is-audio-on').addClass('is-audio-off');
	        } else if ($body.hasClass('is-audio-off')) {
	          $video.YTPUnmute()
	          $body.removeClass('is-audio-off').addClass('is-audio-on');
	        }
	      });
	    }
	  };
	  fn_siteBgVideoYoutube();
};

angular
    .module('impactbrazil')
    .controller('opportunitiesCtrl', opportunitiesCtrl);