(function() {

  'use strict';

  angular
    .module('asmAngularTooltip')
    .directive('asmAngularTooltip', asmAngularTooltip);

  /* @ngInject */
  function asmAngularTooltip($timeout) {

    var directive = {
      restrict: 'A',
      scope: false,
      link: link,
    };

    var CLOSE_DELAY = 1000;

    return directive;

    function link(scope, elem, attrs) {
      scope.isOpen = false;
      bindEvents();
      /* Private functions */

      function bindEvents() {
        elem.bind('mouseenter', function() {
          scope.isOpen = true;
        });

        elem.bind('mouseleave', function() {
          $timeout(function() {
            scope.isOpen = false;
          }, CLOSE_DELAY);
        });
      }
    }
  }

})();
