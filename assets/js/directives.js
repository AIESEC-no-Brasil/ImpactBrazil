/**
 * INSPINIA - Responsive Admin Theme
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'INSPINIA | Responsive Admin Theme';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'INSPINIA | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}

function youtubevideo() {
  return {
    restrict: 'A',
    replace: true,
    template: '<div class="site-bg-video"></div>',
    link: function($scope, $element, attrs, fn) {
      var $ = jQuery.noConflict();
      var $body = $('body');
      var $video = $('.site-bg-video');
      $video.attr('data-property', '{videoURL: _bg_video_youtube_url, autoPlay: true, loop: _bg_video_youtube_loop, startAt: _bg_video_youtube_start, stopAt: _bg_video_youtube_end, mute: true, quality: _bg_video_youtube_quality, realfullscreen: true, optimizeDisplay: true, addRaster: false, showYTLogo: false, showControls: false, stopMovieOnBlur: false, containment: "self"}');
      $video.YTPlayer();
      $body.addClass('is-site-bg-video-youtube');
    }
  }
}

function particles($window) {
  return {
    restrict: 'A',
    replace: true,
    template: '<div class="particleJs" id="particleJs"></div>',
    link: function(scope, element, attrs, fn) {
      $window.particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "opacity": {
            "value": .5,
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
            "opacity": .4,
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
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "bubble"
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
              "distance": 240,
              "size": 12,
              "duration": 2,
              "opacity": .5,
              "speed": 3
            },
            "repulse": {
              "distance": 60,
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
  };
};

function constellation() {
  return {
    restrict: 'A',
    replace: true,
    template: '<div class="site-bg-canvas"></div>',
    link: function($scope, $element, attrs, fn) {
      var $ = jQuery.noConflict();
      var $body = $('body');
      var $video = $('.site-bg-video');
      var $canvas = $('.site-bg-canvas');
      $body.addClass('is-site-bg-constellation');
      function callCanvas (canvas) {
        var screenpointSplitt = 12000;
        var movingSpeed = 0.2;
        var viewportWidth = $(window).width();
        var viewportHeight = $(window).height();
        var nbCalculated = Math.round(viewportHeight*viewportWidth/screenpointSplitt);

        var $this = $(this),
        ctx = canvas.getContext('2d');
        $this.config = {
          star: {
            color: _constellation_color,
            width: _constellation_width
          },
          line: {
            color: _constellation_color,
            width: 0.4
          },
          position: {
            x: canvas.width * 0.5,
            y: canvas.height * 0.5
          },
          velocity: movingSpeed,
          length: nbCalculated,
          distance: 130,
          radius: 120,
          stars: []
        };

        function Star () {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;

          this.vx = ($this.config.velocity - (Math.random() * 0.3));
          this.vy = ($this.config.velocity - (Math.random() * 0.3));

          this.radius = Math.random() * $this.config.star.width;
        }

        Star.prototype = {
          create: function(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
          },

          animate: function(){
            var i;
            for(i = 0; i < $this.config.length; i++){

              var star = $this.config.stars[i];

              if(star.y < 0 || star.y > canvas.height){
                star.vx = star.vx;
                star.vy = - star.vy;
              }
              else if(star.x < 0 || star.x > canvas.width){
                star.vx = - star.vx;
                star.vy = star.vy;
              }
              star.x += star.vx;
              star.y += star.vy;
            }
          },

          line: function(){
            var length = $this.config.length,
              iStar,
              jStar,
              i,
              j;

            for(i = 0; i < length; i++){
              for(j = 0; j < length; j++){
                iStar = $this.config.stars[i];
                jStar = $this.config.stars[j];

                if(
                  (iStar.x - jStar.x) < $this.config.distance &&
                  (iStar.y - jStar.y) < $this.config.distance &&
                  (iStar.x - jStar.x) > - $this.config.distance &&
                  (iStar.y - jStar.y) > - $this.config.distance
                ) {
                  if(
                    (iStar.x - $this.config.position.x) < $this.config.radius &&
                    (iStar.y - $this.config.position.y) < $this.config.radius &&
                    (iStar.x - $this.config.position.x) > - $this.config.radius &&
                    (iStar.y - $this.config.position.y) > - $this.config.radius
                  ) {
                    ctx.beginPath();
                    ctx.moveTo(iStar.x, iStar.y);
                    ctx.lineTo(jStar.x, jStar.y);
                    ctx.stroke();
                    ctx.closePath();
                  }

                }
              }
            }
          }

        };
        $this.createStars = function () {
          var length = $this.config.length,
            star,
            i;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for(i = 0; i < length; i++){
            $this.config.stars.push(new Star());
            star = $this.config.stars[i];
            star.create();
          }

          star.line();
          star.animate();
        };

        $this.setCanvas = function () {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        $this.setContext = function () {
          ctx.fillStyle = $this.config.star.color;
          ctx.strokeStyle = $this.config.line.color;
          ctx.lineWidth = $this.config.line.width;
          ctx.fill();
        };

        $this.loop = function (callback) {
          callback();
          reqAnimFrame(function () {
            $this.loop(function () {
              callback();
            });
          });
        };

        $this.bind = function () {
          $(window).on('mousemove', function(e){
            $this.config.position.x = e.pageX;
            $this.config.position.y = e.pageY;
          });
        };

        $this.init = function () {
          $this.setCanvas();
          $this.setContext();

          $this.loop(function () {
            $this.createStars();
          });

          $this.bind();
        };

        return $this;
      }

      var reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

      $(window).on('load', function() {
        setTimeout(function () {
          callCanvas($('canvas')[0]).init();
          $canvas.velocity('transition.fadeIn', {
            duration: 3000
          });
        }, 1000);
      });

      var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
        if (!uniqueId) {
          uniqueId = '';
        }
        if (timers[uniqueId]) {
          clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
        };
      })();

      $(window).resize(function () {
        waitForFinalEvent(function() {
          //callCanvas($('canvas')[0]).init();
          callCanvas($('canvas')[0]).init();
        }, 800, '');
      });
    }
  }
}

/**
 *
 * Pass all functions into module
 */
angular
    .module('impactbrazil')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('particles',particles)
    .directive('youtubevideo',youtubevideo);
