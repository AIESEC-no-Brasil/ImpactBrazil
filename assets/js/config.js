/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/main");
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html"
        })
        .state('index.portal_gv', {
            url: "/global_volunteer/:lc?scrollTo",
            params: {gv: {value:null,squash:true},lc:{value:null,squash:true},scrollTo:{value:null,squash:true}},
            templateUrl: "views/search_gv.html"
        })
        .state('index.portal_ge', {
            url: "/global_entrepreneur/:lc?scrollTo",
            params: {ge: {value:null,squash:true},lc:{value:null,squash:true},scrollTo:{value:null,squash:true}},
            templateUrl: "views/search_ge.html"
        })
        .state('index.portal_gt', {
            url: "/global_talent/:lc?scrollTo",
            params: {gt: {value:null,squash:true},lc:{value:null,squash:true},scrollTo:{value:null,squash:true}},
            templateUrl: "views/search_gt.html"
        })
        .state('index.question1', {
            url: "/question_one",
            templateUrl: "views/questions/question1.html"
        })
        .state('index.question2', {
            url: "/question_two",
            templateUrl: "views/questions/question2.html"
        })
        .state('index.question3', {
            url: "/question_three",
            templateUrl: "views/questions/question3.html"
        })
        .state('index.question3-1', {
            url: "/question_3",
            templateUrl: "views/questions/question3-1.html"
        })
}
function fn_particles() {
    var $body = $('body');
    $body.addClass('is-site-bg-particles');
    $('.site-bg-effect, .site-bg-canvas').remove();

    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 25,
          "density": {
            "enable": true,
            "value_area": 500
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "opacity": {
          "value": _particles_opacity,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 4,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": _particles_link_opacity,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
angular
    .module('impactbrazil')
    .config(config)
    .run(function($rootScope, $state, $location, $anchorScroll, $stateParams) {
        //$animate.enabled(true);
        $rootScope.$state = $state;
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, error) {
            $location.hash($stateParams.scrollTo);
            $anchorScroll();
            fn_particles();
        });
    });