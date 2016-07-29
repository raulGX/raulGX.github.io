function collapseNavbar() {
    if ($("#the-navbar").offset().top > 50) {
        $("#the-navbar").addClass('navbar-custom');
    } else {
        $("#the-navbar").removeClass('navbar-custom');
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(function(){
  $(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });
  collapseNavbar();
});
var scroll = angular.module('scroll', ['smoothScroll']);
var app = angular.module('app',[]);
app.controller('projectController',function($scope){
  $scope.projects=[
    {
      'name':'Personal projects',
      'description':'Under development.',
      'img':'img/portfolio/personal-project.jpg',
      'link':'https://github.com/raulGX'
    },
    {
      'name':"Simon's Game",
      'description':'Used AngularJS, jQuery and Bootstrap.',
      'img':'img/portfolio/fend-simongame.jpg',
      'link':'https://codepen.io/raulGX/full/VjyGmg'
    },
    {
      'name':'Web Pocket Calculator',
      'description':'Used jQuery and Bootstrap.',
      'img':'img/portfolio/fend-calculator.jpg',
      'link':'https://codepen.io/raulGX/full/grGZPE'
    },
    {
      'name':'Pomodoro Clock',
      'description':'Used jQuery and Bootstrap.',
      'img':'img/portfolio/fend-pomclock.jpg',
      'link':'https://codepen.io/raulGX/full/JKApPG'
    },
    {
      'name':'Random Quote Generator',
      'description':'Used jQuery, Quote Generator API and Bootstrap.',
      'img':'img/portfolio/fend-randoquote.jpg',
      'link':'https://codepen.io/raulGX/full/VjWPNZ'
    },
    {
      'name':'Twitch.tv Channel Viewer',
      'description':'Used jQuery, Twitch.tv API and Bootstrap.',
      'img':'img/portfolio/fend-twitchapi.jpg',
      'link':'https://codepen.io/raulGX/full/kXwRNz'
    },
    {
      'name':'Weather Viewer',
      'description':'Used jQuery, Weather API and Bootstrap.',
      'img':'img/portfolio/fend-weather.jpg',
      'link':'https://codepen.io/raulGX/full/xOAdGA'
    },
    {
      'name':'Wikipedia Viewer',
      'description':'Used jQuery, Wikipedia API and Bootstrap.',
      'img':'img/portfolio/fend-wikiviewer.jpg',
      'link':'https://codepen.io/raulGX/full/WxOJNz'
    },
    {
      'name':'Tic-Tac-Toe',
      'description':'Used jQuery and Bootstrap.',
      'img':'img/portfolio/fend-xohs.jpg',
      'link':'https://codepen.io/raulGX/full/vKWyVp'
    },
    {
      'name':'FreeCodeCamp - Back-End',
      'description':'Under development.',
      'img':'img/portfolio/coming-soon.jpg',
      'link':'https://github.com/raulGX'
    }
  ];
}).directive('smoothScroll', [
  //DISCLAIMER THIS IS NOT MY CODE !!!
  '$log', '$timeout', '$window', function($log, $timeout, $window) {
    /*
        Retrieve the current vertical position
        @returns Current vertical position
    */

    var currentYPosition, elmYPosition, smoothScroll;
    currentYPosition = function() {
      if ($window.pageYOffset) {
        return $window.pageYOffset;
      }
      if ($window.document.documentElement && $window.document.documentElement.scrollTop) {
        return $window.document.documentElement.scrollTop;
      }
      if ($window.document.body.scrollTop) {
        return $window.document.body.scrollTop;
      }
      return 0;
    };
    /*
        Get the vertical position of a DOM element
        @param eID The DOM element id
        @returns The vertical position of element with id eID
    */

    elmYPosition = function(eID) {
      var elm, node, y;
      elm = document.getElementById(eID);
      if (elm) {
        y = elm.offsetTop;
        node = elm;
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        }
        return y;
      }
      return 0;
    };
    /*
        Smooth scroll to element with a specific ID without offset
        @param eID The element id to scroll to
        @param offSet Scrolling offset
    */

    smoothScroll = function(eID, offSet) {
      var distance, i, leapY, speed, startY, step, stopY, timer, _results;
      startY = currentYPosition();
      stopY = elmYPosition(eID) - offSet;
      distance = (stopY > startY ? stopY - startY : startY - stopY);
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }
      step = Math.round(distance / 25);
      leapY = (stopY > startY ? startY + step : startY - step);
      timer = 0;
      if (stopY > startY) {
        i = startY;
        while (i < stopY) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step;
          if (leapY > stopY) {
            leapY = stopY;
          }
          timer++;
          i += step;
        }
        return;
      }
      i = startY;
      _results = [];
      while (i > stopY) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
        }
        timer++;
        _results.push(i -= step);
      }
      return _results;
    };
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        return element.bind('click', function() {
          var offset;
          if (attr.target) {
            offset = attr.offset || 100;
            $log.log('Smooth scroll: scrolling to', attr.target, 'with offset', offset);
            return smoothScroll(attr.target, offset);
          } else {
            return $log.warn('Smooth scroll: no target specified');
          }
        });
      }
    };
  }
  //MY CODE ONCE AGAIN
]).controller('ScrollController', ['$scope', '$location', '$anchorScroll',
  function ($scope, $location, $anchorScroll) {
    $scope.goto = function(loc) {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(loc);

      // call $anchorScroll()
      $anchorScroll();
  }
}]).controller('NavController',['$scope',function($scope){
  $scope.navigations = [
    {
      "name":"HOME",
      "link":'home'
    },
    {
      "name":"ABOUT",
      "link":'about'
    },
    {
      "name":"PROJECTS",
      "link":'projects'
    },
    {
      "name":"CONTACT",
      "link":'contact'
    },
  ];
}]);
