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
            url: "/global_volunteer",
            templateUrl: "views/search_gv.html"
        })
        .state('index.portal_ge', {
            url: "/global_entrepreneur",
            templateUrl: "views/search_ge.html"
        })
        .state('index.portal_gt', {
            url: "/global_talent",
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
angular
    .module('impactbrazil')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
